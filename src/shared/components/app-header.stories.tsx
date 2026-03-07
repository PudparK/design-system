import type { Meta, StoryObj } from "@storybook/react-native";
import { View } from "react-native";
import { fn } from "storybook/test";

import { AppHeader } from "@/src/shared/components/app-header";
import { StorySection } from "@/src/storybook/story-section";

const meta = {
  title: "Design System/Layout/App Header",
  component: AppHeader,
  decorators: [
    (Story) => (
      <StorySection
        eyebrow="Layout"
        title="Page Header"
        description="Use the app header to anchor a screen title and optional back navigation."
      >
        <View style={{ marginHorizontal: -16, marginBottom: -16 }}>
          <Story />
        </View>
      </StorySection>
    ),
  ],
  args: {
    onBackPress: fn(),
  },
} satisfies Meta<typeof AppHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Directory",
    showBack: false,
  },
};

export const WithBackButton: Story = {
  args: {
    title: "Profile Details",
    showBack: true,
  },
};
