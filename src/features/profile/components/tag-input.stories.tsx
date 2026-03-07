import type { Meta, StoryObj } from "@storybook/react-native";
import { useState, type ComponentProps } from "react";
import { View } from "react-native";

import { TagInput } from "@/src/features/profile/components/tag-input";
import { StorySection } from "@/src/storybook/story-section";

function StatefulTagInput(args: Omit<ComponentProps<typeof TagInput>, "values" | "onChange">) {
  const [values, setValues] = useState(["Strategy", "Operations"]);
  return (
    <View style={{ padding: 16 }}>
      <TagInput {...args} values={values} onChange={setValues} />
    </View>
  );
}

const meta = {
  title: "Components/Forms/Tag Input",
  component: StatefulTagInput,
  decorators: [
    (Story) => (
      <StorySection
        eyebrow="Forms"
        title="Tag Collection"
        description="Tag inputs work best when they sit inside a broader editing section with enough vertical rhythm."
      >
        <Story />
      </StorySection>
    ),
  ],
  args: {
    label: "Skills",
    placeholder: "Add a tag",
    maxItems: 6,
  },
} satisfies Meta<typeof StatefulTagInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
