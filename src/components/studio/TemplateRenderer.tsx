import { forwardRef } from "react";
import { formatDimensions, type TemplateFormat } from "./templates";
import type { WineStoryData } from "@/lib/wineStory";

export type WineInfo = {
  nome: string;
  azienda: string;
  paese: string;
};

type Props = {
  templateId: string;
  formato: TemplateFormat;
  wine: WineInfo;
  story: WineStoryData;
};

function Img({ src, alt, className }: { src: string; alt: string; className?: string }) {
  if (!src) return null;
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} className={className} />;
}

const TemplateRenderer = forwardRef<HTMLDivElement, Props>(function TemplateRenderer(
  { templateId, formato, wine, story },
  ref
) {
  const { width, height } = formatDimensions[formato];

  return (
    <div
      ref={ref}
      style={{ width, height }}
      className="overflow-hidden bg-white text-sand-900 shadow-sm"
    >
      {renderTemplate(templateId, wine, story)}
    </div>
  );
});

export default TemplateRenderer;

function renderTemplate(id: string, wine: WineInfo, story: WineStoryData) {
  switch (id) {
    case "tecnica":
      return <Tecnica wine={wine} story={story} />;
    case "emozionale":
      return <Emozionale wine={wine} story={story} />;
    case "catalogo":
      return <Catalogo wine={wine} story={story} />;
    case "story":
      return <Story wine={wine} story={story} />;
    case "post":
      return <Post wine={wine} story={story} />;
    case "newsletter":
      return <Newsletter wine={wine} story={story} />;
    case "premium":
      return <Premium wine={wine} story={story} />;
    case "essenziale":
      return <Essenziale wine={wine} story={story} />;
    case "territorio":
      return <Territorio wine={wine} story={story} />;
    case "degustazione":
      return <Degustazione wine={wine} story={story} />;
    default:
      return null;
  }
}

function Tecnica({ wine, story }: { wine: WineInfo; story: WineStoryData }) {
  return (
    <div className="flex h-full flex-col p-10">
      <p className="text-xs font-medium uppercase tracking-widest text-wine-500">
        Technical Sheet
      </p>
      <h1 className="mt-2 text-2xl font-semibold text-sand-900">{wine.nome}</h1>
      <p className="text-sm text-sand-600">
        {story.denominazione} {story.annata && `· ${story.annata}`}
      </p>

      <div className="mt-6 grid grid-cols-2 gap-4 border-t border-sand-200 pt-6 text-sm">
        <Row label="Vitigno" value={story.vitigno} />
        <Row label="Zona di produzione" value={story.zonaProduzione} />
        <Row label="Vinificazione" value={story.vinificazione} />
        <Row label="Affinamento" value={story.affinamento} />
        <Row label="Temperatura di servizio" value={story.temperaturaServizio} />
        <Row label="Certificazioni" value={story.certificazioni} />
      </div>

      <div className="mt-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-sand-500">
          Note di degustazione
        </p>
        <p className="mt-1 text-sm text-sand-700">{story.noteDegustazione}</p>
      </div>

      <div className="mt-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-sand-500">
          Abbinamenti
        </p>
        <p className="mt-1 text-sm text-sand-700">{story.abbinamenti}</p>
      </div>

      <div className="mt-auto flex items-center justify-between border-t border-sand-200 pt-4 text-xs text-sand-500">
        <span>{wine.azienda}</span>
        <span>{wine.paese}</span>
      </div>
    </div>
  );
}

function Emozionale({ wine, story }: { wine: WineInfo; story: WineStoryData }) {
  return (
    <div className="flex h-full flex-col bg-sand-50 p-10">
      {story.immagineBottiglia && (
        <Img
          src={story.immagineBottiglia}
          alt={wine.nome}
          className="mx-auto h-40 w-auto object-contain"
        />
      )}
      <h1 className="mt-6 text-center text-3xl font-semibold text-sand-900">
        {wine.nome}
      </h1>
      <p className="mt-1 text-center text-sm uppercase tracking-wide text-wine-500">
        {story.denominazione}
      </p>

      <p className="mt-6 text-center text-sm leading-relaxed text-sand-700">
        {story.storiaVino}
      </p>

      <p className="mt-6 text-center text-sm italic leading-relaxed text-sand-600">
        {story.noteDegustazione}
      </p>

      <div className="mt-auto text-center text-xs text-sand-500">
        {wine.azienda} — {story.zonaProduzione}
      </div>
    </div>
  );
}

function Catalogo({ wine, story }: { wine: WineInfo; story: WineStoryData }) {
  return (
    <div className="flex h-full flex-col p-10 font-serif">
      <div className="flex-1">
        <p className="text-xs uppercase tracking-[0.2em] text-sand-500">
          {story.zonaProduzione}
        </p>
        <h1 className="mt-3 text-3xl text-sand-900">{wine.nome}</h1>
        <p className="mt-1 text-sm text-sand-600">
          {story.denominazione} {story.annata && `· ${story.annata}`}
        </p>
        <div className="mt-8 h-px w-16 bg-sand-300" />
        <p className="mt-8 text-sm leading-relaxed text-sand-700">
          {story.testoSitoLungo || story.storiaVino}
        </p>
      </div>
      <div className="flex items-center justify-between border-t border-sand-200 pt-4 text-xs text-sand-500">
        <span>{wine.azienda}</span>
        <span>{story.vitigno}</span>
      </div>
    </div>
  );
}

function Story({ wine, story }: { wine: WineInfo; story: WineStoryData }) {
  return (
    <div className="relative flex h-full flex-col justify-end bg-sand-900 p-8 text-sand-50">
      {story.immagineVigneto && (
        <Img
          src={story.immagineVigneto}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-50"
        />
      )}
      <div className="relative z-10">
        <p className="text-xs font-medium uppercase tracking-widest text-sand-200">
          {story.denominazione}
        </p>
        <h1 className="mt-2 text-3xl font-semibold">{wine.nome}</h1>
        <p className="mt-3 text-sm leading-relaxed">{story.testoSocialBreve}</p>
        <p className="mt-6 text-xs uppercase tracking-wide text-sand-300">
          {wine.azienda}
        </p>
      </div>
    </div>
  );
}

function Post({ wine, story }: { wine: WineInfo; story: WineStoryData }) {
  return (
    <div className="flex h-full flex-col items-center justify-center bg-sand-100 p-10 text-center">
      {story.immagineBottiglia && (
        <Img
          src={story.immagineBottiglia}
          alt={wine.nome}
          className="h-48 w-auto object-contain"
        />
      )}
      <h1 className="mt-6 text-2xl font-semibold text-sand-900">{wine.nome}</h1>
      <p className="mt-1 text-sm uppercase tracking-wide text-wine-500">
        {story.denominazione}
      </p>
      <p className="mt-4 text-sm leading-relaxed text-sand-700">
        {story.testoSocialBreve}
      </p>
      <p className="mt-6 text-xs text-sand-500">{wine.azienda}</p>
    </div>
  );
}

function Newsletter({ wine, story }: { wine: WineInfo; story: WineStoryData }) {
  return (
    <div className="flex h-full">
      <div className="flex w-1/3 items-center justify-center bg-sand-100">
        {story.immagineBottiglia && (
          <Img
            src={story.immagineBottiglia}
            alt={wine.nome}
            className="h-3/4 w-auto object-contain"
          />
        )}
      </div>
      <div className="flex w-2/3 flex-col justify-center p-8">
        <p className="text-xs uppercase tracking-wide text-wine-500">
          {story.denominazione}
        </p>
        <h1 className="mt-1 text-2xl font-semibold text-sand-900">{wine.nome}</h1>
        <p className="mt-3 text-sm leading-relaxed text-sand-700">
          {story.testoSocialBreve || story.storiaVino}
        </p>
        <p className="mt-4 text-xs text-sand-500">{wine.azienda}</p>
      </div>
    </div>
  );
}

function Premium({ wine, story }: { wine: WineInfo; story: WineStoryData }) {
  return (
    <div className="flex h-full flex-col bg-sand-900 p-10 text-sand-50">
      <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold-500">
        {story.denominazione}
      </p>
      <h1 className="mt-3 text-3xl font-semibold">{wine.nome}</h1>
      <div className="mt-2 h-px w-20 bg-gold-500" />

      <p className="mt-8 text-sm leading-relaxed text-sand-200">
        {story.storiaVino}
      </p>

      {story.premi.length > 0 && (
        <div className="mt-8">
          <p className="text-xs uppercase tracking-wide text-gold-500">
            Riconoscimenti
          </p>
          <ul className="mt-2 space-y-1 text-sm text-sand-100">
            {story.premi.map((p, i) => (
              <li key={i}>★ {p}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-auto text-xs uppercase tracking-wide text-sand-300">
        {wine.azienda}
      </div>
    </div>
  );
}

function Essenziale({ wine, story }: { wine: WineInfo; story: WineStoryData }) {
  return (
    <div className="flex h-full flex-col items-center justify-center p-10 text-center">
      <h1 className="text-3xl font-light tracking-wide text-sand-900">
        {wine.nome}
      </h1>
      <p className="mt-2 text-xs uppercase tracking-[0.3em] text-sand-500">
        {story.denominazione} {story.annata}
      </p>
      <div className="mt-8 h-px w-10 bg-sand-300" />
      <p className="mt-8 max-w-xs text-sm text-sand-600">
        {story.noteDegustazione}
      </p>
      <p className="mt-10 text-xs text-sand-400">{wine.azienda}</p>
    </div>
  );
}

function Territorio({ wine, story }: { wine: WineInfo; story: WineStoryData }) {
  return (
    <div className="flex h-full flex-col">
      <div className="relative h-1/2 bg-olive-100">
        {story.immagineVigneto && (
          <Img
            src={story.immagineVigneto}
            alt=""
            className="h-full w-full object-cover"
          />
        )}
      </div>
      <div className="flex-1 p-8">
        <p className="text-xs uppercase tracking-wide text-olive-700">
          {story.zonaProduzione}
        </p>
        <h1 className="mt-1 text-2xl font-semibold text-sand-900">
          {wine.nome}
        </h1>
        <p className="mt-1 text-sm text-sand-600">{story.denominazione}</p>
        <p className="mt-4 text-sm leading-relaxed text-sand-700">
          {story.vigneto}
        </p>
        <p className="mt-4 text-xs text-sand-500">{wine.azienda}</p>
      </div>
    </div>
  );
}

function Degustazione({ wine, story }: { wine: WineInfo; story: WineStoryData }) {
  return (
    <div className="flex h-full flex-col p-10">
      <h1 className="text-2xl font-semibold text-sand-900">{wine.nome}</h1>
      <p className="text-sm text-sand-600">{story.denominazione}</p>

      <div className="mt-6 space-y-5">
        <Row label="Profumi e gusto" value={story.noteDegustazione} block />
        <Row label="Temperatura di servizio" value={story.temperaturaServizio} />
        <Row label="Abbinamenti" value={story.abbinamenti} block />
      </div>

      <div className="mt-auto text-xs text-sand-500">{wine.azienda}</div>
    </div>
  );
}

function Row({
  label,
  value,
  block,
}: {
  label: string;
  value: string;
  block?: boolean;
}) {
  return (
    <div className={block ? "" : undefined}>
      <p className="text-xs font-semibold uppercase tracking-wide text-sand-500">
        {label}
      </p>
      <p className="mt-1 text-sm text-sand-700">{value}</p>
    </div>
  );
}
