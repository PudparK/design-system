import type { Meta, StoryObj } from "@storybook/react-native";
import { FoundationsOverviewScreen } from "@/src/design-system/foundations/screens/FoundationsOverviewScreen";

const meta = {
  title: "Design System/Foundations/Overview",
  component: FoundationsOverviewScreen,
  parameters: {
    notes: "Entry point for design-system foundations pages.",
  },
} satisfies Meta<typeof FoundationsOverviewScreen>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Overview: Story = {};
