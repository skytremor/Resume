import Image from "next/image";

import { cn } from "@/lib/cn";

type OutSystemsBadgeProps = Readonly<{
  compact?: boolean;
}>;

export function OutSystemsBadge({ compact = false }: OutSystemsBadgeProps) {
  return (
    <div className={cn("relative aspect-[384/488] w-full", compact && "mx-auto")}>
      <Image
        alt="OutSystems 11 Expert Developer certification badge"
        className="block object-contain"
        fill
        priority={!compact}
        sizes={compact ? "174px" : "(max-width: 768px) 240px, 320px"}
        src="/brands/outsystems/o11-expert.png"
      />
    </div>
  );
}
