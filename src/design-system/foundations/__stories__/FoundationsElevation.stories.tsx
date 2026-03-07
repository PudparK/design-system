import type { Meta, StoryObj } from "@storybook/react-native";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { Panel } from "@/src/design-system/components/Panel";
import { useTheme } from "@/src/design-system/theme/useTheme";
import { radius, shadow, space, type ShadowLevel } from "@/src/design-system/tokens";

const hierarchy: { level: ShadowLevel; title: string; detail: string }[] = [
  {
    level: "none",
    title: "Flat",
    detail: "Use for app backgrounds and sections that should sit in the page plane.",
  },
  {
    level: "sm",
    title: "Surface",
    detail: "Use for subtle lift when a surface needs separation without becoming a focal overlay.",
  },
  {
    level: "md",
    title: "Raised",
    detail: "Use for primary cards and panels that carry the default depth cue in the product.",
  },
  {
    level: "xl",
    title: "Overlay",
    detail: "Use for sheets and modals that must clearly detach from surrounding content.",
  },
] as const;

const recipes = [
  {
    title: "Standard surface",
    level: "md" as ShadowLevel,
    useFor: "Default cards, panels, and primary grouped content.",
  },
  {
    title: "Interactive lift",
    level: "sm" as ShadowLevel,
    useFor: "Subtle emphasis before interaction or secondary surface hierarchy.",
  },
  {
    title: "Overlay separation",
    level: "xl" as ShadowLevel,
    useFor: "Modals, sheets, and content that must sit above the main page plane.",
  },
] as const;

const guardrails = [
  "Do not use elevation on every card in a dense stack. Too much lift removes hierarchy instead of adding it.",
  "Borders, surface contrast, and highlight often do more useful work than larger shadows.",
  "Overlays should feel categorically different from normal surfaces, not just slightly stronger.",
  "Nested elevated surfaces should stay rare and intentional.",
] as const;

function FoundationsElevationPreview() {
  const { tokens } = useTheme();

  return (
    <ScrollView contentContainerStyle={[styles.canvas, { backgroundColor: tokens.colors.bg.app }]}>
      <View style={styles.hero}>
        <Text style={[styles.eyebrow, { color: tokens.colors.text.muted }]}>Design System</Text>
        <Text style={[styles.title, { color: tokens.colors.text.heading }]}>Elevation</Text>
        <Text style={[styles.subtitle, { color: tokens.colors.text.subtle }]}>
          Elevation helps you decide how far a surface should separate from the page. The right choice is usually about
          hierarchy and context, not about making shadows more dramatic. Foundations define the visual primitives that
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
        <Text style={[styles.sectionTitle, { color: tokens.colors.text.heading }]}>Depth should communicate level of interruption</Text>
        <Text style={[styles.sectionIntro, { color: tokens.colors.text.subtle }]}>
          Treat elevation as a small hierarchy: page plane, default surface, raised moment, then overlay. Most screens
          only need one default surface level and one overlay level.
        </Text>
        <View style={styles.hierarchyList}>
          {hierarchy.map((item) => (
            <View
              key={item.level}
              style={[
                styles.hierarchyCard,
                {
                  backgroundColor: tokens.colors.bg.field,
                  borderColor: tokens.colors.border.soft,
                },
              ]}
            >
              <Text style={[styles.hierarchyTitle, { color: tokens.colors.text.heading }]}>{item.title}</Text>
              <Text style={[styles.hierarchyBody, { color: tokens.colors.text.body }]}>{item.detail}</Text>
              <View style={styles.hierarchyPreview}>
                <Panel elevation={item.level} r="2xl">
                  <Text style={[styles.previewTitle, { color: tokens.colors.text.heading }]}>{`elevation.${item.level}`}</Text>
                  <Text style={[styles.previewBody, { color: tokens.colors.text.muted }]}>
                    Surfaces at this level should read consistently anywhere they appear.
                  </Text>
                </Panel>
              </View>
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
        <Text style={[styles.sectionTitle, { color: tokens.colors.text.heading }]}>Depth works best in real layers, not isolated shadow samples</Text>
        <Text style={[styles.sectionIntro, { color: tokens.colors.text.subtle }]}>
          These examples show how the levels work in product composition. Notice that border, background contrast, and
          surrounding whitespace carry part of the depth signal too.
        </Text>
        <View style={styles.recipeList}>
          {recipes.map((recipe) => (
            <View
              key={recipe.title}
              style={[
                styles.recipeCard,
                {
                  backgroundColor: tokens.colors.bg.field,
                  borderColor: tokens.colors.border.default,
                },
              ]}
            >
              <View style={styles.recipeCopy}>
                <Text style={[styles.recipeTitle, { color: tokens.colors.text.heading }]}>{recipe.title}</Text>
                <Text style={[styles.recipeBody, { color: tokens.colors.text.body }]}>{recipe.useFor}</Text>
                <Text style={[styles.recipeSpec, { color: tokens.colors.text.muted }]}>{`Spec: elevation.${recipe.level}`}</Text>
              </View>
              <View style={styles.recipePreview}>
                <Panel elevation={recipe.level} r="xl">
                  <Text style={[styles.previewTitle, { color: tokens.colors.text.heading }]}>{recipe.title}</Text>
                  <Text style={[styles.previewBody, { color: tokens.colors.text.muted }]}>
                    Use one clear depth story per surface family.
                  </Text>
                </Panel>
              </View>
            </View>
          ))}
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
        <Text style={[styles.sectionTitle, { color: tokens.colors.text.heading }]}>Favor restraint over spectacle</Text>
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
        <Text style={[styles.sectionTitle, { color: tokens.colors.text.heading }]}>Reference the levels after the hierarchy is clear</Text>
        <Text style={[styles.sectionIntro, { color: tokens.colors.text.subtle }]}>
          Shadow tokens support the depth model, but they should not define it on their own.
        </Text>
        <View style={styles.inventoryStack}>
          {hierarchy.map((item, index) => (
            <View
              key={item.level}
              style={[
                styles.inventoryItem,
                {
                  zIndex: hierarchy.length - index,
                  marginTop: index === 0 ? 0 : -6,
                },
              ]}
            >
              <Panel elevation={item.level} r="2xl">
                <Text style={[styles.previewTitle, { color: tokens.colors.text.heading }]}>{`elevation.${item.level}`}</Text>
                <Text style={[styles.previewBody, { color: tokens.colors.text.muted }]}>{item.detail}</Text>
              </Panel>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const meta = {
  title: "Design System/Foundations/Elevation",
  component: FoundationsElevationPreview,
  parameters: {
    notes: "Decision-first elevation guidance covering depth model, usage patterns, guardrails, and level reference.",
  },
} satisfies Meta<typeof FoundationsElevationPreview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Elevation: Story = {};

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
  hierarchyList: {
    gap: space.sm,
  },
  hierarchyCard: {
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: space.md,
    gap: space.sm,
  },
  hierarchyTitle: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "700",
  },
  hierarchyBody: {
    fontSize: 14,
    lineHeight: 21,
  },
  hierarchyPreview: {
    marginTop: space.xs,
  },
  previewTitle: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "700",
    textTransform: "capitalize",
  },
  previewBody: {
    marginTop: 4,
    fontSize: 12,
    lineHeight: 18,
  },
  recipeList: {
    gap: space.sm,
  },
  recipeCard: {
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: space.md,
    gap: space.sm,
  },
  recipeCopy: {
    gap: 4,
  },
  recipeTitle: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "700",
  },
  recipeBody: {
    fontSize: 14,
    lineHeight: 21,
  },
  recipeSpec: {
    fontSize: 12,
    lineHeight: 18,
  },
  recipePreview: {
    marginTop: space.xs,
  },
  guardrailList: {
    gap: space.xs,
  },
  guardrailItem: {
    fontSize: 13,
    lineHeight: 20,
  },
  inventoryStack: {
    gap: space.sm,
    paddingBottom: space.xs,
  },
  inventoryItem: {
    width: "100%",
  },
});
