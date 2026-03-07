import { type ReactNode, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AppPalette } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

type FormSectionProps = {
  title: string;
  subtitle?: string;
  variant?: 'default' | 'identity';
  children: ReactNode;
};

export function FormSection({
  title,
  subtitle,
  variant = 'default',
  children,
}: FormSectionProps) {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? AppPalette.dark : AppPalette.light;
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={[styles.section, variant === 'identity' && styles.identitySection]}>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const createStyles = (theme: typeof AppPalette.light) => {
  const isDark = theme.background === AppPalette.dark.background;
  const panelBackground = lightenHex(theme.background, 0.03) ?? theme.surface;
  return StyleSheet.create({
    section: {
      gap: 8,
      padding: 16,
      borderRadius: 10,
      backgroundColor: panelBackground,
      borderWidth: 0.5,
      borderColor: isDark ? '#5d7068' : '#d3ddd9',
    },
    identitySection: {
      // Intentionally flat: identity uses the same panel treatment as other sections.
    },
    title: {
      fontSize: 11,
      fontWeight: '700',
      color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(45,58,53,0.6)',
      letterSpacing: 1.5,
      textTransform: 'uppercase',
    },
    subtitle: {
      fontSize: 12,
      color: theme.muted,
    },
    content: {
      gap: 14,
    },
  });
};

function lightenHex(hex: string, amount: number) {
  const normalized = hex.replace('#', '');
  if (!/^[\da-fA-F]{6}$/.test(normalized)) return null;
  const clamp = (value: number) => Math.max(0, Math.min(255, Math.round(value)));

  const r = parseInt(normalized.slice(0, 2), 16);
  const g = parseInt(normalized.slice(2, 4), 16);
  const b = parseInt(normalized.slice(4, 6), 16);

  const nextR = clamp(r + (255 - r) * amount);
  const nextG = clamp(g + (255 - g) * amount);
  const nextB = clamp(b + (255 - b) * amount);

  return `#${nextR.toString(16).padStart(2, '0')}${nextG
    .toString(16)
    .padStart(2, '0')}${nextB.toString(16).padStart(2, '0')}`;
}
