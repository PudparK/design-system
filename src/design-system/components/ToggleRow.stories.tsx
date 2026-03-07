import type { Meta, StoryObj } from "@storybook/react-native";
import { useState, type ComponentProps } from "react";
import { Text, View } from "react-native";

import { ToggleRow } from "@/src/design-system/components/ToggleRow";
import { StorySection } from "@/src/storybook/story-section";
import { space } from "@/src/design-system/tokens";

function StatefulToggleRow(args: ComponentProps<typeof ToggleRow>) {
  const [value, setValue] = useState(args.value);
  return (
    <View style={{ gap: space.md }}>
      <ToggleRow {...args} value={value} onValueChange={setValue} />
      <Text style={{ fontSize: 12, lineHeight: 18, color: "#64748b" }}>
        Toggle rows work well for binary preferences in settings screens.
      </Text>
    </View>
  );
}

const meta = {
  title: "Components/Forms/Toggle Row",
  component: StatefulToggleRow,
  decorators: [
    (Story) => (
      <StorySection
        eyebrow="Preferences"
        title="Notification Settings"
        description="Use a toggle row when the label and switch should read as a single setting."
      >
        <Story />
      </StorySection>
    ),
  ],
  args: {
    label: "Email notifications",
    value: false,
    onValueChange: () => {},
  },
} satisfies Meta<typeof StatefulToggleRow>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Off: Story = {};

export const On: Story = {
  args: {
    value: true,
  },
};

export const LongLabel: Story = {
  args: {
    label: "Send weekly summary emails for updates and activity",
  },
};

export const LongLabelNarrow: Story = {
  args: {
    label: "Send weekly summary emails for updates and activity",
  },
  decorators: [
    (Story) => (
      <View style={{ width: 320 }}>
        <Story />
      </View>
    ),
  ],
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: true,
  },
};
