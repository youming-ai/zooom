export type Lang = "zh" | "ja";

export interface InterimCaption {
  type: "interim";
  speakerId: string;
  speaker: string;
  original: string;
}

export interface FinalCaption {
  type: "final";
  id: string;
  speakerId: string;
  speaker: string;
  srcLang: Lang;
  original: string;
  tgtLang: Lang;
  translation: string;
  ts: number;
}

export type Caption = InterimCaption | FinalCaption;

const decoder = new TextDecoder();

function isLang(v: unknown): v is Lang {
  return v === "zh" || v === "ja";
}

export function parseCaption(bytes: Uint8Array): Caption | null {
  let obj: unknown;
  try {
    obj = JSON.parse(decoder.decode(bytes));
  } catch {
    return null;
  }
  if (typeof obj !== "object" || obj === null) return null;
  const o = obj as Record<string, unknown>;

  if (o.type === "interim") {
    if (
      typeof o.speakerId === "string" &&
      typeof o.speaker === "string" &&
      typeof o.original === "string"
    ) {
      return { type: "interim", speakerId: o.speakerId, speaker: o.speaker, original: o.original };
    }
    return null;
  }

  if (o.type === "final") {
    if (
      typeof o.id === "string" &&
      typeof o.speakerId === "string" &&
      typeof o.speaker === "string" &&
      isLang(o.srcLang) &&
      typeof o.original === "string" &&
      isLang(o.tgtLang) &&
      typeof o.translation === "string" &&
      typeof o.ts === "number"
    ) {
      return {
        type: "final",
        id: o.id,
        speakerId: o.speakerId,
        speaker: o.speaker,
        srcLang: o.srcLang,
        original: o.original,
        tgtLang: o.tgtLang,
        translation: o.translation,
        ts: o.ts,
      };
    }
    return null;
  }

  return null;
}
