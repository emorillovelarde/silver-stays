import { ShieldCheck } from "lucide-react";

export function TrustBar() {
  return (
    <section className="border-b border-gray-100 bg-white py-10 shadow-sm md:py-12">
      <div className="container mx-auto flex justify-center px-4 sm:px-6 lg:px-8">
        {/* Silver Standard — sello propio (siempre visible) */}
        <div className="flex items-center gap-3 rounded-full border border-brand-silver/25 bg-brand-silver/10 px-6 py-3.5 md:px-8 md:py-4">
          <ShieldCheck className="h-8 w-8 shrink-0 text-brand-navy" />
          <div className="text-left">
            <p className="text-sm font-bold uppercase tracking-wider text-brand-navy">
              Silver Standard
            </p>
            <p className="text-xs text-muted-foreground">
              Seguridad Certificada
            </p>
          </div>
        </div>

        {/*
          Soft launch: logos de partners ocultos hasta cerrar convenios oficiales.
          Descomentar cuando Sanitas, Quirónsalud, Mapfre y Aon estén acordados.

        <div className="flex items-center justify-center gap-8 opacity-60 grayscale transition-all duration-500 hover:grayscale-0 md:gap-12">
          {["Sanitas", "Quirónsalud", "Mapfre", "Aon"].map((partner) => (
            <div
              key={partner}
              className="select-none text-xl font-bold text-slate-400"
            >
              {partner}
            </div>
          ))}
        </div>
        */}
      </div>
    </section>
  );
}
