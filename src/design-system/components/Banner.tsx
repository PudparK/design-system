import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from "react-native";

import { useTheme } from "@/src/design-system/theme/useTheme";
import { radius, space } from "@/src/design-system/tokens";

type BannerTone = "default" | "warning" | "error";

type BannerProps = {
  helperText: string;
  tone?: BannerTone;
  containerStyle?: StyleProp<ViewStyle>;
};

export function Banner({ helperText, tone = "default", containerStyle }: BannerProps) {
  const { palette: theme, tokens } = useTheme();

  const toneStyles = {
    default: {
      borderColor: theme.border,
      backgroundColor: theme.surface,
      textColor: theme.muted,
    },
    warning: {
      borderColor: tokens.colors.status.warning.border,
      backgroundColor: tokens.colors.status.warning.bg,
      textColor: tokens.colors.status.warning.text,
    },
    error: {
      borderColor: tokens.colors.status.danger.border,
      backgroundColor: tokens.colors.status.danger.bg,
      textColor: tokens.colors.status.danger.text,
    },
  } as const;

  const selectedTone = toneStyles[tone];

  return (
    <View
      style={[
        styles.container,
        {
          borderColor: selectedTone.borderColor,
          backgroundColor: selectedTone.backgroundColor,
        },
        containerStyle,
      ]}
    >
      <Text style={[styles.text, { color: selectedTone.textColor }]}>{helperText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: radius.md,
    paddingHorizontal: space.md,
    paddingVertical: space.md - 2,
  },
  text: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "600",
  },
});
