import type { Meta, StoryObj } from "@storybook/react-native";
import { useMemo } from "react";
import { ScrollView } from "react-native";

import type { PublicUser } from "@/src/domain/user/types";
import { makePublicUser } from "@/src/domain/user/test-utils";
import { useTheme } from "@/src/design-system/theme/useTheme";
import { UserDetailsContent } from "@/src/features/user/components/UserDetailsSections";
import { createUserDetailsStyles } from "@/src/features/user/screens/user-details.styles";

type UserDetailsContentStoryProps = {
  user: PublicUser;
  location: string;
  modes: string;
  languages: string;
  focus: string;
  stylesText: string;
  mappedPrompts: string[];
};

function UserDetailsContentStory(props: UserDetailsContentStoryProps) {
  const { palette, tokens } = useTheme();
  const styles = useMemo(() => createUserDetailsStyles(palette, tokens), [palette, tokens]);

  return (
    <ScrollView contentContainerStyle={{ padding: 16, paddingTop: 40, gap: 10 }}>
      <UserDetailsContent {...props} styles={styles} />
    </ScrollView>
  );
}

const profileFull: PublicUser = makePublicUser({
  id: "profile-full",
  slug: "paul-barron",
  displayName: "Paul Barrón",
  city: "Austin",
  state: "TX",
  telehealth: true,
  inPerson: true,
  languages: ["English", "Spanish"],
  focusAreas: ["Strategy", "Systems", "Design"],
  therapyStyles: ["Workshops", "Advising"],
  tagline: "Practical systems thinking for digital products.",
  bioShort: "Paul translates ambiguous goals into clear roadmaps, interface patterns, and maintainable systems.",
  contactEmail: "paul@example.com",
  websiteUrl: "example.com",
  bookingUrl: "example.com/book",
});

const meta = {
  title: "Patterns/Profiles/Profile Details Content",
  component: UserDetailsContentStory,
  args: {
    user: profileFull,
    location: "",
    modes: "",
    languages: "",
    focus: "",
    stylesText: "",
    mappedPrompts: [],
  },
} satisfies Meta<typeof UserDetailsContentStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Full: Story = {
  args: {
    user: profileFull,
    location: "Austin, TX",
    modes: "Remote · In person",
    languages: "English, Spanish",
    focus: "Strategy, Systems, Design",
    stylesText: "Workshops, Advising",
    mappedPrompts: [
      "What kind of collaboration are you looking for?",
      "What would success look like after eight weeks?",
    ],
  },
};
