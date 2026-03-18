import Image from "next/image";

interface HeroImageProps {
  src: string;
  alt: string;
  overlayText: string;
}

export function HeroImage({ src, alt, overlayText }: HeroImageProps) {
  return (
    <figure className="relative -mx-4 sm:-mx-6 lg:-mx-8 mb-12 overflow-hidden rounded-none sm:rounded-xl">
      <div className="relative aspect-[21/9] min-h-[200px] w-full bg-[#004F56]/10">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#004F56]/90 via-[#004F56]/40 to-transparent"
          aria-hidden
        />
        <div className="absolute inset-0 flex items-end justify-center sm:justify-start p-8 sm:p-12">
          <p className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white tracking-tight max-w-2xl text-center sm:text-left drop-shadow-lg">
            {overlayText}
          </p>
        </div>
      </div>
    </figure>
  );
}
