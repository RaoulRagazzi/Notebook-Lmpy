"use client";

import { useRouter } from "next/navigation";
import {
  WizardProvider,
  useWizard,
  type WizardData,
} from "@/components/wizard/WizardContext";
import WizardFlow from "@/components/wizard/WizardFlow";
import { saveLabelEdit } from "./actions";

export default function ModificaEtichettaFlow({
  slug,
  initialData,
}: {
  slug: string;
  initialData: WizardData;
}) {
  return (
    <WizardProvider initialData={initialData}>
      <EditFlow slug={slug} />
    </WizardProvider>
  );
}

function EditFlow({ slug }: { slug: string }) {
  const router = useRouter();
  const { data } = useWizard();

  async function handleFinish() {
    await saveLabelEdit(slug, data);
    router.push("/etichette");
    router.refresh();
  }

  return (
    <WizardFlow
      title="Modifica etichetta elettronica"
      finishLabel="Salva modifiche"
      onFinish={handleFinish}
    />
  );
}
