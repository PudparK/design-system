import { useMemo } from "react";
import { Modal, Platform, StyleSheet, Text, View } from "react-native";

import { Banner } from "@/src/design-system/components/Banner";
import { Button } from "@/src/design-system/components/Button";
import { useTheme } from "@/src/design-system/theme/useTheme";
import { radius } from "@/src/design-system/tokens";

type ActionErrorModalProps = {
  visible: boolean;
  title?: string;
  message: string;
  tone: "warning" | "error";
  retryable: boolean;
  isRetrying: boolean;
  onRetry: () => void;
  onClose: () => void;
};

export function ActionErrorModal({
  visible,
  title = "Could not complete action",
  message,
  tone,
  retryable,
  isRetrying,
  onRetry,
  onClose,
}: ActionErrorModalProps) {
  const { palette, tokens } = useTheme();
  const styles = useMemo(() => createStyles(palette, tokens), [palette, tokens]);
  const content = (
    <View style={styles.backdrop}>
      <View style={styles.card}>
        <Text style={styles.title}>{title}</Text>
        <Banner helperText={message} tone={tone} />
        {retryable ? (
          <Button
            label={isRetrying ? "Retrying..." : "Retry action"}
            variant="primary"
            onPress={onRetry}
            loading={isRetrying}
            disabled={isRetrying}
            containerStyle={styles.primaryButton}
          />
        ) : null}
        <Button
          label="Close"
          variant="secondary"
          onPress={onClose}
          containerStyle={styles.closeButton}
        />
      </View>
    </View>
  );

  if (!visible) {
    return null;
  }

  if (Platform.OS === "web") {
    return <View style={styles.inlineOverlay}>{content}</View>;
  }

  return (
    <Modal visible animationType="fade" transparent onRequestClose={onClose}>
      {content}
    </Modal>
  );
}

const createStyles = (
  palette: ReturnType<typeof useTheme>["palette"],
  tokens: ReturnType<typeof useTheme>["tokens"],
) =>
  StyleSheet.create({
    backdrop: {
      flex: 1,
      justifyContent: "center",
      paddingHorizontal: tokens.space[4],
      backgroundColor: "rgba(15, 23, 20, 0.28)",
    },
    inlineOverlay: {
      ...StyleSheet.absoluteFillObject,
      zIndex: 50,
      justifyContent: "center",
    },
    card: {
      width: "100%",
      maxWidth: 460,
      alignSelf: "center",
      borderRadius: radius.md,
      borderWidth: 1,
      borderColor: palette.border,
      backgroundColor: palette.surface,
      padding: tokens.space[4],
      gap: tokens.space[3],
    },
    title: {
      fontSize: 20,
      lineHeight: 24,
      fontWeight: "800",
      color: palette.heading,
    },
    primaryButton: {
      marginTop: tokens.space[1],
    },
    closeButton: {
      marginTop: tokens.space[1],
    },
  });
