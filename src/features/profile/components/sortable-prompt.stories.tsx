import type { Meta, StoryObj } from "@storybook/react-native";
import { useState, type ComponentProps } from "react";
import { View } from "react-native";
import { fn } from "storybook/test";

import { SortablePrompt } from "@/src/features/profile/components/sortable-prompt";
import { StorySection } from "@/src/storybook/story-section";

function StatefulSortablePrompt(args: Omit<ComponentProps<typeof SortablePrompt>, "value" | "onChange">) {
  const [value, setValue] = useState("");
  return (
    <View style={{ padding: 16 }}>
      <SortablePrompt {...args} value={value} onChange={setValue} />
    </View>
  );
}

const meta = {
  title: "Patterns/Forms/Sortable Text List",
  component: StatefulSortablePrompt,
  decorators: [
    (Story) => (
      <StorySection
        eyebrow="Patterns"
        title="Sortable Text Items"
        description="Use this pattern for editable ordered lists where each item needs controls and inline validation."
      >
        <Story />
      </StorySection>
    ),
  ],
  args: {
    index: 0,
    total: 3,
    onMoveUp: fn(),
    onMoveDown: fn(),
    onRemove: fn(),
  },
} satisfies Meta<typeof StatefulSortablePrompt>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FirstItem: Story = {
  args: {
    index: 0,
  },
};

export const MiddleItem: Story = {
  args: {
    index: 1,
  },
};

export const LastItem: Story = {
  args: {
    index: 2,
  },
};

export const Empty: Story = {};

function StatefulSortablePromptLongText(args: Omit<ComponentProps<typeof SortablePrompt>, "value" | "onChange">) {
  const [value, setValue] = useState(
    "Describe the ideal first experience someone should have when they land on Paul Barrón's profile.",
  );
  return (
    <View style={{ padding: 16 }}>
      <SortablePrompt {...args} value={value} onChange={setValue} />
    </View>
  );
}

export const LongText: Story = {
  render: (args) => <StatefulSortablePromptLongText {...args} />,
};

export const WithHelperText: Story = {
  args: {
    helperText: "Must be at least 3 characters.",
    tone: "default",
  },
};

export const WithErrorTone: Story = {
  args: {
    helperText: "Item cannot be empty.",
    tone: "error",
  },
};
