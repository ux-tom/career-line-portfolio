import Image from "next/image";
import clsx from "clsx";

/**
 * The halftone avatar — used at 30px in Nav (no border) and 200px in About
 * (with an ink ring). Same image, two sizes/treatments.
 */
export default function Avatar({
  size,
  ring = false,
  priority = false,
  alt = "",
  className,
}: {
  size: number;
  ring?: boolean;
  priority?: boolean;
  alt?: string;
  className?: string;
}) {
  return (
    <Image
      src="/halftone-avatar.png"
      alt={alt}
      width={size}
      height={size}
      priority={priority}
      className={clsx(
        "rounded-full bg-white object-cover",
        ring && "border-2 border-ink",
        className
      )}
      style={{ width: size, height: size }}
    />
  );
}
