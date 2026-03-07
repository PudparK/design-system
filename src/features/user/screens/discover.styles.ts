import { StyleSheet } from "react-native";

import { SUBPAGE_CONTENT_TOP_PADDING } from "@/constants/layout";
import { radius } from "@/src/design-system/tokens";
import type { SemanticTokens } from "@/src/design-system/tokens/semantic";

type ThemePalette = {
  background: string;
  surface: string;
  text: string;
  heading: string;
  muted: string;
  subtle: string;
  border: string;
  primary: string;
  onPrimary: string;
};

export function createDiscoverStyles(theme: ThemePalette, tokens: SemanticTokens, isDark: boolean) {
  return StyleSheet.create({
    screen: {
      flex: 1,
      paddingHorizontal: tokens.space[4],
      paddingTop: SUBPAGE_CONTENT_TOP_PADDING,
      paddingBottom: tokens.space[3],
      backgroundColor: theme.background,
    },
    title: {
      fontSize: 28,
      fontWeight: "800",
      lineHeight: 32,
      letterSpacing: -0.3,
      color: theme.heading,
      textAlign: "center",
    },
    metaText: {
      marginTop: 2,
      fontSize: 13,
      lineHeight: 18,
      color: theme.muted,
    },
    cardBody: {
      paddingHorizontal: tokens.space[4],
      paddingTop: 14,
      paddingBottom: 26,
      gap: tokens.space[3],
    },
    cardContent: {
      flex: 1,
    },
    stack: {
      flex: 1,
      marginTop: 14,
      marginBottom: 14,
      alignItems: "center",
      justifyContent: "center",
    },
    card: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: "100%",
      height: "100%",
      maxWidth: 430,
      alignSelf: "center",
      borderRadius: radius.lg,
      overflow: "hidden",
      backgroundColor: theme.surface,
      borderWidth: 1,
      borderColor: isDark ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.84)",
      boxShadow: `0px 4px 6px rgba(0, 0, 0, ${isDark ? 0.14 : 0.1})`,
      elevation: isDark ? 4 : 3,
    },
    underCard: {
      top: 0,
      zIndex: 1,
      transform: [{ translateY: 10 }, { scale: 0.94 }],
      opacity: 0.88,
      boxShadow: `0px 2px 4px rgba(0, 0, 0, ${isDark ? 0.1 : 0.06})`,
      elevation: 1,
    },
    topCard: {
      zIndex: 2,
    },
    detailsViewport: {
      flex: 1,
      position: "relative",
      overflow: "hidden",
    },
    cardScroll: {
      flex: 1,
    },
    edgeFade: {
      position: "absolute",
      left: 0,
      right: 0,
      height: 22,
    },
    edgeFadeTop: {
      top: 0,
    },
    edgeFadeBottom: {
      bottom: 0,
    },
    photo: {
      width: "100%",
      height: 320,
      borderRadius: radius.md,
      backgroundColor: theme.border,
    },
    photoFallback: {
      borderWidth: 1,
      borderColor: theme.border,
    },
    unpublishedBadge: {
      alignSelf: "flex-start",
      marginTop: 8,
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 999,
      borderWidth: 0.75,
      borderColor: isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.14)",
      backgroundColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
    },
    unpublishedBadgeText: {
      fontSize: 11,
      lineHeight: 14,
      fontWeight: "700",
      letterSpacing: 0.7,
      textTransform: "uppercase",
      color: theme.muted,
    },
    name: {
      fontSize: 25,
      lineHeight: 30,
      fontWeight: "800",
      letterSpacing: -0.3,
      color: theme.heading,
    },
    tagline: {
      fontSize: 14,
      lineHeight: 19,
      color: theme.subtle,
    },
    block: {
      gap: 3,
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
      lineHeight: 20,
      fontWeight: "500",
      color: theme.heading,
    },
    bio: {
      fontSize: 15,
      lineHeight: 22,
      color: theme.subtle,
    },
    floatingEditButton: {
      position: "absolute",
      right: 24,
      top: 24,
      zIndex: 3,
      width: 46,
      height: 46,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: radius["2xl"],
      backgroundColor: theme.primary,
      boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.24)",
      elevation: 5,
    },
    button: {
      marginTop: 14,
      backgroundColor: theme.primary,
      paddingHorizontal: 14,
      paddingVertical: 10,
      borderRadius: radius.sm,
    },
    buttonText: {
      color: theme.onPrimary,
      fontWeight: "600",
    },
    centered: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      padding: tokens.space[4],
      backgroundColor: theme.background,
    },
  });
}

export type DiscoverStyles = ReturnType<typeof createDiscoverStyles>;
