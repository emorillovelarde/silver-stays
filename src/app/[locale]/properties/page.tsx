import Image from "next/image";
import { getProperties } from "@/lib/properties";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const revalidate = 0; // Ensure fresh data on every request for now

export default async function PropertiesPage() {
  const properties = await getProperties();

  return (
    <main className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-primary mb-2">Destinos Silver</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Encuentra tu hogar perfecto para una estancia larga y cómoda.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((property) => (
          <Card
            key={property.id}
            className="flex flex-col h-full border-2 hover:border-primary/20 transition-all duration-300 bg-card"
          >
            <div className="h-64 w-full bg-muted overflow-hidden rounded-t-lg relative">
              <Image
                src={
                  property.location.includes("Nerja")
                    ? "https://images.unsplash.com/photo-1580587771525-78b9dba3b91d?auto=format&fit=crop&w=800&q=80"
                    : property.location.includes("Marbella")
                      ? "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80"
                      : "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80"
                }
                alt={property.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform hover:scale-105 duration-500"
              />
            </div>

            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-2xl font-bold text-primary">
                  {property.title}
                </CardTitle>
              </div>
              <CardDescription className="text-lg flex items-center gap-2 mt-2">
                <span>📍 {property.location}</span>
              </CardDescription>
            </CardHeader>

            <CardContent className="flex-grow space-y-4">
              <p className="text-lg leading-relaxed text-foreground/80">
                {property.description}
              </p>

              <div className="flex gap-4 mt-4">
                <div className="bg-secondary/50 p-3 rounded-lg flex-1 text-center">
                  <span className="block text-sm text-muted-foreground uppercase tracking-wide">
                    Accesibilidad
                  </span>
                  <span className="text-xl font-bold text-primary">
                    {property.accessibility_rating}/5
                  </span>
                </div>
                <div className="bg-secondary/50 p-3 rounded-lg flex-1 text-center">
                  <span className="block text-sm text-muted-foreground uppercase tracking-wide">
                    Temp. Enero
                  </span>
                  <span className="text-xl font-bold text-primary">
                    {property.clima_data?.jan_temp ?? "--"}°C
                  </span>
                </div>
              </div>
            </CardContent>

            <CardFooter className="pt-4 border-t bg-muted/20">
              <div className="w-full flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">
                    Precio mensual
                  </span>
                  <span className="text-2xl font-bold text-primary">
                    {property.price_per_month}€
                  </span>
                </div>
                <Button size="default" className="text-lg px-8">
                  Ver Detalles
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {properties.length === 0 && (
        <div className="text-center py-20">
          <h2 className="text-2xl text-muted-foreground">
            No se encontraron propiedades.
          </h2>
          <p className="text-lg">
            Por favor verifica que se hayan insertado los datos de prueba.
          </p>
        </div>
      )}
    </main>
  );
}
