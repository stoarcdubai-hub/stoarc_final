import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  drawing?: string;
  className?: string;
};

/**
 * Shows a navy blueprint version of the image; on hover it wipes away to reveal the final render.
 * On touch screens the normal photo shows straight away.
 */
export default function BlueprintImage({ src, alt, sizes = "100vw", priority, drawing = "DWG", className = "" }: Props) {
  return (
    <div className={`bp-wrap relative h-full w-full overflow-hidden ${className}`}>
      {/* Final render */}
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />

      {/* Blueprint layer */}
      <div className="bp-layer absolute inset-0 bg-navy" aria-hidden="true">
        <Image src={src} alt="" fill sizes={sizes} className="bp-photo object-cover" />
        <div className="bp-grid-light absolute inset-0" />
        <span className="absolute left-3 top-3 h-4 w-4 border-l border-t border-paper/70" />
        <span className="absolute right-3 top-3 h-4 w-4 border-r border-t border-paper/70" />
        <span className="absolute bottom-3 left-3 h-4 w-4 border-b border-l border-paper/70" />
        <span className="absolute bottom-3 right-3 h-4 w-4 border-b border-r border-paper/70" />
        <span className="absolute left-6 top-6 font-mono text-[10px] tracking-[0.2em] text-paper/80">{drawing}</span>
        <span className="absolute bottom-6 right-6 font-mono text-[10px] tracking-[0.2em] text-paper/80">
          HOVER · RENDER →
        </span>
      </div>
    </div>
  );
}