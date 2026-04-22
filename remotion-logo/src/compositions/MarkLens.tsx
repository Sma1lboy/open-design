import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  Easing,
  spring,
} from "remotion";
import { palette } from "../tokens";

/**
 * Mark — Lens
 * A symmetric thick ring with a solid dot at its center.
 * Classic camera-lens / aperture-at-rest / eye.
 * Motion: the whole mark scales up from zero in one eased gesture, rests.
 */
export const MarkLens: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const s = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 140, mass: 1 },
  });
  const scale = interpolate(s, [0, 1], [0, 1]);
  const fade = interpolate(frame, [0, 0.25 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: palette.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        width="512"
        height="512"
        viewBox="0 0 512 512"
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity: fade }}
      >
        <g
          transform={`translate(256 256) scale(${scale}) translate(-256 -256)`}
        >
          {/* Thick ring: stroke centered on r=160, stroke width 40 →
              outer radius 180, inner radius 140. */}
          <circle
            cx="256"
            cy="256"
            r="160"
            fill="none"
            stroke={palette.ink}
            strokeWidth="40"
          />
          {/* Solid dot at center. r=36 — visually asserting, readable at 32px. */}
          <circle cx="256" cy="256" r="36" fill={palette.ink} />
        </g>
      </svg>
    </AbsoluteFill>
  );
};
