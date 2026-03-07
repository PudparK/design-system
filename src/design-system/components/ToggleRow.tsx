import { useEffect, useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Reanimated, {
  Easing as ReanimatedEasing,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { useTheme } from "@/src/design-system/theme/useTheme";
import { motion, space } from "@/src/design-system/tokens";

type ToggleRowProps = {
  label: string;
  value: boolean;
  disabled?: boolean;
  onValueChange: (value: boolean) => void;
};

export function ToggleRow({ label, value, disabled = false, onValueChange }: ToggleRowProps) {
  const { palette: theme, tokens, isDark } = useTheme();
  const styles = useMemo(() => createStyles(theme, tokens, isDark), [isDark, theme, tokens]);
  const progress = useSharedValue(value ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(value ? 1 : 0, {
      duration: motion.duration.normal,
      easing: ReanimatedEasing.bezier(...motion.easing.decelerate),
    });
  }, [progress, value]);

  const trackAnimatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      [isDark ? "rgba(255,255,255,0.3)" : "rgba(55,71,65,0.3)", theme.primary],
    ),
  }));

  const thumbAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: progress.value * 18 }],
  }));

  return (
    <View style={[styles.toggleRow, disabled && styles.toggleRowDisabled]}>
      <Text style={[styles.label, disabled && styles.labelDisabled]}>{label}</Text>
      <Pressable
        onPress={() => {
          if (disabled) return;
          onValueChange(!value);
        }}
        disabled={disabled}
        style={({ pressed }) => [styles.toggleSwitchPressable, pressed && !disabled && styles.toggleSwitchPressablePressed]}
        accessibilityRole="switch"
        accessibilityState={{ checked: value, disabled }}
      >
        <Reanimated.View style={[styles.toggleTrack, trackAnimatedStyle, disabled && styles.toggleTrackDisabled]}>
          <Reanimated.View style={[styles.toggleThumb, thumbAnimatedStyle]} />
        </Reanimated.View>
      </Pressable>
    </View>
  );
}

const createStyles = (
  theme: ReturnType<typeof useTheme>["palette"],
  tokens: ReturnType<typeof useTheme>["tokens"],
  isDark: boolean,
) => {
  const control = tokens.control ?? {
    height: { md: space["2xl"] + space.lg + 4 },
    paddingX: { md: space.md },
    radius: { md: space.sm },
  };

  return StyleSheet.create({
    label: {
      flex: 1,
      flexShrink: 1,
      paddingRight: control.paddingX.md,
      color: theme.text,
      fontSize: 13,
      fontWeight: "600",
    },
    toggleRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: control.paddingX.md,
    },
    toggleRowDisabled: {
      opacity: 0.6,
    },
    labelDisabled: {
      opacity: 0.85,
    },
    toggleSwitchPressable: {
      flexShrink: 0,
      borderRadius: control.radius.md + space.sm - space["2xs"],
      padding: space["2xs"],
    },
    toggleSwitchPressablePressed: {
      opacity: 0.9,
    },
    toggleTrack: {
      width: control.height.md - space.sm,
      height: control.height.md / 2,
      borderRadius: control.radius.md + space["2xs"],
      padding: space["2xs"],
      justifyContent: "center",
    },
    toggleTrackDisabled: {
      backgroundColor: isDark ? "rgba(255,255,255,0.16)" : "rgba(55,71,65,0.18)",
    },
    toggleThumb: {
      width: control.height.md / 2 - space.xs,
      height: control.height.md / 2 - space.xs,
      borderRadius: control.radius.md + space["2xs"],
      backgroundColor: theme.surface,
    },
  });
};
