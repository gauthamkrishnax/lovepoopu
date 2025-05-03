import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import {useEffect} from 'react';
import {Image} from 'react-native';

export default function PulsingHeart() {
  const scale = useSharedValue(1);
  useEffect(() => {
    scale.value = withRepeat(
      withTiming(1.02, {
        duration: 500,
        easing: Easing.inOut(Easing.ease),
      }),
      -1, // Infinite
      true, // Reverse on each repeat
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Image
        style={{
          width: 250,
          height: 250,
          marginHorizontal: 'auto',
        }}
        source={require('../assets/heart.png')}
      />
    </Animated.View>
  );
}
