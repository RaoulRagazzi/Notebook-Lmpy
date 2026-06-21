"use client";

import { useRouter } from "next/navigation";
import { WizardProvider, useWizard } from "@/components/wizard/WizardContext";
import WizardFlow from "@/components/wizard/WizardFlow";
import { saveLabel } from "./actions";

export default function NuovaEtichettaPage() {
  return (
    <WizardProvider>
      <NuovaEtichettaFlow />
    </WizardProvider>
  );
}

function NuovaEtichettaFlow() {
  const router = useRouter();
  const { data } = useWizard();

  async function handleFinish() {
    const slug = await saveLabel(data);
    router.push(`/etichette/nuova/fatto?slug=${slug}`);
  }

  return (
    <WizardFlow
      title="Creare una nuova etichetta elettronica"
      finishLabel="Finitura 🚀"
      onFinish={handleFinish}
    />
  );
}
