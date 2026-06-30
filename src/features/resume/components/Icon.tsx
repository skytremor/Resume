import { cn } from "@/lib/cn";

import { brandAssetRegistry, uiIconRegistry } from "../graphic-registry";
import { resumeSurfaceStrongClass } from "../styles";
import type { ResumeGraphic } from "../types";
import { BrandAsset } from "./BrandAsset";

type IconProps = Readonly<{
  className?: string;
  decorative?: boolean;
  graphic: ResumeGraphic;
  label?: string;
  size?: "inline" | "stack";
}>;

export function Icon({
  className,
  decorative = true,
  graphic,
  label,
  size = "inline",
}: IconProps) {
  const isStack = size === "stack";
  const containerClassName = isStack
    ? cn(
        "inline-flex h-11 w-11 items-center justify-center rounded-xl p-[5px] text-[#eef2f4]",
        resumeSurfaceStrongClass,
      )
    : "inline-flex h-[18px] w-[18px] flex-none items-center justify-center text-resume-red";

  if (graphic.type === "brand") {
    const spec = brandAssetRegistry[graphic.key];
    const isWide = spec.layout === "wide";

    return (
      <span
        aria-hidden={decorative || undefined}
        aria-label={decorative ? undefined : label}
        className={cn(
          containerClassName,
          isStack && isWide && "w-[62px]",
          className,
        )}
      >
        <BrandAsset
          asset={graphic.key}
          decorative
          height={isStack ? (isWide ? 18 : 34) : 18}
          width={isStack ? (isWide ? 54 : 34) : 18}
        />
      </span>
    );
  }

  const IconComponent = uiIconRegistry[graphic.key];

  return (
    <span
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : label}
      className={cn(containerClassName, className)}
    >
      <IconComponent
        aria-hidden="true"
        className={isStack ? "block size-6" : "block size-[18px]"}
        strokeWidth={isStack ? 1.9 : 2}
      />
    </span>
  );
}
