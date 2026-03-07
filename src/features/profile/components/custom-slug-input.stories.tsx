import type { Meta, StoryObj } from "@storybook/react-native";
import { useState, type ComponentProps } from "react";
import { View } from "react-native";
import { fn } from "storybook/test";

import { CustomSlugInput } from "@/src/features/profile/components/custom-slug-input";
import { StorySection } from "@/src/storybook/story-section";

function StatefulSlugInput(args: Omit<ComponentProps<typeof CustomSlugInput>, "value" | "onChangeText">) {
  const [value, setValue] = useState("paul-barron");
  return (
    <View style={{ padding: 16 }}>
      <CustomSlugInput {...args} value={value} onChangeText={setValue} />
    </View>
  );
}

const meta = {
  title: "Components/Forms/Slug Input",
  component: StatefulSlugInput,
  decorators: [
    (Story) => (
      <StorySection
        eyebrow="Forms"
        title="Public Handle"
        description="Slug inputs work best in account and profile settings where the handle appears with supporting context."
      >
        <Story />
      </StorySection>
    ),
  ],
  args: {
    locked: true,
    onToggleLock: fn(),
    onInfoPress: fn(),
    error: "",
  },
} satisfies Meta<typeof StatefulSlugInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Locked: Story = {};

export const EditableWithError: Story = {
  args: {
    locked: false,
    error: "Handle already taken.",
  },
};
