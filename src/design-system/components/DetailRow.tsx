import { StyleSheet, Text, View, type StyleProp, type TextStyle, type ViewStyle } from "react-native";

import { space } from "@/src/design-system/tokens";

type DetailRowProps = {
  label: string;
  value: string;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  valueStyle?: StyleProp<TextStyle>;
};

export function DetailRow({
  label,
  value,
  containerStyle,
  labelStyle,
  valueStyle,
}: DetailRowProps) {
  return (
    <View style={[styles.block, containerStyle]}>
      <Text style={[styles.sectionLabel, labelStyle]}>{label}</Text>
      <Text style={[styles.detailValue, valueStyle]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    gap: space.xs,
  },
  sectionLabel: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: "700",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  detailValue: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "500",
  },
});
