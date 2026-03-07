import type { Meta, StoryObj } from "@storybook/react-native";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { useTheme } from "@/src/design-system/theme/useTheme";
import { primitives } from "@/src/design-system/tokens";

function FoundationsPrimitivesPreview() {
  const { tokens } = useTheme();

  return (
    <ScrollView contentContainerStyle={[styles.canvas, { backgroundColor: tokens.colors.bg.app }]}>
      <View style={styles.hero}>
        <Text style={[styles.eyebrow, { color: tokens.colors.text.muted }]}>Design System</Text>
        <Text style={[styles.title, { color: tokens.colors.text.heading }]}>Primitives</Text>
        <Text style={[styles.subtitle, { color: tokens.colors.text.subtle }]}>
          Primitive tokens are the raw building blocks beneath semantic roles. They are not meant for direct feature use,
          but they define the palette, spacing, and radius scale the rest of the system is built from.
        </Text>
      </View>

      <View
        style={[
          styles.section,
          {
            backgroundColor: tokens.colors.bg.surface,
            borderColor: tokens.colors.border.soft,
          },
        ]}
      >
        <Text style={[styles.sectionTitle, { color: tokens.colors.text.heading }]}>Color Primitives</Text>
        <View style={styles.colorGrid}>
          {Object.entries(primitives.color).map(([name, value]) => (
            <View key={name} style={styles.colorCard}>
              <View style={[styles.swatch, { backgroundColor: value }]} />
              <Text style={[styles.tokenName, { color: tokens.colors.text.heading }]}>{name}</Text>
              <Text style={[styles.tokenValue, { color: tokens.colors.text.muted }]}>{value}</Text>
            </View>
          ))}
        </View>
      </View>

      <View
        style={[
          styles.section,
          {
            backgroundColor: tokens.colors.bg.surface,
            borderColor: tokens.colors.border.soft,
          },
        ]}
      >
        <Text style={[styles.sectionTitle, { color: tokens.colors.text.heading }]}>Space Primitives</Text>
        <View style={styles.scaleList}>
          {Object.entries(primitives.space).map(([name, value]) => (
            <View key={name} style={styles.scaleRow}>
              <View style={styles.scaleText}>
                <Text style={[styles.tokenName, { color: tokens.colors.text.heading }]}>{`space.${name}`}</Text>
                <Text style={[styles.tokenValue, { color: tokens.colors.text.muted }]}>{`${value}px`}</Text>
              </View>
              <View style={[styles.spaceBar, { width: value * 6, backgroundColor: tokens.colors.focus.glow }]} />
            </View>
          ))}
        </View>
      </View>

      <View
        style={[
          styles.section,
          {
            backgroundColor: tokens.colors.bg.surface,
            borderColor: tokens.colors.border.soft,
          },
        ]}
      >
        <Text style={[styles.sectionTitle, { color: tokens.colors.text.heading }]}>Radius Primitives</Text>
        <View style={styles.radiusGrid}>
          {Object.entries(primitives.radius).map(([name, value]) => (
            <View key={name} style={styles.radiusCard}>
              <View
                style={[
                  styles.radiusShape,
                  {
                    borderRadius: value,
                    backgroundColor: tokens.colors.bg.field,
                    borderColor: tokens.colors.border.default,
                  },
                ]}
              />
              <Text style={[styles.tokenName, { color: tokens.colors.text.heading }]}>{`radius.${name}`}</Text>
              <Text style={[styles.tokenValue, { color: tokens.colors.text.muted }]}>{`${value}px`}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const meta = {
  title: "Design System/Foundations/Primitives",
  component: FoundationsPrimitivesPreview,
  parameters: {
    notes: "Raw primitive tokens backing the semantic design system.",
  },
} satisfies Meta<typeof FoundationsPrimitivesPreview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Overview: Story = {};

const styles = StyleSheet.create({
  canvas: {
    padding: 20,
    gap: 16,
  },
  hero: {
    gap: 8,
  },
  eyebrow: {
    fontSize: 12,
    lineHeight: 14,
    fontWeight: "700",
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  title: {
    fontSize: 30,
    lineHeight: 36,
    fontWeight: "800",
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
  },
  section: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 16,
    gap: 14,
  },
  sectionTitle: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "800",
  },
  colorGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  colorCard: {
    width: "47%",
    gap: 8,
  },
  swatch: {
    height: 72,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.08)",
  },
  tokenName: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "700",
  },
  tokenValue: {
    fontSize: 12,
    lineHeight: 16,
  },
  scaleList: {
    gap: 12,
  },
  scaleRow: {
    gap: 8,
  },
  scaleText: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  spaceBar: {
    height: 8,
    borderRadius: 999,
  },
  radiusGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  radiusCard: {
    width: "30%",
    gap: 8,
    alignItems: "center",
  },
  radiusShape: {
    width: 84,
    height: 68,
    borderWidth: 1,
  },
});
