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
  ringRadius: number;
  spacing: number;
  waveStart: number;
};

const DESKTOP_SCENE: SceneConfig = {
  amplitude: 24,
  anchorX: 0.535,
  anchorY: 0.05,
  baseRadius: 1.2,
  ringRadius: 64,
  spacing: 20,
  waveStart: 0,
};

const MOBILE_SCENE: SceneConfig = {
  amplitude: 17,
  anchorX: 0.64,
  anchorY: 0.05,
  baseRadius: 1.05,
  ringRadius: 48,
  spacing: 12,
  waveStart: 0,
};

function gaussian(value: number, falloff: number) {
  return Math.exp(-((value * value) / falloff));
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
  const waveStartY = height * scene.waveStart;
  const waveDepth = Math.max(height - waveStartY, 1);

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, width, height);

  const background = ctx.createLinearGradient(0, 0, width, height);
  background.addColorStop(0, "#020407");
  background.addColorStop(0.38, "#06080d");
  background.addColorStop(0.72, "#090b11");
  background.addColorStop(1, "#030507");
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
  halo.addColorStop(0, "rgba(255,49,41,0.24)");
  halo.addColorStop(0.22, "rgba(255,49,41,0.14)");
  halo.addColorStop(0.55, "rgba(255,49,41,0.07)");
  halo.addColorStop(0.8, "rgba(255,49,41,0.025)");
  halo.addColorStop(1, "rgba(255,49,41,0)");
  ctx.fillStyle = halo;
  ctx.fillRect(0, 0, width, height);

  for (
    let gridX = -scene.spacing;
    gridX <= width + scene.spacing;
    gridX += scene.spacing
  ) {
    const horizontal = (gridX - centerX) / Math.max(width * 0.5, 1);
    const waveEnvelope = gaussian(horizontal, 0.82);
    const crestBias = gaussian((horizontal - 0.05) / 0.66, 0.42);

    for (
      let gridY = -scene.spacing;
      gridY <= height + scene.spacing;
      gridY += scene.spacing
    ) {
      const rowProgress = Math.min(
        1,
        Math.max(0, (gridY - waveStartY) / waveDepth),
      );
      const genesisProgress = Math.min(
        1,
        Math.max(0, (gridY - centerY) / Math.max(height - centerY, 1)),
      );
      const vertical = (gridY - centerY) / Math.max(height * 0.7, 1);
      const ridge = gaussian(vertical, 0.8);
      const depthStrength = 0.42 + rowProgress * 1.46;
      const fanOut = 0.035 + Math.pow(genesisProgress, 0.86) * 1.12;
      const verticalSpread = 0.24 + genesisProgress * 0.88;
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
        drift * (0.2 + genesisProgress * 0.45 + waveEnvelope * 0.4) +
        lateralWave * (0.15 + genesisProgress * 0.85);
      const y =
        centerY +
        (gridY - centerY) * verticalSpread +
        surfaceWave * ridge * (0.18 + genesisProgress * 0.82) +
        ripple * (0.08 + genesisProgress * 0.24 + waveEnvelope * 0.62) -
        anchorPull * 26;
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
      const laneVisibility = Math.max(0.16, horizonFade * depthFade);
      const opacity =
        0.055 +
        waveEnvelope * 0.16 +
        crestBias * 0.16 +
        ringBand * 0.14 +
        centerGlow * 0.04 +
        rowProgress * 0.2 +
        genesisProgress * 0.08;
      const radius =
        scene.baseRadius +
        rowProgress * 0.54 +
        waveEnvelope * 0.22 +
        ringBand * 0.28 +
        centerGlow * 0.1 +
        genesisProgress * 0.1;

      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${RED}, ${Math.min(
        0.58,
        opacity * laneVisibility,
      )})`;
      ctx.fill();
    }
  }

  const topShade = ctx.createLinearGradient(0, 0, 0, height);
  topShade.addColorStop(0, "rgba(0,0,0,0.5)");
  topShade.addColorStop(0.3, "rgba(0,0,0,0.08)");
  topShade.addColorStop(1, "rgba(0,0,0,0.62)");
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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_53.5%_14%,rgba(255,49,41,0.12),transparent_16rem),linear-gradient(118deg,rgba(255,255,255,0.025),transparent_26%)]" />
        <div
          className={`absolute inset-0 transition-opacity duration-700 ${
            isReady ? "opacity-[0.12]" : "opacity-[0.38]"
          }`}
        >
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,49,41,0.78)_1px,transparent_1.1px)] [background-position:center] [background-size:15px_15px]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.14),transparent_12%,transparent_84%,rgba(0,0,0,0.34))]" />
        </div>
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 h-full w-full transition-opacity duration-700 ${
            isReady ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
      <div className="absolute left-[64%] top-[4%] -translate-x-1/2 -translate-y-1/2 md:left-[53.5%] md:top-[6%]">
        <div className="absolute inset-[-46%] rounded-full bg-[radial-gradient(circle,rgba(255,49,41,0.22)_0%,rgba(255,49,41,0.1)_34%,transparent_74%)] blur-2xl" />
        <div className="relative flex h-[clamp(76px,10vw,116px)] w-[clamp(76px,10vw,116px)] items-center justify-center rounded-full bg-[var(--color-resume-red)] shadow-[0_0_34px_rgba(255,49,41,0.34),0_0_88px_rgba(255,49,41,0.2)]">
          <div className="h-[42%] w-[42%] rounded-full bg-[#07090d] shadow-[inset_0_0_18px_rgba(0,0,0,0.68)]" />
        </div>
      </div>
      <div className="absolute inset-y-0 left-0 w-[58%] bg-[linear-gradient(90deg,rgba(0,0,0,0.98)_0%,rgba(0,0,0,0.95)_28%,rgba(0,0,0,0.82)_62%,transparent_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-[54%] bg-[linear-gradient(180deg,transparent_0%,rgba(0,0,0,0.08)_20%,rgba(0,0,0,0.34)_72%,rgba(0,0,0,0.5)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_53.5%_14%,transparent_0_4.5rem,rgba(0,0,0,0.03)_10rem,rgba(0,0,0,0.68)_100%)]" />
    </div>
  );
}
