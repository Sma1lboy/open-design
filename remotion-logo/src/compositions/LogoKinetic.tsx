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
 * Variation 3 — Kinetic / Deconstructed
 * --------------------------------------------
 * Design idea: letters of "open-design" arrive from scattered
 * off-axis positions, each with its own spring + stagger, and
 * snap into place. Behind them, a mono stencil ghosts (overprint)
 * the same word. An amber highlighter bar sweeps across at the
 * drop, then a small terminal ticker prints the tagline below.
 * Feels like the word was constructed on-stage, not placed.
 */

const LETTERS = ["o", "p", "e", "n", "-", "d", "e", "s", "i", "g", "n"];

export const LogoKinetic: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Each letter comes in with stagger + different origin offset
  const letterData = LETTERS.map((char, i) => {
    // pseudo-random but deterministic offsets per letter
    const seed = (i * 127) % 7;
    const dx = ((seed % 3) - 1) * 80 + (i % 2 === 0 ? -40 : 40);
    const dy = ((i * 53) % 5) * 20 - 50 + (i % 2 === 0 ? -30 : 30);
    const rot = (i % 2 === 0 ? -1 : 1) * (12 + (i % 3) * 4);
    const delay = i * 2; // frames between arrivals
    const s = spring({
      frame: frame - delay,
      fps,
      config: { damping: 14, stiffness: 200 },
    });
    return {
      char,
      opacity: interpolate(s, [0, 1], [0, 1]),
      x: interpolate(s, [0, 1], [dx, 0]),
      y: interpolate(s, [0, 1], [dy, 0]),
      rot: interpolate(s, [0, 1], [rot, 0]),
      scale: interpolate(s, [0, 1], [0.6, 1]),
    };
  });

  const allSettledFrame = LETTERS.length * 2 + 0.7 * fps;

  // Highlighter bar sweeps once letters have mostly landed
  const sweepStart = allSettledFrame - 0.2 * fps;
  const sweep = interpolate(
    frame,
    [sweepStart, sweepStart + 0.6 * fps],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.cubic),
    }
  );

  // Ghost overprint offset shimmer
  const ghostShift = Math.sin((frame / fps) * 1.5) * 3;
  const ghostOpacity = interpolate(
    frame,
    [0, 0.4 * fps, 1.6 * fps, 2.2 * fps],
    [0, 0.22, 0.22, 0.14],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );

  // Terminal ticker tagline — typewriter
  const tagline = "> claude design, as a claude code skill";
  const tagStart = sweepStart + 0.4 * fps;
  const tagProgress = interpolate(
    frame,
    [tagStart, tagStart + 0.8 * fps],
    [0, tagline.length],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const tagShown = tagline.slice(0, Math.max(0, Math.round(tagProgress)));
  const cursorOn = Math.floor(frame / (fps / 3)) % 2 === 0;

  // Top "build log" strip fade
  const buildLogOp = interpolate(
    frame,
    [0, 0.3 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Bottom-right version stamp
  const stampOp = interpolate(
    frame,
    [1.9 * fps, 2.3 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Vertical drift on exit hold
  const holdDrift = interpolate(
    frame,
    [allSettledFrame, durationInFrames],
    [0, -6],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: palette.bg0,
        overflow: "hidden",
        fontFamily: dmSans,
        color: palette.ink0,
      }}
    >
      <div style={emberGlow()} />
      <div style={grainBackground(0.42)} />

      {/* grid baseline marks */}
      <BaselineGrid opacity={buildLogOp * 0.5} />

      {/* top build log strip */}
      <div
        style={{
          position: "absolute",
          top: 64,
          left: 72,
          right: 72,
          display: "flex",
          justifyContent: "space-between",
          fontFamily: jetbrains,
          fontSize: 20,
          color: palette.ink3,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          opacity: buildLogOp,
        }}
      >
        <span>○ build · compose · ship</span>
        <span style={{ color: palette.amber }}>
          frame {String(frame).padStart(3, "0")} / {durationInFrames}
        </span>
      </div>

      {/* centered kinetic wordmark */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `translateY(${holdDrift}px)`,
        }}
      >
        <div style={{ position: "relative" }}>
          {/* ghost stencil behind */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontFamily: jetbrains,
              fontSize: 104,
              letterSpacing: "0.04em",
              color: palette.amber,
              opacity: ghostOpacity,
              transform: `translate(${ghostShift}px, ${ghostShift * 0.6}px)`,
              mixBlendMode: "screen",
              whiteSpace: "nowrap",
            }}
          >
            open-design
          </div>

          {/* foreground serif — letters fly in */}
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "center",
              whiteSpace: "nowrap",
              position: "relative",
              fontFamily: fraunces,
              fontSize: 152,
              fontWeight: 600,
              letterSpacing: "-0.02em",
              lineHeight: 1,
              color: palette.ink0,
            }}
          >
            {letterData.map((d, i) => {
              const isDash = d.char === "-";
              return (
                <span
                  key={i}
                  style={{
                    display: "inline-block",
                    opacity: d.opacity,
                    transform: `translate(${d.x}px, ${d.y}px) rotate(${d.rot}deg) scale(${d.scale})`,
                    transformOrigin: "center",
                    color: isDash ? palette.amber : palette.ink0,
                    fontFamily: isDash ? fraunces_italic : fraunces,
                    fontStyle: isDash ? "italic" : "normal",
                    padding: isDash ? "0 8px" : 0,
                  }}
                >
                  {d.char}
                </span>
              );
            })}
          </div>

          {/* highlighter sweep */}
          <div
            style={{
              position: "absolute",
              left: -20,
              right: -20,
              top: "56%",
              height: 22,
              overflow: "hidden",
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                background: `linear-gradient(90deg, ${palette.ember} 0%, ${palette.amber} 100%)`,
                transform: `scaleX(${sweep})`,
                transformOrigin: "left center",
                opacity: 0.55,
                mixBlendMode: "overlay",
                borderRadius: 2,
              }}
            />
          </div>
        </div>
      </div>

      {/* tagline terminal */}
      <div
        style={{
          position: "absolute",
          bottom: 140,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: jetbrains,
          fontSize: 26,
          color: palette.ink1,
          letterSpacing: "0.02em",
        }}
      >
        <span>{tagShown}</span>
        {tagShown.length < tagline.length && (
          <span style={{ color: palette.amber, opacity: cursorOn ? 1 : 0 }}>
            ▍
          </span>
        )}
      </div>

      {/* corner stamp */}
      <div
        style={{
          position: "absolute",
          bottom: 64,
          right: 72,
          fontFamily: jetbrains,
          fontSize: 18,
          color: palette.ink3,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          opacity: stampOp,
        }}
      >
        kinetic · 03
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 64,
          left: 72,
          fontFamily: jetbrains,
          fontSize: 18,
          color: palette.ink3,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          opacity: stampOp,
        }}
      >
        open-design
      </div>
    </AbsoluteFill>
  );
};

const BaselineGrid: React.FC<{ opacity: number }> = ({ opacity }) => {
  const cols = 12;
  return (
    <div
      style={{
        position: "absolute",
        inset: 72,
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        opacity,
        pointerEvents: "none",
      }}
    >
      {Array.from({ length: cols }).map((_, i) => (
        <div
          key={i}
          style={{
            borderLeft: `1px solid ${palette.hair}`,
            opacity: i === 0 ? 0 : 1,
          }}
        />
      ))}
    </div>
  );
};
