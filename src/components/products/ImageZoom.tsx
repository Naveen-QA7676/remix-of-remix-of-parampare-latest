import { useState, useRef, MouseEvent } from "react";
import { cn } from "@/lib/utils";

interface ImageZoomProps {
  src: string;
  alt: string;
  className?: string;
}

const ImageZoom = ({ src, alt, className }: ImageZoomProps) => {
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setZoomPosition({ x, y });
  };

  const handleMouseEnter = () => setIsZooming(true);
  const handleMouseLeave = () => setIsZooming(false);

  return (
    <div className="flex gap-4">
      {/* Main Image Container */}
      <div
        ref={containerRef}
        className={cn(
          "relative overflow-hidden rounded-2xl bg-secondary cursor-zoom-in",
          className
        )}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
        />
        
        {/* Lens indicator */}
        {isZooming && (
          <div
            className="absolute w-32 h-32 border-2 border-gold/50 rounded-lg pointer-events-none bg-gold/10"
            style={{
              left: `calc(${zoomPosition.x}% - 64px)`,
              top: `calc(${zoomPosition.y}% - 64px)`,
            }}
          />
        )}
      </div>

      {/* Zoom Panel - Side */}
      {isZooming && (
        <div className="hidden lg:block w-[400px] h-[500px] rounded-2xl overflow-hidden border border-border shadow-xl bg-secondary">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url(${src})`,
              backgroundSize: "250%",
              backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ImageZoom;
