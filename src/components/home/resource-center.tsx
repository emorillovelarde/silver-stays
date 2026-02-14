import { Button } from "@/components/ui/button";
import { FileText, Sun, BookOpen } from "lucide-react";

export function ResourceCenter() {
    const resources = [
        {
            title: "La Guía del Brexit",
            subtitle: "Regla 90/180 explicada",
            icon: <FileText className="h-8 w-8" />,
        },
        {
            title: "Sanidad en la Costa",
            subtitle: "Manual para jubilados",
            icon: <BookOpen className="h-8 w-8" />,
        },
        {
            title: "Invierno al Sol",
            subtitle: "Mejores zonas por clima",
            icon: <Sun className="h-8 w-8" />,
        },
    ];

    return (
        <section className="py-16 bg-white border-t border-gray-100">
            <div className="container mx-auto px-4 max-w-5xl">
                <h2 className="text-3xl font-bold text-primary mb-8 text-center md:text-left">
                    Centro de Recursos
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {resources.map((res, i) => (
                        <Button
                            key={i}
                            variant="outline"
                            className="h-auto py-8 flex flex-col gap-4 border-2 border-secondary/30 hover:border-primary hover:bg-secondary/10 hover:text-primary transition-all group"
                        >
                            <div className="bg-primary/10 p-4 rounded-full text-primary group-hover:scale-110 transition-transform">
                                {res.icon}
                            </div>
                            <div className="text-center">
                                <div className="text-xl font-bold text-primary">{res.title}</div>
                                <div className="text-sm text-muted-foreground">{res.subtitle}</div>
                            </div>
                        </Button>
                    ))}
                </div>
            </div>
        </section>
    );
}
