import { useMemo, useState } from "react";
import { StyleSheet, Text, TextInput, View, type TextInputProps } from "react-native";

import { IconSymbol } from "@/src/design-system/components/ui/icon-symbol";
import { useTheme } from "@/src/design-system/theme/useTheme";
import { shadow, space } from "@/src/design-system/tokens";

type LabeledInputProps = {
  label: string;
  placeholder: string;
  value?: string;
  onChangeText: (value: string) => void;
  error?: string;
  disabled?: boolean;
  multiline?: boolean;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  keyboardType?: "default" | "email-address";
  compact?: boolean;
  rightIconName?: "chevron.right" | "person.fill" | "info.circle";
  textInputProps?: TextInputProps;
};

export function LabeledInput({
  label,
  placeholder,
  value,
  onChangeText,
  error,
  disabled = false,
  multiline,
  autoCapitalize = "sentences",
  keyboardType = "default",
  compact = false,
  rightIconName,
  textInputProps,
}: LabeledInputProps) {
  const { palette: theme, tokens } = useTheme();
  const styles = useMemo(() => createStyles(theme, tokens), [theme, tokens]);
  const [focused, setFocused] = useState(false);

  return (
    <View style={[styles.fieldBlock, compact && styles.fieldBlockCompact]}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputShell, focused && styles.inputShellFocused]}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          {...textInputProps}
          placeholder={placeholder}
          placeholderTextColor={styles.inputPlaceholder.color}
          style={[
            styles.input,
            multiline && styles.inputMultiline,
            rightIconName && styles.inputWithRightIcon,
            focused && styles.inputFocused,
            textInputProps?.style,
            disabled && styles.inputDisabled,
          ]}
          autoCapitalize={autoCapitalize}
          keyboardType={keyboardType}
          multiline={multiline}
          editable={!disabled}
          onFocus={(event) => {
            setFocused(true);
            textInputProps?.onFocus?.(event);
          }}
          onBlur={(event) => {
            setFocused(false);
            textInputProps?.onBlur?.(event);
          }}
        />
        {rightIconName ? (
          <View style={styles.rightIconWrap} pointerEvents="none">
            <IconSymbol name={rightIconName} size={16} color={styles.inputPlaceholder.color} />
          </View>
        ) : null}
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>["palette"], tokens: ReturnType<typeof useTheme>["tokens"]) => {
  const control = tokens.control ?? {
    height: { md: space["2xl"] + space.lg + 4 },
    paddingX: { md: space.md },
    paddingY: { md: space.sm },
    radius: { md: space.sm },
  };

  return StyleSheet.create({
    fieldBlock: {
      gap: space.sm - 2,
    },
    fieldBlockCompact: {
      flex: 1,
    },
    label: {
      color: tokens.colors.appearance.sectionLabel,
      fontWeight: "500",
      fontSize: 12,
      letterSpacing: 0.5,
    },
    inputShell: {
      position: "relative",
      justifyContent: "center",
    },
    inputShellFocused: {
      ...shadow("md"),
    },
    input: {
      borderWidth: 0.5,
      borderColor: theme.border,
      borderRadius: control.radius.md - space["2xs"],
      paddingHorizontal: control.paddingX.md,
      paddingVertical: control.paddingY.md + space.xs + space["2xs"],
      minHeight: control.height.md,
      backgroundColor: tokens.colors.bg.field,
      color: theme.heading,
      fontSize: 15,
      fontWeight: "500",
    },
    inputWithRightIcon: {
      paddingRight: space["2xl"] + space.sm,
    },
    inputFocused: {
      borderColor: tokens.colors.focus.border,
    },
    inputDisabled: {
      opacity: 0.6,
    },
    inputPlaceholder: {
      color: tokens.colors.focus.placeholder,
    },
    inputMultiline: {
      minHeight: space["2xl"] * 3 - 4,
      textAlignVertical: "top",
    },
    rightIconWrap: {
      position: "absolute",
      right: space.md,
      top: 0,
      bottom: 0,
      alignItems: "center",
      justifyContent: "center",
    },
    errorText: {
      color: tokens.colors.status.error.field,
      fontSize: 12,
    },
  });
};
