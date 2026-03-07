import type { Meta, StoryObj } from "@storybook/react-native";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { useTheme } from "@/src/design-system/theme/useTheme";
import { radius, shadow, space } from "@/src/design-system/tokens";

const spacingScale: (keyof typeof space)[] = ["2xs", "xs", "sm", "md", "lg", "xl", "2xl"];

const rhythmModel = [
  {
    title: "Stack spacing",
    detail: "Use parent-owned gaps to separate sibling rows, fields, and cards in one flow.",
    spec: "Common decision: md between repeated items.",
  },
  {
    title: "Inset spacing",
    detail: "Use padding to create breathing room inside cards, inputs, banners, and sheets.",
    spec: "Common decision: lg for default surfaces.",
  },
  {
    title: "Section spacing",
    detail: "Use larger jumps only when content changes context or priority.",
    spec: "Common decision: 2xl between content groups.",
  },
] as const;

const recipes = [
  {
    title: "Card layout",
    useFor: "Surface title, body copy, and supporting content.",
    spec: "Inset = lg, internal stack = xs-sm.",
    visual: "card",
  },
  {
    title: "Form section",
    useFor: "Labels, helper copy, and fields that read as one unit.",
    spec: "Field stack = md, section break = xl-2xl.",
    visual: "form",
  },
  {
    title: "Screen stack",
    useFor: "Full-screen composition with hero, content, and secondary groups.",
    spec: "Screen gutter = lg, section gap = 2xl.",
    visual: "screen",
  },
] as const;

const guardrails = [
  "Parent containers own spacing. Child items should rarely set outer margins.",
  "Do not mix gap and one-off item margins for the same vertical stack.",
  "Use larger spacing to separate meaningfully different groups, not to hide weak hierarchy.",
  "Keep control sizing aligned to shared control tokens instead of ad hoc padding.",
] as const;

function FoundationsSpacingPreview() {
  const { tokens } = useTheme();

  return (
    <ScrollView contentContainerStyle={[styles.canvas, { backgroundColor: tokens.colors.bg.app }]}>
      <View style={styles.hero}>
        <Text style={[styles.eyebrow, { color: tokens.colors.text.muted }]}>Design System</Text>
        <Text style={[styles.title, { color: tokens.colors.text.heading }]}>Spacing</Text>
        <Text style={[styles.subtitle, { color: tokens.colors.text.subtle }]}>
          Spacing helps you decide how close things belong together. It defines layout rhythm before any component or
          screen starts adding visual polish. Foundations define the visual primitives that Layout, UI, and Components
          build upon.
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
        <Text style={[styles.sectionTitle, { color: tokens.colors.text.heading }]}>Start with ownership, not pixel math</Text>
        <Text style={[styles.sectionIntro, { color: tokens.colors.text.subtle }]}>
          Use spacing to express relationship. Parent containers own rhythm, while child elements focus on content and
          alignment.
        </Text>
        <View style={styles.modelGrid}>
          {rhythmModel.map((item) => (
            <View
              key={item.title}
              style={[
                styles.modelCard,
                {
                  backgroundColor: tokens.colors.bg.field,
                  borderColor: tokens.colors.border.soft,
                },
              ]}
            >
              <Text style={[styles.modelTitle, { color: tokens.colors.text.heading }]}>{item.title}</Text>
              <Text style={[styles.modelBody, { color: tokens.colors.text.body }]}>{item.detail}</Text>
              <Text style={[styles.modelSpec, { color: tokens.colors.text.muted }]}>{item.spec}</Text>
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
        <Text style={[styles.sectionTitle, { color: tokens.colors.text.heading }]}>Compose screens by rhythm, not by one-off gaps</Text>
        <Text style={[styles.sectionIntro, { color: tokens.colors.text.subtle }]}>
          These recipes show where spacing decisions usually land in product work: inside surfaces, between repeated
          items, and across larger content sections.
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
                <Text style={[styles.recipeMeta, { color: tokens.colors.text.body }]}>{recipe.useFor}</Text>
                <Text style={[styles.recipeSpec, { color: tokens.colors.text.muted }]}>{recipe.spec}</Text>
              </View>

              <View
                style={[
                  styles.recipeVisual,
                  {
                    borderColor: tokens.colors.border.default,
                    backgroundColor: tokens.colors.bg.surface,
                  },
                ]}
              >
                {recipe.visual === "card" ? (
                  <View
                    style={[
                      styles.cardDemo,
                      {
                        borderColor: tokens.colors.border.default,
                        backgroundColor: tokens.colors.bg.banner,
                      },
                    ]}
                  >
                    <View style={[styles.demoLineShort, { backgroundColor: tokens.colors.focus.glow }]} />
                    <View style={[styles.demoLine, { backgroundColor: tokens.colors.bg.field }]} />
                    <View style={[styles.demoLine, { backgroundColor: tokens.colors.bg.field }]} />
                  </View>
                ) : null}

                {recipe.visual === "form" ? (
                  <View style={styles.formDemo}>
                    <View style={styles.formBlock}>
                      <View style={[styles.labelLine, { backgroundColor: tokens.colors.text.muted }]} />
                      <View
                        style={[
                          styles.fieldRow,
                          {
                            borderColor: tokens.colors.border.default,
                            backgroundColor: tokens.colors.bg.banner,
                          },
                        ]}
                      />
                    </View>
                    <View style={styles.formBlock}>
                      <View style={[styles.labelLineShort, { backgroundColor: tokens.colors.text.muted }]} />
                      <View
                        style={[
                          styles.fieldRow,
                          {
                            borderColor: tokens.colors.border.default,
                            backgroundColor: tokens.colors.bg.banner,
                          },
                        ]}
                      />
                    </View>
                  </View>
                ) : null}

                {recipe.visual === "screen" ? (
                  <View style={styles.screenDemo}>
                    <View style={styles.screenGroup}>
                      <View style={[styles.demoLineShort, { backgroundColor: tokens.colors.focus.glow }]} />
                      <View style={[styles.demoLine, { backgroundColor: tokens.colors.bg.field }]} />
                    </View>
                    <View style={styles.screenGroupLarge}>
                      <View
                        style={[
                          styles.screenSurface,
                          {
                            borderColor: tokens.colors.border.default,
                            backgroundColor: tokens.colors.bg.banner,
                          },
                        ]}
                      />
                      <View
                        style={[
                          styles.screenSurface,
                          {
                            borderColor: tokens.colors.border.default,
                            backgroundColor: tokens.colors.bg.banner,
                          },
                        ]}
                      />
                    </View>
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
        <Text style={[styles.sectionTitle, { color: tokens.colors.text.heading }]}>Keep spacing intentional and centralized</Text>
        <View style={styles.guardrailList}>
          {guardrails.map((rule) => (
            <Text key={rule} style={[styles.guardrailItem, { color: tokens.colors.text.body }]}>
              • {rule}
            </Text>
          ))}
        </View>
        <View
          style={[
            styles.guardrailCallout,
            {
              backgroundColor: tokens.colors.bg.field,
              borderColor: tokens.colors.border.soft,
            },
          ]}
        >
          <Text style={[styles.calloutLabel, { color: tokens.colors.text.heading }]}>Ownership rule</Text>
          <Text style={[styles.calloutText, { color: tokens.colors.text.subtle }]}>
            Prefer parent-managed `gap` for stacked UI. Reaching for per-item margins usually signals the layout
            responsibility is in the wrong place.
          </Text>
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
        <Text style={[styles.sectionTitle, { color: tokens.colors.text.heading }]}>Reference the scale after the layout decision is clear</Text>
        <Text style={[styles.sectionIntro, { color: tokens.colors.text.subtle }]}>
          The scale stays available for implementation details, but it should support a spacing decision rather than
          replace one.
        </Text>
        <View style={styles.inventoryList}>
          {spacingScale.map((key) => (
            <View key={key} style={styles.inventoryRow}>
              <View style={styles.inventoryHeader}>
                <Text style={[styles.inventoryLabel, { color: tokens.colors.text.body }]}>{key}</Text>
                <Text style={[styles.inventoryValue, { color: tokens.colors.text.muted }]}>{`${space[key]} px`}</Text>
              </View>
              <View style={[styles.inventoryTrack, { backgroundColor: tokens.colors.bg.field }]}>
                <View style={[styles.inventoryBar, { width: space[key], backgroundColor: tokens.colors.focus.glow }]} />
              </View>
            </View>
          ))}
        </View>

        <View
          style={[
            styles.controlSpec,
            {
              borderColor: tokens.colors.border.default,
              backgroundColor: tokens.colors.bg.field,
            },
          ]}
        >
          <Text style={[styles.controlSpecTitle, { color: tokens.colors.text.heading }]}>Shared control baseline</Text>
          <View style={styles.controlSpecList}>
            <View style={styles.controlSpecRow}>
              <Text style={[styles.controlSpecLabel, { color: tokens.colors.text.body }]}>height.md</Text>
              <Text style={[styles.controlSpecValue, { color: tokens.colors.text.muted }]}>{`${tokens.control.height.md}px`}</Text>
            </View>
            <View style={styles.controlSpecRow}>
              <Text style={[styles.controlSpecLabel, { color: tokens.colors.text.body }]}>paddingX.md</Text>
              <Text style={[styles.controlSpecValue, { color: tokens.colors.text.muted }]}>{`${tokens.control.paddingX.md}px`}</Text>
            </View>
            <View style={styles.controlSpecRow}>
              <Text style={[styles.controlSpecLabel, { color: tokens.colors.text.body }]}>paddingY.md</Text>
              <Text style={[styles.controlSpecValue, { color: tokens.colors.text.muted }]}>{`${tokens.control.paddingY.md}px`}</Text>
            </View>
            <View style={styles.controlSpecRow}>
              <Text style={[styles.controlSpecLabel, { color: tokens.colors.text.body }]}>radius.md</Text>
              <Text style={[styles.controlSpecValue, { color: tokens.colors.text.muted }]}>{`${tokens.control.radius.md}px`}</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const meta = {
  title: "Design System/Foundations/Spacing",
  component: FoundationsSpacingPreview,
  parameters: {
    notes: "Decision-first spacing guidance with rhythm model, recipes, guardrails, and token reference.",
  },
} satisfies Meta<typeof FoundationsSpacingPreview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Spacing: Story = {};

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
  modelGrid: {
    gap: space.sm,
  },
  modelCard: {
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: space.md,
    gap: space.xs,
  },
  modelTitle: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "700",
  },
  modelBody: {
    fontSize: 14,
    lineHeight: 21,
  },
  modelSpec: {
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
  recipeMeta: {
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
    padding: space.md,
    minHeight: 92,
    justifyContent: "center",
  },
  cardDemo: {
    borderWidth: 1,
    borderRadius: radius.md,
    padding: space.md,
    gap: space.xs,
  },
  demoLine: {
    height: 8,
    borderRadius: radius.sm,
  },
  demoLineShort: {
    width: "48%",
    height: 8,
    borderRadius: radius.sm,
  },
  formDemo: {
    gap: space.md,
  },
  formBlock: {
    gap: space.xs,
  },
  labelLine: {
    width: "36%",
    height: 8,
    borderRadius: radius.sm,
  },
  labelLineShort: {
    width: "28%",
    height: 8,
    borderRadius: radius.sm,
  },
  fieldRow: {
    height: 42,
    borderWidth: 1,
    borderRadius: radius.md,
  },
  screenDemo: {
    gap: space.lg,
  },
  screenGroup: {
    gap: space.sm,
  },
  screenGroupLarge: {
    gap: space.md,
  },
  screenSurface: {
    borderWidth: 1,
    borderRadius: radius.md,
    height: 44,
  },
  guardrailList: {
    gap: space.xs,
  },
  guardrailItem: {
    fontSize: 13,
    lineHeight: 20,
  },
  guardrailCallout: {
    marginTop: space.xs,
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: space.md,
    gap: 4,
  },
  calloutLabel: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "700",
  },
  calloutText: {
    fontSize: 13,
    lineHeight: 20,
  },
  inventoryList: {
    gap: space.md,
  },
  inventoryRow: {
    gap: space.xs,
  },
  inventoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inventoryLabel: {
    fontSize: 14,
    lineHeight: 19,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  inventoryValue: {
    fontSize: 12,
    lineHeight: 18,
  },
  inventoryTrack: {
    height: 12,
    borderRadius: 999,
    justifyContent: "center",
    paddingHorizontal: 2,
  },
  inventoryBar: {
    height: 8,
    borderRadius: 999,
  },
  controlSpec: {
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: space.md,
    gap: space.sm,
  },
  controlSpecTitle: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "700",
  },
  controlSpecList: {
    gap: space.xs,
  },
  controlSpecRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  controlSpecLabel: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "600",
  },
  controlSpecValue: {
    fontSize: 12,
    lineHeight: 18,
  },
});
