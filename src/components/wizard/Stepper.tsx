type StepDef = {
  label: string;
  sublabel?: string;
};

export const wizardSteps: StepDef[] = [
  { label: "Generale*" },
  { label: "Informazioni nutrizionali*" },
  { label: "Ingredienti del vino*" },
  { label: "Riciclaggio", sublabel: "Obbligatorio (Italia)" },
];

export default function Stepper({ current }: { current: number }) {
  return (
    <ol className="flex items-start gap-10 overflow-x-auto pb-2">
      {wizardSteps.map((step, i) => {
        const state =
          i < current ? "done" : i === current ? "current" : "upcoming";
        return (
          <li key={step.label} className="flex shrink-0 items-center gap-3">
            <span
              className={[
                "flex h-7 w-7 items-center justify-center rounded-full text-sm font-medium",
                state === "done"
                  ? "bg-olive-500 text-sand-50"
                  : state === "current"
                  ? "bg-wine-500 text-sand-50"
                  : "bg-sand-200 text-sand-700",
              ].join(" ")}
            >
              {i + 1}
            </span>
            <div className="leading-tight">
              <p
                className={[
                  "text-sm",
                  state === "current"
                    ? "font-semibold text-sand-900"
                    : "text-sand-700",
                ].join(" ")}
              >
                {step.label}
              </p>
              {step.sublabel && (
                <p className="text-xs text-sand-500">{step.sublabel}</p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
