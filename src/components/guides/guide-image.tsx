import Image from "next/image";

interface GuideImageProps {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

export function GuideImage({
  src,
  alt,
  caption,
  width = 800,
  height = 600,
}: GuideImageProps) {
  return (
    <figure className="my-10 overflow-hidden rounded-xl shadow-md bg-white">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-auto"
        priority
      />
      {caption && (
        <figcaption className="px-6 py-4 text-center text-lg text-gray-600 italic font-medium border-t border-gray-100">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
