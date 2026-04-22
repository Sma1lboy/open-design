import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";
import { palette, grainBackground, emberGlow } from "../tokens";
import { fraunces, fraunces_italic, dmSans, jetbrains } from "../fonts";

/**
 * Variation 1 — Editorial Masthead
 * --------------------------------------------
 * Design idea: treat "open-design" like a magazine masthead.
 * An italic serif "open" types in behind a hairline frame,
 * then a sans "—design" locks in beneath. Supporting runners
 * (date, issue number, credit line) fade in like a print cover.
 * No logomark, no icon — the typography IS the logo.
 */
export const LogoEditorial: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames, width } = useVideoConfig();

  // --- timing ---
  const frameOpen = Math.min(frame / (0.85 * fps), 1); // 0..1 over 0.85s
  const openChars = "open";
  const openShown = openChars.slice(
    0,
    Math.round(frameOpen * openChars.length)
  );

  const dashProgress = interpolate(
    frame,
    [0.9 * fps, 1.3 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const designSpring = spring({
    frame: frame - 1.15 * fps,
    fps,
    config: { damping: 20, stiffness: 180 },
  });
  const designY = interpolate(designSpring, [0, 1], [40, 0]);
  const designOpacity = interpolate(designSpring, [0, 1], [0, 1]);

  // hairline frame sweep
  const frameSweep = interpolate(
    frame,
    [0, 0.9 * fps],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.cubic),
    }
  );

  // runners fade
  const runnerOp = interpolate(
    frame,
    [1.6 * fps, 2.1 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // subtle outro hold — tiny drift to feel alive
  const drift = Math.sin((frame / durationInFrames) * Math.PI * 2) * 2;

  // cursor blink for typewriter
  const cursorVisible = Math.floor(frame / (fps / 3)) % 2 === 0;
  const typingDone = frameOpen >= 1;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: palette.bg0,
        fontFamily: dmSans,
        color: palette.ink0,
        overflow: "hidden",
      }}
    >
      <div style={emberGlow()} />
      <div style={grainBackground(0.4)} />

      {/* Hairline masthead frame */}
      <MastheadFrame progress={frameSweep} />

      {/* Top runner: date + issue */}
      <div
        style={{
          position: "absolute",
          top: 72,
          left: 72,
          right: 72,
          display: "flex",
          justifyContent: "space-between",
          fontFamily: jetbrains,
          fontSize: 20,
          color: palette.ink2,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          opacity: runnerOp,
        }}
      >
        <span>ISSUE 01 · SKILL</span>
        <span style={{ color: palette.amber }}>● LIVE</span>
        <span>VOL. I · 2026</span>
      </div>

      {/* Center wordmark stack */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          transform: `translateY(${drift}px)`,
        }}
      >
        {/* open — italic serif, typewriter */}
        <div
          style={{
            fontFamily: fraunces_italic,
            fontSize: 360,
            lineHeight: 0.9,
            color: palette.ink0,
            letterSpacing: "-0.035em",
            fontWeight: 500,
            fontStyle: "italic",
            position: "relative",
          }}
        >
          {openShown}
          {!typingDone && (
            <span
              style={{
                display: "inline-block",
                width: 14,
                height: 220,
                marginLeft: 6,
                background: palette.amber,
                verticalAlign: "middle",
                opacity: cursorVisible ? 1 : 0,
                transform: "translateY(-12px)",
              }}
            />
          )}
        </div>

        {/* dash that "draws" across */}
        <div
          style={{
            width: 540,
            height: 8,
            marginTop: 8,
            marginBottom: 8,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: `${dashProgress * 100}%`,
              height: "100%",
              background: `linear-gradient(90deg, ${palette.ember}, ${palette.amber})`,
              borderRadius: 4,
            }}
          />
        </div>

        {/* design — sans, springs up */}
        <div
          style={{
            fontFamily: dmSans,
            fontSize: 240,
            fontWeight: 700,
            letterSpacing: "-0.03em",
            color: palette.ink0,
            transform: `translateY(${designY}px)`,
            opacity: designOpacity,
            lineHeight: 0.9,
            textTransform: "lowercase",
          }}
        >
          design
        </div>
      </div>

      {/* Bottom runner: credit / tagline */}
      <div
        style={{
          position: "absolute",
          bottom: 72,
          left: 72,
          right: 72,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          fontFamily: dmSans,
          fontSize: 22,
          color: palette.ink2,
          opacity: runnerOp,
        }}
      >
        <span
          style={{
            fontFamily: fraunces_italic,
            fontStyle: "italic",
            fontSize: 32,
            color: palette.ink1,
          }}
        >
          Claude Design, as a Claude Code skill.
        </span>
        <span
          style={{
            fontFamily: jetbrains,
            fontSize: 18,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: palette.ink3,
          }}
        >
          /skills/open-design
        </span>
      </div>
    </AbsoluteFill>
  );
};

const MastheadFrame: React.FC<{ progress: number }> = ({ progress }) => {
  // Each side of the frame draws in sequence: top, right, bottom, left
  const seg = (start: number, end: number) =>
    Math.max(0, Math.min(1, (progress - start) / (end - start)));
  const t = seg(0, 0.25);
  const r = seg(0.22, 0.5);
  const b = seg(0.48, 0.75);
  const l = seg(0.72, 1);
  const color = palette.hair;
  const inset = 48;
  const stroke = 1.5;

  return (
    <>
      {/* top */}
      <div
        style={{
          position: "absolute",
          top: inset,
          left: inset,
          width: `calc(100% - ${inset * 2}px)`,
          height: stroke,
          background: color,
          transformOrigin: "left center",
          transform: `scaleX(${t})`,
        }}
      />
      {/* right */}
      <div
        style={{
          position: "absolute",
          top: inset,
          right: inset,
          width: stroke,
          height: `calc(100% - ${inset * 2}px)`,
          background: color,
          transformOrigin: "top center",
          transform: `scaleY(${r})`,
        }}
      />
      {/* bottom */}
      <div
        style={{
          position: "absolute",
          bottom: inset,
          right: inset,
          width: `calc(100% - ${inset * 2}px)`,
          height: stroke,
          background: color,
          transformOrigin: "right center",
          transform: `scaleX(${b})`,
        }}
      />
      {/* left */}
      <div
        style={{
          position: "absolute",
          bottom: inset,
          left: inset,
          width: stroke,
          height: `calc(100% - ${inset * 2}px)`,
          background: color,
          transformOrigin: "bottom center",
          transform: `scaleY(${l})`,
        }}
      />
    </>
  );
};
