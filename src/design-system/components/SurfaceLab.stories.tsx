import type { Meta, StoryObj } from "@storybook/react-native";
import type { ReactNode } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { Panel as Card } from "@/src/design-system/components/Panel";
import { Inline, Stack } from "@/src/design-system/layout";
import { radius, space, type RadiusKey, type ShadowLevel, type SpaceKey } from "@/src/design-system/tokens";

const radiiScale: RadiusKey[] = ["xs", "sm", "md", "lg", "xl", "2xl", "3xl"];

const shadowScale: ShadowLevel[] = ["none", "sm", "md", "lg", "xl"];
const spacingScale: SpaceKey[] = ["xs", "sm", "md", "lg", "xl", "2xl"];

function LabCanvas({ children }: { children?: ReactNode }) {
  return (
    <ScrollView contentContainerStyle={styles.canvas}>
      <Text style={styles.title}>Surface Lab</Text>
      {children}
    </ScrollView>
  );
}

const meta = {
  title: "Internal/Shared/Surface Lab",
  component: LabCanvas,
} satisfies Meta<typeof LabCanvas>;

export default meta;

type Story = StoryObj<typeof meta>;

export const RadiiScalePreview: Story = {
  render: () => (
    <LabCanvas>
      <View style={styles.grid}>
        {radiiScale.map((radiusKey) => (
          <View key={radiusKey} style={styles.gridCellWrap}>
            <Card r={radiusKey} elevation="none" style={styles.radiusCell} />
            <Text style={styles.caption}>{radius[radiusKey]}</Text>
          </View>
        ))}
      </View>
    </LabCanvas>
  ),
};

export const ShadowScalePreview: Story = {
  render: () => (
    <LabCanvas>
      <View style={styles.grid}>
        {shadowScale.map((level) => (
          <View key={level} style={styles.gridCellWrap}>
            <Card r="xl" elevation={level} style={styles.shadowCell} />
            <Text style={styles.caption}>{level}</Text>
          </View>
        ))}
      </View>
    </LabCanvas>
  ),
};

export const SpacingScalePreview: Story = {
  render: () => (
    <LabCanvas>
      <View style={styles.spacingPreview}>
        {spacingScale.map((key) => (
          <View key={key} style={styles.spacingRow}>
            <Text style={styles.spacingLabel}>{`${key} = ${space[key]}`}</Text>
            <View style={styles.spacingBarWrap}>
              <View style={[styles.spacingBar, { width: space[key] }]} />
            </View>
            <View style={[styles.spacingSquares, { gap: space[key] }]}>
              {[0, 1, 2, 3].map((item) => (
                <View key={`${key}-${item}`} style={styles.spacingSquare} />
              ))}
            </View>
          </View>
        ))}
      </View>
    </LabCanvas>
  ),
};

export const LayoutPrimitivesPreview: Story = {
  render: () => (
    <LabCanvas>
      <Stack gap="lg">
        <Stack gap="lg">
          <View style={styles.layoutBlockLarge} />
          <View style={styles.layoutBlockMedium} />
          <View style={styles.layoutBlockSmall} />
        </Stack>
        <Inline gap="md" align="center">
          <View style={styles.iconSurface} />
          <Stack gap="sm" style={styles.rowText}>
            <View style={styles.textLinePrimary} />
            <View style={styles.textLineSecondary} />
          </Stack>
        </Inline>
      </Stack>
    </LabCanvas>
  ),
};

export const NestedRadiusExample: Story = {
  render: () => (
    <LabCanvas>
      <View style={styles.pageSurface}>
        <Card r="2xl" elevation="lg" style={styles.cardSurface}>
          <View style={styles.imageSurface} />
          <View style={styles.rowSurface}>
            <View style={styles.iconSurface} />
            <View style={styles.rowText}>
              <View style={styles.textLinePrimary} />
              <View style={styles.textLineSecondary} />
            </View>
          </View>
        </Card>
      </View>
      <Text style={styles.caption}>Card=24, Image=20, Row=16, Icon=12</Text>
    </LabCanvas>
  ),
};

export const DefaultCardExample: Story = {
  render: () => (
    <LabCanvas>
      <View style={styles.pageSurface}>
        <Card r="2xl" elevation="md">
          <Text style={styles.defaultCardTitle}>Default Card Surface</Text>
          <Text style={styles.defaultCardBody}>r=&quot;2xl&quot; elevation=&quot;md&quot;</Text>
        </Card>
      </View>
    </LabCanvas>
  ),
};

export const ProfileCardComposition: Story = {
  render: () => (
    <LabCanvas>
      <View style={styles.pageSurface}>
        <Card r="2xl" elevation="md" style={styles.reservationCardSurface}>
          <View style={styles.reservationImageSurface} />
          <View style={styles.reservationRows}>
            <View style={styles.rowSurface}>
              <View style={styles.iconSurface} />
              <View style={styles.rowText}>
                <View style={styles.textLinePrimary} />
                <View style={styles.textLineSecondary} />
              </View>
            </View>
            <View style={styles.rowSurface}>
              <View style={styles.iconSurface} />
              <View style={styles.rowText}>
                <View style={styles.textLinePrimary} />
                <View style={styles.textLineSecondary} />
              </View>
            </View>
          </View>
        </Card>
      </View>
      <Text style={styles.caption}>Card=24, Image=20, Row=16, Icon=12</Text>
    </LabCanvas>
  ),
};

const styles = StyleSheet.create({
  canvas: {
    padding: 20,
    gap: 16,
    backgroundColor: "#F6F7F9",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#121926",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  gridCellWrap: {
    width: 96,
    alignItems: "center",
    gap: 8,
  },
  radiusCell: {
    width: 88,
    height: 72,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E6E8EE",
  },
  shadowCell: {
    width: 88,
    height: 72,
  },
  spacingPreview: {
    gap: space.lg,
  },
  spacingRow: {
    gap: space.sm,
  },
  spacingLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#5A6478",
  },
  spacingBarWrap: {
    height: space.sm,
    width: "100%",
    justifyContent: "center",
  },
  spacingBar: {
    height: space.xs,
    borderRadius: radius.xs,
    backgroundColor: "#CCD5E6",
  },
  spacingSquares: {
    flexDirection: "row",
  },
  spacingSquare: {
    width: space.md,
    height: space.md,
    borderRadius: radius.sm,
    backgroundColor: "#DEE5F2",
  },
  layoutBlockLarge: {
    height: 28,
    borderRadius: radius.md,
    backgroundColor: "#DEE5F2",
  },
  layoutBlockMedium: {
    height: 20,
    width: "80%",
    borderRadius: radius.sm,
    backgroundColor: "#CCD5E6",
  },
  layoutBlockSmall: {
    height: 16,
    width: "64%",
    borderRadius: radius.xs,
    backgroundColor: "#DEE4F1",
  },
  caption: {
    fontSize: 12,
    color: "#5A6478",
    fontWeight: "600",
  },
  pageSurface: {
    backgroundColor: "#EEF2F7",
    borderRadius: radius["3xl"],
    padding: 16,
  },
  cardSurface: {
    borderWidth: 0,
    padding: 24,
    gap: 16,
  },
  reservationCardSurface: {
    borderWidth: 0,
    padding: 24,
    gap: 16,
  },
  imageSurface: {
    height: 140,
    borderRadius: radius.xl,
    backgroundColor: "#D5DCE8",
  },
  reservationImageSurface: {
    height: 160,
    borderRadius: radius.xl,
    backgroundColor: "#D5DCE8",
  },
  rowSurface: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderRadius: radius.lg,
    backgroundColor: "#F5F7FB",
    padding: 12,
  },
  iconSurface: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    backgroundColor: "#DEE4F1",
  },
  rowText: {
    flex: 1,
    gap: 8,
  },
  reservationRows: {
    gap: 12,
  },
  textLinePrimary: {
    width: "68%",
    height: 12,
    borderRadius: 6,
    backgroundColor: "#CCD5E6",
  },
  textLineSecondary: {
    width: "52%",
    height: 12,
    borderRadius: 6,
    backgroundColor: "#DEE5F2",
  },
  defaultCardTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#121926",
    marginBottom: 4,
  },
  defaultCardBody: {
    fontSize: 12,
    color: "#5A6478",
    fontWeight: "600",
  },
});
