import React, {useEffect, forwardRef, useImperativeHandle} from 'react';
import {View, StyleSheet} from 'react-native';
import BobbingHead from './BobbingHead';
import PulsingHeart from './PulsingHeart';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  withRepeat,
  withSpring,
  withDelay,
} from 'react-native-reanimated';

const HeadsAndHeart = forwardRef(({userData}, ref) => {
  const head1Position = useSharedValue(30); // Initial left position for the first head
  const head2Position = useSharedValue(30); // Initial right position for the second head
  const heartScale = useSharedValue(1); // Initial scale for the heart

  // States for the kiss emoji
  const showKissEmoji = useSharedValue(0); // Control opacity
  const emojiScale = useSharedValue(0); // Control scale animation

  const triggerAnimation = (reverse = false) => {
    // Animate the heads to move closer together or reset
    head1Position.value = withTiming(reverse ? 0 : -60, {
      duration: 1000,
      easing: Easing.inOut(Easing.ease),
    });

    head2Position.value = withTiming(reverse ? 80 : 140, {
      duration: 1000,
      easing: Easing.inOut(Easing.ease),
    });

    // Animate the heart to pulse or reset
    heartScale.value = withTiming(reverse ? 1 : 1.5, {
      duration: 500,
      easing: Easing.inOut(Easing.ease),
    });

    // Animate kiss emoji: fade in and scale up
    showKissEmoji.value = withDelay(
      300,
      withTiming(reverse ? 1 : 0, {duration: 1000}),
    );
    emojiScale.value = withDelay(
      200,
      withRepeat(
        withSpring(reverse ? 3 : 0, {damping: 2, stiffness: 100}),
        1,
        true,
      ),
    );
  };

  useImperativeHandle(ref, () => ({
    triggerAnimation: triggerAnimation,
  }));

  useEffect(() => {
    // Trigger the animation when the component mounts
    triggerAnimation();

    // Clean up the timer on unmount
    return () => clearTimeout(timer);
  }, []);

  const head1Style = useAnimatedStyle(() => ({
    left: head1Position.value,
  }));

  const head2Style = useAnimatedStyle(() => ({
    left: head2Position.value,
  }));

  const heartStyle = useAnimatedStyle(() => ({
    transform: [{scale: heartScale.value}],
  }));

  const styleKissEmoji = useAnimatedStyle(() => ({
    opacity: showKissEmoji.value,
    transform: [{scale: emojiScale.value}],
    position: 'absolute',
    bottom: 50, // Positioning kiss emoji
    left: 100,
    zIndex: 2,
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.head, head1Style]}>
        <BobbingHead headId={userData?.head} position={{bottom: 0}} />
      </Animated.View>
      <Animated.View style={[heartStyle]}>
        <PulsingHeart />
      </Animated.View>
      <Animated.View style={[styles.head, head2Style]}>
        <BobbingHead
          headId={userData?.partnerHead}
          position={{bottom: 0}}
          delay={300}
        />
      </Animated.View>
      <Animated.Text style={[{fontSize: 40}, styleKissEmoji]}>💋</Animated.Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    // width: '100%',
    position: 'relative',
  },
  head: {
    position: 'absolute',
    bottom: 0,
    zIndex: 1,
  },
});

export default HeadsAndHeart;
