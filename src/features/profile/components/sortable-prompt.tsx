import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { IconSymbol } from '@/src/design-system/components/ui/icon-symbol';
import { AppPalette } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

type SortablePromptProps = {
  index: number;
  total: number;
  value: string;
  onChange: (nextValue: string) => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onRemove: () => void;
  helperText?: string;
  tone?: "default" | "error";
};

export function SortablePrompt({
  index,
  total,
  value,
  onChange,
  onMoveUp,
  onMoveDown,
  onRemove,
  helperText,
  tone = "default",
}: SortablePromptProps) {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? AppPalette.dark : AppPalette.light;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [focused, setFocused] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.toolbar}>
        <Text style={styles.badge}>Prompt {index + 1}</Text>
        <View style={styles.controls}>
          <Pressable onPress={onMoveUp} disabled={index === 0} style={styles.controlButton}>
            <IconSymbol
              name="chevron.up.circle"
              size={16}
              color={theme.subtle}
              style={index === 0 ? styles.controlDisabled : undefined}
            />
          </Pressable>
          <Pressable onPress={onMoveDown} disabled={index === total - 1} style={styles.controlButton}>
            <IconSymbol
              name="chevron.down.circle"
              size={16}
              color={theme.subtle}
              style={index === total - 1 ? styles.controlDisabled : undefined}
            />
          </Pressable>
          <Pressable onPress={onRemove} style={[styles.controlButton, styles.removeButton]}>
            <IconSymbol name="trash" size={15} color="rgba(255,100,100,0.7)" />
          </Pressable>
        </View>
      </View>

      <TextInput
        value={value}
        onChangeText={onChange}
        multiline
        placeholder="Write an intake prompt..."
        placeholderTextColor={styles.placeholder.color}
        style={[styles.textarea, focused && styles.textareaFocused]}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      {helperText ? (
        <Text style={[styles.helperText, tone === "error" && styles.helperTextError]}>{helperText}</Text>
      ) : null}
    </View>
  );
}

const createStyles = (theme: typeof AppPalette.light) => {
  const isDark = theme.background === AppPalette.dark.background;
  const focusBorderColor = isDark ? 'rgba(255,179,71,0.8)' : '#2D3A35';
  const focusGlowColor = isDark ? '#FFB347' : '#2D3A35';
  const placeholderColor = isDark
    ? 'rgba(255,255,255,0.4)'
    : 'rgba(31,42,39,0.4)';
  return StyleSheet.create({
    container: {
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 10,
      backgroundColor: theme.background,
      padding: 10,
      gap: 8,
    },
    toolbar: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 2,
      gap: 8,
    },
    badge: {
      fontSize: 12,
      fontWeight: '700',
      color: theme.text,
    },
    controls: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      flexShrink: 0,
    },
    controlButton: {
      width: 30,
      height: 26,
      borderRadius: 8,
      borderWidth: 0.5,
      borderColor: theme.border,
      backgroundColor: theme.background,
      alignItems: 'center',
      justifyContent: 'center',
    },
    controlDisabled: {
      opacity: 0.35,
    },
    removeButton: {
      backgroundColor: isDark ? 'rgba(255,100,100,0.10)' : 'rgba(255,100,100,0.08)',
    },
    textarea: {
      flex: 1,
      minHeight: 74,
      borderWidth: 0.5,
      borderColor: theme.border,
      borderRadius: 12,
      paddingHorizontal: 10,
      paddingVertical: 8,
      backgroundColor: theme.surface,
      color: theme.heading,
      textAlignVertical: 'top',
    },
    textareaFocused: {
      borderColor: focusBorderColor,
      boxShadow: `0px 0px 9px ${focusGlowColor}`,
    },
    placeholder: {
      color: placeholderColor,
    },
    helperText: {
      fontSize: 12,
      lineHeight: 16,
      color: theme.muted,
    },
    helperTextError: {
      color: isDark ? "#fecaca" : "#b91c1c",
    },
  });
};
