# -*- coding: utf-8 -*-
"""Parse Word runs into markdown (**bold**, *italic*, <u>underline</u>)."""
from __future__ import annotations

import html
import re
import zipfile
from pathlib import Path

ROOT = Path(r"d:\pmlvietnam")


def bool_on(xml: str, tag: str) -> bool:
    if re.search(rf"<w:{tag}[^>]*w:val=\"(?:0|false|off|none)\"", xml, re.I):
        return False
    return bool(re.search(rf"<w:{tag}(?:[\s/>]|[^>]*/>)", xml))


def run_marks(r_xml: str, default: tuple[bool, bool, bool]) -> tuple[bool, bool, bool]:
    m = re.search(r"<w:rPr(?:\s[^>]*)?>.*?</w:rPr>", r_xml, re.S)
    if not m:
        return default
    rpr = m.group(0)
    b = bool_on(rpr, "b") if re.search(r"<w:b[\s/>]", rpr) else default[0]
    i = bool_on(rpr, "i") if re.search(r"<w:i[\s/>]", rpr) else default[1]
    u = bool_on(rpr, "u") if re.search(r"<w:u[\s/>]", rpr) else default[2]
    return b, i, u


def p_default_marks(p_xml: str) -> tuple[bool, bool, bool]:
    m = re.search(r"<w:pPr(?:\s[^>]*)?>.*?</w:pPr>", p_xml, re.S)
    if not m:
        return False, False, False
    rpr_m = re.search(r"<w:rPr(?:\s[^>]*)?>.*?</w:rPr>", m.group(0), re.S)
    if not rpr_m:
        return False, False, False
    rpr = rpr_m.group(0)
    return bool_on(rpr, "b"), bool_on(rpr, "i"), bool_on(rpr, "u")


def p_style(p_xml: str) -> str:
    m = re.search(r'<w:pStyle[^>]*w:val="([^"]+)"', p_xml)
    return m.group(1) if m else ""


def wrap_run(text: str, b: bool, i: bool, u: bool) -> str:
    piece = text
    if b and i:
        piece = f"***{piece}***"
    elif b:
        piece = f"**{piece}**"
    elif i:
        piece = f"*{piece}*"
    if u:
        piece = f"<u>{piece}</u>"
    return piece


def merge_runs(runs: list[tuple[str, bool, bool, bool]]) -> str:
    if not runs:
        return ""
    merged: list[tuple[str, bool, bool, bool]] = []
    for text, b, i, u in runs:
        if not text:
            continue
        if merged:
            pt, pb, pi, pu = merged[-1]
            if (b, i, u) == (pb, pi, pu) or not text.strip():
                merged[-1] = (pt + text, pb, pi, pu)
                continue
        merged.append((text, b, i, u))
    parts: list[str] = []
    for text, b, i, u in merged:
        if not text.strip():
            parts.append(text)
            continue
        lead = len(text) - len(text.lstrip())
        trail = len(text) - len(text.rstrip())
        core = text[lead : len(text) - trail if trail else len(text)]
        prefix = text[:lead]
        suffix = text[len(text) - trail :] if trail else ""
        parts.append(prefix + wrap_run(core, b, i, u) + suffix)
    return "".join(parts)


def strip_md(s: str) -> str:
    s = re.sub(r"</?u>", "", s)
    s = s.replace("***", "").replace("**", "")
    return s.replace("*", "")


def normalize(s: str) -> str:
    s = strip_md(s).replace("\u00a0", " ")
    return re.sub(r"\s+", " ", s).strip()


def iter_paragraphs(docx: Path) -> list[dict]:
    with zipfile.ZipFile(docx) as z:
        xml = z.read("word/document.xml").decode("utf-8")
        styles_xml = z.read("word/styles.xml").decode("utf-8") if "word/styles.xml" in z.namelist() else ""

    heading_styles: set[str] = set()
    for sm in re.finditer(
        r'<w:style\b[^>]*w:styleId="([^"]+)"[^>]*>.*?</w:style>',
        styles_xml,
        re.S,
    ):
        sid, body = sm.group(1), sm.group(0)
        if re.search(r'w:val="Heading[1-6]"', body, re.I) or sid.lower().startswith("heading"):
            heading_styles.add(sid)

    out: list[dict] = []
    for p_xml in re.findall(r"<w:p[ >].*?</w:p>", xml, re.S):
        default = p_default_marks(p_xml)
        style = p_style(p_xml)
        runs: list[tuple[str, bool, bool, bool]] = []
        for r in re.findall(r"<w:r[ >].*?</w:r>", p_xml, re.S):
            texts = re.findall(r"<w:t(?:\s[^>]*)?>(.*?)</w:t>", r)
            t = html.unescape("".join(texts))
            if t == "":
                continue
            runs.append((t, *run_marks(r, default)))
        plain = "".join(t for t, *_ in runs).strip()
        if not plain:
            continue
        md = merge_runs(runs).strip()
        content_runs = [(t, b, i, u) for t, b, i, u in runs if t.strip()]
        all_bold = bool(content_runs) and all(b for _, b, _, _ in content_runs)
        is_heading = style in heading_styles or style.lower().startswith("heading")
        out.append(
            {
                "plain": plain,
                "md": md,
                "all_bold": all_bold,
                "heading_style": is_heading,
                "style": style,
            }
        )
    return out


def rich_lookup(docx: Path) -> dict[str, str]:
    """plain-normalized → markdown. Skip heading-style / all-bold titles (CSS already bolds H2/H3)."""
    lookup: dict[str, str] = {}
    for p in iter_paragraphs(docx):
        key = normalize(p["plain"])
        if not key:
            continue
        if p["heading_style"] or (p["all_bold"] and len(p["plain"]) < 120):
            lookup[key] = p["plain"]
            continue
        lookup[key] = p["md"]
    return lookup


def apply_rich(text: str, lookup: dict[str, str]) -> str:
    return lookup.get(normalize(text), text)
