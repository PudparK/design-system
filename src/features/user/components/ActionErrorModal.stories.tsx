import type { Meta, StoryObj } from "@storybook/react-native";
import { useState, type ComponentProps } from "react";
import { Text, View } from "react-native";
import { fn } from "storybook/test";

import { Button } from "@/src/design-system/components/Button";
import { ActionErrorModal } from "@/src/features/user/components/ActionErrorModal";
import { useTheme } from "@/src/design-system/theme/useTheme";
import { space } from "@/src/design-system/tokens";

const meta = {
  title: "Patterns/States/Action Error Modal",
  component: ActionErrorModal,
  args: {
    visible: true,
    message: "Failed to save changes.",
    tone: "error",
    retryable: true,
    isRetrying: false,
    onRetry: fn(),
    onClose: fn(),
  },
} satisfies Meta<typeof ActionErrorModal>;

export default meta;

type Story = StoryObj<typeof meta>;

function StatefulActionErrorModal(
  args: Omit<ComponentProps<typeof ActionErrorModal>, "visible" | "onClose">,
) {
  const [visible, setVisible] = useState(true);
  const { palette } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        minHeight: 640,
        paddingHorizontal: space.lg,
        paddingTop: space.xl + 20,
        backgroundColor: palette.background,
        position: "relative",
      }}
    >
      <View style={{ gap: 8, marginBottom: space.xl }}>
        <Text style={{ fontSize: 28, lineHeight: 34, fontWeight: "800", color: palette.heading }}>
          Save Workspace Changes
        </Text>
        <Text style={{ fontSize: 14, lineHeight: 20, color: palette.subtle }}>
          The modal should cover the full in-frame screen while leaving a clear trigger behind it for repeat testing.
        </Text>
      </View>

      <View style={{ gap: space.md, maxWidth: 320 }}>
        <Button
          label={visible ? "Modal open" : "Open modal"}
          onPress={() => setVisible(true)}
          disabled={visible}
        />
        <Text style={{ fontSize: 12, lineHeight: 18, color: palette.muted }}>
          Close the modal, then use this button to open it again.
        </Text>
      </View>

      <ActionErrorModal
        {...args}
        visible={visible}
        onClose={() => {
          fn()();
          setVisible(false);
        }}
      />
    </View>
  );
}

export const RetryableError: Story = {
  render: (args) => <StatefulActionErrorModal {...args} />,
};

export const Retrying: Story = {
  args: {
    isRetrying: true,
  },
  render: (args) => <StatefulActionErrorModal {...args} />,
};

export const WarningNoRetry: Story = {
  args: {
    message: "You need permission before this action can continue.",
    tone: "warning",
    retryable: false,
  },
  render: (args) => <StatefulActionErrorModal {...args} />,
};
