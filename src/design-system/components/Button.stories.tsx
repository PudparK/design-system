import type { Meta, StoryObj } from "@storybook/react-native";
import { View } from "react-native";
import { fn } from "storybook/test";

import { Button } from "@/src/design-system/components/Button";
import { StorySection } from "@/src/storybook/story-section";
import { space } from "@/src/design-system/tokens";

const meta = {
  title: "Components/Forms/Button",
  component: Button,
  decorators: [
    (Story) => (
      <StorySection
        eyebrow="Components"
        title="Primary Action"
        description="Use buttons to confirm a clear next step in a focused section."
      >
        <View style={{ gap: space.md }}>
          <Story />
        </View>
      </StorySection>
    ),
  ],
  args: {
    label: "Save",
    onPress: fn(),
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    label: "Saving...",
  },
};

export const LoadingLongLabel: Story = {
  args: {
    loading: true,
    label: "Publishing profile changes",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    label: "Create account",
  },
};

export const DocsExampleWithNotes: Story = {
  args: {
    label: "Save changes",
    variant: "primary",
    onPress: fn(),
  },
  parameters: {
    notes:
      "Example: uses args for defaults, fn() action handler for onPress, and notes for usage context.",
  },
};
