import { Composition } from "remotion";
import { MarkAperture } from "./compositions/MarkAperture";
import { MarkLens } from "./compositions/MarkLens";
import { MarkLoop } from "./compositions/MarkLoop";

// Favicon-capable from the start. 512 is the atomic logo canvas.
const FPS = 30;
const DURATION = 90; // 3 seconds
const SIZE = 512;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MarkAperture"
        component={MarkAperture}
        durationInFrames={DURATION}
        fps={FPS}
        width={SIZE}
        height={SIZE}
      />
      <Composition
        id="MarkLens"
        component={MarkLens}
        durationInFrames={DURATION}
        fps={FPS}
        width={SIZE}
        height={SIZE}
      />
      <Composition
        id="MarkLoop"
        component={MarkLoop}
        durationInFrames={DURATION}
        fps={FPS}
        width={SIZE}
        height={SIZE}
      />
    </>
  );
};
