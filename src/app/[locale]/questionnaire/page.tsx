import { QuestionnaireWizard } from "@/components/lifestyle/questionnaire-wizard";

export default function QuestionnairePage() {
  return (
    <main className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center p-4 pt-28 md:pt-32">
      <div className="text-center mb-8 max-w-lg mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-3">
          Diseña tu Estancia Ideal
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Cuéntanos tus preferencias y nuestro algoritmo seleccionará las
          mejores opciones Silver para ti.
        </p>
      </div>

      <QuestionnaireWizard />
    </main>
  );
}
