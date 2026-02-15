import Image from "next/image";
import { ClipboardList, MessageCircle, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function StepsSection() {
  const steps = [
    {
      number: 1,
      title: "Rellena el cuestionario",
      description:
        "Cuéntanos tus necesidades de salud, movilidad y preferencias sociales en 2 minutos.",
      icon: <ClipboardList className="h-8 w-8 text-white" />,
    },
    {
      number: 2,
      title: "Diseña tu estancia ideal",
      description:
        "Tu gestor personal te contactará para ajustar cada detalle de tu aterrizaje en España.",
      icon: <MessageCircle className="h-8 w-8 text-white" />,
    },
    {
      number: 3,
      title: "Nosotros nos encargamos de todo",
      description:
        "Logística, sanidad y comunidad listas para tu llegada. Tú solo disfruta del sol.",
      icon: <Sparkles className="h-8 w-8 text-white" />,
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-[#0D3B3F]">
          Tres simples pasos para hacer tu estancia realidad
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Left Column: Vertical Steps */}
          <ol className="space-y-6">
            {steps.map((step) => (
              <li key={step.number} className="group">
                <Card className="relative border-none shadow-sm hover:shadow-md transition-all duration-300 bg-slate-50 overflow-hidden flex flex-col p-6 h-full border border-slate-100">
                  {/* Number Badge (Top Right) */}
                  <div
                    className="absolute top-6 right-6 bg-[#0D3B3F] text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-2xl shadow-md z-10 group-hover:scale-110 transition-transform"
                    aria-hidden="true"
                  >
                    {step.number}
                  </div>

                  <div className="flex-grow text-left pr-16">
                    <CardHeader className="p-0 mb-4 space-y-0">
                      <div className="flex items-center gap-4">
                        <div className="bg-[#0D3B3F]/10 p-3 rounded-full text-[#0D3B3F]">
                          {step.icon}
                        </div>
                        <CardTitle className="text-3xl font-bold text-[#0D3B3F] leading-tight">
                          {step.title}
                        </CardTitle>
                      </div>
                    </CardHeader>

                    <CardContent className="p-0">
                      <p className="text-xl text-slate-600 leading-relaxed font-medium pl-0">
                        {step.description}
                      </p>
                    </CardContent>
                  </div>
                </Card>
              </li>
            ))}
          </ol>

          {/* Right Column: Image */}
          <div className="relative h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/images/step2-family-moment.png"
              alt="Mujer madura dinámica y alegre disfrutando de su estancia"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D3B3F]/40 to-transparent mix-blend-multiply" />
          </div>
        </div>
      </div>
    </section>
  );
}
