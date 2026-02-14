import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Hero() {
    return (
        <section className="relative w-full h-[85vh] flex items-center justify-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/hero-marbella.png"
                    alt="Atardecer en Marbella - Vista panorámica de la Costa del Sol"
                    fill
                    className="object-cover"
                    priority
                />
                {/* Dark overlay for readability over sunset */}
                <div className="absolute inset-0 bg-black/40 z-10" />
            </div>

            {/* Content */}
            <div className="relative z-20 text-center px-4 max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white drop-shadow-lg leading-tight">
                    Tu estancia de invierno en la Costa del Sol
                </h1>
                <p className="text-xl md:text-2xl text-white font-medium max-w-3xl mx-auto leading-relaxed drop-shadow-md">
                    Alojamiento certificado, soporte legal y médico para que solo te preocupes de disfrutar
                </p>

                <div className="pt-4 flex flex-col items-center">
                    <Link href="/questionnaire">
                        <Button
                            size="lg"
                            className="h-16 px-12 text-2xl font-bold bg-primary hover:bg-primary/90 transition-all transform hover:scale-105 shadow-xl rounded-full border-2 border-white/20"
                        >
                            Diseña tu estancia
                            <ArrowRight className="ml-3 h-8 w-8" />
                        </Button>
                    </Link>

                </div>
            </div>
        </section>
    );
}
