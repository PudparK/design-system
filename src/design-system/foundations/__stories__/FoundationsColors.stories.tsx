import type { Meta, StoryObj } from "@storybook/react-native";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { useTheme } from "@/src/design-system/theme/useTheme";
import { radius, shadow, space } from "@/src/design-system/tokens";

type SwatchItem = {
  label: string;
  token: string;
  value: string;
  sampleText?: string;
  note?: string;
  badge?: string;
};

type LineItem = {
  label: string;
  token: string;
  value: string;
  thickness: number;
  hint?: string;
  usage?: string;
};

type PairingItem = {
  recipe: string;
  useFor: string;
  label: string;
  backgroundLabel: string;
  backgroundToken: string;
  backgroundValue: string;
  foregroundLabel: string;
  foregroundToken: string;
  foregroundValue: string;
  sampleText: string;
};

const semanticRoles = [
  {
    title: "Backgrounds",
    detail: "Choose the app canvas and surface family first. It sets the contrast budget for everything above it.",
  },
  {
    title: "Text",
    detail: "Use text roles to communicate hierarchy. Tone should come from semantic meaning, not arbitrary shade picks.",
  },
  {
    title: "Borders",
    detail: "Borders define edges and separators. They support structure more often than emphasis.",
  },
  {
    title: "Accent",
    detail: "Use brand and focus colors to guide action, highlight state, and create on-brand emphasis.",
  },
  {
    title: "Status",
    detail: "Reserve status colors for system meaning like success, warning, danger, and inline validation.",
  },
] as const;

const guardrails = [
  "Avoid hardcoded colors in feature or component code. Reach for semantic tokens first.",
  "Do not use status colors as decorative accents or brand substitutes.",
  "Keep foreground and background pairings semantic so contrast and meaning stay consistent.",
  "Choose one primary accent moment per surface instead of scattering emphasis everywhere.",
] as const;

function getForegroundHint(tokenPath: string): string {
  const prefersInverse = [
    "palette.primary",
    "tokens.colors.focus.glow",
    "tokens.colors.focus.border",
    "tokens.colors.status.warning.text",
    "tokens.colors.status.danger.text",
    "tokens.colors.status.success.body",
  ];

  return prefersInverse.includes(tokenPath) ? "Use textInverse" : "Use textPrimary";
}

function parseColorToRgb(color: string): { r: number; g: number; b: number } | null {
  const hex = color.trim().toLowerCase();
  if (hex.startsWith("#")) {
    const raw = hex.slice(1);
    if (raw.length === 3) {
      return {
        r: Number.parseInt(raw[0] + raw[0], 16),
        g: Number.parseInt(raw[1] + raw[1], 16),
        b: Number.parseInt(raw[2] + raw[2], 16),
      };
    }
    if (raw.length === 6) {
      return {
        r: Number.parseInt(raw.slice(0, 2), 16),
        g: Number.parseInt(raw.slice(2, 4), 16),
        b: Number.parseInt(raw.slice(4, 6), 16),
      };
    }
  }

  const rgbaMatch = color.match(/rgba?\(([^)]+)\)/i);
  if (rgbaMatch) {
    const [r, g, b] = rgbaMatch[1]
      .split(",")
      .slice(0, 3)
      .map((part) => Number.parseFloat(part.trim()));
    if ([r, g, b].every((channel) => Number.isFinite(channel))) {
      return { r, g, b };
    }
  }

  return null;
}

function getReadableTextColor(backgroundColor: string, darkColor: string, lightColor: string): string {
  const rgb = parseColorToRgb(backgroundColor);
  if (!rgb) {
    return darkColor;
  }

  const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
  return luminance > 0.62 ? darkColor : lightColor;
}

function formatColorValue(value: string): string {
  return value.replace(/#[0-9a-fA-F]{3,8}/g, (hex) => hex.toLowerCase());
}

function ColorRow({ item }: { item: SwatchItem }) {
  const { tokens } = useTheme();
  const sampleColor = getReadableTextColor(item.value, tokens.colors.text.heading, tokens.colors.text.onPrimary);
  const hint = getForegroundHint(item.token);

  return (
    <View style={styles.row}>
      <View
        style={[
          styles.swatch,
          {
            backgroundColor: item.value,
            borderColor: tokens.colors.border.default,
          },
        ]}
      >
        <Text style={[styles.swatchSample, { color: sampleColor }]}>{item.sampleText ?? "Aa Sample"}</Text>
      </View>
      <View style={styles.rowText}>
        <View style={styles.rowHeader}>
          <Text style={[styles.rowLabel, { color: tokens.colors.text.heading }]}>{item.label}</Text>
          {item.badge ? (
            <View
              style={[
                styles.rowBadge,
                {
                  borderColor: tokens.colors.border.soft,
                  backgroundColor: tokens.colors.bg.banner,
                },
              ]}
            >
              <Text style={[styles.rowBadgeText, { color: tokens.colors.text.muted }]}>{item.badge}</Text>
            </View>
          ) : null}
        </View>
        <Text style={[styles.rowToken, { color: tokens.colors.text.muted }]}>{item.token}</Text>
        <Text style={[styles.rowHint, { color: tokens.colors.text.subtle }]}>{hint}</Text>
        <Text style={[styles.rowValue, { color: tokens.colors.text.muted }]}>{formatColorValue(item.value)}</Text>
        {item.note ? <Text style={[styles.rowNote, { color: tokens.colors.text.subtle }]}>{item.note}</Text> : null}
      </View>
    </View>
  );
}

function LineRow({ item }: { item: LineItem }) {
  const { tokens } = useTheme();

  return (
    <View style={styles.lineRow}>
      <View style={styles.rowText}>
        <Text style={[styles.rowLabel, { color: tokens.colors.text.heading }]}>{item.label}</Text>
        <Text style={[styles.rowToken, { color: tokens.colors.text.muted }]}>{item.token}</Text>
        {item.usage ? <Text style={[styles.rowUsage, { color: tokens.colors.text.subtle }]}>{item.usage}</Text> : null}
        {item.hint ? <Text style={[styles.rowHint, { color: tokens.colors.text.subtle }]}>{item.hint}</Text> : null}
        <Text style={[styles.rowValue, { color: tokens.colors.text.muted }]}>{formatColorValue(item.value)}</Text>
      </View>
      <View style={styles.linePreviewWrap}>
        <View style={[styles.linePreview, { backgroundColor: item.value, height: item.thickness }]} />
      </View>
    </View>
  );
}

function PairingCard({ item }: { item: PairingItem }) {
  const { tokens } = useTheme();

  return (
    <View style={styles.pairCard}>
      <View style={[styles.pairPreview, { backgroundColor: item.backgroundValue }]}>
        <Text style={[styles.pairSample, { color: item.foregroundValue }]}>{item.sampleText}</Text>
      </View>
      <View style={styles.pairMeta}>
        <Text style={[styles.pairRecipe, { color: tokens.colors.text.heading }]}>{item.recipe}</Text>
        <Text style={[styles.pairUseFor, { color: tokens.colors.text.subtle }]}>{`Use for: ${item.useFor}`}</Text>
        <Text style={[styles.pairLabel, { color: tokens.colors.text.body }]}>{item.label}</Text>
        <Text style={[styles.pairToken, { color: tokens.colors.text.muted }]}>{`${item.foregroundLabel} (${item.foregroundToken})`}</Text>
        <Text style={[styles.pairToken, { color: tokens.colors.text.muted }]}>{`${item.backgroundLabel} (${item.backgroundToken})`}</Text>
      </View>
    </View>
  );
}

function FoundationsColorsPreview() {
  const { tokens, palette } = useTheme();

  const surfaceItems: SwatchItem[] = [
    { label: "surface", token: "tokens.colors.bg.surface", value: tokens.colors.bg.surface },
    { label: "surfaceSubtle", token: "tokens.colors.bg.field", value: tokens.colors.bg.field },
    { label: "background", token: "tokens.colors.bg.app", value: tokens.colors.bg.app },
    { label: "backgroundElevated", token: "tokens.colors.bg.banner", value: tokens.colors.bg.banner },
  ];

  const textItems: SwatchItem[] = [
    {
      label: "textPrimary",
      token: "tokens.colors.text.heading",
      value: tokens.colors.text.heading,
      sampleText: "Aa Heading",
    },
    {
      label: "textSecondary",
      token: "tokens.colors.text.body",
      value: tokens.colors.text.body,
      sampleText: "Aa Body",
    },
    {
      label: "textSubtle",
      token: "tokens.colors.text.subtle",
      value: tokens.colors.text.subtle,
      sampleText: "Aa Subtle",
    },
    {
      label: "textInverse",
      token: "tokens.colors.text.onPrimary",
      value: tokens.colors.text.onPrimary,
      sampleText: "Aa Inverse",
    },
  ];

  const borderItems: LineItem[] = [
    {
      label: "border",
      token: "tokens.colors.border.default",
      value: tokens.colors.border.default,
      thickness: 2,
      usage: "Outlines for surfaces and controls.",
    },
    {
      label: "divider",
      token: "tokens.colors.border.soft",
      value: tokens.colors.border.soft,
      thickness: 2,
      usage: "Separators between rows and sections.",
    },
    {
      label: "hairline",
      token: "tokens.colors.border.soft",
      value: tokens.colors.border.soft,
      thickness: 1,
      usage: "Subtle boundaries where depth already does most of the work.",
    },
  ];

  const accentItems: SwatchItem[] = [
    { label: "primary", token: "palette.primary", value: palette.primary },
    { label: "focusGlow", token: "tokens.colors.focus.glow", value: tokens.colors.focus.glow },
    { label: "focusBorder", token: "tokens.colors.focus.border", value: tokens.colors.focus.border },
  ];

  const statusItems: SwatchItem[] = [
    { label: "success", token: "tokens.colors.status.success.body", value: tokens.colors.status.success.body },
    { label: "warning", token: "tokens.colors.status.warning.text", value: tokens.colors.status.warning.text },
    { label: "danger", token: "tokens.colors.status.danger.text", value: tokens.colors.status.danger.text },
    {
      label: "errorBody",
      token: "tokens.colors.status.error.body",
      value: tokens.colors.status.error.body,
      badge: "Validation",
      note: "Use for error messaging copy, not for decorative emphasis.",
    },
  ];

  const pairingItems: PairingItem[] = [
    {
      recipe: "Default surface",
      useFor: "standard cards and sheets",
      label: "textPrimary on surface",
      foregroundLabel: "textPrimary",
      foregroundToken: "tokens.colors.text.heading",
      foregroundValue: tokens.colors.text.heading,
      backgroundLabel: "surface",
      backgroundToken: "tokens.colors.bg.surface",
      backgroundValue: tokens.colors.bg.surface,
      sampleText: "Find the right profile for your team.",
    },
    {
      recipe: "Card content",
      useFor: "supporting text inside cards",
      label: "textSecondary on surface",
      foregroundLabel: "textSecondary",
      foregroundToken: "tokens.colors.text.body",
      foregroundValue: tokens.colors.text.body,
      backgroundLabel: "surface",
      backgroundToken: "tokens.colors.bg.surface",
      backgroundValue: tokens.colors.bg.surface,
      sampleText: "Availability updates in real time.",
    },
    {
      recipe: "Muted background",
      useFor: "secondary context on app background",
      label: "textSubtle on background",
      foregroundLabel: "textSubtle",
      foregroundToken: "tokens.colors.text.subtle",
      foregroundValue: tokens.colors.text.subtle,
      backgroundLabel: "background",
      backgroundToken: "tokens.colors.bg.app",
      backgroundValue: tokens.colors.bg.app,
      sampleText: "Secure, private, and easy to use.",
    },
    {
      recipe: "Primary action",
      useFor: "primary CTAs and highlight blocks",
      label: "textInverse on primary",
      foregroundLabel: "textInverse",
      foregroundToken: "tokens.colors.text.onPrimary",
      foregroundValue: tokens.colors.text.onPrimary,
      backgroundLabel: "primary",
      backgroundToken: "palette.primary",
      backgroundValue: palette.primary,
      sampleText: "Book Session",
    },
    {
      recipe: "Elevated message",
      useFor: "banner-like elevated containers",
      label: "textPrimary on backgroundElevated",
      foregroundLabel: "textPrimary",
      foregroundToken: "tokens.colors.text.heading",
      foregroundValue: tokens.colors.text.heading,
      backgroundLabel: "backgroundElevated",
      backgroundToken: "tokens.colors.bg.banner",
      backgroundValue: tokens.colors.bg.banner,
      sampleText: "Your next step can be simple.",
    },
    {
      recipe: "Inline validation",
      useFor: "field feedback and system messaging",
      label: "errorBody on warning/danger field context",
      foregroundLabel: "errorBody",
      foregroundToken: "tokens.colors.status.error.body",
      foregroundValue: tokens.colors.status.error.body,
      backgroundLabel: "field",
      backgroundToken: "tokens.colors.bg.field",
      backgroundValue: tokens.colors.bg.field,
      sampleText: "Please review the highlighted details.",
    },
  ];

  return (
    <ScrollView contentContainerStyle={[styles.canvas, { backgroundColor: tokens.colors.bg.app }]}>
      <View style={styles.hero}>
        <Text style={[styles.eyebrow, { color: tokens.colors.text.muted }]}>Design System</Text>
        <Text style={[styles.title, { color: tokens.colors.text.heading }]}>Colors</Text>
        <Text style={[styles.subtitle, { color: tokens.colors.text.subtle }]}>
          Color helps you decide what something means before it decides how something looks. Start with semantic role,
          then choose the foreground and background pairing that preserves hierarchy and contrast. Foundations define
          the visual primitives that Layout, UI, and Components build upon.
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
        <Text style={[styles.sectionTitle, { color: tokens.colors.text.heading }]}>Color decisions begin with role, not shade</Text>
        <Text style={[styles.sectionIntro, { color: tokens.colors.text.subtle }]}>
          The system works best when every color choice answers a clear question: is this the canvas, the content, the
          boundary, the emphasis, or the system state?
        </Text>
        <View style={styles.roleGrid}>
          {semanticRoles.map((role) => (
            <View
              key={role.title}
              style={[
                styles.roleCard,
                {
                  backgroundColor: tokens.colors.bg.field,
                  borderColor: tokens.colors.border.soft,
                },
              ]}
            >
              <Text style={[styles.roleTitle, { color: tokens.colors.text.heading }]}>{role.title}</Text>
              <Text style={[styles.roleBody, { color: tokens.colors.text.body }]}>{role.detail}</Text>
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
        <Text style={[styles.sectionTitle, { color: tokens.colors.text.heading }]}>Pair foreground and background by intent</Text>
        <Text style={[styles.sectionIntro, { color: tokens.colors.text.subtle }]}>
          These pairings show the combinations that should appear most often in product surfaces. They are the fastest
          path to contrast-safe, semantically consistent UI.
        </Text>
        <View style={styles.pairGrid}>
          {pairingItems.map((item) => (
            <View
              key={item.label}
              style={[
                styles.pairCardWrap,
                {
                  backgroundColor: tokens.colors.bg.field,
                  borderColor: tokens.colors.border.default,
                },
              ]}
            >
              <PairingCard item={item} />
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
        <Text style={[styles.sectionTitle, { color: tokens.colors.text.heading }]}>Keep meaning stable across the product</Text>
        <View style={styles.guardrailList}>
          {guardrails.map((rule) => (
            <Text key={rule} style={[styles.guardrailItem, { color: tokens.colors.text.body }]}>
              • {rule}
            </Text>
          ))}
        </View>
        <View style={styles.guardrailRow}>
          <View
            style={[
              styles.guardrailCard,
              {
                backgroundColor: tokens.colors.status.danger.bg,
                borderColor: tokens.colors.status.danger.border,
              },
            ]}
          >
            <Text style={[styles.guardrailCardTitle, { color: tokens.colors.status.error.body }]}>Avoid</Text>
            <Text style={[styles.guardrailCardBody, { color: tokens.colors.text.body }]}>
              Picking colors by visual preference and then trying to force meaning onto them later.
            </Text>
          </View>
          <View
            style={[
              styles.guardrailCard,
              {
                backgroundColor: tokens.colors.bg.field,
                borderColor: tokens.colors.border.soft,
              },
            ]}
          >
            <Text style={[styles.guardrailCardTitle, { color: tokens.colors.text.heading }]}>Prefer</Text>
            <Text style={[styles.guardrailCardBody, { color: tokens.colors.text.body }]}>
              Choosing the semantic role first, then selecting the approved text and surface pairing for that role.
            </Text>
          </View>
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
        <Text style={[styles.sectionTitle, { color: tokens.colors.text.heading }]}>Reference the token groups after the role is set</Text>
        <Text style={[styles.sectionIntro, { color: tokens.colors.text.subtle }]}>
          The inventory stays here as implementation support. Browse it once you already know which role and pairing
          the UI needs to communicate.
        </Text>

        <View style={styles.inventoryGroup}>
          <Text style={[styles.inventoryTitle, { color: tokens.colors.text.heading }]}>Backgrounds and surfaces</Text>
          {surfaceItems.map((item) => (
            <ColorRow key={item.label} item={item} />
          ))}
        </View>

        <View style={styles.inventoryGroup}>
          <Text style={[styles.inventoryTitle, { color: tokens.colors.text.heading }]}>Text roles</Text>
          {textItems.map((item) => (
            <ColorRow key={item.label} item={item} />
          ))}
        </View>

        <View style={styles.inventoryGroup}>
          <Text style={[styles.inventoryTitle, { color: tokens.colors.text.heading }]}>Borders and dividers</Text>
          {borderItems.map((item) => (
            <LineRow key={item.label} item={item} />
          ))}
        </View>

        <View style={styles.inventoryGroup}>
          <Text style={[styles.inventoryTitle, { color: tokens.colors.text.heading }]}>Accent and brand</Text>
          {accentItems.map((item) => (
            <ColorRow key={item.label} item={item} />
          ))}
        </View>

        <View style={styles.inventoryGroup}>
          <Text style={[styles.inventoryTitle, { color: tokens.colors.text.heading }]}>Status</Text>
          <Text style={[styles.inventoryNote, { color: tokens.colors.text.subtle }]}>
            Status tokens are reserved for system feedback like alerts, validation, badges, and toasts.
          </Text>
          {statusItems.map((item) => (
            <ColorRow key={item.label} item={item} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const meta = {
  title: "Design System/Foundations/Colors",
  component: FoundationsColorsPreview,
  parameters: {
    notes: "Decision-first color guidance covering semantic roles, valid pairings, guardrails, and token reference.",
  },
} satisfies Meta<typeof FoundationsColorsPreview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Colors: Story = {};

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
    gap: space.xs,
  },
  roleTitle: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "700",
  },
  roleBody: {
    fontSize: 14,
    lineHeight: 21,
  },
  pairGrid: {
    gap: space.sm,
  },
  pairCardWrap: {
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: space.md,
  },
  pairCard: {
    gap: space.sm,
  },
  pairPreview: {
    borderRadius: radius.md,
    paddingHorizontal: space.md,
    paddingVertical: space.lg,
    justifyContent: "center",
  },
  pairSample: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "700",
  },
  pairMeta: {
    gap: 3,
  },
  pairRecipe: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "700",
  },
  pairUseFor: {
    fontSize: 12,
    lineHeight: 18,
  },
  pairLabel: {
    marginTop: 2,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "600",
  },
  pairToken: {
    fontSize: 11,
    lineHeight: 16,
  },
  guardrailList: {
    gap: space.xs,
  },
  guardrailItem: {
    fontSize: 13,
    lineHeight: 20,
  },
  guardrailRow: {
    gap: space.sm,
  },
  guardrailCard: {
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: space.md,
    gap: 4,
  },
  guardrailCardTitle: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "700",
  },
  guardrailCardBody: {
    fontSize: 13,
    lineHeight: 20,
  },
  inventoryGroup: {
    gap: space.sm,
  },
  inventoryTitle: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "700",
  },
  inventoryNote: {
    fontSize: 13,
    lineHeight: 20,
  },
  row: {
    flexDirection: "row",
    gap: space.md,
    alignItems: "flex-start",
  },
  swatch: {
    width: 92,
    height: 64,
    borderRadius: radius.md,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: space.xs,
  },
  swatchSample: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: "700",
    textAlign: "center",
  },
  rowText: {
    flex: 1,
    minHeight: 64,
    justifyContent: "center",
    gap: 3,
  },
  rowHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: space.xs,
  },
  rowLabel: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "700",
  },
  rowBadge: {
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 6,
    paddingVertical: 1,
  },
  rowBadgeText: {
    fontSize: 10,
    lineHeight: 13,
    fontWeight: "600",
  },
  rowToken: {
    fontSize: 11,
    lineHeight: 15,
  },
  rowHint: {
    fontSize: 11,
    lineHeight: 15,
  },
  rowValue: {
    fontSize: 10,
    lineHeight: 14,
    letterSpacing: 0.2,
  },
  rowNote: {
    fontSize: 11,
    lineHeight: 16,
  },
  lineRow: {
    gap: space.xs,
  },
  linePreviewWrap: {
    paddingVertical: space.xs,
    marginTop: 2,
  },
  linePreview: {
    width: "100%",
    borderRadius: 999,
  },
  rowUsage: {
    fontSize: 11,
    lineHeight: 15,
  },
});
