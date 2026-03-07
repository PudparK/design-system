import { ScrollView, StyleSheet, Text, View } from "react-native";

import { radius, shadow, space } from "@/src/design-system/tokens";

const foundationControls = [
  {
    name: "Colors",
    detail: "Semantic roles for surfaces, text, borders, accents, and status feedback.",
  },
  {
    name: "Typography",
    detail: "Type hierarchy, reading rhythm, and emphasis across product surfaces.",
  },
  {
    name: "Spacing",
    detail: "Consistent layout cadence for padding, gaps, and section separation.",
  },
  {
    name: "Radius",
    detail: "Corner language for cards, controls, sheets, and rounded accents.",
  },
  {
    name: "Elevation",
    detail: "Depth cues through borders, highlights, and layered shadow levels.",
  },
] as const;

export function FoundationsOverviewScreen() {
  return (
    <ScrollView contentContainerStyle={styles.canvas}>
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>Design System</Text>
        <Text style={styles.title}>Foundations</Text>
        <Text style={styles.subtitle}>
          Foundations are the core visual rules that keep every screen cohesive. They define how color, type,
          spacing, shape, and depth work together across the product.
        </Text>
      </View>

      <View style={styles.previewCard}>
        <Text style={styles.sectionTitle}>At a Glance</Text>
        <View style={styles.colorRow}>
          <View style={[styles.swatch, styles.swatchForest]} />
          <View style={[styles.swatch, styles.swatchFog]} />
          <View style={[styles.swatch, styles.swatchMint]} />
          <View style={[styles.swatch, styles.swatchSlate]} />
        </View>
        <Text style={styles.previewCaption}>Palette, scale, and tone should feel intentional before any feature logic.</Text>
      </View>

      <View style={styles.documentationCard}>
        <Text style={styles.sectionTitle}>Foundations define the visual language of CoolNameHere</Text>
        <Text style={styles.documentationBody}>
          They control the core visual primitives that every component and screen builds upon.
        </Text>
        <View style={styles.documentationGrid}>
          {foundationControls.map((item, index) => (
            <View
              key={item.name}
              style={[
                styles.documentationItem,
                index < foundationControls.length - 1
                  ? styles.documentationItemHalf
                  : styles.documentationItemWide,
              ]}
            >
              <Text style={styles.documentationItemTitle}>{item.name}</Text>
              <Text style={styles.documentationItemBody}>{item.detail}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  canvas: {
    padding: space.lg,
    gap: space.md + space.xs,
    backgroundColor: "#EEF3F1",
  },
  hero: {
    paddingHorizontal: space.xs,
    paddingVertical: space.sm,
    gap: space.sm,
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
    color: "#6C7C76",
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    lineHeight: 36,
    color: "#1F2B27",
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: "#42534D",
  },
  previewCard: {
    borderRadius: radius.xl,
    backgroundColor: "#FFFFFF",
    padding: space.md + space.xs,
    gap: space.sm + space.xs,
    ...shadow("sm"),
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#27332F",
  },
  colorRow: {
    flexDirection: "row",
    gap: space.sm,
  },
  swatch: {
    flex: 1,
    height: 42,
    borderRadius: radius.md,
  },
  swatchForest: {
    backgroundColor: "#2E4B44",
  },
  swatchFog: {
    backgroundColor: "#D9E4E0",
  },
  swatchMint: {
    backgroundColor: "#A7C8BB",
  },
  swatchSlate: {
    backgroundColor: "#5C6D67",
  },
  previewCaption: {
    fontSize: 13,
    lineHeight: 20,
    color: "#50615B",
  },
  documentationCard: {
    borderRadius: radius.xl,
    backgroundColor: "#FFFFFF",
    padding: space.md + space.xs,
    gap: space.sm,
    ...shadow("sm"),
  },
  documentationBody: {
    fontSize: 14,
    lineHeight: 21,
    color: "#42534D",
  },
  documentationGrid: {
    marginTop: space.xs,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: space.sm,
  },
  documentationItem: {
    borderWidth: 1,
    borderColor: "#D3DDD9",
    borderRadius: radius.lg,
    padding: space.sm + space.xs,
    gap: space.xs,
    backgroundColor: "#FBFCFC",
  },
  documentationItemHalf: {
    width: "48%",
  },
  documentationItemWide: {
    width: "100%",
  },
  documentationItemTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#22312C",
  },
  documentationItemBody: {
    fontSize: 13,
    lineHeight: 20,
    color: "#5D7068",
  },
});
