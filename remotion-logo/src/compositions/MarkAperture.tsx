import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";
import { palette } from "../tokens";

/**
 * Mark — Aperture
 * Rounded square with a circular bite out of one corner.
 * Reads as `{` (code) and as a shutter opening (design).
 * Motion: one clean diagonal reveal from bottom-left to top-right.
 */
export const MarkAperture: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Diagonal reveal in 1.0s, hold for the rest.
  const reveal = interpolate(frame, [0, 1.0 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });

  // Diagonal clip: from BL (0% 100%) to TR (100% 0%).
  // Use a polygon whose leading edge sweeps along the diagonal.
  const t = reveal;
  // The clip polygon: starts as a zero-area triangle at bottom-left,
  // expands to cover the whole frame when t = 1.
  const clip = `polygon(0% 100%, ${200 * t}% 100%, ${200 * t - 100}% 0%, 0% 0%)`;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: palette.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ clipPath: clip, width: 512, height: 512 }}>
        <ApertureShape />
      </div>
    </AbsoluteFill>
  );
};

const ApertureShape: React.FC = () => {
  // 512 canvas. Mark sits on ~60% of canvas (307px) with generous negative space.
  // Rounded square, radius 72. Bite: circle r=128 centered at TR corner.
  return (
    <svg
      width="512"
      height="512"
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <mask id="bite">
          <rect x="0" y="0" width="512" height="512" fill="white" />
          {/* bite: a circle cut from the top-right area of the square */}
          <circle cx="362" cy="150" r="78" fill="black" />
        </mask>
      </defs>
      <rect
        x="102"
        y="102"
        width="308"
        height="308"
        rx="60"
        ry="60"
        fill={palette.ink}
        mask="url(#bite)"
      />
    </svg>
  );
};
