import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useMemo, useState } from 'react';
import {
  LayoutAnimation,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { AppPalette } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

type TagInputProps = {
  label: string;
  placeholder: string;
  values: string[];
  onChange: (values: string[]) => void;
  maxItems?: number;
};

export function TagInput({ label, placeholder, values, onChange, maxItems = 30 }: TagInputProps) {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? AppPalette.dark : AppPalette.light;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [draft, setDraft] = useState('');
  const [focused, setFocused] = useState(false);

  function addTag(rawTag: string) {
    const tag = rawTag.trim();
    if (!tag || values.includes(tag) || values.length >= maxItems) return;

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    onChange([...values, tag]);
    setDraft('');
  }

  function removeTag(tag: string) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    onChange(values.filter((value) => value !== tag));
  }

  return (
    <View style={styles.block}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputRow}>
        <TextInput
          value={draft}
          onChangeText={setDraft}
          placeholder={placeholder}
          placeholderTextColor={styles.inputPlaceholder.color}
          style={[styles.input, focused && styles.inputFocused]}
          autoCapitalize="words"
          onSubmitEditing={() => addTag(draft)}
          returnKeyType="done"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        <Pressable style={styles.addButton} onPress={() => addTag(draft)}>
          <MaterialIcons name="add" size={16} color={theme.subtle} />
        </Pressable>
      </View>
      <View style={styles.chipsRow}>
        {values.map((tag) => (
          <View key={tag} style={styles.chip}>
            <Text style={styles.chipText}>{tag}</Text>
            <Pressable hitSlop={8} onPress={() => removeTag(tag)} style={styles.chipRemoveButton}>
              <MaterialIcons name="cancel" size={16} color={theme.text} />
            </Pressable>
          </View>
        ))}
      </View>
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
    block: {
      gap: 8,
    },
    label: {
      fontSize: 13,
      fontWeight: '600',
      color: theme.subtle,
    },
    inputRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    input: {
      flex: 1,
      borderWidth: 0.5,
      borderColor: theme.border,
      borderRadius: 12,
      paddingHorizontal: 12,
      paddingVertical: 10,
      backgroundColor: theme.surface,
      color: theme.heading,
    },
    inputFocused: {
      borderColor: focusBorderColor,
      boxShadow: `0px 0px 9px ${focusGlowColor}`,
    },
    inputPlaceholder: {
      color: placeholderColor,
    },
    addButton: {
      width: 36,
      height: 36,
      borderRadius: 8,
      borderWidth: 0.5,
      borderColor: theme.border,
      backgroundColor: theme.background,
      alignItems: 'center',
      justifyContent: 'center',
    },
    chipsRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    chip: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      backgroundColor: theme.background,
      borderRadius: 999,
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderWidth: 1,
      borderColor: theme.border,
    },
    chipText: {
      color: theme.text,
      fontWeight: '600',
      fontSize: 12,
    },
    chipRemoveButton: {
      width: 16,
      height: 16,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
};
