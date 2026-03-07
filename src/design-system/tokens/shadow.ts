import type { ViewStyle } from "react-native";

const shadowByLevel = {
  none: {
    shadowColor: "#0b1220",
    shadowOpacity: 0,
    shadowRadius: 0,
    shadowOffset: { width: 0, height: 0 },
    elevation: 0,
  },
  sm: {
    shadowColor: "#0b1220",
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  md: {
    shadowColor: "#0b1220",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  lg: {
    shadowColor: "#0b1220",
    shadowOpacity: 0.14,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  xl: {
    shadowColor: "#0b1220",
    shadowOpacity: 0.18,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 12 },
    elevation: 10,
  },
} as const satisfies Record<string, ViewStyle>;

export type ShadowLevel = keyof typeof shadowByLevel;

export function shadow(level: ShadowLevel): ViewStyle {
  return shadowByLevel[level];
}
