import type { Meta, StoryObj } from "@storybook/react-native";
import { View } from "react-native";

import { Banner } from "@/src/design-system/components/Banner";
import { StorySection } from "@/src/storybook/story-section";
import { space } from "@/src/design-system/tokens";

const meta = {
  title: "Components/Feedback/Banner",
  component: Banner,
  decorators: [
    (Story) => (
      <StorySection
        eyebrow="Feedback"
        title="Inline Messaging"
        description="Use banners to provide context, warnings, or validation within a form section."
      >
        <View style={{ gap: space.md }}>
          <Story />
        </View>
      </StorySection>
    ),
  ],
  args: {
    helperText: "You are not signed in. Save is disabled until an authenticated session is active.",
    tone: "default",
  },
} satisfies Meta<typeof Banner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Warning: Story = {
  args: {
    tone: "warning",
  },
};

export const Error: Story = {
  args: {
    helperText: "Unable to save. Please try again.",
    tone: "error",
  },
};
