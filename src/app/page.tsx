import { Hero } from "@/components/home/hero";
import { StepsSection } from "@/components/home/steps-section";
import { TrustBar } from "@/components/home/trust-bar";
import { BentoGrid } from "@/components/home/bento-grid";
import { ResourceCenter } from "@/components/home/resource-center";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAFAFA] flex flex-col font-sans text-slate-800">
      <Hero />
      <StepsSection />
      <TrustBar />
      <BentoGrid />
      <ResourceCenter />

      {/* Footer / Final Soft CTA embedded here for simplicity if not separate component yet */}
      <footer className="py-12 bg-primary text-white text-center">
        <div className="container mx-auto px-4">
          <p className="text-xl mb-6 opacity-90">¿Listo para dar el siguiente paso?</p>
          <a href="/questionnaire" className="inline-block border-2 border-white text-white px-8 py-3 rounded-full hover:bg-white hover:text-primary transition-colors font-bold text-lg">
            Comenzar Cuestionario
          </a>
          <p className="mt-8 text-sm opacity-60">
            © 2026 Silver Stays. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </main>
  );
}
