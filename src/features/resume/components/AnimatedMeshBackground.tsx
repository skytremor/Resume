"use client";

import { useEffect, useRef, useState } from "react";

const MOBILE_BREAKPOINT = "(max-width: 767px)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const RED = "255, 49, 41";
const DESKTOP_MAX_DPR = 1.5;
const MOBILE_MAX_DPR = 1.25;
const FRAME_INTERVAL_MS = 1000 / 30;

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

type PreparedDot = {
  anchorPullScale: number;
  crestBias: number;
  downstreamProgress: number;
  driftMix: number;
  driftScale: number;
  fanOut: number;
  funnelBand: number;
  gridX: number;
  gridY: number;
  horizontal: number;
  laneVisibility: number;
  lateralMix: number;
  lateralScale: number;
  opacityBase: number;
  radiusBase: number;
  rippleMix: number;
  rippleScale: number;
  rowProgress: number;
  surfaceMix: number;
  surfaceScale: number;
  verticalSpread: number;
  waveEnvelope: number;
  xBase: number;
  yBase: number;
};

type PreparedScene = {
  background: CanvasGradient;
  compact: boolean;
  cssHeight: number;
  cssWidth: number;
  dpr: number;
  dots: PreparedDot[];
  halo: CanvasGradient;
  innerCutout: number;
  outerRingGlow: number;
  ringRadius: number;
  topShade: CanvasGradient;
  width: number;
  height: number;
  centerX: number;
  centerY: number;
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

function prepareWaveScene(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  compact: boolean,
) {
  const bounds = canvas.getBoundingClientRect();
  const dpr = Math.min(
    window.devicePixelRatio || 1,
    compact ? MOBILE_MAX_DPR : DESKTOP_MAX_DPR,
  );
  const width = Math.max(1, bounds.width);
  const height = Math.max(1, bounds.height);
  const pixelWidth = Math.max(1, Math.round(width * dpr));
  const pixelHeight = Math.max(1, Math.round(height * dpr));

  if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
    canvas.width = pixelWidth;
    canvas.height = pixelHeight;
  }

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
  const dots: PreparedDot[] = [];

  for (
    let gridX = -scene.spacing;
    gridX <= width + scene.spacing;
    gridX += scene.spacing
  ) {
    const horizontal =
      wrapSignedDistance(gridX - centerX, width) / Math.max(width * 0.5, 1);
    const waveEnvelope = gaussian(horizontal, 0.82);
    const crestBias = gaussian((horizontal - 0.05) / 0.66, 0.42);
    const anchorPullScale = gaussian(horizontal / 0.38, 0.26);

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
      const horizonFade = rowProgress <= 0.06 ? rowProgress / 0.06 : 1;
      const depthFade = Math.max(0.28, Math.min(1, rowProgress * 1.2 + 0.16));
      const laneVisibility = Math.max(
        0.28,
        horizonFade * depthFade + funnelBand * 0.12,
      );

      dots.push({
        anchorPullScale,
        crestBias,
        downstreamProgress,
        driftMix: 0.14 + streamProgress * 0.34 + waveEnvelope * 0.3,
        driftScale: 2.8 + rowProgress * 8.2,
        fanOut,
        funnelBand,
        gridX,
        gridY,
        horizontal,
        laneVisibility,
        lateralMix: 0.08 + streamProgress * 0.4 + funnelBand * 0.08,
        lateralScale: scene.amplitude * 0.26,
        opacityBase:
          0.32 +
          waveEnvelope * 0.22 +
          crestBias * 0.28 +
          rowProgress * 0.16 +
          downstreamProgress * 0.2 +
          funnelBand * 0.18,
        radiusBase:
          scene.baseRadius +
          rowProgress * 0.54 +
          waveEnvelope * 0.22 +
          downstreamProgress * 0.12,
        rippleMix: 0.05 + downstreamProgress * 0.14 + waveEnvelope * 0.34,
        rippleScale: 3.2 + rowProgress * 7.4,
        rowProgress,
        surfaceMix: ridge * (0.08 + downstreamProgress * 0.48),
        surfaceScale: scene.amplitude * depthStrength,
        verticalSpread,
        waveEnvelope,
        xBase: centerX + (gridX - centerX) * fanOut,
        yBase:
          streamOriginY +
          (gridY - streamOriginY) * verticalSpread -
          anchorPullScale * (1 - rowProgress) * (18 + funnelBand * 12),
      });
    }
  }

  const background = ctx.createLinearGradient(0, 0, width, height);
  background.addColorStop(0, "#06090d");
  background.addColorStop(0.38, "#0b0f15");
  background.addColorStop(0.72, "#11151d");
  background.addColorStop(1, "#070a0f");

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

  const topShade = ctx.createLinearGradient(0, 0, 0, height);
  topShade.addColorStop(0, "rgba(0,0,0,0.34)");
  topShade.addColorStop(0.3, "rgba(0,0,0,0.04)");
  topShade.addColorStop(1, "rgba(0,0,0,0.48)");

  return {
    background,
    centerX,
    centerY,
    compact,
    cssHeight: height,
    cssWidth: width,
    dots,
    dpr,
    halo,
    height,
    innerCutout,
    outerRingGlow,
    ringRadius,
    topShade,
    width,
  } satisfies PreparedScene;
}

function drawPreparedScene(
  ctx: CanvasRenderingContext2D,
  scene: PreparedScene,
  phase: number,
) {
  ctx.setTransform(scene.dpr, 0, 0, scene.dpr, 0, 0);
  ctx.clearRect(0, 0, scene.cssWidth, scene.cssHeight);
  ctx.fillStyle = scene.background;
  ctx.fillRect(0, 0, scene.width, scene.height);
  ctx.fillStyle = scene.halo;
  ctx.fillRect(0, 0, scene.width, scene.height);

  for (const dot of scene.dots) {
    const drift =
      Math.sin(dot.gridY * 0.026 + phase * 1.15 + dot.horizontal * 4.7) *
      dot.driftScale;
    const lateralWave =
      Math.sin(dot.gridX * 0.018 - phase * 1.35 + dot.rowProgress * 5.6) *
      dot.lateralScale;
    const surfaceWave =
      Math.sin(dot.horizontal * 5.1 - phase * 1.05 + dot.rowProgress * 6.8) *
      dot.surfaceScale;
    const ripple =
      Math.cos(dot.gridX * 0.01 + dot.rowProgress * 11 - phase * 0.9) *
      dot.rippleScale;
    const x = dot.xBase + drift * dot.driftMix + lateralWave * dot.lateralMix;
    const y =
      dot.yBase +
      surfaceWave * dot.surfaceMix +
      ripple * dot.rippleMix;
    const distance = Math.hypot(x - scene.centerX, y - scene.centerY);

    if (distance < scene.innerCutout) {
      continue;
    }

    const ringBand = gaussian(
      (distance - scene.ringRadius) / scene.ringRadius,
      0.12,
    );
    const centerGlow = gaussian(distance / scene.outerRingGlow, 0.55);
    const opacity = Math.min(
      0.82,
      (dot.opacityBase + ringBand * 0.3 + centerGlow * 0.06) *
        dot.laneVisibility,
    );
    const radius = dot.radiusBase + ringBand * 0.28 + centerGlow * 0.1;

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${RED}, ${opacity})`;
    ctx.fill();
  }

  ctx.fillStyle = scene.topShade;
  ctx.fillRect(0, 0, scene.width, scene.height);

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

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return;
    }

    const reduceMotionQuery = window.matchMedia(REDUCED_MOTION_QUERY);
    const compactQuery = window.matchMedia(MOBILE_BREAKPOINT);
    let frameId = 0;
    let disposed = false;
    let lastFrameTime = 0;
    let scene: PreparedScene | null = null;
    let reducedMotion = reduceMotionQuery.matches;
    let visible = document.visibilityState === "visible";
    let resizeObserver: ResizeObserver | null = null;

    const rebuildScene = () => {
      scene = prepareWaveScene(ctx, canvas, compactQuery.matches);
    };

    const render = (time: number) => {
      if (disposed || !visible) {
        return;
      }

      if (!scene) {
        rebuildScene();
      }

      if (!scene) {
        return;
      }

      if (!reducedMotion && time - lastFrameTime < FRAME_INTERVAL_MS) {
        frameId = window.requestAnimationFrame(render);
        return;
      }

      lastFrameTime = time;
      const drew = drawPreparedScene(
        ctx,
        scene,
        reducedMotion ? 1.2 : time * 0.001,
      );

      if (drew && !readyRef.current) {
        readyRef.current = true;
        setIsReady(true);
      }

      if (!reducedMotion) {
        frameId = window.requestAnimationFrame(render);
      }
    };

    const start = (shouldRebuild = false) => {
      if (shouldRebuild || !scene) {
        rebuildScene();
      }

      window.cancelAnimationFrame(frameId);
      lastFrameTime = 0;

      if (visible) {
        frameId = window.requestAnimationFrame(render);
      }
    };

    const handlePreferenceChange = () => {
      reducedMotion = reduceMotionQuery.matches;
      start(true);
    };

    const handleCompactChange = () => {
      start(true);
    };

    const handleVisibilityChange = () => {
      visible = document.visibilityState === "visible";

      if (visible) {
        start();
      } else {
        window.cancelAnimationFrame(frameId);
      }
    };

    const handleResize = () => {
      start(true);
    };

    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(canvas);
    } else {
      window.addEventListener("resize", handleResize);
    }

    start(true);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    reduceMotionQuery.addEventListener("change", handlePreferenceChange);
    compactQuery.addEventListener("change", handleCompactChange);

    return () => {
      disposed = true;
      window.cancelAnimationFrame(frameId);
      resizeObserver?.disconnect();
      if (!resizeObserver) {
        window.removeEventListener("resize", handleResize);
      }
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      reduceMotionQuery.removeEventListener("change", handlePreferenceChange);
      compactQuery.removeEventListener("change", handleCompactChange);
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
