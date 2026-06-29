"use client";

import { useEffect, useRef, useState } from "react";

const MOBILE_BREAKPOINT = "(max-width: 767px)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const RED = "255, 49, 41";

type SceneConfig = {
  amplitude: number;
  anchorX: number;
  anchorY: number;
  baseRadius: number;
  funnelStrength: number;
  funnelWidth: number;
  lowerSpread: number;
  ringRadius: number;
  spacing: number;
  sourceY: number;
  topSpread: number;
  waveStart: number;
};

const DESKTOP_SCENE: SceneConfig = {
  amplitude: 28,
  anchorX: 0.535,
  anchorY: 0.05,
  baseRadius: 1.2,
  funnelStrength: 0.24,
  funnelWidth: 0.11,
  lowerSpread: 1.08,
  ringRadius: 64,
  spacing: 20,
  sourceY: -0.18,
  topSpread: 0.22,
  waveStart: 0,
};

const MOBILE_SCENE: SceneConfig = {
  amplitude: 20,
  anchorX: 0.64,
  anchorY: 0.05,
  baseRadius: 1.05,
  funnelStrength: 0.18,
  funnelWidth: 0.14,
  lowerSpread: 0.92,
  ringRadius: 48,
  spacing: 12,
  sourceY: -0.12,
  topSpread: 0.28,
  waveStart: 0,
};

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function gaussian(value: number, falloff: number) {
  return Math.exp(-((value * value) / falloff));
}

function wrapSignedDistance(value: number, period: number) {
  const safePeriod = Math.max(period, 1);
  const wrapped =
    (((value + safePeriod * 0.5) % safePeriod) + safePeriod) % safePeriod;

  return wrapped - safePeriod * 0.5;
}

function resizeCanvas(canvas: HTMLCanvasElement) {
  const bounds = canvas.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const width = Math.max(1, Math.round(bounds.width * dpr));
  const height = Math.max(1, Math.round(bounds.height * dpr));

  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }

  return {
    cssHeight: bounds.height,
    cssWidth: bounds.width,
    dpr,
  };
}

function drawDotWave(
  canvas: HTMLCanvasElement,
  phase: number,
  compact: boolean,
) {
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return false;
  }

  const { cssHeight, cssWidth, dpr } = resizeCanvas(canvas);
  const width = Math.max(cssWidth, 1);
  const height = Math.max(cssHeight, 1);
  const scene = compact ? MOBILE_SCENE : DESKTOP_SCENE;
  const centerX = width * scene.anchorX;
  const centerY = height * scene.anchorY;
  const ringRadius = scene.ringRadius;
  const innerCutout = ringRadius * 0.42;
  const outerRingGlow = ringRadius * 2.25;
  const streamOriginY = height * scene.sourceY;
  const waveStartY = height * scene.waveStart;
  const waveDepth = Math.max(height - waveStartY, 1);
  const streamDepth = Math.max(height - streamOriginY, 1);
  const orbProgress = clamp01((centerY - streamOriginY) / streamDepth);

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, width, height);

  const background = ctx.createLinearGradient(0, 0, width, height);
  background.addColorStop(0, "#06090d");
  background.addColorStop(0.38, "#0b0f15");
  background.addColorStop(0.72, "#11151d");
  background.addColorStop(1, "#070a0f");
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, width, height);

  const halo = ctx.createRadialGradient(
    centerX,
    centerY,
    innerCutout * 0.2,
    centerX,
    centerY,
    outerRingGlow,
  );
  halo.addColorStop(0, "rgba(255,49,41,0.34)");
  halo.addColorStop(0.22, "rgba(255,49,41,0.2)");
  halo.addColorStop(0.55, "rgba(255,49,41,0.1)");
  halo.addColorStop(0.8, "rgba(255,49,41,0.04)");
  halo.addColorStop(1, "rgba(255,49,41,0)");
  ctx.fillStyle = halo;
  ctx.fillRect(0, 0, width, height);

  for (
    let gridX = -scene.spacing;
    gridX <= width + scene.spacing;
    gridX += scene.spacing
  ) {
    const horizontal =
      wrapSignedDistance(gridX - centerX, width) / Math.max(width * 0.5, 1);
    const waveEnvelope = gaussian(horizontal, 0.82);
    const crestBias = gaussian((horizontal - 0.05) / 0.66, 0.42);

    for (
      let gridY = -scene.spacing;
      gridY <= height + scene.spacing;
      gridY += scene.spacing
    ) {
      const rowProgress = clamp01((gridY - waveStartY) / waveDepth);
      const streamProgress = clamp01((gridY - streamOriginY) / streamDepth);
      const downstreamProgress = clamp01(
        (gridY - centerY) / Math.max(height - centerY, 1),
      );
      const vertical = (gridY - centerY) / Math.max(height * 0.66, 1);
      const ridge = gaussian(vertical, 0.9);
      const funnelBand = gaussian(
        (streamProgress - orbProgress) / scene.funnelWidth,
        0.24,
      );
      const depthStrength = 0.42 + rowProgress * 1.46;
      const fanOut = Math.max(
        0.12,
        scene.topSpread +
          Math.pow(streamProgress, 0.92) * scene.lowerSpread -
          funnelBand * scene.funnelStrength,
      );
      const verticalSpread = 0.84 + streamProgress * 0.18 - funnelBand * 0.08;
      const drift =
        Math.sin(gridY * 0.026 + phase * 1.15 + horizontal * 4.7) *
        (2.8 + rowProgress * 8.2);
      const lateralWave =
        Math.sin(gridX * 0.018 - phase * 1.35 + rowProgress * 5.6) *
        scene.amplitude *
        0.26;
      const surfaceWave =
        Math.sin(horizontal * 5.1 - phase * 1.05 + rowProgress * 6.8) *
        scene.amplitude *
        depthStrength;
      const ripple =
        Math.cos(gridX * 0.01 + rowProgress * 11 - phase * 0.9) *
        (3.2 + rowProgress * 7.4);
      const anchorPull = gaussian(horizontal / 0.38, 0.26) * (1 - rowProgress);
      const x =
        centerX +
        (gridX - centerX) * fanOut +
        drift * (0.14 + streamProgress * 0.34 + waveEnvelope * 0.3) +
        lateralWave * (0.08 + streamProgress * 0.4 + funnelBand * 0.08);
      const y =
        streamOriginY +
        (gridY - streamOriginY) * verticalSpread +
        surfaceWave * ridge * (0.08 + downstreamProgress * 0.48) +
        ripple * (0.05 + downstreamProgress * 0.14 + waveEnvelope * 0.34) -
        anchorPull * (18 + funnelBand * 12);
      const dx = x - centerX;
      const dy = y - centerY;
      const distance = Math.hypot(dx, dy);

      if (distance < innerCutout) {
        continue;
      }

      const ringBand = gaussian((distance - ringRadius) / ringRadius, 0.12);
      const centerGlow = gaussian(distance / outerRingGlow, 0.55);
      const horizonFade = rowProgress <= 0.06 ? rowProgress / 0.06 : 1;
      const depthFade = Math.max(0.28, Math.min(1, rowProgress * 1.2 + 0.16));
      const laneVisibility = Math.max(
        0.28,
        horizonFade * depthFade + funnelBand * 0.12,
      );
      const opacity =
        0.32 +
        waveEnvelope * 0.22 +
        crestBias * 0.28 +
        ringBand * 0.3 +
        centerGlow * 0.06 +
        rowProgress * 0.16 +
        downstreamProgress * 0.2 +
        funnelBand * 0.18;
      const radius =
        scene.baseRadius +
        rowProgress * 0.54 +
        waveEnvelope * 0.22 +
        ringBand * 0.28 +
        centerGlow * 0.1 +
        downstreamProgress * 0.12;

      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${RED}, ${Math.min(
        0.82,
        opacity * laneVisibility,
      )})`;
      ctx.fill();
    }
  }

  const topShade = ctx.createLinearGradient(0, 0, 0, height);
  topShade.addColorStop(0, "rgba(0,0,0,0.34)");
  topShade.addColorStop(0.3, "rgba(0,0,0,0.04)");
  topShade.addColorStop(1, "rgba(0,0,0,0.48)");
  ctx.fillStyle = topShade;
  ctx.fillRect(0, 0, width, height);

  return true;
}

export function AnimatedMeshBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const readyRef = useRef(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const reduceMotionQuery = window.matchMedia(REDUCED_MOTION_QUERY);
    const compactQuery = window.matchMedia(MOBILE_BREAKPOINT);
    let frameId = 0;
    let disposed = false;

    const render = (time: number) => {
      if (disposed) {
        return;
      }

      const drew = drawDotWave(
        canvas,
        reduceMotionQuery.matches ? 1.2 : time * 0.001,
        compactQuery.matches,
      );

      if (drew && !readyRef.current) {
        readyRef.current = true;
        setIsReady(true);
      }

      if (!reduceMotionQuery.matches) {
        frameId = window.requestAnimationFrame(render);
      }
    };

    const start = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(render);
    };

    const handlePreferenceChange = () => {
      start();
    };

    start();
    window.addEventListener("resize", start);
    reduceMotionQuery.addEventListener("change", handlePreferenceChange);
    compactQuery.addEventListener("change", handlePreferenceChange);

    return () => {
      disposed = true;
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", start);
      reduceMotionQuery.removeEventListener("change", handlePreferenceChange);
      compactQuery.removeEventListener("change", handlePreferenceChange);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-visible print:hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_53.5%_14%,rgba(255,49,41,0.18),transparent_18rem),linear-gradient(118deg,rgba(255,255,255,0.04),transparent_30%)]" />
        <div
          className={`absolute inset-0 transition-opacity duration-700 ${
            isReady ? "opacity-[0.16]" : "opacity-[0.44]"
          }`}
        >
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,49,41,0.78)_1px,transparent_1.1px)] bg-center bg-size-[15px_15px]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08),transparent_12%,transparent_84%,rgba(0,0,0,0.22))]" />
        </div>
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 h-full w-full transition-opacity duration-700 ${
            isReady ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
      <div className="absolute left-[64%] top-[4%] -translate-x-1/2 -translate-y-1/2 md:left-[53.5%] md:top-[6%]">
        <div className="absolute inset-[-46%] rounded-full bg-[radial-gradient(circle,rgba(255,49,41,0.3)_0%,rgba(255,49,41,0.14)_34%,transparent_74%)] blur-2xl" />
        <div className="relative flex h-[clamp(76px,10vw,116px)] w-[clamp(76px,10vw,116px)] items-center justify-center rounded-full bg-(--color-resume-red) shadow-[0_0_42px_rgba(255,49,41,0.42),0_0_104px_rgba(255,49,41,0.26)]">
          <div className="h-[42%] w-[42%] rounded-full bg-[#07090d] shadow-[inset_0_0_18px_rgba(0,0,0,0.68)]" />
        </div>
      </div>
      <div className="absolute inset-y-0 left-0 w-[58%] bg-[linear-gradient(90deg,rgba(0,0,0,0.94)_0%,rgba(0,0,0,0.9)_28%,rgba(0,0,0,0.72)_62%,transparent_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-[54%] bg-[linear-gradient(180deg,transparent_0%,rgba(0,0,0,0.06)_20%,rgba(0,0,0,0.26)_72%,rgba(0,0,0,0.4)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_53.5%_14%,transparent_0_4.5rem,rgba(0,0,0,0.02)_10rem,rgba(0,0,0,0.56)_100%)]" />
    </div>
  );
}
