import { ImageIcon } from "lucide-react";

interface CMSImageProps {
  src?: string | null;
  alt?: string;
  className?: string;
  placeholderClassName?: string;
  label?: string;
}

export default function CMSImage({
  src,
  alt = "",
  className = "",
  placeholderClassName = "",
  label = "Bild hinzufügen"
}: CMSImageProps) {
  if (src && src.trim() !== "") {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
      />
    );
  }

  return (
    <div 
      className={`w-full h-full min-h-[200px] flex flex-col items-center justify-center bg-gray-50 border-2 border-dashed border-gray-200/60 text-gray-400 p-6 transition-all hover:bg-gray-100/50 hover:border-gray-300 ${placeholderClassName}`}
    >
      <div className="w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 shadow-sm mb-3">
        <ImageIcon className="w-5 h-5 text-accent-rose/60" />
      </div>
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-foreground/40 text-center px-4 leading-relaxed">
        {label}
      </p>
      <span className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider">
        CMS Platzhalter
      </span>
    </div>
  );
}
