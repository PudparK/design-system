import type { ReactNode } from "react";
import { StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";

import { useTheme } from "@/src/design-system/theme/useTheme";
import { radius, shadow, space, type RadiusKey, type ShadowLevel } from "@/src/design-system/tokens";

const LIGHT_SURFACE_HIGHLIGHT = "rgba(255,255,255,0.72)";
const DARK_SURFACE_HIGHLIGHT = "rgba(255,255,255,0.16)";

type PanelProps = {
  children?: ReactNode;
  r?: RadiusKey;
  elevation?: ShadowLevel;
  style?: StyleProp<ViewStyle>;
};

export function Panel({ children, r = "2xl", elevation = "md", style }: PanelProps) {
  const { palette: theme, tokens, isDark } = useTheme();

  return (
    <View
      style={[
        styles.base,
        { borderRadius: radius[r] },
        shadow(elevation),
        {
          borderColor: isDark ? tokens.colors.border.soft : tokens.colors.border.default,
          backgroundColor: theme.surface,
        },
        style,
      ]}
    >
      <View
        pointerEvents="none"
        style={[styles.topHighlight, { backgroundColor: isDark ? DARK_SURFACE_HIGHLIGHT : LIGHT_SURFACE_HIGHLIGHT }]}
      />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderWidth: StyleSheet.hairlineWidth,
    overflow: "hidden",
    paddingHorizontal: space.lg - 2,
    paddingVertical: space.md,
  },
  topHighlight: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: StyleSheet.hairlineWidth,
  },
});
