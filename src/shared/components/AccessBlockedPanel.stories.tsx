import type { Meta, StoryObj } from "@storybook/react-native";
import { View } from "react-native";
import { fn } from "storybook/test";

import { AccessBlockedPanel } from "@/src/shared/components/AccessBlockedPanel";

const meta = {
  title: "Patterns/States/Restricted Access",
  component: AccessBlockedPanel,
  decorators: [
    (Story) => (
      <View style={{ flex: 1, paddingHorizontal: 20, justifyContent: "center" }}>
        <Story />
      </View>
    ),
  ],
  args: {
    title: "Editor access required",
    message:
      "This area is only available to workspace editors. Request access to update profile and content settings.",
    primaryCtaLabel: "Request access",
    onPrimaryPress: fn(),
    secondaryCtaLabel: "Back to directory",
    onSecondaryPress: fn(),
  },
} satisfies Meta<typeof AccessBlockedPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
