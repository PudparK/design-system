import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { Banner } from "@/src/design-system/components/Banner";
import { Button } from "@/src/design-system/components/Button";
import { useTheme } from "@/src/design-system/theme/useTheme";

type StateAction = {
  label: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: "primary" | "secondary";
};

type BaseScreenStateProps = {
  title: string;
  body?: string;
};

type CenteredSpinnerProps = {
  label?: string;
};

type EmptyStateProps = BaseScreenStateProps & {
  primaryAction?: StateAction;
  secondaryAction?: StateAction;
};

type ErrorStateProps = BaseScreenStateProps & {
  errorMessage: string;
  primaryAction?: StateAction;
  secondaryAction?: StateAction;
};

export function CenteredSpinner({ label = "Loading..." }: CenteredSpinnerProps) {
  const { palette, tokens } = useTheme();
  const styles = createStyles(palette, tokens);

  return (
    <View style={styles.container}>
      <ActivityIndicator color={palette.primary} />
      <Text style={styles.body}>{label}</Text>
    </View>
  );
}

export function EmptyState({ title, body, primaryAction, secondaryAction }: EmptyStateProps) {
  const { palette, tokens } = useTheme();
  const styles = createStyles(palette, tokens);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {body ? <Text style={styles.body}>{body}</Text> : null}
      {primaryAction ? (
        <Button
          label={primaryAction.label}
          variant={primaryAction.variant ?? "primary"}
          onPress={primaryAction.onPress}
          loading={primaryAction.loading}
          disabled={primaryAction.disabled}
          containerStyle={styles.action}
        />
      ) : null}
      {secondaryAction ? (
        <Button
          label={secondaryAction.label}
          variant={secondaryAction.variant ?? "secondary"}
          onPress={secondaryAction.onPress}
          loading={secondaryAction.loading}
          disabled={secondaryAction.disabled}
          containerStyle={styles.action}
        />
      ) : null}
    </View>
  );
}

export function ErrorState({
  title,
  body,
  errorMessage,
  primaryAction,
  secondaryAction,
}: ErrorStateProps) {
  const { palette, tokens } = useTheme();
  const styles = createStyles(palette, tokens);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {body ? <Text style={styles.body}>{body}</Text> : null}
      <Banner helperText={errorMessage} tone="error" containerStyle={styles.banner} />
      {primaryAction ? (
        <Button
          label={primaryAction.label}
          variant={primaryAction.variant ?? "primary"}
          onPress={primaryAction.onPress}
          loading={primaryAction.loading}
          disabled={primaryAction.disabled}
          containerStyle={styles.action}
        />
      ) : null}
      {secondaryAction ? (
        <Button
          label={secondaryAction.label}
          variant={secondaryAction.variant ?? "secondary"}
          onPress={secondaryAction.onPress}
          loading={secondaryAction.loading}
          disabled={secondaryAction.disabled}
          containerStyle={styles.action}
        />
      ) : null}
    </View>
  );
}

const createStyles = (
  palette: ReturnType<typeof useTheme>["palette"],
  tokens: ReturnType<typeof useTheme>["tokens"],
) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: tokens.space[4],
      backgroundColor: palette.background,
    },
    title: {
      fontSize: 24,
      lineHeight: 30,
      fontWeight: "800",
      letterSpacing: -0.3,
      color: palette.heading,
      textAlign: "center",
    },
    body: {
      marginTop: tokens.space[2],
      fontSize: 14,
      lineHeight: 20,
      color: palette.muted,
      textAlign: "center",
    },
    banner: {
      width: "100%",
      maxWidth: 460,
      marginTop: tokens.space[4],
    },
    action: {
      marginTop: tokens.space[3],
      width: "100%",
      maxWidth: 300,
    },
  });
