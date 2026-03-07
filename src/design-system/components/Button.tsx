import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import { useTheme } from "@/src/design-system/theme/useTheme";
import { space } from "@/src/design-system/tokens";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
};

export function Button({
  label,
  onPress,
  variant = "primary",
  disabled = false,
  loading = false,
  fullWidth = false,
  containerStyle,
}: ButtonProps) {
  const { palette: theme, tokens } = useTheme();
  const isDisabled = disabled || loading;
  const control = tokens.control ?? {
    height: { md: space["2xl"] + space.lg + 4 },
    paddingX: { md: space.md },
    radius: { md: space.sm },
  };

  const variantStyles = {
    primary: {
      backgroundColor: theme.primary,
      borderColor: theme.primary,
      textColor: theme.onPrimary,
    },
    secondary: {
      backgroundColor: theme.surface,
      borderColor: theme.border,
      textColor: theme.heading,
    },
  } as const;

  const selected = variantStyles[variant];

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      style={({ pressed }) => [
        styles.button,
        {
          minHeight: control.height.md + space.xs,
          borderRadius: control.radius.md + space["2xs"],
          paddingHorizontal: control.paddingX.md,
        },
        {
          backgroundColor: selected.backgroundColor,
          borderColor: selected.borderColor,
          width: fullWidth ? "100%" : undefined,
          opacity: isDisabled ? 0.6 : pressed ? 0.92 : 1,
        },
        containerStyle,
      ]}
    >
      {loading ? (
        <View style={styles.loadingContent}>
          <Text style={[styles.label, styles.labelHidden]}>{label}</Text>
          <View style={styles.spinnerWrap}>
            <ActivityIndicator color={selected.textColor} />
          </View>
        </View>
      ) : (
        <Text style={[styles.label, { color: selected.textColor }]}>{label}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 20,
  },
  labelHidden: {
    opacity: 0,
  },
  spinnerWrap: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
});
