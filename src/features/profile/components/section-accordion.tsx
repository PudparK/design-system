import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  LayoutAnimation,
  Pressable,
  StyleSheet,
  Text,
  UIManager,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";

import { IconSymbol } from "@/src/design-system/components/ui/icon-symbol";
import { AppPalette } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

type SectionAccordionProps = {
  title: string;
  subtitle?: string;
  defaultExpanded?: boolean;
  children: ReactNode;
};

export function SectionAccordion({
  title,
  subtitle,
  defaultExpanded = false,
  children,
}: SectionAccordionProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? AppPalette.dark : AppPalette.light;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const chevronProgress = useSharedValue(defaultExpanded ? 1 : 0);

  useEffect(() => {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  function toggleExpanded() {
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded((value) => {
      const next = !value;
      chevronProgress.value = withTiming(next ? 1 : 0, { duration: 180 });
      return next;
    });
  }

  const chevronAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${chevronProgress.value * 90}deg` }],
  }));

  return (
    <View style={styles.card}>
      <Pressable
        onPress={toggleExpanded}
        style={styles.header}
        android_disableSound
        accessibilityRole="button"
        accessibilityState={{ expanded }}
      >
        <View style={styles.titleBlock}>
          <Text style={styles.title}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
        <Animated.View style={chevronAnimatedStyle}>
          <IconSymbol name="chevron.right" size={16} color={theme.muted} />
        </Animated.View>
      </Pressable>

      {expanded ? <View style={styles.body}>{children}</View> : null}
    </View>
  );
}

const createStyles = (theme: typeof AppPalette.light) => {
  const isDark = theme.background === AppPalette.dark.background;
  return StyleSheet.create({
    card: {
      borderRadius: 12,
      backgroundColor: isDark ? "#42534d" : "#edf3f0",
      borderWidth: 0.5,
      borderColor: isDark ? "#5d7068" : "#d3ddd9",
      overflow: "hidden",
    },
    header: {
      minHeight: 52,
      paddingHorizontal: 14,
      paddingVertical: 10,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 10,
    },
    titleBlock: {
      flex: 1,
      gap: 2,
    },
    title: {
      color: theme.heading,
      fontSize: 15,
      fontWeight: "700",
      letterSpacing: 0.2,
    },
    subtitle: {
      color: theme.muted,
      fontSize: 12,
    },
    body: {
      paddingHorizontal: 14,
      paddingBottom: 14,
      gap: 12,
    },
  });
};
