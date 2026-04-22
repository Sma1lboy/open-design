import { loadFont as loadFraunces } from "@remotion/google-fonts/Fraunces";
import { loadFont as loadDMSans } from "@remotion/google-fonts/DMSans";
import { loadFont as loadJetBrains } from "@remotion/google-fonts/JetBrainsMono";

export const { fontFamily: fraunces } = loadFraunces("normal", {
  weights: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const { fontFamily: fraunces_italic } = loadFraunces("italic", {
  weights: ["400", "500"],
  subsets: ["latin"],
});

export const { fontFamily: dmSans } = loadDMSans("normal", {
  weights: ["400", "500", "700"],
  subsets: ["latin"],
});

export const { fontFamily: jetbrains } = loadJetBrains("normal", {
  weights: ["400", "500"],
  subsets: ["latin"],
});
