import type { Meta, StoryObj } from "@storybook/react-native";
import { StyleSheet, Text, View } from "react-native";

import { Panel } from "@/src/design-system/components/Panel";
import { StorySection } from "@/src/storybook/story-section";
import { space } from "@/src/design-system/tokens";

const meta = {
  title: "Components/Surfaces/Panel",
  component: Panel,
  decorators: [
    (Story) => (
      <StorySection
        eyebrow="Surfaces"
        title="Content Panel"
        description="Panels group related information and actions into one contained surface."
      >
        <View style={styles.storyPadding}>
          <Story />
        </View>
      </StorySection>
    ),
  ],
} satisfies Meta<typeof Panel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Panel {...args} style={styles.container}>
      <View style={styles.panelContent}>
        <Text style={styles.panelTitle}>Workspace Settings</Text>
        <Text style={styles.panelBody}>Manage profile visibility, permissions, and publishing preferences.</Text>
      </View>
    </Panel>
  ),
};

const styles = StyleSheet.create({
  storyPadding: {
    width: "100%",
  },
  container: {
    minHeight: 164,
  },
  panelContent: {
    gap: space.sm,
  },
  panelTitle: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "800",
    color: "#1f2a27",
  },
  panelBody: {
    fontSize: 14,
    lineHeight: 20,
    color: "#475569",
  },
});
