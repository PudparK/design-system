import { StyleSheet } from "react-native";

import { CONTENT_HORIZONTAL_PADDING, SUBPAGE_CONTENT_TOP_PADDING } from "@/constants/layout";
import type { SemanticTokens } from "@/src/design-system/tokens/semantic";

type ThemePalette = {
  background: string;
  surface: string;
  heading: string;
  muted: string;
  subtle: string;
  border: string;
  primary: string;
  onPrimary: string;
};

export function createUserDetailsStyles(theme: ThemePalette, tokens: SemanticTokens) {
  return StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: theme.background,
    },
    content: {
      paddingHorizontal: CONTENT_HORIZONTAL_PADDING,
      paddingTop: SUBPAGE_CONTENT_TOP_PADDING,
      paddingBottom: tokens.space[7],
      gap: tokens.space[3],
    },
    photo: {
      width: "100%",
      aspectRatio: 1,
      borderRadius: tokens.radius.md,
      backgroundColor: theme.border,
    },
    photoFallback: {
      borderWidth: 1,
      borderColor: theme.border,
    },
    name: {
      fontSize: 28,
      lineHeight: 34,
      fontWeight: "800",
      color: theme.heading,
    },
    tagline: {
      fontSize: 15,
      lineHeight: 20,
      color: theme.subtle,
    },
    block: {
      gap: 4,
    },
    sectionLabel: {
      fontSize: 11,
      lineHeight: 14,
      fontWeight: "700",
      letterSpacing: 0.8,
      textTransform: "uppercase",
      color: theme.muted,
    },
    detailValue: {
      fontSize: 15,
      lineHeight: 21,
      fontWeight: "500",
      color: theme.heading,
    },
    detailValueRelaxed: {
      fontSize: 15,
      lineHeight: 24,
      fontWeight: "500",
      color: theme.heading,
    },
    ctaBar: {
      position: "absolute",
      left: 16,
      right: 16,
      bottom: 12,
      flexDirection: "row",
      gap: 10,
    },
    ctaButton: {
      flex: 1,
      minHeight: 46,
      borderRadius: tokens.radius.md,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
    },
    primaryCta: {
      backgroundColor: theme.primary,
      borderColor: theme.primary,
    },
    secondaryCta: {
      backgroundColor: theme.surface,
      borderColor: theme.border,
    },
    primaryCtaText: {
      color: theme.onPrimary,
      fontWeight: "700",
      fontSize: 15,
    },
    secondaryCtaText: {
      color: theme.heading,
      fontWeight: "700",
      fontSize: 15,
    },
    centered: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
      gap: 8,
      backgroundColor: theme.background,
    },
    meta: {
      color: theme.muted,
      fontSize: 13,
    },
    errorTitle: {
      fontSize: 18,
      fontWeight: "700",
      color: theme.heading,
    },
    errorText: {
      color: theme.muted,
      textAlign: "center",
    },
    backButton: {
      marginTop: 10,
      backgroundColor: theme.primary,
      borderRadius: tokens.radius.sm,
      paddingHorizontal: 14,
      paddingVertical: 10,
    },
    backButtonText: {
      color: theme.onPrimary,
      fontWeight: "700",
    },
  });
}

export type UserDetailsStyles = ReturnType<typeof createUserDetailsStyles>;
