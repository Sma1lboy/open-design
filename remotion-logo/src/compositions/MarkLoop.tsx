import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";
import { palette } from "../tokens";

/**
 * Mark — Loop
 * A single thick stroke forming an enso — a ring with a small gap at top-right.
 * Reads as "open", as a loop, as iteration. One line, one gesture.
 * Motion: the stroke draws itself on a single eased path, then rests.
 */
export const MarkLoop: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Dasharray value chosen generously; the arc circumference is
  // approx 2·π·160·(320/360) ≈ 893. Using 1000 as a safe upper bound.
  const PATH_LEN = 1000;

  const draw = interpolate(frame, [0, 1.3 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });
  const offset = PATH_LEN * (1 - draw);

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
      >
        {/*
          Enso ring: center (256, 256), radius 160, stroke 52.
          Outer reach: 160 + 26 = 186 → fits within 512 with 70px padding.

          Draw direction: start at the upper-right gap, sweep clockwise
          ~320° and land at the upper-right on the OTHER side of the gap.
          The stroke uses round caps so the two open ends feel deliberate.

          Angles (measured from +x axis, clockwise-positive in SVG):
            Start = -20° (upper right)
            End   = -70° (upper, slightly left of top)
          Sweep goes CLOCKWISE from -20° all the way around and stops at -70°.
          In SVG, with large-arc=1, sweep=1:
            Start point: (256 + 160·cos(-20°), 256 + 160·sin(-20°))
                       ≈ (406.35, 201.28)
            End point:   (256 + 160·cos(-70°), 256 + 160·sin(-70°))
                       ≈ (310.72, 105.65)
        */}
        <path
          d="M 406.35 201.28 A 160 160 0 1 1 310.72 105.65"
          fill="none"
          stroke={palette.ink}
          strokeWidth="52"
          strokeLinecap="round"
          strokeDasharray={PATH_LEN}
          strokeDashoffset={offset}
        />
      </svg>
    </AbsoluteFill>
  );
};
