export const motion = {
  duration: {
    fast: 120,
    normal: 200,
    slow: 300,
  },
  easing: {
    // Cubic-bezier tuples represented as [x1, y1, x2, y2]
    standard: [0.2, 0, 0, 1],
    decelerate: [0, 0, 0, 1],
    accelerate: [0.4, 0, 1, 1],
  },
} as const;

export type MotionDurationKey = keyof typeof motion.duration;
export type MotionEasingKey = keyof typeof motion.easing;
