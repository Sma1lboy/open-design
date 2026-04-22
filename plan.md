<!-- /autoplan restore point: /Users/jacksonc/.gstack/projects/open-design-skill/main-autoplan-restore-20260422-010112.md -->
# plan: publish `open-design` as a Claude Code skill

## Goal

Publish a self-contained Claude Code skill that turns natural-language prompts into production-quality single-file HTML design artifacts — landing pages, dashboards, mobile app mocks, case studies, slides — at a senior product designer's craft bar. One-shot install; no build step; works in any Claude Code session.

Success looks like: `git clone … && ./install.sh` (or a single `ln -s`) and the skill fires automatically when the user says "设计一个落地页" / "design a dashboard". Output is a `.html` file in the user's CWD.

## Current state (what's already done)

- `open-design/SKILL.md` (229 lines) — Layer 1 always-on base: identity, workflow, output contract (no `<artifact>` tag — writes actual `.html`), design methodology, pre-flight, anti-slop digest, interactive-depth hard minimums, safety, progressive-reference routing rules.
- `open-design/references/` — 6 on-demand files totaling ~470 lines:
  - `artifact-types.md` (8 types + density floors + comparison patterns)
  - `craft-directives.md` (full craft playbook, 195 lines — the densest valuable content)
  - `anti-slop.md` (typography / color / layout / dark-theme / texture / content-quality rules)
  - `chart-rendering.md` (when brief mentions charts / 图表 / dashboard)
  - `ios-starter.md` (iPhone 14 Pro frame skeleton)
  - `marketing-fonts.md` (Fraunces/DM Sans pairing hint)
- Symlinked to `~/.claude/skills/open-design` for local testing. Not yet tested end-to-end.
- Source of adaptation: `ref/open-codesign/` (MIT, © 2026 OpenCoworkAI Contributors). Progressive-disclosure composer rewritten as "Claude reads sub-files on demand" rather than TS keyword routing. Electron-only pieces (EDITMODE/TWEAKS/artifact-tag wrapping/virtual-FS frames) removed.

## Remaining work (in scope)

1. **`README.md`** at repo root: what it does, one-liner install command, 2-3 example prompts with screenshots or rendered-HTML links, trigger phrases (zh + en), how the progressive references work, credit to open-codesign upstream.
2. **`LICENSE`** — MIT, attributing OpenCoworkAI Contributors + Jackson (derivative work). Keep upstream © line per MIT terms.
3. **`NOTICE`** — one-line attribution to `open-codesign` + link to upstream repo.
4. **`install.sh`** — idempotent one-liner that `ln -s $(pwd)/open-design ~/.claude/skills/open-design`, with a check for prior install and a `--force` / `--uninstall` flag. Alternative: document manual `ln -s` in README if script feels heavyweight.
5. **Smoke test**: in a fresh Claude Code session in some other directory, prompt "设计一个 SaaS 落地页" and "build a dashboard for a logistics company" — confirm (a) the skill auto-triggers, (b) it writes a single `.html` file, (c) the file is self-contained and opens in a browser, (d) craft quality hits the anti-slop bar on a spot check.
6. **GitHub publish**: push to a public repo under the user's account (`sma1lboy/open-design` or similar — name TBD). Add topics / description / link back to open-codesign.

## Explicitly out of scope (defer to TODOS.md or v0.2)

- Translated READMEs (zh-CN only for now, or en only — pick one).
- CI (no tests to run; the artifact IS the code, and the code IS the prompt).
- Changesets / semver tooling — tag `v0.1` manually.
- Dedicated docs site.
- The 4 upstream builtin skills (`pitch-deck`, `data-viz-recharts`, `mobile-mock`, `frontend-design-anti-slop`) — evaluate inclusion after v0.1 lands.
- Example gallery / demo videos.
- Claude Code plugin manifest (if / when plugin infra stabilizes).

## Premises (things autoplan should challenge)

- **P1**: A single `SKILL.md` + `references/` structure is the right packaging vs. splitting into multiple sub-skills per artifact type (landing-skill, dashboard-skill, etc.). The progressive-reference routing in SKILL.md is simple enough that one skill owns the whole surface.
- **P2**: Dropping `<artifact>` wrapping in favor of writing a real `.html` file is correct for Claude Code's tool-use model (user wants a file on disk, not a chat-rendered artifact).
- **P3**: 7 markdown files (~700 lines total) is inside Claude Code's skill budget and won't blow context. Progressive-disclosure via "Read when relevant" is strictly better than a monolithic 1100-line SKILL.md.
- **P4**: MIT derivative of MIT upstream is licensing-correct. No attribution to open-codesign is missed by keeping only `LICENSE` + `NOTICE`.
- **P5**: The skill's primary audience is Claude Code power users who already have `~/.claude/skills/` set up — no need to support Claude Desktop, web Claude, or the API path.
- **P6**: Trigger phrases in the frontmatter `description` field (both zh + en) will reliably fire the skill on design intents. No additional hook / slash-command surface needed.

## Open questions

- Does Claude Code's skill auto-trigger reliably parse mixed-language `description` fields? (Testing will answer.)
- Should `install.sh` also append a line to the user's project-level CLAUDE.md prompting "if the user asks for a design, invoke /open-design"? Probably no — too invasive for a v0.1 install.
- Is `open-design` the right name, or does it conflict with the upstream project identity? Alternatives: `claude-design`, `shot-design`, `one-shot-design`.

## Non-goals / anti-patterns to avoid

- Do not re-implement the Electron sandbox iframe logic.
- Do not ship binary assets (screenshots) in the git repo larger than ~100KB without external hosting consideration.
- Do not vendor the upstream `ref/open-codesign/` tree into the published repo (already `.gitignore`d).
- Do not add analytics or auto-update.

---

## /autoplan review (2026-04-22)

Mode: SELECTIVE EXPANSION. Full-pipeline run — CEO + Eng + DX phases. **Outside voice gap:** Codex CLI rejected every request with `The 'gpt-5' model is not supported when using Codex with a ChatGPT account` — dual-voice ran single-voice (Claude subagents only, each called fresh with no main-session context to preserve independence). Logged but not re-run.

### CEO consensus

| Dimension | Finding | Decision |
|---|---|---|
| Premises valid | P1/P2/P4 VALID. P3/P6 CHALLENGE (unverified at runtime). P5 WRONG (Claude-Code-only TAM is the smallest possible). | Accept P1/P2/P4. Narrow P6 triggers (done). Defer P5 fix: v0.1 stays CC-only, v0.2 can ship a Claude Projects snippet. |
| Right problem | Real niche (file-on-disk > chat artifact). Differentiation is craft bar, invisible until rendered. | Need rendered gallery before the repo converts visitors. Gallery is **not ship-blocking v0.1** but blocks adoption. |
| Scope calibration | Missing load-bearing: `gallery/`. Yak-shaving: over-engineered `install.sh`. | Ship minimal 15-line install.sh (Eng-approved) + document raw `ln -s` in README (DX-approved). Both. Gallery deferred. |
| Alternatives explored | Plan missed 3 alternatives: plugin manifest, cross-surface prompt pack, narrower `open-landing` only. | Documented above; v0.1 stays single-skill per P1. Revisit at v0.2. |
| Competitive risks | Claude Artifacts, v0/Lovable/Bolt, **upstream open-codesign shipping official CC skill**. | Hardest Q: if upstream ships official, why mine exist? Answer for now: adapt faster, Chinese triggers, craft-bar emphasis. If upstream ships, contribute back instead. |
| 6-month trajectory | Likely failure modes: upstream drift + abandonment, feature creep into React/Vue. | Mitigation: `make upstream-check` (done) + freeze scope at HTML-only. |

### Eng consensus

Architecture rating: **7/10**. Adaptation (drop artifact-tag, EDITMODE, TWEAKS) is correct. Progressive-disclosure routing via natural-language rules is sound.

Failure mode registry (ranked):

| Rank | Mode | Fix status |
|---|---|---|
| P0 | Trigger over-fires on `design a database schema` / `design a system` | **Fixed** — `description` frontmatter narrowed to require visual/UI/page/screen context + explicit negative examples. |
| P0 | cdnjs slug case-sensitivity (`Chart.js`, `PapaParse`) | Already present at `SKILL.md:50`. Eng voice misread — **no change needed**. |
| P1 | Tailwind play-CDN prints deprecation warning in browser console | **Fixed** — added inline note that the warning is acceptable for a mockup. |
| P1 | Iteration policy (overwrite vs. version) undefined in step 1 | **Fixed** — step 1 now explicitly states tweak = overwrite same file. |
| P1 | Windows symlink requires Developer Mode / admin | Documented in README: `mklink /D` hint deferred to v0.2 (low user overlap). |
| P2 | Upstream prompt drift invisible | **Fixed** — `Makefile` `upstream-check` + `.upstream-sha` lock to SHA `ea6260be`. |
| P2 | Reference routing "Dashboard ambient signals" section names are brittle (phrase anchors in a prose doc) | Known structural debt. Tracked for v0.2 refactor. |

Structural risk Eng flagged: artifact-type taxonomy is baked into prose in three places. 3-month-out rewrite prompt. **Decision:** document as v0.2 work, don't block v0.1.

### DX consensus

Scorecard (1-10):

| Dimension | Score | Fix |
|---|---|---|
| Concept clarity | 7 | README hero + code block — **done** |
| Install simplicity | 8 | `ln -s` one-liner in README — **done** |
| Trigger discoverability | 4 → 8 | Bulleted trigger list (zh + en) in README — **done** |
| First-output delight | 5 → tbd | Needs rendered gallery (v0.2). README gives one concrete first prompt — **partial** |
| Iteration loop | 3 → 8 | Explicit section + SKILL.md step 1 update — **done** |
| Debuggability | 3 → 7 | Troubleshooting section with 4 failure modes — **done** |
| Uninstall | 6 → 7 | `install.sh --force` path + README will-be-added note | pending |
| Progressive disclosure | 8 | Unchanged |

DX anti-pattern killed: over-engineered install.sh is now 15 lines, no `--uninstall` flag (symmetric with `rm ~/.claude/skills/open-design`).

### Decisions applied this session

1. Narrow `description` triggers to require visual/UI/page/screen context.
2. Iteration policy explicit in step 1: overwrite, don't version.
3. Tailwind CDN console warning noted inline.
4. Wrote README.md (DX structure: hero → install → first prompt → triggers → iteration → limits → troubleshooting → credit → license).
5. Wrote LICENSE (MIT, dual-copyright Jackson + OpenCoworkAI).
6. Wrote NOTICE (derivative-work attribution).
7. Wrote install.sh (15 lines, stale-symlink detection, `--force` flag).
8. Wrote Makefile (`install`, `upstream-check`, `upstream-bump`, `smoke`).
9. Wrote `.upstream-sha` pinned to `ea6260be`.
10. No smoke test run yet — requires fresh Claude Code session from a scratch dir. **Gated on user.**

### Deferred to v0.2

- Rendered gallery (3-5 HTML outputs hosted as GH release assets or branch).
- Windows `.ps1` installer or `mklink /D` walkthrough.
- Taxonomy extraction (`references/artifact-types.md` as single source of truth).
- Cross-surface prompt pack (Claude Desktop / Projects / web).
- Plugin manifest experiment.

### Scope expansion 2 (2026-04-22, user-driven)

User reviewed the gap analysis between our skill and upstream `ref/open-codesign/packages/core/` and chose the **full-parity** option. Pulled in:

- **12 JSX golden-reference patterns** → `open-design/references/patterns/*.jsx` (5941 lines from `packages/core/src/design-skills/`). Kept verbatim as JSX; a `patterns/README.md` teaches Claude the JSX→HTML translation so it lifts structure/copy/tokens and emits HTML.
- **4 upstream builtin skills** → `open-design/references/builtin/*.md` (203 lines from `packages/core/src/skills/builtin/`): `frontend-design-anti-slop.md`, `pitch-deck.md`, `data-viz-recharts.md`, `mobile-mock.md`.
- **SKILL.md routing rules expanded** — 12 numbered rules covering when to load each pattern / builtin; ASCII tree of references/ added for navigation.
- **README.md** updated to describe the patterns/ + builtin/ directories.

Upstream files intentionally **not** pulled in:
- `packages/core/src/prompts/editmode-protocol.v1.txt` — Electron tweak-slider protocol, depends on iframe rebuild loop.
- `packages/core/src/prompts/tweaks-protocol.v1.txt` — same family, depends on virtual-FS string replacement.
- `packages/core/src/prompts/device-frames-hint.v1.txt` — points to virtual-FS frame files; our `references/ios-starter.md` inlines the iPhone frame instead.
- `packages/core/src/frames/`, `packages/core/src/brand/` — upstream asset trees not applicable to a prompt-only skill.

**Total skill corpus:** 256 (SKILL) + 724 (core refs) + 5993 (patterns) + 217 (builtin) = **7190 lines across 25 files**. Per-design load is SKILL + ~1 pattern + 1-2 refs ≈ **~1000 lines**, well inside Claude Code's budget.

**Why JSX not hand-ported HTML:** Claude reliably translates JSX idioms (`className`→`class`, `style={{…}}`→`style="…"`, `{t.accent}`→`var(--color-accent)`) while reading. Hand-porting 5900 lines would take ~4-6h, introduce errors, and double the upstream-sync workload. Trade-off accepted.

**What this buys:** v0.1 now has the same golden-reference corpus as upstream's live product, meaning craft quality ceiling matches upstream. Previous scope had prose methodology only; Claude had to generate patterns from scratch.

### Gate (not auto-decidable)

User must run the 6-prompt smoke test before pushing to GitHub. `make smoke` prints the prompt list.

