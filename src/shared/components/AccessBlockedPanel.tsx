import { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

import { Button } from "@/src/design-system/components/Button";
import { useTheme } from "@/src/design-system/theme/useTheme";

type AccessBlockedPanelProps = {
  title: string;
  message: string;
  primaryCtaLabel: string;
  onPrimaryPress: () => void;
  secondaryCtaLabel?: string;
  onSecondaryPress?: () => void;
};

export function AccessBlockedPanel({
  title,
  message,
  primaryCtaLabel,
  onPrimaryPress,
  secondaryCtaLabel,
  onSecondaryPress,
}: AccessBlockedPanelProps) {
  const { palette } = useTheme();
  const styles = useMemo(() => createStyles(palette), [palette]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      <Button label={primaryCtaLabel} variant="primary" onPress={onPrimaryPress} />
      {secondaryCtaLabel && onSecondaryPress ? (
        <Button label={secondaryCtaLabel} variant="secondary" onPress={onSecondaryPress} />
      ) : null}
    </View>
  );
}

const createStyles = (palette: ReturnType<typeof useTheme>["palette"]) =>
  StyleSheet.create({
    container: {
      width: "100%",
      maxWidth: 420,
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
    },
    title: {
      fontSize: 22,
      lineHeight: 28,
      fontWeight: "800",
      color: palette.heading,
      textAlign: "center",
    },
    message: {
      color: palette.muted,
      fontSize: 14,
      lineHeight: 20,
      textAlign: "center",
      marginBottom: 4,
    },
  });
