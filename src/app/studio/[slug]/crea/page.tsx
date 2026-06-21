import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { getWineStory } from "@/lib/wineStory";
import CreaFlow from "./CreaFlow";

export default async function CreaMaterialePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const session = await auth();
  const result = await getWineStory(session!.user.id, slug);

  if (!result) notFound();

  const hasMinimumData = result.story.denominazione || result.story.storiaVino;
  if (!hasMinimumData) {
    redirect(`/studio/${slug}`);
  }

  return (
    <CreaFlow
      slug={slug}
      wine={{
        nome: result.label.nome,
        azienda: result.label.azienda,
        paese: result.label.paese,
      }}
      story={result.story}
    />
  );
}
