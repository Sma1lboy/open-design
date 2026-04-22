import { Composition } from "remotion";
import { LogoEditorial } from "./compositions/LogoEditorial";
import { LogoMarkWordmark } from "./compositions/LogoMarkWordmark";
import { LogoKinetic } from "./compositions/LogoKinetic";

const FPS = 30;
const DURATION = 90; // 3 seconds
const SIZE = 1080;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="LogoEditorial"
        component={LogoEditorial}
        durationInFrames={DURATION}
        fps={FPS}
        width={SIZE}
        height={SIZE}
      />
      <Composition
        id="LogoMarkWordmark"
        component={LogoMarkWordmark}
        durationInFrames={DURATION}
        fps={FPS}
        width={SIZE}
        height={SIZE}
      />
      <Composition
        id="LogoKinetic"
        component={LogoKinetic}
        durationInFrames={DURATION}
        fps={FPS}
        width={SIZE}
        height={SIZE}
      />
    </>
  );
};
