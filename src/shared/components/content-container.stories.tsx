import type { Meta, StoryObj } from "@storybook/react-native";
import { Text, View } from "react-native";

import { ContentContainer } from "@/src/shared/components/content-container";
import { StorySection } from "@/src/storybook/story-section";

const meta = {
  title: "Design System/Layout/Content Container",
  component: ContentContainer,
  decorators: [
    (Story) => (
      <StorySection
        eyebrow="Layout"
        title="Screen Gutters"
        description="Content containers keep sections aligned to the same horizontal rhythm."
      >
        <Story />
      </StorySection>
    ),
  ],
  args: {
    children: (
      <View style={{ backgroundColor: "#D9E5E1", padding: 12 }}>
        <Text>Content inside container</Text>
      </View>
    ),
  },
} satisfies Meta<typeof ContentContainer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultPadding: Story = {};

export const CustomOverride: Story = {
  args: {
    style: {
      borderWidth: 1,
      borderColor: "#D9E5E1",
      backgroundColor: "#F6FAF8",
      paddingVertical: 12,
    },
  },
};

export const NestedContent: Story = {
  args: {
    children: (
      <View style={{ gap: 10 }}>
        <View style={{ backgroundColor: "#D9E5E1", padding: 12 }}>
          <Text>Section A</Text>
        </View>
        <View style={{ backgroundColor: "#C9DBD4", padding: 12 }}>
          <Text>Section B</Text>
        </View>
      </View>
    ),
  },
};
