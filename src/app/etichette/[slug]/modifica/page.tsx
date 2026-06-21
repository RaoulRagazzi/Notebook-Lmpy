import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { getOwnLabelBySlug } from "@/lib/labels";
import ModificaEtichettaFlow from "./ModificaEtichettaFlow";

export default async function ModificaEtichettaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const session = await auth();
  const label = await getOwnLabelBySlug(session!.user.id, slug);

  if (!label) notFound();

  return (
    <ModificaEtichettaFlow
      slug={slug}
      initialData={{
        nome: label.nome,
        alcol: label.alcol,
        acidita: label.acidita,
        zuccheroResiduo: label.zuccheroResiduo,
        glicerinaManuale: label.glicerinaManuale,
        ingredienti: label.ingredienti,
        riciclaggio: label.riciclaggio,
        azienda: label.azienda,
        paese: label.paese,
      }}
    />
  );
}
