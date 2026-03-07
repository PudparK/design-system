import { forwardRef, type ComponentProps } from "react";
import { StyleSheet, View } from "react-native";

import { CONTENT_HORIZONTAL_PADDING } from "@/constants/layout";

type ViewProps = ComponentProps<typeof View>;

export const ContentContainer = forwardRef<View, ViewProps>(function ContentContainer(
  { style, ...rest },
  ref,
) {
  return <View ref={ref} style={[styles.base, style]} {...rest} />;
});

const styles = StyleSheet.create({
  base: {
    paddingHorizontal: CONTENT_HORIZONTAL_PADDING,
  },
});
