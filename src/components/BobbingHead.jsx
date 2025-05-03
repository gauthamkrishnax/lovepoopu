import {Image, View} from 'react-native';
import images from '../constants/headImage';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  withSpring,
  withDelay,
} from 'react-native-reanimated';
import {useEffect} from 'react';

export default function BobbingHead({headId, position, delay}) {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withDelay(
      delay ? delay : 0,
      withRepeat(
        withTiming(5, {
          duration: 500,
          easing: Easing.inOut(Easing.ease),
        }),
        -1, // infinite
        true, // reverse on every iteration
      ),
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${rotation.value}deg`,
        },
      ],
    };
  });

  return (
    <View
      style={{
        position: 'absolute',
        ...position,
        zIndex: 1,
        transform: [{rotate: '-5deg'}],
      }}>
      <Animated.View style={animatedStyle}>
        <Image
          resizeMode="contain"
          style={{
            height: 180,
            width: 180,
          }}
          source={images.find(image => image.id === headId).source}
        />
      </Animated.View>
    </View>
  );
}
