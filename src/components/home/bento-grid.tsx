import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CheckCircle2, HeartPulse, Sparkles } from "lucide-react";

export function BentoGrid() {
    const features = [
        {
            title: "Alojamiento Verificado",
            icon: <CheckCircle2 className="h-10 w-10 text-primary" />,
            description: "Inspeccionamos cada hogar: accesibilidad, duchas a ras de suelo y confort térmico garantizado.",
            colSpan: "md:col-span-1",
            image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=800"
        },
        {
            title: "Soporte Médico y Legal",
            icon: <HeartPulse className="h-10 w-10 text-primary" />,
            description: "Asistencia para trámites de residencia y conexión directa con los mejores especialistas médicos de la zona.",
            colSpan: "md:col-span-1",
            image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800"
        },
        {
            title: "Comunidad Silver",
            icon: <Sparkles className="h-10 w-10 text-primary" />,
            description: "No estarás solo. Únete a clubes de bridge, grupos de senderismo suave y cenas gastronómicas.",
            colSpan: "md:col-span-2 lg:col-span-1",
            image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=800"
        }
    ];

    return (
        <section className="py-16 md:py-24 bg-[#FAFAFA]">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-12">
                    Tu ecosistema de bienestar
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {features.map((f, i) => (
                        <Card key={i} className={`border-none shadow-lg hover:shadow-xl transition-shadow duration-300 ${f.colSpan} h-full overflow-hidden flex flex-col`}>
                            <div className="relative w-full aspect-video">
                                <Image
                                    src={f.image}
                                    alt={f.title}
                                    fill
                                    className="object-cover transition-transform duration-500 hover:scale-105"
                                    loading="lazy"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                            </div>
                            <CardHeader className="pb-2 pt-6">
                                <div className="mb-4 bg-secondary/20 w-fit p-3 rounded-xl">
                                    {f.icon}
                                </div>
                                <CardTitle className="text-2xl font-bold text-primary">{f.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    {f.description}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
