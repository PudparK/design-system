import type { Preview } from "@storybook/react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import { Platform, Pressable, Text, View } from "react-native";

import { ThemePreferenceProvider, useThemePreference } from "@/contexts/theme-context";
import { AppPalette } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

const topLevelOrder = ["Design System", "Components", "Patterns", "Internal"] as const;
const topLevelIndex = new Map(topLevelOrder.map((label, index) => [label, index]));

const secondLevelOrder = new Map<string, string[]>([
  ["Design System", ["Foundations", "Layout"]],
  ["Components", ["Actions", "Data Display", "Disclosure", "Feedback", "Forms", "Media", "Surfaces"]],
  ["Patterns", ["Cards", "Content", "Forms", "Profiles", "States"]],
  ["Internal", ["Shared"]],
]);

const thirdLevelOrder = new Map<string, string[]>([
  ["Design System/Foundations", ["Overview", "Primitives", "Colors", "Typography", "Spacing", "Radius", "Elevation", "Motion"]],
]);

function sortByConfiguredOrder(a: string, b: string, order: string[]) {
  const indexMap = new Map(order.map((label, index) => [label, index]));
  const aIndex = indexMap.get(a);
  const bIndex = indexMap.get(b);

  if (aIndex !== undefined || bIndex !== undefined) {
    if (aIndex === undefined) return 1;
    if (bIndex === undefined) return -1;
    return aIndex - bIndex;
  }

  return a.localeCompare(b);
}

function compareStoryTitles(aTitle: string, bTitle: string) {
  const aParts = aTitle.split("/");
  const bParts = bTitle.split("/");

  const aTop = topLevelIndex.get(aParts[0]) ?? Number.MAX_SAFE_INTEGER;
  const bTop = topLevelIndex.get(bParts[0]) ?? Number.MAX_SAFE_INTEGER;
  if (aTop !== bTop) return aTop - bTop;

  const secondOrder = secondLevelOrder.get(aParts[0]);
  if (secondOrder && aParts[1] !== bParts[1]) {
    return sortByConfiguredOrder(aParts[1] ?? "", bParts[1] ?? "", secondOrder);
  }

  const thirdOrder = thirdLevelOrder.get(`${aParts[0]}/${aParts[1]}`);
  if (thirdOrder && aParts[2] !== bParts[2]) {
    return sortByConfiguredOrder(aParts[2] ?? "", bParts[2] ?? "", thirdOrder);
  }

  return aTitle.localeCompare(bTitle);
}

function StorybookSurface({
  children,
}: {
  children: React.ReactNode;
}) {
  const colorScheme = useColorScheme();
  const palette = colorScheme === "dark" ? AppPalette.dark : AppPalette.light;
  const insets = useSafeAreaInsets();
  const isWeb = Platform.OS === "web";

  return (
    <View style={{ flex: 1, backgroundColor: palette.background }}>
      <ThemeModeToggle />
      {isWeb ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 20,
            paddingTop: insets.top ? 0 : 56,
            paddingBottom: 20,
          }}
        >
            <View
              style={{
                width: "100%",
                minWidth: 360,
                maxWidth: 430,
                height: "100%",
                maxHeight: 932,
              borderRadius: 36,
              overflow: "hidden",
              borderWidth: 10,
              borderColor: "#111111",
              backgroundColor: palette.background,
              boxShadow: "0px 24px 60px rgba(0,0,0,0.22)",
            }}
          >
            <View
              pointerEvents="none"
              style={{
                position: "absolute",
                top: 12,
                left: "50%",
                marginLeft: -60,
                width: 120,
                height: 18,
                borderRadius: 999,
                backgroundColor: "#111111",
                zIndex: 2,
              }}
            />
            <View style={{ flex: 1, paddingTop: 34 }}>{children}</View>
          </View>
        </View>
      ) : (
        <View style={{ flex: 1, paddingTop: insets.top ? 0 : 56 }}>{children}</View>
      )}
    </View>
  );
}

function ThemeModeToggle() {
  const { preference, setPreference } = useThemePreference();
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const palette = colorScheme === "dark" ? AppPalette.dark : AppPalette.light;

  const options = [
    { label: "System", value: "system" },
    { label: "Light", value: "light" },
    { label: "Dark", value: "dark" },
  ] as const;

  return (
    <View
      pointerEvents="box-none"
      style={{
        position: "absolute",
        top: (insets.top || 12) + 8,
        right: 12,
        zIndex: 1000,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 6,
          padding: 6,
          borderRadius: 999,
          borderWidth: 1,
          borderColor: palette.border,
          backgroundColor: palette.surface,
        }}
      >
        {options.map((option) => {
          const selected = preference === option.value;

          return (
            <Pressable
              key={option.value}
              onPress={() => setPreference(option.value)}
              style={{
                paddingHorizontal: 10,
                paddingVertical: 6,
                borderRadius: 999,
                backgroundColor: selected ? palette.primary : "transparent",
              }}
            >
              <Text
                style={{
                  color: selected ? palette.onPrimary : palette.text,
                  fontSize: 12,
                  fontWeight: "700",
                }}
              >
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const preview: Preview = {
  decorators: [
    (Story) => (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <ThemePreferenceProvider>
            <StorybookSurface>
              <Story />
            </StorybookSurface>
          </ThemePreferenceProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    ),
  ],
  parameters: {
    backgrounds: {
      default: "app-light-bg",
      values: [
        { name: "app-light-bg", value: AppPalette.light.background },
        { name: "app-dark-bg", value: AppPalette.dark.background },
        { name: "app-light-surface", value: AppPalette.light.surface },
        { name: "app-dark-surface", value: AppPalette.dark.surface },
      ],
    },
    actions: {
      argTypesRegex: "^on[A-Z].*",
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    options: {
      storySort: (a, b) => compareStoryTitles(a.title, b.title),
    },
  },
};

export default preview;
