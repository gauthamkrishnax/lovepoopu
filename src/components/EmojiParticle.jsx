import React, {useEffect} from 'react';
import {Dimensions} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
  Easing,
} from 'react-native-reanimated';

const {width, height} = Dimensions.get('window');

export function EmojiParticle({emoji, onDone}) {
  // Shared values
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(1);
  const scale = useSharedValue(0);

  // Random direction from center
  const xOffset = (Math.random() - 0.5) * width * 1.2; // spread horizontally
  const yOffset = (Math.random() - 0.5) * height * 1.2; // spread vertically

  useEffect(() => {
    // Start animation
    translateX.value = withTiming(xOffset, {
      duration: 5000,
      easing: Easing.out(Easing.exp),
    });
    translateY.value = withTiming(yOffset, {
      duration: 5000,
      easing: Easing.out(Easing.exp),
    });
    scale.value = withTiming(1, {duration: 400});
    opacity.value = withTiming(
      0,
      {
        duration: 3000,
        delay: 800,
      },
      finished => {
        if (finished) runOnJS(onDone)();
      },
    );
  }, []);

  const style = useAnimatedStyle(() => ({
    position: 'absolute',
    left: width / 2 - 15, // center-ish
    top: height / 2 - 15,
    transform: [
      {translateX: translateX.value},
      {translateY: translateY.value},
      {scale: scale.value},
    ],
    opacity: opacity.value,
  }));

  return <Animated.Text style={[{fontSize: 30}, style]}>{emoji}</Animated.Text>;
}
