import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { getWineStory } from "@/lib/wineStory";
import StoryForm from "./StoryForm";

export default async function WineStoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const session = await auth();
  const result = await getWineStory(session!.user.id, slug);

  if (!result) notFound();

  return (
    <StoryForm
      slug={slug}
      nomeVino={result.label.nome}
      initialData={result.story}
    />
  );
}
