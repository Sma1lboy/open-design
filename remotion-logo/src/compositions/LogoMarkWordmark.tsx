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
 * Variation 2 — Mark + Wordmark
 * --------------------------------------------
 * Design idea: an SVG aperture / brace logomark draws itself
 * (like a designer opening a bracket), a dot punches in as the
 * "eye", then the wordmark "open-design" slides in to the right.
 * The mark reads as both `{}` (code) and an open aperture (design).
 * This is the "bone" version — a shape you could use as a favicon.
 */
export const LogoMarkWordmark: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Brace draw-on timing (dash-offset sweep)
  const braceDraw = interpolate(
    frame,
    [0, 0.9 * fps],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.cubic),
    }
  );

  // Center dot punches in
  const dotSpring = spring({
    frame: frame - 0.95 * fps,
    fps,
    config: { damping: 9, stiffness: 180 },
  });
  const dotScale = interpolate(dotSpring, [0, 1], [0, 1]);

  // Ring pulse after dot lands
  const pulseStart = 1.1 * fps;
  const pulseProgress = interpolate(
    frame,
    [pulseStart, pulseStart + 0.55 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const pulseOpacity = interpolate(pulseProgress, [0, 1], [0.6, 0]);
  const pulseScale = interpolate(pulseProgress, [0, 1], [0.8, 1.9]);

  // Wordmark slide
  const wordSpring = spring({
    frame: frame - 1.15 * fps,
    fps,
    config: { damping: 22, stiffness: 160 },
  });
  const wordX = interpolate(wordSpring, [0, 1], [-60, 0]);
  const wordOpacity = interpolate(wordSpring, [0, 1], [0, 1]);

  // Tagline
  const taglineOp = interpolate(
    frame,
    [1.7 * fps, 2.1 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Underline sweep
  const underline = interpolate(
    frame,
    [1.5 * fps, 2.1 * fps],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );

  // Orbit rotation (very subtle continuous motion on the mark)
  const rotate = interpolate(frame, [0, 90], [-4, 4]);

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
      <div style={grainBackground(0.35)} />

      {/* centered row */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 56,
        }}
      >
        {/* --- logomark --- */}
        <div
          style={{
            width: 320,
            height: 320,
            position: "relative",
            transform: `rotate(${rotate}deg)`,
          }}
        >
          {/* outer ring pulse */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              border: `2px solid ${palette.amber}`,
              opacity: pulseOpacity,
              transform: `scale(${pulseScale})`,
            }}
          />
          <svg
            width="320"
            height="320"
            viewBox="0 0 320 320"
            style={{ position: "absolute", inset: 0 }}
          >
            {/* outer hairline circle */}
            <circle
              cx="160"
              cy="160"
              r="150"
              fill="none"
              stroke={palette.hair}
              strokeWidth="1.5"
            />

            {/* aperture petals — 3 arcs forming a shutter */}
            <g>
              {[0, 120, 240].map((rot, i) => {
                const len = 340;
                return (
                  <path
                    key={i}
                    d="M 160 30 A 130 130 0 0 1 272.583 95"
                    stroke={i === 0 ? palette.amber : i === 1 ? palette.coral : palette.cyan}
                    strokeWidth="14"
                    strokeLinecap="round"
                    fill="none"
                    strokeDasharray={len}
                    strokeDashoffset={len * braceDraw}
                    transform={`rotate(${rot} 160 160)`}
                  />
                );
              })}
            </g>

            {/* inner eye — dot */}
            <circle
              cx="160"
              cy="160"
              r={24 * dotScale}
              fill={palette.ink0}
            />
            <circle
              cx="160"
              cy="160"
              r={24 * dotScale}
              fill="none"
              stroke={palette.amber}
              strokeWidth="3"
              opacity={dotScale}
            />

            {/* crosshair ticks at cardinal edges (hairline) */}
            {[0, 90, 180, 270].map((a) => (
              <line
                key={a}
                x1="160"
                y1="10"
                x2="160"
                y2="22"
                stroke={palette.ink3}
                strokeWidth="1.5"
                transform={`rotate(${a} 160 160)`}
                opacity={wordOpacity}
              />
            ))}
          </svg>
        </div>

        {/* --- wordmark column --- */}
        <div
          style={{
            transform: `translateX(${wordX}px)`,
            opacity: wordOpacity,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 14,
          }}
        >
          <div
            style={{
              fontFamily: fraunces,
              fontSize: 168,
              fontWeight: 600,
              letterSpacing: "-0.035em",
              lineHeight: 0.95,
              color: palette.ink0,
            }}
          >
            open
            <span
              style={{
                color: palette.amber,
                fontFamily: fraunces_italic,
                fontStyle: "italic",
                fontWeight: 400,
              }}
            >
              —
            </span>
            design
          </div>

          {/* underline */}
          <div
            style={{
              width: 640,
              height: 2,
              background: palette.hair,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                height: "100%",
                width: `${underline * 100}%`,
                background: `linear-gradient(90deg, ${palette.amber}, ${palette.coral})`,
              }}
            />
          </div>

          {/* tagline */}
          <div
            style={{
              opacity: taglineOp,
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginTop: 4,
            }}
          >
            <span
              style={{
                fontFamily: jetbrains,
                fontSize: 22,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: palette.ink2,
              }}
            >
              a claude code skill
            </span>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: 999,
                background: palette.amber,
                boxShadow: `0 0 0 4px oklch(0.82 0.152 78 / 0.18)`,
              }}
            />
          </div>
        </div>
      </div>

      {/* corner tag */}
      <div
        style={{
          position: "absolute",
          top: 72,
          left: 72,
          fontFamily: jetbrains,
          fontSize: 20,
          letterSpacing: "0.18em",
          color: palette.ink3,
          textTransform: "uppercase",
          opacity: taglineOp,
        }}
      >
        ◯ mark + wordmark
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 72,
          right: 72,
          fontFamily: jetbrains,
          fontSize: 20,
          letterSpacing: "0.18em",
          color: palette.ink3,
          textTransform: "uppercase",
          opacity: taglineOp,
        }}
      >
        v0.1 · studio
      </div>
    </AbsoluteFill>
  );
};
