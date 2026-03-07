export const radius = {
  none: 0,
  xs: 4,
  sm: 6,
  md: 10,
  lg: 14,
  xl: 18,
  "2xl": 24,
  pill: 999,
  // Legacy alias; prefer `pill` for intentional fully-rounded shapes.
  "3xl": 999,
} as const;

export type RadiusKey = keyof typeof radius;
