import type { Meta, StoryObj } from "@storybook/react-native";
import { Text, View } from "react-native";

import { SectionAccordion } from "@/src/features/profile/components/section-accordion";
import { StorySection } from "@/src/storybook/story-section";

const meta = {
  title: "Components/Disclosure/Section Accordion",
  component: SectionAccordion,
  decorators: [
    (Story) => (
      <StorySection
        eyebrow="Content"
        title="Expandable Sections"
        description="Accordions help compress optional detail without losing structure in long pages."
      >
        <Story />
      </StorySection>
    ),
  ],
} satisfies Meta<typeof SectionAccordion>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Collapsed: Story = {
  args: {
    title: "Overview",
    subtitle: "Tap to expand",
    defaultExpanded: false,
    children: <Text>Short summary content with supporting context for this section.</Text>,
  },
};

export const Expanded: Story = {
  args: {
    title: "Implementation Notes",
    subtitle: "Expanded content example",
    defaultExpanded: true,
    children: <Text>Use this pattern to progressively reveal longer explanations, settings, or supporting detail.</Text>,
  },
};
