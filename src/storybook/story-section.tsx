import type { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

import { useTheme } from "@/src/design-system/theme/useTheme";
import { radius, space } from "@/src/design-system/tokens";

type StorySectionProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
};

export function StorySection({
  eyebrow = "Preview",
  title,
  description,
  children,
}: StorySectionProps) {
  const { palette, tokens } = useTheme();

  return (
    <View style={[styles.screen, { backgroundColor: palette.background }]}>
      <View style={styles.header}>
        <Text style={[styles.eyebrow, { color: tokens.colors.text.muted }]}>{eyebrow}</Text>
        <Text style={[styles.title, { color: palette.heading }]}>{title}</Text>
        {description ? <Text style={[styles.description, { color: palette.subtle }]}>{description}</Text> : null}
      </View>
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: space.lg,
    paddingTop: space.xl + space.sm + space.lg,
    gap: space.lg,
  },
  header: {
    gap: space.xs,
  },
  eyebrow: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: "700",
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  title: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: "800",
    letterSpacing: -0.3,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
  content: {
    gap: space.md,
  },
});
