from __future__ import annotations

import json


def build_interim(speaker_id: str, speaker: str, original: str) -> bytes:
    return json.dumps(
        {"type": "interim", "speakerId": speaker_id, "speaker": speaker, "original": original},
        ensure_ascii=False,
    ).encode("utf-8")


def build_final(
    *,
    id: str,
    speaker_id: str,
    speaker: str,
    src_lang: str,
    original: str,
    tgt_lang: str,
    translation: str,
    ts: int,
) -> bytes:
    return json.dumps(
        {
            "type": "final",
            "id": id,
            "speakerId": speaker_id,
            "speaker": speaker,
            "srcLang": src_lang,
            "original": original,
            "tgtLang": tgt_lang,
            "translation": translation,
            "ts": ts,
        },
        ensure_ascii=False,
    ).encode("utf-8")
