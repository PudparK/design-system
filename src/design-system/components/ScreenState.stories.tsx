import type { Meta, StoryObj } from "@storybook/react-native";
import { View } from "react-native";
import { fn } from "storybook/test";

import {
  CenteredSpinner,
  EmptyState,
  ErrorState,
} from "@/src/design-system/components/ScreenState";

const meta = {
  title: "Patterns/States/Screen State",
  component: CenteredSpinner,
  decorators: [
    (Story) => (
      <View style={{ flex: 1, minHeight: 480 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Loading: Story = {
  render: () => <CenteredSpinner label="Loading profiles..." />,
};

export const Empty: Story = {
  render: () => (
    <EmptyState
      title="No profiles found"
      body="Try again in a moment or adjust your preferences."
      primaryAction={{ label: "Retry", onPress: fn() }}
    />
  ),
};

export const Error: Story = {
  render: () => (
    <ErrorState
      title="We couldn't load the directory"
      body="Please try again."
      errorMessage="Network request failed."
      primaryAction={{ label: "Retry", onPress: fn(), loading: false }}
    />
  ),
};
