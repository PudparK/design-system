import type { Meta, StoryObj } from "@storybook/react-native";
import { useState, type ComponentProps } from "react";
import { Text, View } from "react-native";

import { LabeledInput } from "@/src/design-system/components/LabeledInput";
import { StorySection } from "@/src/storybook/story-section";
import { space } from "@/src/design-system/tokens";

function StatefulLabeledInput(args: Omit<ComponentProps<typeof LabeledInput>, "value" | "onChangeText">) {
  const [value, setValue] = useState("");
  return (
    <View style={{ gap: space.md }}>
      <LabeledInput {...args} value={value} onChangeText={setValue} />
      <Text style={{ fontSize: 12, lineHeight: 18, color: "#64748b" }}>
        This example shows the field inside a simple profile form section.
      </Text>
    </View>
  );
}

const meta = {
  title: "Components/Forms/Labeled Input",
  component: StatefulLabeledInput,
  decorators: [
    (Story) => (
      <StorySection
        eyebrow="Forms"
        title="Profile Details"
        description="Use labeled inputs for straightforward profile and settings fields."
      >
        <Story />
      </StorySection>
    ),
  ],
  args: {
    label: "Display name",
    placeholder: "Dr. Maya Patel",
  },
} satisfies Meta<typeof StatefulLabeledInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

function StatefulLabeledInputPrefilled(args: Omit<ComponentProps<typeof LabeledInput>, "value" | "onChangeText">) {
  const [value, setValue] = useState("Dr. Maya Patel");
  return (
    <View style={{ gap: space.md }}>
      <LabeledInput {...args} value={value} onChangeText={setValue} />
    </View>
  );
}

export const WithValue: Story = {
  render: (args) => <StatefulLabeledInputPrefilled {...args} />,
};

export const Error: Story = {
  args: {
    error: "This field is required.",
  },
};

export const Multiline: Story = {
  args: {
    label: "Bio",
    placeholder: "Share your approach...",
    multiline: true,
  },
};

export const Compact: Story = {
  args: {
    compact: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const LongLabel: Story = {
  args: {
    label: "Public display name used in profile directories",
  },
};

export const WithRightIcon: Story = {
  args: {
    label: "Your city",
    placeholder: "e.g. Houston",
    rightIconName: "chevron.right",
  },
};
