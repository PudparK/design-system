import type { ReactNode } from "react";
import { View, type ViewStyle } from "react-native";

import { space, type SpaceKey } from "@/src/design-system/tokens";

type InlineProps = {
  gap?: SpaceKey;
  align?: "flex-start" | "center" | "flex-end" | "stretch";
  justify?: "flex-start" | "center" | "flex-end" | "space-between";
  wrap?: boolean;
  style?: ViewStyle | ViewStyle[];
  children?: ReactNode;
};

export function Inline({
  gap = "sm",
  align = "center",
  justify,
  wrap,
  style,
  children,
}: InlineProps) {
  return (
    <View
      style={[
        {
          flexDirection: "row",
          gap: space[gap],
          alignItems: align,
          flexWrap: wrap ? "wrap" : "nowrap",
        },
        justify ? { justifyContent: justify } : null,
        style,
      ]}
    >
      {children}
    </View>
  );
}
