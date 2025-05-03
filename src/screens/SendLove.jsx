import {View, Image, ActivityIndicator} from 'react-native';
import AppText from '../components/AppText';
import AppButton from '../components/AppButton';
import HeadsAndHeart from '../components/HeadsAndHeart';
import {sendNotification, messaging} from '../utils/fcmUtils';
import {onMessage} from '@react-native-firebase/messaging';
import {sendLocalNotification} from '../utils/localNotification';

import {useEffect, useState, useRef} from 'react';
import {useEmojiBurst} from '../utils/useEmojiBurst';

export default function SendLove({navigation, userData}) {
  const {triggerBurst, EmojiBurstView} = useEmojiBurst();
  const [loading, setLoading] = useState(false);
  const childRef = useRef(null);

  const handleSendLove = async () => {
    setLoading(true);
    // Logic to send love
    // sendNotification(userData.partnerFcmToken).then(() => {
    setLoading(false);
    // });
    childRef.current?.triggerAnimation(true);
    // Optionally, you can set up a timer to reverse the animation after a delay
    setTimeout(() => {
      childRef.current?.triggerAnimation();
      console.log('triggering burst');
      triggerBurst(40);
    }, 2000); // Reverse after 2 seconds
  };

  useEffect(() => {
    const unsubscribe = onMessage(messaging, remoteMessage => {
      setLoading(true);
      // Handle the message or display a notification
      sendLocalNotification(remoteMessage.data.title, remoteMessage.data.body);
      childRef.current?.triggerAnimation(true);
      // Optionally, you can set up a timer to reverse the animation after a delay
      setTimeout(() => {
        childRef.current?.triggerAnimation();
        console.log('triggering burst');
        triggerBurst(40);
        setLoading(false);
      }, 2000); // Reverse after 2 seconds
    });

    // Unsubscribe from the listener on component unmount
    return unsubscribe;
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
      }}>
      <AppText type="heading">Love {userData.partnerName}</AppText>
      <Image
        style={{position: 'absolute'}}
        source={require('../assets/infinityGraphics.png')}
      />

      <HeadsAndHeart userData={userData} ref={childRef} />

      {loading ? (
        <View>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      ) : (
        <AppButton
          title={`Send Love to ${userData.partnerName}`}
          onPress={handleSendLove}
        />
      )}
      <EmojiBurstView />
    </View>
  );
}
