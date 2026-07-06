import { getDict } from "@/lib/i18n";
import { getLang } from "@/lib/lang";
import AccediForm from "./AccediForm";

export default async function AccediPage() {
  const lang = await getLang();
  return <AccediForm t={getDict(lang).auth} />;
}
