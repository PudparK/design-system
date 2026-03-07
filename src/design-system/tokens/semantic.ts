import { AppPalette } from "@/constants/theme";

import { primitives } from "./primitives";

type Palette = typeof AppPalette.light;
type ThemeMode = "light" | "dark";

export function createSemanticTokens(mode: ThemeMode, palette: Palette) {
  const isDark = mode === "dark";
  const controlHeightMd = primitives.space[6] + primitives.space[7];

  return {
    colors: {
      bg: {
        app: palette.background,
        surface: palette.surface,
        field: isDark ? primitives.color.greenSage600 : primitives.color.greenSage100,
        banner: isDark ? primitives.color.greenSage700 : primitives.color.white,
      },
      text: {
        heading: palette.heading,
        body: palette.text,
        subtle: palette.subtle,
        muted: palette.muted,
        onPrimary: palette.onPrimary,
      },
      border: {
        default: palette.border,
        soft: isDark ? primitives.color.whiteSoft16 : primitives.color.sageInk20,
      },
      focus: {
        border: isDark ? primitives.color.amberSoft : primitives.color.greenDeep,
        glow: isDark ? primitives.color.amber : primitives.color.greenDeep,
        placeholder: isDark ? primitives.color.whiteSoft40 : primitives.color.inkSoft40,
      },
      status: {
        error: {
          title: isDark ? primitives.color.red100 : primitives.color.red800,
          body: isDark ? primitives.color.red300 : primitives.color.red900,
          field: isDark ? primitives.color.red100 : primitives.color.red700,
        },
        danger: {
          border: isDark ? "rgba(248,113,113,0.35)" : "rgba(220,38,38,0.28)",
          bg: isDark ? "rgba(248,113,113,0.08)" : "rgba(220,38,38,0.06)",
          text: isDark ? "rgba(255, 125, 125, 0.9)" : "rgba(220,38,38,0.9)",
        },
        success: {
          body: isDark ? primitives.color.green200 : primitives.color.green700,
        },
        warning: {
          text: isDark ? primitives.color.amber200 : primitives.color.amber800,
          bg: isDark ? primitives.color.amber900 : "#ffedd5",
          border: isDark ? primitives.color.amber700 : primitives.color.amber300,
        },
      },
      shadow: {
        base: primitives.color.black,
        card: palette.border,
      },
      overlay: {
        track: isDark ? primitives.color.whiteSoft08 : primitives.color.sageInk08,
      },
      control: {
        switchTrackOff: isDark ? "rgba(255,255,255,0.3)" : "rgba(45,58,53,0.3)",
        switchTrackOn: palette.primary,
        switchThumb: palette.surface,
      },
      appearance: {
        cardIconInactive: isDark ? "rgba(255,255,255,0.75)" : "rgba(45,58,53,0.72)",
        cardLabel: isDark ? "rgba(255,255,255,0.82)" : "rgba(45,58,53,0.8)",
        sectionLabel: isDark ? "rgba(255,255,255,0.6)" : "rgba(45,58,53,0.6)",
      },
    },
    control: {
      height: {
        md: controlHeightMd,
      },
      paddingX: {
        md: primitives.space[3],
      },
      paddingY: {
        md: primitives.space[2],
      },
      radius: {
        md: primitives.radius.md,
      },
    },
    space: primitives.space,
    radius: primitives.radius,
  } as const;
}

export type SemanticTokens = ReturnType<typeof createSemanticTokens>;
