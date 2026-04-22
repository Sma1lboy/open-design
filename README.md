# open-design

A Claude Code skill that turns a one-line prompt into a single self-contained `.html` design artifact — landing pages, dashboards, mobile app screens, case studies, slide decks — at a senior product designer's craft bar.

```
你: 设计一个 SaaS 落地页
Claude: wrote `design.html` — a bold dark-neutral landing page for a dev-tools startup.
```

Opens in any browser. No build step. No external assets. One file.

## Install

```bash
git clone https://github.com/sma1lboy/open-design.git
cd open-design
ln -s "$(pwd)/open-design" ~/.claude/skills/open-design
```

That's it. Restart any open Claude Code session so the skill gets picked up.

> Convenience: `./install.sh` does the same thing with stale-symlink detection.

## First prompt

In any directory, from Claude Code:

```
design a SaaS landing page for a dev-tools startup called Pretzel
```

Claude writes `design.html` to your current working directory. Open it:

```bash
open design.html   # macOS
xdg-open design.html   # Linux
start design.html   # Windows
```

You should see a full landing page — hero, feature sections, pricing, CTA — with real copy (not lorem), a considered color palette, and working hover/press states.

## Trigger phrases

The skill auto-fires when your prompt sounds like a visual design request. It does NOT fire on "design a database schema" or "design an API."

**English**
- `design a landing page / dashboard / screen / UI / mockup for …`
- `mock up a [page/screen] for …`
- `build a landing page / pricing page / case study`
- `create a dashboard UI for …`
- `prototype a mobile screen for …`

**中文**
- `设计一个 落地页 / 仪表盘 / 案例 / 定价页 / UI`
- `帮我设计一个 [页面/屏幕/界面]`
- `做一个 落地页 / 仪表盘 / 案例`
- `一键设计 …`

## Iteration

Ask for a tweak in natural language. Same file gets rewritten in place:

```
你: 让 hero 再暗一点，加一个 before/after 对比模块
Claude: updated `design.html` — hero deepened to near-black with a warm tilt, added a side-by-side before/after section under the fold.
```

The `.html` is the canonical state. No patch files, no diffs — the whole artifact regenerates coherently.

## What it won't do

- **Hotlinked images.** All imagery is inline SVG, CSS gradients, or `data:` URIs.
- **Multi-file output.** One `.html`, one document. No `style.css`, no `app.js`.
- **Real application logic.** This is a design mockup, not a working backend. Forms don't submit; buttons log to console.
- **1000+ line HTML.** Hard cap — if the design is bigger, it simplifies.
- **Photo-realistic UI of a specific brand.** Inspiration ok, reproduction not.

## Troubleshooting

**"Skill didn't fire."**
Check `ls -la ~/.claude/skills/open-design` — should point to your clone. Restart the Claude Code session. Try an explicit trigger: `design a landing page for X`.

**"Wrong file type came out."**
The skill only writes `.html`. If you got something else, the skill didn't fire — see above.

**"Console warning about Tailwind CDN."**
Expected. The artifact uses Tailwind's play CDN which prints a one-line warning in the browser console. It's harmless for a design mockup.

**"Charts not rendering."**
cdnjs library slugs are case-sensitive. If a chart shows blank, view-source and check you see `Chart.js/` or `recharts/` with the exact case.

## How the skill works

- `open-design/SKILL.md` — always-in-context base (identity, workflow, output contract, anti-slop rules, pre-flight, routing rules).
- `open-design/references/` — craft guidance and golden references, all on-demand:
  - **Core** — `artifact-types.md` (8 types + density floors), `craft-directives.md` (the full playbook), `anti-slop.md`, `chart-rendering.md`, `ios-starter.md`, `marketing-fonts.md`
  - **`patterns/`** — 12 JSX golden-reference components lifted from upstream `open-codesign`, one per artifact family: landing-page, heroes, pricing, dashboard, data-table, chat-ui, calendar, footers, editorial-typography, glassmorphism, slide-deck, chart-svg. Claude reads the one matching your brief and adapts its structure / tone / tokens to HTML. A `patterns/README.md` teaches the JSX→HTML translation.
  - **`builtin/`** — 4 upstream builtin skills: `frontend-design-anti-slop.md`, `pitch-deck.md`, `data-viz-recharts.md`, `mobile-mock.md`. Domain-specific craft rules for slide decks, dashboards with Recharts, and mobile mockups.

Total corpus ~7200 lines across 25 files. Per-design load is typically ~1000 lines (SKILL + 1 pattern + 1-2 references), so context stays light.

This is progressive disclosure in the Anthropic skill spec sense — the base prompt stays tight, the craft detail (and golden references) loads only when relevant.

## vs. upstream open-codesign (Electron app)

This skill ports the **prompt layer** of [open-codesign](https://github.com/OpenCoworkAI/open-codesign) to Claude Code. The Electron app has several UX features that don't translate to a CLI agent. Full matrix:

| Capability | upstream open-codesign (Electron) | this skill (Claude Code) |
|---|:---:|:---:|
| **Prompt layer** (identical source) | | |
| System-prompt methodology (16 sections) | ✅ | ✅ |
| 12 JSX golden-reference patterns | ✅ | ✅ (as `references/patterns/*.jsx`, adapted to HTML on output) |
| 4 builtin skills (pitch-deck, data-viz-recharts, mobile-mock, frontend-design-anti-slop) | ✅ | ✅ (as `references/builtin/*.md`) |
| Anti-slop / craft-directives / artifact-types | ✅ | ✅ |
| **Output** | | |
| Single-file HTML artifact | ✅ (inside `<artifact>` tag in iframe) | ✅ (written to disk as `.html`) |
| Multiple artifacts per session | ⚠️ One at a time | ✅ `design-1.html`, `design-2.html`, … |
| PDF export | ✅ Built-in exporter | ❌ Use any HTML→PDF tool yourself (`wkhtmltopdf`, Chrome print) |
| PPTX export | ✅ Built-in exporter | ❌ Not applicable to CLI skill |
| ZIP bundle / Markdown export | ✅ | ❌ |
| **Interaction** | | |
| Live iframe preview pane | ✅ | ❌ You `open design.html` in your browser |
| Comment Mode — click element, rewrite region | ✅ Pin-and-rewrite | ⚠️ Describe in text ("darken the hero, tighten the pricing cards") |
| AI-tuned sliders — tweak color/spacing without prompting | ✅ EDITMODE / TWEAKS protocol | ❌ Every tweak = full regeneration |
| Live agent panel (streaming tool calls, interruptible) | ✅ | ✅ (regular Claude Code UI) |
| **Storage & workflow** | | |
| Local SQLite design history | ✅ | ⚠️ Use git — version the `.html` |
| "Your Designs" gallery | ✅ | ❌ Your filesystem |
| Multi-model BYOK (Claude / GPT / Gemini / Ollama) | ✅ via pi-ai | ⚠️ Whatever model Claude Code is configured to use |
| **Environment** | | |
| Runs offline / local-first | ✅ Electron app | ⚠️ Requires Claude Code (which calls Anthropic) |
| Works inside your project directory | ❌ Opens designs in app window | ✅ `design.html` lands in CWD; chain with any shell tool |
| Compose with other Claude Code skills / MCP servers | ❌ | ✅ |
| Install footprint | ~200MB Electron app | 1 symlink, ~7200 lines of prompt text |

### When to choose which

- **Choose upstream Electron app** if you want a polished GUI with preview + sliders + export pipeline, and you design more than you code.
- **Choose this skill** if Claude Code is already your daily driver, you want the design to live next to your codebase under git, or you want to compose design generation with other CLI/agent workflows.

They're complementary, not rivals. The craft ceiling is the same because the prompt layer is the same.

## Credit

Derived from [open-codesign](https://github.com/OpenCoworkAI/open-codesign) (MIT) by OpenCoworkAI Contributors. This project adapts the system prompt layer for Claude Code; the Electron desktop app, sandbox renderer, and tweak protocol live upstream.

## License

MIT — see [LICENSE](./LICENSE).
