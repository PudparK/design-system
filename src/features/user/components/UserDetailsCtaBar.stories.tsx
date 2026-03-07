import type { Meta, StoryObj } from "@storybook/react-native";
import { useMemo } from "react";
import { View } from "react-native";
import { fn } from "storybook/test";

import { useTheme } from "@/src/design-system/theme/useTheme";
import { UserDetailsCtaBar } from "@/src/features/user/components/UserDetailsSections";
import { createUserDetailsStyles } from "@/src/features/user/screens/user-details.styles";
import { StorySection } from "@/src/storybook/story-section";

type UserDetailsCtaBarStoryProps = {
  bookingUrl?: string | null;
  contactEmail?: string | null;
  onPressBook: (bookingUrl: string) => void;
  onPressContact: (contactEmail: string) => void;
};

function UserDetailsCtaBarStory(props: UserDetailsCtaBarStoryProps) {
  const { palette, tokens } = useTheme();
  const styles = useMemo(() => createUserDetailsStyles(palette, tokens), [palette, tokens]);

  return (
    <View style={{ flex: 1, minHeight: 220, paddingTop: 24 }}>
      <View style={{ flex: 1 }} />
      <UserDetailsCtaBar {...props} styles={styles} />
    </View>
  );
}

const meta = {
  title: "Components/Actions/Sticky CTA Bar",
  component: UserDetailsCtaBarStory,
  decorators: [
    (Story) => (
      <StorySection
        eyebrow="Actions"
        title="Sticky Page Actions"
        description="Use a sticky CTA bar near the bottom of a detail screen for primary and secondary follow-up actions."
      >
        <Story />
      </StorySection>
    ),
  ],
  args: {
    bookingUrl: "https://example.com/book",
    contactEmail: "paul@example.com",
    onPressBook: fn(),
    onPressContact: fn(),
  },
} satisfies Meta<typeof UserDetailsCtaBarStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const BothCtas: Story = {};

export const BookOnly: Story = {
  args: {
    contactEmail: null,
  },
};

export const ContactOnly: Story = {
  args: {
    bookingUrl: null,
  },
};

export const None: Story = {
  args: {
    bookingUrl: null,
    contactEmail: null,
  },
};
