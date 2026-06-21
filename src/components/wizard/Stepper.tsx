type Step = {
  label: string;
  sublabel?: string;
  state: "done" | "current" | "upcoming";
};

const steps: Step[] = [
  { label: "Generale*", state: "current" },
  { label: "Informazioni aggiuntive facoltative", state: "upcoming" },
  { label: "Informazioni nutrizionali*", state: "upcoming" },
  { label: "Ingredienti del vino*", state: "upcoming" },
  { label: "Riciclaggio", sublabel: "Obbligatorio (Italia)", state: "upcoming" },
];

export default function Stepper() {
  return (
    <ol className="flex items-start gap-10 overflow-x-auto pb-2">
      {steps.map((step, i) => (
        <li key={step.label} className="flex shrink-0 items-center gap-3">
          <span
            className={[
              "flex h-7 w-7 items-center justify-center rounded-full text-sm font-medium",
              step.state === "done"
                ? "bg-olive-500 text-sand-50"
                : step.state === "current"
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
                step.state === "current" ? "font-semibold text-sand-900" : "text-sand-700",
              ].join(" ")}
            >
              {step.label}
            </p>
            {step.sublabel && (
              <p className="text-xs text-sand-500">{step.sublabel}</p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
