from speakers import speaker_id, speaker_label


def test_speaker_id_uses_participant_identity():
    assert speaker_id("tang-abc") == "tang-abc"


def test_speaker_label_prefers_display_name():
    assert speaker_label("小明", "ming-abc") == "小明"


def test_speaker_label_falls_back_to_identity():
    assert speaker_label("", "ming-abc") == "ming-abc"
    assert speaker_label(None, "ming-abc") == "ming-abc"
