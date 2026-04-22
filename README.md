<div align="center">

# open-design

> *[open-codesign](https://github.com/OpenCoworkAI/open-codesign), as a Claude Code skill.*

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Claude Code](https://img.shields.io/badge/Claude%20Code-Skill-blueviolet)](https://claude.ai/code)
[![AgentSkills](https://img.shields.io/badge/AgentSkills-Standard-green)](https://agentskills.io)
[![Derived from](https://img.shields.io/badge/derived%20from-open--codesign-ff6a33)](https://github.com/OpenCoworkAI/open-codesign)

<br>

**[open-codesign](https://github.com/OpenCoworkAI/open-codesign) is a new design product: you give it a prompt, it gives you a real-looking HTML design.** The upstream ships as an Electron desktop app. This repo is the same product, rebuilt as a Claude Code skill.

Same prompts. Same output quality. No desktop app to install. You use it from any Claude Code session, and `design.html` lands in your current folder.

> [!IMPORTANT]
> **Everything open-codesign can design, this skill can design.** The prompt layer is 100% the same: same 16-section system prompt, same 12 JSX golden-reference examples, same 4 built-in sub-skills, same anti-slop rules, same craft directives. What the Electron app adds is the desktop UX (preview pane, click-to-edit, sliders, PDF export). The design engine is identical.

<br>

You type:
`design a SaaS landing page for a scheduling tool called DevSync`

Claude writes `design.html` to your current folder.

You open it. It looks like a real design, not another template.

**That is open-design.**

[Install](#install) · [Use](#use) · [Gallery](#gallery) · [vs. open-codesign](#vs-open-codesign) · [Missing](#missing)

</div>

---

### Credit

All the prompts come from [open-codesign](https://github.com/OpenCoworkAI/open-codesign) (MIT) by OpenCoworkAI Contributors.

They wrote 16 sections of system prompt, 12 JSX examples, and 4 small sub-skills. Every taste call is theirs.

I did three things:

- Pulled the prompts out of their Electron app.
- Removed the parts that only work inside a desktop window.
- Wrote a short guide so Claude can turn their JSX examples into HTML.

Nothing else.

---

## Install

```bash
git clone https://github.com/Sma1lboy/open-design.git ~/.claude/skills/open-design
```

You can also clone anywhere and run `./install.sh`. That script makes the symlink for you. It also checks for a stale symlink.

> [!NOTE]
> Restart Claude Code after install. Claude Code loads new skills when a session starts.

---

## Use

Open Claude Code in any folder. Say what you want:

```
design a SaaS landing page for a scheduling tool called DevSync
```

```
design an analytics dashboard for an e-commerce site — revenue, top products, cohort retention
```

```
mock up an iOS app screen for tracking daily water
```

Claude writes `design.html` in the current folder. Then open it:

```bash
open design.html        # macOS
xdg-open design.html    # Linux
start design.html       # Windows
```

### Change it

Ask for a change. The same file gets rewritten:

```
darken the hero. add a before/after section under the fold.
drop the third pricing tier. make the middle one the featured one.
```

The `.html` file is the only source of truth. There are no patches, no diffs, and no extra files.

> [!TIP]
> Keep the file under git. Each change is then a normal git diff, and you can roll back at any time.

### Use real code or images as reference

You can feed the skill real context. Claude Code is already the import pipeline:

- Paste a JSON config, schema, or code snippet. The design will use the real fields.
- Type `@path/to/file.ts` to pull a file in.
- `cd` into a repo before you start. The skill can read the code.
- Drag a screenshot into the terminal. The design will match the visual reference.

```
design a settings page for this config: @src/config/schema.ts
```

```
redesign this screen. match the brand but fix the density.
[drag screenshot]
```

### What triggers the skill

Triggers that fire:

- `design a landing page for …`
- `design a dashboard for …`
- `mock up a mobile screen for …`
- `build a slide deck about …`
- `设计一个 落地页 / 仪表盘 / 案例 / 定价页`

Triggers that do **not** fire:

- `design a database schema`
- `design an API`
- `design the architecture`

All three are a different kind of design.

---

## Gallery

The `smoke/` folder has five real outputs from this skill. You can open each HTML file in a browser.

| File | Prompt |
|------|--------|
| [`smoke/autonomous-landing.html`](smoke/autonomous-landing.html) | Landing page for [autonomous](https://github.com/Sma1lboy/autonomous). Warm dark theme, serif headlines. |
| [`smoke/codefox-redesign.html`](smoke/codefox-redesign.html) | A new look for [codefox](https://github.com/CodeFox-Repo/codefox). The user asked to move away from the current style. |
| [`smoke/devsync-landing.html`](smoke/devsync-landing.html) | A developer scheduling tool. No style was given. |
| [`smoke/ecom-dashboard.html`](smoke/ecom-dashboard.html) | A dense e-commerce dashboard. Chart.js plus a cohort heatmap. |
| [`smoke/water-mobile.html`](smoke/water-mobile.html) | Three iOS screens in device frames. |

To view them:

```bash
cd smoke
python3 -m http.server 8787
# open http://localhost:8787/
```

---

## What the output is not

This skill writes a design mockup. It does not write a real app. So:

- One `.html` file. No `style.css`, no `app.js`, no build step.
- Inline SVG, CSS gradients, or data URIs only. No hotlinked images.
- Up to 1000 lines. Past that, the design is simplified.
- Buttons log to the console. Forms do not submit. No backend is called.
- Inspired by a brand is fine. A pixel copy of one is not.

---

## vs. open-codesign

open-codesign is a desktop app built with Electron. open-design is a Claude Code skill. The prompt layer is the same. The wrapping is different.

| | open-codesign (Electron) | open-design (here) |
|---|:---:|:---:|
| 16-section system prompt | ✅ | ✅ |
| 12 JSX golden-reference examples | ✅ | ✅ (kept as `.jsx`, turned into HTML at output) |
| 4 built-in sub-skills (pitch-deck / data-viz / mobile-mock / anti-slop) | ✅ | ✅ |
| Single-file HTML output | ✅ (inside an iframe) | ✅ (written to disk) |
| Save many designs | ⚠️ one at a time | ✅ `design-1.html`, `design-2.html`, … |
| Import real code as reference | ✅ (GitHub connector) | ✅ (`@file`, `cd` into repo, paste any text) |
| Import screenshots as reference | ✅ | ✅ (drag into Claude Code) |
| Live preview window | ✅ | ❌ — you run `open design.html` |
| Click an element and rewrite that part | ✅ | ⚠️ — describe the change in words |
| Sliders for color or spacing | ✅ | ❌ — every change is a full rewrite |
| Export to PDF or PPTX | ✅ | ❌ — use `wkhtmltopdf` or print to PDF |
| Design history | ✅ (SQLite) | ⚠️ — use git |
| Switch between Claude / GPT / Gemini / Ollama | ✅ | Uses the model Claude Code is set to |
| Install size | ~200 MB Electron app | One symlink plus ~7200 lines of text |

### Which to pick

- **Use open-codesign** if you want the desktop app, a live preview, sliders, and the export tools.
- **Use this skill** if Claude Code is your main tool, the design file should live in your repo, or you want to mix this with other Claude Code skills.

The output quality is the same because the prompt is the same. Pick the wrapper you want.

---

## Missing

Features that open-codesign has and this skill does not:

- Live preview (a file watcher plus a local web server)
- Click-to-edit (pick an element, ask to change only that part)
- Sliders for color, spacing, and type size
- Export to PDF or PPTX
- A gallery index page built for you

I will port these later if people use the CLI version.

---

## Help

**The skill did not trigger.**
Run `ls -la ~/.claude/skills/open-design`. It should point to your clone. Restart Claude Code. Try an exact trigger: `design a landing page for X`.

**The wrong file type came out.**
The skill only writes `.html`. A different file type means the skill did not fire. See the point above.

**I see a Tailwind CDN warning in the browser console.**
This is expected. The skill uses the Tailwind play CDN. The CDN prints one warning line. It is safe for a mockup.

**The charts are blank.**
The cdnjs package names are case-sensitive. View the page source. Check that the link ends in `Chart.js/` or `recharts/` with the exact case.

---

## Contribute

Bugs and ideas go in [GitHub Issues](https://github.com/Sma1lboy/open-design/issues). Pull requests are welcome.

If you want to port a feature from open-codesign, please open an issue first so we can agree on the scope.

---

## What is in this repo

```
open-design-skill/
├── open-design/                 # the skill itself
│   ├── SKILL.md                 # always loaded: identity, workflow, rules
│   └── references/              # loaded only when needed
│       ├── artifact-types.md    # 8 design types with density rules
│       ├── craft-directives.md  # full playbook
│       ├── anti-slop.md
│       ├── chart-rendering.md
│       ├── ios-starter.md
│       ├── marketing-fonts.md
│       ├── patterns/*.jsx       # 12 golden references plus a JSX→HTML adapter guide
│       └── builtin/*.md         # 4 built-in sub-skills
├── smoke/                       # example outputs
├── install.sh                   # makes the symlink
├── Makefile                     # make install, make upstream-check
├── .upstream-sha                # pinned open-codesign commit, for drift tracking
└── plan.md                      # notes from /autoplan review
```

There are about 7200 lines of text across 25 files.

Each design only loads about 1000 lines (SKILL.md plus one pattern plus one or two references). That keeps the context small. In skill-spec terms this is progressive disclosure: only load what this design needs.

---

## License

MIT — see [LICENSE](./LICENSE).

The prompt layer is derived from [open-codesign](https://github.com/OpenCoworkAI/open-codesign) (MIT), © OpenCoworkAI Contributors. See [NOTICE](./NOTICE) for attribution.

<div align="center">

<br>

MIT © [sma1lboy](https://github.com/sma1lboy)

</div>
