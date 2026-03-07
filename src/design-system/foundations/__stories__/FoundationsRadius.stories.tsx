import type { Meta, StoryObj } from "@storybook/react-native";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { useTheme } from "@/src/design-system/theme/useTheme";
import { radius, shadow, space } from "@/src/design-system/tokens";

const radiusScale: (keyof typeof radius)[] = ["xs", "sm", "md", "lg", "xl", "2xl", "3xl"];

const surfaceClasses = [
  {
    title: "Controls",
    token: "radius.sm",
    detail: "Use smaller radii for inputs, toggles, and compact touch targets.",
    value: radius.sm,
    visual: "control",
  },
  {
    title: "Cards",
    token: "radius.md",
    detail: "Use one default surface radius for panels and card families.",
    value: radius.md,
    visual: "card",
  },
  {
    title: "Sheets",
    token: "radius.xl",
    detail: "Use larger radii when the surface behaves like a sheet or modal container.",
    value: radius.xl,
    visual: "sheet",
  },
  {
    title: "Pills",
    token: "radius.3xl",
    detail: "Use fully rounded shapes for chips, segmented controls, and pill buttons.",
    value: radius["3xl"],
    visual: "pill",
  },
] as const;

const guardrails = [
  "Do not mix multiple radii within one surface family unless the difference carries clear meaning.",
  "Treat radius as part of component language, not decoration layered on at the end.",
  "Reserve fully rounded pills for controls and tags that intentionally read differently from cards.",
  "Default to the system surface radius before inventing a new corner style.",
] as const;

function FoundationsRadiusPreview() {
  const { tokens } = useTheme();

  return (
    <ScrollView contentContainerStyle={[styles.canvas, { backgroundColor: tokens.colors.bg.app }]}>
      <View style={styles.hero}>
        <Text style={[styles.eyebrow, { color: tokens.colors.text.muted }]}>Design System</Text>
        <Text style={[styles.title, { color: tokens.colors.text.heading }]}>Radius</Text>
        <Text style={[styles.subtitle, { color: tokens.colors.text.subtle }]}>
          Radius helps you decide what kind of surface something is. The right corner language makes controls, cards,
          sheets, and pills feel related without looking interchangeable. Foundations define the visual primitives that
          Layout, UI, and Components build upon.
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
        <Text style={[styles.sectionEyebrow, { color: tokens.colors.text.muted }]}>Core model</Text>
        <Text style={[styles.sectionTitle, { color: tokens.colors.text.heading }]}>Choose radius by surface class</Text>
        <Text style={[styles.sectionIntro, { color: tokens.colors.text.subtle }]}>
          Radius is most useful when it reinforces product surface types. Most screens need one control radius and one
          surface radius, with sheets and pills used more selectively.
        </Text>
        <View style={styles.surfaceList}>
          {surfaceClasses.map((item) => (
            <View
              key={item.title}
              style={[
                styles.surfaceCard,
                {
                  backgroundColor: tokens.colors.bg.field,
                  borderColor: tokens.colors.border.soft,
                },
              ]}
            >
              <View style={styles.surfaceHeader}>
                <Text style={[styles.surfaceTitle, { color: tokens.colors.text.heading }]}>{item.title}</Text>
                <Text style={[styles.surfaceToken, { color: tokens.colors.text.muted }]}>{item.token}</Text>
              </View>
              <Text style={[styles.surfaceBody, { color: tokens.colors.text.body }]}>{item.detail}</Text>
              <View
                style={[
                  styles.surfacePreview,
                  {
                    borderRadius: item.value,
                    borderColor: tokens.colors.border.default,
                    backgroundColor: tokens.colors.bg.banner,
                  },
                  item.visual === "control" ? styles.surfacePreviewControl : null,
                  item.visual === "sheet" ? styles.surfacePreviewSheet : null,
                  item.visual === "pill" ? styles.surfacePreviewPill : null,
                ]}
              />
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
        <Text style={[styles.sectionEyebrow, { color: tokens.colors.text.muted }]}>Usage patterns</Text>
        <Text style={[styles.sectionTitle, { color: tokens.colors.text.heading }]}>Keep one family feeling cohesive</Text>
        <Text style={[styles.sectionIntro, { color: tokens.colors.text.subtle }]}>
          Radius works best when cards look like they belong together, controls feel related to one another, and more
          expressive shapes are used on purpose instead of scattered through the screen.
        </Text>
        <View
          style={[
            styles.familyCard,
            {
              backgroundColor: tokens.colors.bg.field,
              borderColor: tokens.colors.border.default,
            },
          ]}
        >
          <Text style={[styles.familyTitle, { color: tokens.colors.text.heading }]}>Recommended split</Text>
          <Text style={[styles.familyBody, { color: tokens.colors.text.body }]}>
            Default to `radius.sm` for controls and `radius.md` for cards. Reach for `radius.xl` only when the surface
            behaves more like a container than a control.
          </Text>
          <View style={styles.familyPreview}>
            <View
              style={[
                styles.familyRow,
                {
                  borderRadius: radius.sm,
                  borderColor: tokens.colors.border.default,
                  backgroundColor: tokens.colors.bg.banner,
                },
              ]}
            />
            <View
              style={[
                styles.familyRow,
                styles.familyRowCard,
                {
                  borderRadius: radius.md,
                  borderColor: tokens.colors.border.default,
                  backgroundColor: tokens.colors.bg.banner,
                },
              ]}
            />
            <View
              style={[
                styles.familyPill,
                {
                  borderRadius: radius["3xl"],
                  borderColor: tokens.colors.border.default,
                  backgroundColor: tokens.colors.bg.banner,
                },
              ]}
            />
          </View>
        </View>
      </View>

      <View
        style={[
          styles.section,
          styles.sectionCompact,
          {
            backgroundColor: tokens.colors.bg.surface,
            borderColor: tokens.colors.border.soft,
          },
        ]}
      >
        <Text style={[styles.sectionEyebrow, { color: tokens.colors.text.muted }]}>Guardrails</Text>
        <Text style={[styles.sectionTitle, { color: tokens.colors.text.heading }]}>Use shape consistently enough to feel intentional</Text>
        <View style={styles.guardrailList}>
          {guardrails.map((rule) => (
            <Text key={rule} style={[styles.guardrailItem, { color: tokens.colors.text.body }]}>
              • {rule}
            </Text>
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
        <Text style={[styles.sectionEyebrow, { color: tokens.colors.text.muted }]}>Token inventory</Text>
        <Text style={[styles.sectionTitle, { color: tokens.colors.text.heading }]}>Reference the scale after the surface class is chosen</Text>
        <Text style={[styles.sectionIntro, { color: tokens.colors.text.subtle }]}>
          The full scale remains available, but most product work should center on the system default radii.
        </Text>
        <View style={styles.inventoryGrid}>
          {radiusScale.map((key) => (
            <View
              key={key}
              style={[
                styles.inventoryCard,
                {
                  backgroundColor: tokens.colors.bg.field,
                  borderColor: tokens.colors.border.soft,
                },
              ]}
            >
              <View
                style={[
                  styles.inventoryTile,
                  {
                    borderRadius: radius[key],
                    backgroundColor: tokens.colors.bg.banner,
                    borderColor: tokens.colors.border.default,
                  },
                ]}
              />
              <Text style={[styles.inventoryLabel, { color: tokens.colors.text.heading }]}>{key}</Text>
              <Text style={[styles.inventoryMeta, { color: tokens.colors.text.muted }]}>{`${radius[key]} px`}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const meta = {
  title: "Design System/Foundations/Radius",
  component: FoundationsRadiusPreview,
  parameters: {
    notes: "Decision-first radius guidance covering surface classes, usage patterns, guardrails, and scale reference.",
  },
} satisfies Meta<typeof FoundationsRadiusPreview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Radius: Story = {};

const styles = StyleSheet.create({
  canvas: {
    padding: space.lg,
    gap: space.md + space.xs,
  },
  hero: {
    paddingHorizontal: space.xs,
    paddingVertical: space.sm,
    gap: space.sm,
  },
  eyebrow: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  title: {
    fontSize: 30,
    lineHeight: 36,
    fontWeight: "800",
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
  },
  section: {
    borderWidth: 1,
    borderRadius: radius.xl,
    padding: space.md + space.xs,
    gap: space.sm,
    ...shadow("sm"),
  },
  sectionCompact: {
    gap: space.xs + space.xs,
  },
  sectionEyebrow: {
    fontSize: 11,
    lineHeight: 15,
    fontWeight: "700",
    letterSpacing: 0.6,
    textTransform: "uppercase",
  },
  sectionTitle: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: "800",
  },
  sectionIntro: {
    fontSize: 14,
    lineHeight: 21,
  },
  surfaceList: {
    gap: space.sm,
  },
  surfaceCard: {
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: space.md,
    gap: space.sm,
  },
  surfaceHeader: {
    gap: 2,
  },
  surfaceTitle: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "700",
  },
  surfaceToken: {
    fontSize: 12,
    lineHeight: 18,
  },
  surfaceBody: {
    fontSize: 14,
    lineHeight: 21,
  },
  surfacePreview: {
    marginTop: space.xs,
    width: "100%",
    height: 56,
    borderWidth: 1,
  },
  surfacePreviewControl: {
    height: 42,
  },
  surfacePreviewSheet: {
    height: 82,
  },
  surfacePreviewPill: {
    width: 170,
    height: 40,
  },
  familyCard: {
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: space.md,
    gap: space.sm,
  },
  familyTitle: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "700",
  },
  familyBody: {
    fontSize: 14,
    lineHeight: 21,
  },
  familyPreview: {
    gap: space.sm,
  },
  familyRow: {
    height: 42,
    borderWidth: 1,
  },
  familyRowCard: {
    height: 64,
  },
  familyPill: {
    width: 156,
    height: 38,
    borderWidth: 1,
  },
  guardrailList: {
    gap: space.xs,
  },
  guardrailItem: {
    fontSize: 13,
    lineHeight: 20,
  },
  inventoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: space.sm,
  },
  inventoryCard: {
    width: "47%",
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: space.md,
    gap: space.xs,
  },
  inventoryTile: {
    width: "100%",
    height: 72,
    borderWidth: 1,
  },
  inventoryLabel: {
    fontSize: 14,
    lineHeight: 19,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  inventoryMeta: {
    fontSize: 12,
    lineHeight: 18,
  },
});
