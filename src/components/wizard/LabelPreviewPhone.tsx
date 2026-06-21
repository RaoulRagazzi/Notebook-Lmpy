type LabelPreviewPhoneProps = {
  wineName?: string;
  ingredients?: string;
  company?: string;
  country?: string;
};

export default function LabelPreviewPhone({
  wineName,
  ingredients = "Uve, Conservanti e antiossidanti: Solfiti",
  company = "Fisar",
  country = "Italia",
}: LabelPreviewPhoneProps) {
  return (
    <div className="mx-auto w-[280px] rounded-[2.5rem] border-[6px] border-sand-900 bg-sand-50 p-5 shadow-xl">
      <div className="flex justify-end text-sand-400">
        <span className="text-xs">i</span>
      </div>
      <div className="mt-2 flex justify-end">
        <span className="rounded-full bg-sand-100 px-3 py-1 text-xs text-sand-700">
          🇮🇹 Italiano ▾
        </span>
      </div>

      {wineName && (
        <h3 className="mt-6 text-lg font-semibold text-sand-900">{wineName}</h3>
      )}

      <div className="mt-6">
        <h4 className="text-base font-semibold text-sand-900">Ingredienti</h4>
        <p className="mt-1 text-sm text-sand-700">{ingredients}</p>
      </div>

      <div className="mt-6">
        <h4 className="text-base font-semibold text-sand-900">
          Azienda responsabile dei contenuti
        </h4>
        <p className="mt-1 text-sm text-sand-700">{company}</p>
        <p className="text-sm text-sand-700">{country}</p>
      </div>
    </div>
  );
}
