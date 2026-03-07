import Octicons from "@expo/vector-icons/Octicons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { CONTENT_HORIZONTAL_PADDING, HEADER_HEIGHT } from "@/constants/layout";
import { AppPalette } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

type AppHeaderProps = {
  title: string;
  showBack?: boolean;
  onBackPress?: () => void;
};

export function AppHeader({ title, showBack = false, onBackPress }: AppHeaderProps) {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? AppPalette.dark : AppPalette.light;
  const styles = createStyles(theme);
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.header, { paddingTop: insets.top, height: HEADER_HEIGHT + insets.top }]}>
      <View style={styles.container}>
        <View style={styles.sideSlot}>
          {showBack ? (
            <Pressable
              onPress={onBackPress}
              style={styles.backButton}
              accessibilityRole="button"
              accessibilityLabel="Go back"
            >
              <Octicons name="arrow-left" size={18} color={theme.heading} />
            </Pressable>
          ) : null}
        </View>
        <Text numberOfLines={1} style={styles.title}>
          {title}
        </Text>
        <View style={styles.sideSlot} />
      </View>
    </View>
  );
}

const createStyles = (theme: typeof AppPalette.light) =>
  StyleSheet.create({
    header: {
      backgroundColor: theme.background,
      height: HEADER_HEIGHT,
      justifyContent: "center",
    },
    container: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: CONTENT_HORIZONTAL_PADDING,
    },
    sideSlot: {
      width: 36,
      height: 36,
      alignItems: "center",
      justifyContent: "center",
    },
    backButton: {
      width: 36,
      height: 36,
      borderRadius: 18,
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      flex: 1,
      textAlign: "center",
      color: theme.heading,
      fontSize: 18,
      fontWeight: "700",
    },
  });
