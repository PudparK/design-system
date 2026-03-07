import { useMemo } from "react";

import { AppPalette } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { createSemanticTokens } from "@/src/design-system/tokens/semantic";

export function useTheme() {
  const mode = useColorScheme();
  const palette = mode === "dark" ? AppPalette.dark : AppPalette.light;
  const tokens = useMemo(() => createSemanticTokens(mode, palette), [mode, palette]);

  return {
    mode,
    isDark: mode === "dark",
    palette,
    tokens,
  };
}
