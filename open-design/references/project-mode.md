# Project mode — start or refactor a real project's UI

This mode fires when the user points at an existing codebase and asks to start its UI or
refactor / redesign what's there. The deliverable is edits to the project's real source
files — not a standalone `.html` artifact. Everything else in this skill (craft bar,
anti-slop, token discipline, interactive depth) still applies; only the medium changes.

## Non-negotiables (differ from artifact mode)

1. **Read before proposing.** Never suggest a direction before you have read the project:
   framework and version, styling system (Tailwind config / CSS variables / theme files /
   styled-components / CSS modules), existing components and their conventions, design
   tokens already declared, i18n setup, routing structure. If a `DESIGN.md`, style guide,
   or component library exists, it is the constraint set — deviate only where the user asks.
2. **Questions go through AskUserQuestion — never prose.** Artifact mode never asks;
   project mode asks exactly once, up front, because edits to real code are consequential.
   Batch every open decision into ONE AskUserQuestion call (max 4 questions):
   - **Direction** (always, unless the user already named one): propose 3 differentiated
     directions derived from what you read — each option label is the direction name, the
     description says what changes concretely in THIS project ("your grays go warm, the
     sidebar flattens, Fraunces display headings"). Ground options in the three-directions
     table in SKILL.md, adapted to the project's domain.
   - **Scope** (if ambiguous): whole app · specific pages · shared primitives first.
   - Anything else genuinely undecidable from the code. Do not ask what you can read.
   After the answers, work autonomously — no further questions unless blocked.
3. **Extend the project's system, don't parallel-build.** Reuse its tokens, spacing scale,
   and component idioms. New values go where the project declares them (theme file,
   `:root`, Tailwind config) — never hard-coded inline. Match the codebase's naming,
   comment density, and file layout. If the project has i18n, every new or changed
   user-facing string goes through it — no hardcoded display text.
4. **Small, reviewable batches.** Shared primitives → one page fully → remaining pages.
   Surface progress after each batch. Never restyle 20 files in one silent pass. Do not
   commit unless the user asks.

## Verification — use what the environment has

Verify with the strongest tool actually available, in this order; don't fail if the
fancier ones are missing:

1. **Browser automation** — if a browse / playwright / screenshot skill or MCP tool is
   available in the session: start the project's dev server (its own script — `dev`,
   `start`), take before/after screenshots of every touched page, check the console for
   errors, and show the user the pairs.
2. **Build + type check** — otherwise run the project's own build / lint / typecheck and
   report the output honestly.
3. **User's eyes** — if neither exists, start the dev server, give the URL, and use
   AskUserQuestion to have the user confirm each batch looks right before continuing.

Run the anti-slop self-check (`references/anti-slop.md`) against the rendered result,
not just the source: default Tailwind blue, one-accent-on-flat-black, icon-title-text
grids, and dead buttons are just as forbidden in a real app as in a mockup.

## Starting a UI from zero (project exists, no UI yet)

Same flow, two adjustments: the "read the project" step covers the stack and any brand
material (logo, README tone, existing marketing site); and the direction question gains
weight — offer the 3 directions with concrete previews (palette + type pairing + one
layout call per option). Scaffold pages in the project's framework using the same
structure discipline as artifact mode (semantic landmarks, heading ladder, density floors
from `references/artifact-types.md`).

## Done

A project-mode turn is done when: the batch's files are edited, the strongest available
verification has run and passed (or the user confirmed visually), and a short summary
names what changed and what batch comes next. Nothing shipped silently, nothing committed
unasked.
