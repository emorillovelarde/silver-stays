import { ShieldCheck } from "lucide-react";

export function TrustBar() {
  return (
    <section className="bg-white py-8 border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Security Badge */}
        <div className="flex items-center gap-3 bg-brand-silver/10 px-6 py-3 rounded-full border border-brand-silver/25">
          <ShieldCheck className="h-8 w-8 text-brand-navy" />
          <div>
            <p className="text-sm font-bold text-brand-navy uppercase tracking-wider">
              Silver Standard
            </p>
            <p className="text-xs text-muted-foreground">
              Seguridad Certificada
            </p>
          </div>
        </div>

        {/* Partners Placeholders */}
        <div className="flex items-center justify-center gap-8 md:gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          {/* Placeholder Logos created with text for now */}
          {["Sanitas", "Quirónsalud", "Mapfre", "Aon"].map((partner) => (
            <div
              key={partner}
              className="text-xl font-bold text-slate-400 select-none"
            >
              {partner}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
