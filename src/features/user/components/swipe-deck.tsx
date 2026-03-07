import {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import { AppPalette } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

type SwipeDeckProps<T> = {
  cards: T[];
  index: number;
  setIndex: Dispatch<SetStateAction<number>>;
  renderCard: (card: T) => ReactNode;
  keyExtractor: (card: T) => string;
  onLike?: (userId: string) => void | Promise<void>;
  onPass?: (userId: string) => void | Promise<void>;
};

const DECK_CONFIG = {
  // Timing & Physics
  SWIPE_DURATION: 250,
  SPRING_DAMPING: 0.75,

  // Sensitivity
  SWIPE_THRESHOLD: 120,
  ROTATION_DEGREE: 15,

  // Positioning
  CARD_STACK_GAP: 10,
  NEXT_CARD_SCALE: 0.94,

  // Out-of-bounds
  EXIT_VELOCITY: 2000,
} as const;

export function SwipeDeck<T>({
  cards,
  index,
  setIndex,
  renderCard,
  keyExtractor,
  onLike,
  onPass,
}: SwipeDeckProps<T>) {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? AppPalette.dark : AppPalette.light;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { width } = useWindowDimensions();
  const swipeThreshold = DECK_CONFIG.SWIPE_THRESHOLD;
  const swipeOutX = width * 1.2;

  const topCard = cards[index];
  const nextCard = cards[index + 1];
  const topCardId = topCard ? keyExtractor(topCard) : null;

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const isAnimatingOut = useSharedValue(false);
  const pendingSwipeRef = useRef<{
    direction: 1 | -1;
    userId: string;
    sourceIndex: number;
  } | null>(null);

  useLayoutEffect(() => {
    translateX.value = 0;
    translateY.value = 0;
    isAnimatingOut.value = false;
  }, [index, topCardId, isAnimatingOut, translateX, translateY]);

  const handleSwipeComplete = useCallback(
    (direction: 1 | -1, userId: string | null) => {
      if (!userId) return;
      pendingSwipeRef.current = { direction, userId, sourceIndex: index };
      setIndex((value) => value + 1);
    },
    [index, setIndex],
  );

  useEffect(() => {
    const pendingSwipe = pendingSwipeRef.current;
    if (!pendingSwipe) return;
    if (index <= pendingSwipe.sourceIndex) return;

    pendingSwipeRef.current = null;

    if (pendingSwipe.direction === 1) {
      void onLike?.(pendingSwipe.userId);
      return;
    }

    void onPass?.(pendingSwipe.userId);
  }, [index, onLike, onPass]);

  const panGesture = useMemo(
    () =>
      Gesture.Pan()
        .activeOffsetX([-14, 14])
        .failOffsetY([-10, 10])
        .onUpdate((event) => {
          if (isAnimatingOut.value) return;
          translateX.value = event.translationX;
          translateY.value = event.translationY;
        })
        .onEnd(() => {
          if (isAnimatingOut.value) return;

          if (Math.abs(translateX.value) > swipeThreshold) {
            const direction = translateX.value > 0 ? 1 : -1;
            const remainingDistance = Math.max(
              0,
              swipeOutX - Math.abs(translateX.value),
            );
            const velocityDuration =
              (remainingDistance / DECK_CONFIG.EXIT_VELOCITY) * 1000;
            const exitDuration = Math.max(
              100,
              Math.min(DECK_CONFIG.SWIPE_DURATION, velocityDuration),
            );
            isAnimatingOut.value = true;
            translateX.value = withTiming(
              direction * swipeOutX,
              { duration: exitDuration },
              (finished) => {
                if (!finished) {
                  isAnimatingOut.value = false;
                  return;
                }

                runOnJS(handleSwipeComplete)(direction, topCardId);
              },
            );
            return;
          }

          translateX.value = withSpring(0, {
            damping: 20 * DECK_CONFIG.SPRING_DAMPING,
            stiffness: 220,
          });
          translateY.value = withSpring(0, {
            damping: 20 * DECK_CONFIG.SPRING_DAMPING,
            stiffness: 220,
          });
        }),
    [
      handleSwipeComplete,
      isAnimatingOut,
      swipeOutX,
      swipeThreshold,
      topCardId,
      translateX,
      translateY,
    ],
  );

  const topCardStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      translateX.value,
      [-width, 0, width],
      [-DECK_CONFIG.ROTATION_DEGREE, 0, DECK_CONFIG.ROTATION_DEGREE],
      Extrapolation.CLAMP,
    );

    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotateZ: `${rotate}deg` },
      ],
    };
  });

  const nextCardStyle = useAnimatedStyle(() => {
    const absX = Math.abs(translateX.value);
    const linearProgress = interpolate(
      absX,
      [0, swipeThreshold],
      [0, 1],
      Extrapolation.CLAMP,
    );
    // Cubic ease-out gives the "bezier-style" glide instead of a linear pop.
    const easedProgress = 1 - Math.pow(1 - linearProgress, 3);

    const translateY = interpolate(
      easedProgress,
      [0, 1],
      [DECK_CONFIG.CARD_STACK_GAP, 0],
      Extrapolation.CLAMP,
    );
    const scale = interpolate(
      easedProgress,
      [0, 1],
      [DECK_CONFIG.NEXT_CARD_SCALE, 1],
      Extrapolation.CLAMP,
    );
    const opacity = interpolate(
      easedProgress,
      [0, 1],
      [0.88, 1],
      Extrapolation.CLAMP,
    );

    return {
      transform: [{ translateY }, { scale }],
      opacity,
    };
  });

  if (!topCard) return null;

  return (
    <GestureDetector gesture={panGesture}>
      <View style={styles.stack}>
        {nextCard ? (
          <Animated.View
            key={keyExtractor(nextCard)}
            style={[styles.card, styles.underCard, nextCardStyle]}
          >
            {renderCard(nextCard)}
          </Animated.View>
        ) : null}
        <Animated.View
          key={keyExtractor(topCard)}
          style={[styles.card, styles.topCard, topCardStyle]}
        >
          {renderCard(topCard)}
        </Animated.View>
      </View>
    </GestureDetector>
  );
}

const createStyles = (theme: typeof AppPalette.light) =>
  StyleSheet.create({
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
      borderRadius: 14,
      overflow: "hidden",
      backgroundColor: theme.surface,
      boxShadow: `0px 8px 14px rgba(0, 0, 0, ${theme.background === "#374741" ? 0.28 : 0.12})`,
      elevation: theme.background === "#374741" ? 9 : 6,
    },
    underCard: {
      top: 0,
      zIndex: 1,
    },
    topCard: {
      zIndex: 2,
    },
  });
