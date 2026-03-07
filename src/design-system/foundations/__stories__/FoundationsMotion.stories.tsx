import type { Meta, StoryObj } from "@storybook/react-native";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { useTheme } from "@/src/design-system/theme/useTheme";
import { motion } from "@/src/design-system/tokens/motion";
import { radius, shadow, space } from "@/src/design-system/tokens";

const motionIntent = [
  {
    title: "Feedback",
    detail: "Use quick motion to confirm that a press, toggle, or selection was recognized.",
  },
  {
    title: "Transition",
    detail: "Use motion to help the eye follow changes in state, navigation, or layered context.",
  },
  {
    title: "Emphasis",
    detail: "Use motion sparingly to draw attention to one important change, not to decorate every surface.",
  },
] as const;

const recipes = [
  {
    title: "Press feedback",
    useFor: "Tap response on buttons and compact interactive elements.",
    spec: "duration.fast + easing.standard",
    visual: "press",
  },
  {
    title: "Expand / collapse",
    useFor: "Disclosure sections, accordion rows, and progressive detail.",
    spec: "duration.normal + easing.standard",
    visual: "expand",
  },
  {
    title: "Modal entrance",
    useFor: "Sheets and overlays that interrupt the page with a clear layer change.",
    spec: "duration.slow + easing.decelerate",
    visual: "modal",
  },
  {
    title: "List transition",
    useFor: "Insert, remove, or reorder items while preserving continuity.",
    spec: "duration.normal + easing.decelerate",
    visual: "list",
  },
] as const;

const guardrails = [
  "Motion should guide attention, not compete with content.",
  "Keep micro interactions fast enough to feel responsive on handheld devices.",
  "Use easing presets consistently so screens feel like one product, not many experiments.",
  "Save slower, more noticeable motion for overlays and larger state changes.",
] as const;

function FoundationsMotionPreview() {
  const { tokens } = useTheme();

  return (
    <ScrollView contentContainerStyle={[styles.canvas, { backgroundColor: tokens.colors.bg.app }]}>
      <View style={styles.hero}>
        <Text style={[styles.eyebrow, { color: tokens.colors.text.muted }]}>Design System</Text>
        <Text style={[styles.title, { color: tokens.colors.text.heading }]}>Motion</Text>
        <Text style={[styles.subtitle, { color: tokens.colors.text.subtle }]}>
          Motion helps you decide why something should move. Timing and easing matter most when they reinforce clarity,
          continuity, and confidence. Foundations define the visual primitives that Layout, UI, and Components build
          upon.
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
        <Text style={[styles.sectionTitle, { color: tokens.colors.text.heading }]}>Start with intent, then choose timing</Text>
        <Text style={[styles.sectionIntro, { color: tokens.colors.text.subtle }]}>
          Most motion decisions fall into three buckets: immediate feedback, state transition, or controlled emphasis.
          Pick the intent first, then map to the right duration and easing preset.
        </Text>
        <View style={styles.intentList}>
          {motionIntent.map((item) => (
            <View
              key={item.title}
              style={[
                styles.intentCard,
                {
                  backgroundColor: tokens.colors.bg.field,
                  borderColor: tokens.colors.border.soft,
                },
              ]}
            >
              <Text style={[styles.intentTitle, { color: tokens.colors.text.heading }]}>{item.title}</Text>
              <Text style={[styles.intentBody, { color: tokens.colors.text.body }]}>{item.detail}</Text>
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
        <Text style={[styles.sectionTitle, { color: tokens.colors.text.heading }]}>Use a small set of approved motion recipes</Text>
        <Text style={[styles.sectionIntro, { color: tokens.colors.text.subtle }]}>
          Repeated recipes make the product feel consistent. These are the transitions most worth standardizing because
          they appear frequently and shape the overall feel of the interface.
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
              <Text style={[styles.recipeTitle, { color: tokens.colors.text.heading }]}>{recipe.title}</Text>
              <Text style={[styles.recipeBody, { color: tokens.colors.text.body }]}>{recipe.useFor}</Text>
              <Text style={[styles.recipeSpec, { color: tokens.colors.text.muted }]}>{recipe.spec}</Text>

              <View
                style={[
                  styles.recipeVisual,
                  {
                    borderColor: tokens.colors.border.default,
                    backgroundColor: tokens.colors.bg.banner,
                  },
                  recipe.visual === "press" ? styles.recipeVisualPress : null,
                  recipe.visual === "modal" ? styles.recipeVisualModal : null,
                  recipe.visual === "expand" ? styles.recipeVisualExpand : null,
                ]}
              >
                {recipe.visual === "press" ? (
                  <View style={[styles.pressSurface, { backgroundColor: tokens.colors.focus.glow }]} />
                ) : null}

                {recipe.visual === "expand" ? (
                  <View style={styles.expandStack}>
                    <View style={[styles.expandLine, { backgroundColor: tokens.colors.focus.glow }]} />
                    <View style={[styles.expandLineWide, { backgroundColor: tokens.colors.bg.field }]} />
                    <View style={[styles.expandLineShort, { backgroundColor: tokens.colors.bg.field }]} />
                  </View>
                ) : null}

                {recipe.visual === "modal" ? (
                  <View
                    style={[
                      styles.modalSurface,
                      {
                        backgroundColor: tokens.colors.bg.surface,
                        borderColor: tokens.colors.border.default,
                      },
                    ]}
                  />
                ) : null}

                {recipe.visual === "list" ? (
                  <View style={styles.listStack}>
                    <View style={[styles.listItem, { backgroundColor: tokens.colors.bg.field }]} />
                    <View style={[styles.listItem, { backgroundColor: tokens.colors.focus.glow }]} />
                    <View style={[styles.listItem, { backgroundColor: tokens.colors.bg.field }]} />
                  </View>
                ) : null}
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
        <Text style={[styles.sectionTitle, { color: tokens.colors.text.heading }]}>Keep motion helpful and restrained</Text>
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
        <Text style={[styles.sectionTitle, { color: tokens.colors.text.heading }]}>Use token values after the interaction intent is decided</Text>
        <Text style={[styles.sectionIntro, { color: tokens.colors.text.subtle }]}>
          Durations and easing presets are implementation details that help the chosen motion recipe stay consistent.
        </Text>

        <View
          style={[
            styles.inventoryCard,
            {
              backgroundColor: tokens.colors.bg.field,
              borderColor: tokens.colors.border.soft,
            },
          ]}
        >
          <Text style={[styles.inventoryTitle, { color: tokens.colors.text.heading }]}>Durations</Text>
          <View style={styles.inventoryList}>
            {Object.entries(motion.duration).map(([key, value]) => (
              <View key={key} style={styles.inventoryRow}>
                <Text style={[styles.inventoryLabel, { color: tokens.colors.text.body }]}>{key}</Text>
                <Text style={[styles.inventoryValue, { color: tokens.colors.text.muted }]}>{`${value}ms`}</Text>
              </View>
            ))}
          </View>
        </View>

        <View
          style={[
            styles.inventoryCard,
            {
              backgroundColor: tokens.colors.bg.field,
              borderColor: tokens.colors.border.soft,
            },
          ]}
        >
          <Text style={[styles.inventoryTitle, { color: tokens.colors.text.heading }]}>Easing presets</Text>
          <View style={styles.inventoryList}>
            {Object.entries(motion.easing).map(([key, value]) => (
              <View key={key} style={styles.inventoryRow}>
                <Text style={[styles.inventoryLabel, { color: tokens.colors.text.body }]}>{key}</Text>
                <Text style={[styles.inventoryValue, { color: tokens.colors.text.muted }]}>{`cubic-bezier(${value.join(", ")})`}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const meta = {
  title: "Design System/Foundations/Motion",
  component: FoundationsMotionPreview,
  parameters: {
    notes: "Decision-first motion guidance covering intent, recipes, guardrails, and token reference.",
  },
} satisfies Meta<typeof FoundationsMotionPreview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Motion: Story = {};

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
  intentList: {
    gap: space.sm,
  },
  intentCard: {
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: space.md,
    gap: space.xs,
  },
  intentTitle: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "700",
  },
  intentBody: {
    fontSize: 14,
    lineHeight: 21,
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
  recipeVisual: {
    borderWidth: 1,
    borderRadius: radius.lg,
    minHeight: 72,
    padding: space.md,
    justifyContent: "center",
  },
  recipeVisualPress: {
    width: 176,
    minHeight: 56,
  },
  recipeVisualExpand: {
    minHeight: 96,
  },
  recipeVisualModal: {
    minHeight: 108,
  },
  pressSurface: {
    width: 132,
    height: 34,
    borderRadius: radius.sm,
  },
  expandStack: {
    gap: space.xs,
  },
  expandLine: {
    width: "38%",
    height: 8,
    borderRadius: radius.sm,
  },
  expandLineWide: {
    width: "100%",
    height: 22,
    borderRadius: radius.md,
  },
  expandLineShort: {
    width: "72%",
    height: 22,
    borderRadius: radius.md,
  },
  modalSurface: {
    width: "100%",
    height: 68,
    borderWidth: 1,
    borderRadius: radius.xl,
  },
  listStack: {
    gap: space.xs,
  },
  listItem: {
    height: 14,
    borderRadius: radius.sm,
  },
  guardrailList: {
    gap: space.xs,
  },
  guardrailItem: {
    fontSize: 13,
    lineHeight: 20,
  },
  inventoryCard: {
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: space.md,
    gap: space.sm,
  },
  inventoryTitle: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "700",
  },
  inventoryList: {
    gap: space.xs,
  },
  inventoryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: space.sm,
  },
  inventoryLabel: {
    fontSize: 13,
    lineHeight: 18,
    textTransform: "capitalize",
  },
  inventoryValue: {
    fontSize: 11,
    lineHeight: 16,
    flexShrink: 1,
    textAlign: "right",
  },
});
