import { cn } from "@/lib/cn";
import Image from "next/image";

import { brandAssetRegistry } from "../graphic-registry";
import type { BrandAssetKey } from "../types";

type BrandAssetProps = Readonly<{
  asset: BrandAssetKey;
  className?: string;
  decorative?: boolean;
  height?: number;
  label?: string;
  width?: number;
}>;

export function BrandAsset({
  asset,
  className,
  decorative = false,
  height,
  label,
  width,
}: BrandAssetProps) {
  const spec = brandAssetRegistry[asset];

  return (
    <Image
      alt={decorative ? "" : label ?? spec.alt}
      className={cn(
        "block object-contain",
        spec.tone === "light-on-dark" && "[filter:brightness(0)_invert(1)]",
        className,
      )}
      height={height ?? spec.height}
      src={spec.src}
      width={width ?? spec.width}
    />
  );
}
