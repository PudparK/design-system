import type { ReactNode } from "react";
import { View, type ViewStyle } from "react-native";

import { space, type SpaceKey } from "@/src/design-system/tokens";

type StackProps = {
  gap?: SpaceKey;
  align?: "flex-start" | "center" | "flex-end" | "stretch";
  style?: ViewStyle | ViewStyle[];
  children?: ReactNode;
};

export function Stack({ gap = "md", align, style, children }: StackProps) {
  return (
    <View
      style={[
        {
          flexDirection: "column",
          gap: space[gap],
        },
        align ? { alignItems: align } : null,
        style,
      ]}
    >
      {children}
    </View>
  );
}
