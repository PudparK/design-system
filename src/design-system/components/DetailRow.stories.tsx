import type { Meta, StoryObj } from "@storybook/react-native";
import { View } from "react-native";

import { DetailRow } from "@/src/design-system/components/DetailRow";
import { StorySection } from "@/src/storybook/story-section";
import { space } from "@/src/design-system/tokens";

const meta = {
  title: "Components/Data Display/Detail Row",
  component: DetailRow,
  decorators: [
    (Story) => (
      <StorySection
        eyebrow="Data"
        title="Profile Metadata"
        description="Detail rows present short labels and values in a compact, scannable block."
      >
        <View style={{ gap: space.md }}>
          <Story />
        </View>
      </StorySection>
    ),
  ],
} satisfies Meta<typeof DetailRow>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Location",
    value: "Austin, TX",
  },
};

export const LongValue: Story = {
  args: {
    label: "Expertise",
    value: "Product Strategy, Design Systems, Frontend Architecture, Team Enablement",
  },
};
