import type { Meta, StoryObj } from "@storybook/react-native";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { useTheme } from "@/src/design-system/theme/useTheme";
import { radius, shadow, space } from "@/src/design-system/tokens";

type TypeSpec = {
  name: string;
  fontSize: number;
  lineHeight: number;
  fontWeight: "400" | "500" | "700" | "800";
  sample: string;
  usage: string;
};

const typeScale: TypeSpec[] = [
  {
    name: "Headline",
    fontSize: 30,
    lineHeight: 36,
    fontWeight: "800",
    sample: "Find a profile that matches your workflow.",
    usage: "Use for page titles and primary narrative moments.",
  },
  {
    name: "Title",
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "800",
    sample: "Your next step can be simple.",
    usage: "Use for section headers, cards, and prominent labels.",
  },
  {
    name: "Body",
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "400",
    sample: "Availability updates in real time across team profiles.",
    usage: "Use for reading text, descriptions, and instructions.",
  },
  {
    name: "Caption",
    fontSize: 13,
    lineHeight: 19,
    fontWeight: "500",
    sample: "Private, calm, and on your terms.",
    usage: "Use for metadata, helper copy, and supporting context.",
  },
];

const guardrails = [
  "Use subtle and caption styles for support, not for primary instructions.",
  "Break long paragraphs into short readable chunks instead of compressing line height.",
  "Reserve headline and title weights for moments that need clear hierarchy.",
  "Do not stack multiple emphatic styles in one small surface.",
] as const;

function FoundationsTypographyPreview() {
  const { tokens } = useTheme();

  return (
    <ScrollView contentContainerStyle={[styles.canvas, { backgroundColor: tokens.colors.bg.app }]}>
      <View style={styles.hero}>
        <Text style={[styles.eyebrow, { color: tokens.colors.text.muted }]}>Design System</Text>
        <Text style={[styles.title, { color: tokens.colors.text.heading }]}>Typography</Text>
        <Text style={[styles.subtitle, { color: tokens.colors.text.subtle }]}>
          Typography helps you decide what needs emphasis, what needs rhythm, and what should quietly support the rest
          of the interface. Foundations define the visual primitives that Layout, UI, and Components build upon.
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
        <Text style={[styles.sectionTitle, { color: tokens.colors.text.heading }]}>Start with text role before picking weight</Text>
        <Text style={[styles.sectionIntro, { color: tokens.colors.text.subtle }]}>
          The scale is intentionally small. Most product decisions come down to choosing whether the text should lead,
          support, explain, or annotate.
        </Text>
        <View style={styles.roleGrid}>
          {typeScale.map((spec) => (
            <View
              key={spec.name}
              style={[
                styles.roleCard,
                {
                  backgroundColor: tokens.colors.bg.field,
                  borderColor: tokens.colors.border.soft,
                },
              ]}
            >
              <Text
                style={[
                  styles.roleSample,
                  {
                    color: tokens.colors.text.heading,
                    fontSize: spec.fontSize,
                    lineHeight: spec.lineHeight,
                    fontWeight: spec.fontWeight,
                  },
                ]}
              >
                {spec.sample}
              </Text>
              <View style={styles.roleMeta}>
                <Text style={[styles.roleTitle, { color: tokens.colors.text.heading }]}>{spec.name}</Text>
                <Text style={[styles.roleSpec, { color: tokens.colors.text.muted }]}>
                  {`${spec.fontSize} / ${spec.lineHeight} • weight ${spec.fontWeight}`}
                </Text>
                <Text style={[styles.roleBody, { color: tokens.colors.text.body }]}>{spec.usage}</Text>
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
        <Text style={[styles.sectionTitle, { color: tokens.colors.text.heading }]}>Use hierarchy to make reading easier, not louder</Text>
        <Text style={[styles.sectionIntro, { color: tokens.colors.text.subtle }]}>
          Good type rhythm keeps a screen scannable. The strongest pattern is usually one leading text role supported by
          one body style and one caption style.
        </Text>

        <View style={styles.exampleGrid}>
          <View
            style={[
              styles.exampleCard,
              {
                backgroundColor: tokens.colors.bg.field,
                borderColor: tokens.colors.border.default,
              },
            ]}
          >
            <Text style={[styles.exampleLabel, { color: tokens.colors.status.success.body }]}>Do</Text>
            <Text style={[styles.exampleHeadline, { color: tokens.colors.text.heading }]}>Browse profiles</Text>
            <Text style={[styles.exampleBody, { color: tokens.colors.text.body }]}>
              Browse profiles by focus area, language, and availability.
            </Text>
            <Text style={[styles.exampleCaption, { color: tokens.colors.text.muted }]}>Headline + body + caption when needed</Text>
          </View>

          <View
            style={[
              styles.exampleCard,
              {
                backgroundColor: tokens.colors.status.danger.bg,
                borderColor: tokens.colors.status.danger.border,
              },
            ]}
          >
            <Text style={[styles.exampleLabel, { color: tokens.colors.status.error.body }]}>Avoid</Text>
            <Text style={[styles.avoidTitle, { color: tokens.colors.text.subtle }]}>
              subtitle text carrying the full instruction stack with no clear emphasis
            </Text>
            <Text style={[styles.exampleCaption, { color: tokens.colors.text.muted }]}>Collapsed hierarchy makes dense content harder to scan</Text>
          </View>
        </View>

        <View style={styles.recipeList}>
          <View
            style={[
              styles.recipeCard,
              {
                backgroundColor: tokens.colors.bg.field,
                borderColor: tokens.colors.border.soft,
              },
            ]}
          >
            <Text style={[styles.recipeTitle, { color: tokens.colors.text.heading }]}>Page lead</Text>
            <Text style={[styles.recipeHeadline, { color: tokens.colors.text.heading }]}>Calm care on your terms.</Text>
            <Text style={[styles.recipeBody, { color: tokens.colors.text.body }]}>
              Use headline for the decision anchor, then body text for the explanation.
            </Text>
          </View>

          <View
            style={[
              styles.recipeCard,
              {
                backgroundColor: tokens.colors.bg.field,
                borderColor: tokens.colors.border.soft,
              },
            ]}
          >
            <Text style={[styles.recipeTitle, { color: tokens.colors.text.heading }]}>Content card</Text>
            <Text style={[styles.recipeTitleText, { color: tokens.colors.text.heading }]}>Dr. Maya Patel</Text>
            <Text style={[styles.recipeBody, { color: tokens.colors.text.body }]}>
              Trauma-informed care for anxiety, burnout, and life transitions.
            </Text>
            <Text style={[styles.recipeCaption, { color: tokens.colors.text.muted }]}>Title + body + caption</Text>
          </View>

          <View
            style={[
              styles.recipeCard,
              {
                backgroundColor: tokens.colors.bg.field,
                borderColor: tokens.colors.border.soft,
              },
            ]}
          >
            <Text style={[styles.recipeTitle, { color: tokens.colors.text.heading }]}>Form guidance</Text>
            <Text style={[styles.recipeCaptionStrong, { color: tokens.colors.text.heading }]}>Email</Text>
            <Text style={[styles.recipeCaption, { color: tokens.colors.text.muted }]}>We&apos;ll send confirmations here.</Text>
            <Text style={[styles.recipeCaption, { color: tokens.colors.status.error.body }]}>
              Please enter a valid email address.
            </Text>
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
        <Text style={[styles.sectionTitle, { color: tokens.colors.text.heading }]}>Keep hierarchy calm and legible</Text>
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
        <Text style={[styles.sectionTitle, { color: tokens.colors.text.heading }]}>Keep the raw spec available, but secondary</Text>
        <Text style={[styles.sectionIntro, { color: tokens.colors.text.subtle }]}>
          Use the spec to implement the chosen role, not to reverse-engineer which role the text should play.
        </Text>
        <View style={styles.inventoryList}>
          {typeScale.map((spec) => (
            <View
              key={spec.name}
              style={[
                styles.inventoryCard,
                {
                  backgroundColor: tokens.colors.bg.field,
                  borderColor: tokens.colors.border.soft,
                },
              ]}
            >
              <Text
                style={[
                  styles.inventorySample,
                  {
                    color: tokens.colors.text.heading,
                    fontSize: spec.fontSize,
                    lineHeight: spec.lineHeight,
                    fontWeight: spec.fontWeight,
                  },
                ]}
              >
                {spec.name}
              </Text>
              <Text style={[styles.inventoryMeta, { color: tokens.colors.text.muted }]}>
                {`${spec.fontSize}px / ${spec.lineHeight}px / ${spec.fontWeight}`}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const meta = {
  title: "Design System/Foundations/Typography",
  component: FoundationsTypographyPreview,
  parameters: {
    notes: "Decision-first typography guidance covering text roles, hierarchy examples, guardrails, and scale reference.",
  },
} satisfies Meta<typeof FoundationsTypographyPreview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Typography: Story = {};

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
  roleGrid: {
    gap: space.sm,
  },
  roleCard: {
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: space.md,
    gap: space.sm,
  },
  roleSample: {
    letterSpacing: -0.15,
  },
  roleMeta: {
    gap: 4,
  },
  roleTitle: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "700",
  },
  roleSpec: {
    fontSize: 12,
    lineHeight: 18,
  },
  roleBody: {
    fontSize: 13,
    lineHeight: 20,
  },
  exampleGrid: {
    gap: space.sm,
  },
  exampleCard: {
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: space.md,
    gap: 4,
  },
  exampleLabel: {
    fontSize: 11,
    lineHeight: 16,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  exampleHeadline: {
    fontSize: 30,
    lineHeight: 36,
    fontWeight: "800",
    letterSpacing: -0.15,
  },
  exampleBody: {
    fontSize: 15,
    lineHeight: 22,
  },
  exampleCaption: {
    fontSize: 12,
    lineHeight: 18,
  },
  avoidTitle: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "500",
  },
  recipeList: {
    gap: space.sm,
  },
  recipeCard: {
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: space.md,
    gap: 4,
  },
  recipeTitle: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  recipeHeadline: {
    fontSize: 30,
    lineHeight: 36,
    fontWeight: "800",
    letterSpacing: -0.15,
  },
  recipeTitleText: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "800",
    letterSpacing: -0.15,
  },
  recipeBody: {
    fontSize: 15,
    lineHeight: 22,
  },
  recipeCaption: {
    fontSize: 13,
    lineHeight: 19,
    fontWeight: "500",
  },
  recipeCaptionStrong: {
    fontSize: 13,
    lineHeight: 19,
    fontWeight: "700",
  },
  guardrailList: {
    gap: space.xs,
  },
  guardrailItem: {
    fontSize: 13,
    lineHeight: 20,
  },
  inventoryList: {
    gap: space.sm,
  },
  inventoryCard: {
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: space.md,
    gap: 4,
  },
  inventorySample: {
    letterSpacing: -0.15,
    textTransform: "capitalize",
  },
  inventoryMeta: {
    fontSize: 12,
    lineHeight: 18,
  },
});
