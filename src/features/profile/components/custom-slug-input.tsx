import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useMemo, useState } from "react";

import { IconSymbol } from "@/src/design-system/components/ui/icon-symbol";
import { AppPalette } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

type CustomSlugInputProps = {
  value: string;
  onChangeText: (value: string) => void;
  locked: boolean;
  onToggleLock: () => void;
  label?: string;
  placeholder?: string;
  error?: string;
  onInfoPress?: () => void;
};

export function CustomSlugInput({
  value,
  onChangeText,
  locked,
  onToggleLock,
  label = "Slug",
  placeholder = "dr-maya-patel",
  error,
  onInfoPress,
}: CustomSlugInputProps) {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? AppPalette.dark : AppPalette.light;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [focused, setFocused] = useState(false);

  return (
    <View style={styles.block}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputShell}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          editable={!locked}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder={placeholder}
          placeholderTextColor={styles.placeholder.color}
          style={[styles.input, locked && styles.inputLocked, focused && styles.inputFocused]}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        <View style={styles.actions}>
          <Pressable
            onPress={onToggleLock}
            hitSlop={10}
            style={({ pressed }) => [styles.iconButton, pressed && styles.iconButtonPressed]}
            android_ripple={{ color: "rgba(255,255,255,0.14)", borderless: true }}
          >
            <IconSymbol
              name={locked ? "lock.fill" : "lock.open.fill"}
              size={15}
              color={theme.muted}
            />
          </Pressable>
          <Pressable
            hitSlop={10}
            style={({ pressed }) => [styles.iconButton, pressed && styles.iconButtonPressed]}
            android_ripple={{ color: "rgba(255,255,255,0.14)", borderless: true }}
            onPress={onInfoPress}
          >
            <IconSymbol name="info.circle" size={15} color={theme.muted} />
          </Pressable>
        </View>
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const createStyles = (theme: typeof AppPalette.light) => {
  const isDark = theme.background === AppPalette.dark.background;
  const focusBorderColor = isDark ? "rgba(255,179,71,0.8)" : "#2D3A35";
  const focusGlowColor = isDark ? "#FFB347" : "#2D3A35";
  const placeholderColor = isDark
    ? "rgba(255,255,255,0.4)"
    : "rgba(31,42,39,0.4)";
  return StyleSheet.create({
    block: {
      gap: 6,
    },
    label: {
      color: isDark ? "rgba(255,255,255,0.62)" : "rgba(55,71,65,0.62)",
      fontSize: 12,
      fontWeight: "500",
      letterSpacing: 0.4,
    },
    inputShell: {
      position: "relative",
      justifyContent: "center",
    },
    input: {
      minHeight: 46,
      borderRadius: 12,
      borderWidth: 0.5,
      borderColor: isDark ? "#5d7068" : "#d3ddd9",
      backgroundColor: isDark ? "#4b5f57" : "#f6faf8",
      color: theme.heading,
      paddingHorizontal: 12,
      paddingRight: 74,
      fontSize: 15,
      fontWeight: "500",
    },
    inputFocused: {
      borderColor: focusBorderColor,
      boxShadow: `0px 0px 11px ${focusGlowColor}`,
    },
    placeholder: {
      color: placeholderColor,
    },
    inputLocked: {
      opacity: 0.8,
    },
    actions: {
      position: "absolute",
      right: 10,
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    iconButton: {
      width: 22,
      height: 22,
      borderRadius: 11,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(55,71,65,0.08)",
    },
    iconButtonPressed: {
      opacity: 0.78,
    },
    error: {
      color: isDark ? "#fecaca" : "#b91c1c",
      fontSize: 12,
    },
  });
};
