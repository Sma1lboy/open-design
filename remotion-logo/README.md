# remotion-logo

Three animated logomark variations for the `open-design` Claude Code skill, built as a Remotion project.

Pure marks — no wordmark, no text. Each composition is 512×512, 30fps, 3 seconds. Favicon-capable sizing.

## Run

```bash
bun install
bunx remotion studio
```

Render individually:

```bash
bunx remotion render MarkAperture previews/aperture.mp4
bunx remotion render MarkLens     previews/lens.mp4
bunx remotion render MarkLoop     previews/loop.mp4
```

## Variations

1. `MarkAperture` — rounded square with a circular bite at the upper-right, revealed by a single diagonal sweep.
2. `MarkLens` — thick ring with a centered dot (camera lens / eye), scales in as one unit.
3. `MarkLoop` — an enso: a single thick stroke drawn in one gesture that forms an open ring with a small gap at the top.

## Previews

GIFs (240×240, ~10fps, <250KB each) and MP4s (512×512, 30fps) live under `previews/`.
