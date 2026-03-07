// Fallback for using MaterialIcons on Android and web.

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SymbolWeight } from "expo-symbols";
import { ComponentProps } from "react";
import { OpaqueColorValue, type StyleProp, type TextStyle } from "react-native";

type IconMapping = Record<string, ComponentProps<typeof MaterialIcons>["name"]>;
type IconSymbolName = keyof typeof MAPPING;

/**
 * Add your SF Symbols to Material Icons mappings here.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
const MAPPING = {
  house: "home",
  "house.fill": "home-filled",
  heart: "favorite-border",
  "heart.fill": "favorite",
  sparkles: "auto-awesome",
  shield: "shield",
  "shield.fill": "shield",
  person: "person-outline",
  "person.fill": "person",
  "lock.fill": "lock",
  "lock.open.fill": "lock-open",
  "info.circle": "info-outline",
  gearshape: "settings",
  "person.crop.circle.badge.checkmark": "verified-user",
  "square.and.pencil": "edit",
  "rectangle.portrait.and.arrow.right": "logout",
  "paperplane.fill": "send",
  plus: "add",
  "chevron.up": "expand-less",
  "chevron.down": "expand-more",
  "chevron.up.circle": "keyboard-arrow-up",
  "chevron.down.circle": "keyboard-arrow-down",
  trash: "delete-outline",
  "chevron.left.forwardslash.chevron.right": "code",
  "chevron.left": "chevron-left",
  "chevron.right": "chevron-right",
  "sun.max": "light-mode",
  "moon.stars": "dark-mode",
  checkmark: "check",
  "rectangle.portrait.and.arrow.forward": "login",
} as IconMapping;

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return (
    <MaterialIcons
      color={color}
      size={size}
      name={MAPPING[name]}
      style={style}
    />
  );
}
