// Shared design tokens mirroring the open-design editorial palette.
// Warm dark surfaces, serif + sans mix, amber + cyan + coral accents.

export const palette = {
  bg0: "oklch(0.145 0.018 255)",
  bg1: "oklch(0.178 0.022 260)",
  bg2: "oklch(0.215 0.028 265)",
  bg3: "oklch(0.258 0.034 270)",
  hair: "oklch(0.32 0.025 265)",
  ink0: "oklch(0.965 0.018 85)",
  ink1: "oklch(0.86 0.022 80)",
  ink2: "oklch(0.68 0.025 75)",
  ink3: "oklch(0.48 0.02 70)",
  amber: "oklch(0.82 0.152 78)",
  ember: "oklch(0.66 0.196 42)",
  coral: "oklch(0.72 0.18 28)",
  moss: "oklch(0.72 0.12 148)",
  cyan: "oklch(0.78 0.12 215)",
};

// Reusable grain / ember background layers used across all compositions.
export const grainBackground = (opacity = 0.35): React.CSSProperties => ({
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
  opacity,
  backgroundImage:
    "radial-gradient(oklch(0.98 0.02 80 / 0.05) 1px, transparent 1px)",
  backgroundSize: "3px 3px",
  mixBlendMode: "screen",
});

export const emberGlow = (): React.CSSProperties => ({
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
  background:
    "radial-gradient(60% 80% at 18% 22%, oklch(0.4 0.15 40 / 0.45) 0%, transparent 62%), radial-gradient(55% 70% at 88% 78%, oklch(0.5 0.12 260 / 0.35) 0%, transparent 64%)",
  filter: "blur(22px)",
});
