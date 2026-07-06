import { getDict } from "@/lib/i18n";
import { getLang } from "@/lib/lang";
import RegistratiForm from "./RegistratiForm";

export default async function RegistratiPage() {
  const lang = await getLang();
  return <RegistratiForm t={getDict(lang).auth} />;
}
