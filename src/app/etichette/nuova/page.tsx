"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Stepper, { wizardSteps } from "@/components/wizard/Stepper";
import LabelPreviewPhone from "@/components/wizard/LabelPreviewPhone";
import { WizardProvider } from "@/components/wizard/WizardContext";
import StepGenerale from "@/components/wizard/steps/StepGenerale";
import StepNutrizionali from "@/components/wizard/steps/StepNutrizionali";
import StepIngredienti from "@/components/wizard/steps/StepIngredienti";
import StepRiciclaggio from "@/components/wizard/steps/StepRiciclaggio";

const stepComponents = [
  StepGenerale,
  StepNutrizionali,
  StepIngredienti,
  StepRiciclaggio,
];

export default function NuovaEtichettaPage() {
  return (
    <WizardProvider>
      <WizardFlow />
    </WizardProvider>
  );
}

function WizardFlow() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const isLast = step === wizardSteps.length - 1;
  const StepComponent = stepComponents[step];

  return (
    <div className="min-h-screen bg-sand-50 px-6 py-10 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-start justify-between">
          <h1 className="text-2xl font-semibold text-sand-900">
            Creare una nuova etichetta elettronica
          </h1>
          <Link
            href="/"
            aria-label="Chiudi"
            className="text-2xl leading-none text-sand-500 hover:text-sand-800"
          >
            ×
          </Link>
        </div>

        <div className="mt-8 border-b border-sand-200 pb-6">
          <Stepper current={step} />
        </div>

        <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_320px]">
          <div>
            <StepComponent />

            <div className="mt-12 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
                className="flex items-center gap-2 rounded-full border border-sand-300 px-5 py-2 text-sm font-medium text-sand-700 hover:bg-sand-100 disabled:opacity-40"
              >
                ← Indietro
              </button>
              <div className="flex items-center gap-3">
                {!isLast && (
                  <button
                    type="button"
                    onClick={() => setStep((s) => s + 1)}
                    className="rounded-full border border-sand-300 px-5 py-2 text-sm font-medium text-sand-700 hover:bg-sand-100"
                  >
                    Salto
                  </button>
                )}
                <button
                  type="button"
                  onClick={() =>
                    isLast
                      ? router.push("/etichette/nuova/fatto")
                      : setStep((s) => s + 1)
                  }
                  className="flex items-center gap-2 rounded-full bg-olive-500 px-6 py-2 text-sm font-medium text-sand-50 hover:bg-wine-600"
                >
                  {isLast ? "Finitura 🚀" : "Avanti →"}
                </button>
              </div>
            </div>
          </div>

          <div className="lg:pt-2">
            <LabelPreviewPhone />
          </div>
        </div>
      </div>
    </div>
  );
}
