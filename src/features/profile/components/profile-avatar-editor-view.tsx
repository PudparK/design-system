import { Image } from "expo-image";
import { useCallback, useMemo } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { AppPalette } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

type ProfileAvatarEditorViewProps = {
  avatarUri: string | null;
  isUploading: boolean;
  onActivate: () => void;
  size?: number;
  disabled?: boolean;
};

export function ProfileAvatarEditorView({
  avatarUri,
  isUploading,
  onActivate,
  size = 220,
  disabled = false,
}: ProfileAvatarEditorViewProps) {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? AppPalette.dark : AppPalette.light;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const onPressIn = useCallback(() => {
    if (disabled || isUploading) return;
    scale.value = withSpring(0.95, { damping: 14, stiffness: 260 });
  }, [disabled, isUploading, scale]);

  const onPressOut = useCallback(() => {
    if (disabled || isUploading) return;
    scale.value = withSpring(1, { damping: 14, stiffness: 260 });
    onActivate();
  }, [disabled, isUploading, onActivate, scale]);

  return (
    <Pressable
      disabled={disabled || isUploading}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={styles.pressable}
    >
      <Animated.View
        style={[
          animatedStyle,
          styles.avatarShell,
          { width: size, height: size, borderRadius: 12 },
        ]}
      >
        {avatarUri ? (
          <Image
            source={{ uri: avatarUri }}
            style={{ width: size, height: size, borderRadius: 12 }}
            contentFit="cover"
            transition={200}
          />
        ) : (
          <View
            style={[
              styles.emptyCircle,
              { width: size, height: size, borderRadius: 12 },
            ]}
          >
            <Text style={styles.plus}>+</Text>
          </View>
        )}

        {isUploading ? (
          <View style={styles.uploadOverlay}>
            <ActivityIndicator color={theme.onPrimary} />
          </View>
        ) : null}
      </Animated.View>
    </Pressable>
  );
}

const createStyles = (theme: typeof AppPalette.light) =>
  StyleSheet.create({
    pressable: {
      alignSelf: "flex-start",
    },
    avatarShell: {
      overflow: "hidden",
      backgroundColor: theme.background,
    },
    emptyCircle: {
      borderWidth: 2,
      borderStyle: "dashed",
      borderColor: theme.border,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.background,
    },
    plus: {
      fontSize: 42,
      lineHeight: 42,
      color: theme.text,
      fontWeight: "600",
    },
    uploadOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "rgba(0,0,0,0.34)",
      alignItems: "center",
      justifyContent: "center",
    },
  });
