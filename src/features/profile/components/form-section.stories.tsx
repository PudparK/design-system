import type { Meta, StoryObj } from "@storybook/react-native";
import { Text, View } from "react-native";

import { FormSection } from "@/src/features/profile/components/form-section";
import { StorySection } from "@/src/storybook/story-section";

const meta = {
  title: "Patterns/Forms/Form Section",
  component: FormSection,
  decorators: [
    (Story) => (
      <StorySection
        eyebrow="Patterns"
        title="Grouped Form Content"
        description="Form sections bundle related fields under a short title and optional helper text."
      >
        <Story />
      </StorySection>
    ),
  ],
  args: {
    title: "Basic details",
    children: <Text>Section content</Text>,
  },
} satisfies Meta<typeof FormSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const TitleOnly: Story = {
  args: {
    subtitle: undefined,
  },
};

export const WithSubtitle: Story = {
  args: {
    subtitle: "These details help people understand this profile at a glance.",
  },
};

export const WithChildren: Story = {
  args: {
    subtitle: "Add the main details for this profile.",
    children: (
      <View style={{ gap: 8 }}>
        <Text>Display name</Text>
        <Text>Role</Text>
        <Text>Location</Text>
      </View>
    ),
  },
};

export const IdentityVariant: Story = {
  args: {
    variant: "identity",
    title: "Identity",
    subtitle: "Shown in profile cards and public links.",
  },
};
