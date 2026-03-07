import type { Meta, StoryObj } from "@storybook/react-native";
import { View } from "react-native";
import { fn } from "storybook/test";

import { ProfileAvatarEditorView } from "@/src/features/profile/components/profile-avatar-editor-view";

const meta = {
  title: "Components/Media/Avatar Picker",
  component: ProfileAvatarEditorView,
  decorators: [
    (Story) => (
      <View style={{ flex: 1, padding: 16, alignItems: "flex-start", justifyContent: "center" }}>
        <Story />
      </View>
    ),
  ],
  args: {
    onActivate: fn(),
    size: 180,
    disabled: false,
    avatarUri: null,
    isUploading: false,
  },
} satisfies Meta<typeof ProfileAvatarEditorView>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Empty: Story = {};

export const Uploading: Story = {
  args: {
    isUploading: true,
  },
};

export const WithAvatar: Story = {
  args: {
    avatarUri: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80",
  },
};
