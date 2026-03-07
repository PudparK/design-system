import type { Meta, StoryObj } from "@storybook/react-native";
import { useMemo, type ComponentProps } from "react";
import { View } from "react-native";
import { fn } from "storybook/test";

import { useTheme } from "@/src/design-system/theme/useTheme";
import type { PublicUser } from "@/src/domain/user/types";
import { makePublicUser } from "@/src/domain/user/test-utils";
import { ProfileCard } from "@/src/features/user/components/UserCard";
import { createDiscoverStyles } from "@/src/features/user/screens/discover.styles";

type StoryProps = Omit<ComponentProps<typeof ProfileCard>, "styles" | "theme">;

function ThemedProfileCard(props: StoryProps) {
  const { palette, tokens, isDark } = useTheme();
  const styles = useMemo(() => createDiscoverStyles(palette, tokens, isDark), [palette, tokens, isDark]);

  return (
    <View style={{ height: 700, padding: 12 }}>
      <View style={[styles.card, { position: "relative" }]}>
        <ProfileCard {...props} styles={styles} theme={palette} />
      </View>
    </View>
  );
}

const sampleProfile: PublicUser = makePublicUser({
  slug: "paul-barron",
  displayName: "Paul Barrón",
  languages: ["English", "Spanish"],
  focusAreas: ["Strategy", "Systems", "Design"],
  therapyStyles: ["Workshops", "Advising"],
  tagline: "Clear systems, thoughtful interfaces, and practical execution.",
  bioShort: "Paul helps teams turn vague requirements into coherent products and durable design systems.",
  contactEmail: "paul@example.com",
});

const meta = {
  title: "Patterns/Cards/Profile Card",
  component: ThemedProfileCard,
  args: {
    user: sampleProfile,
    canEdit: false,
    onOpenDetails: fn(),
    onEdit: fn(),
  },
} satisfies Meta<typeof ThemedProfileCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Editable: Story = {
  args: {
    canEdit: true,
  },
};
