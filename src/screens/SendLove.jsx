import {View, Image} from 'react-native';
import AppText from '../components/AppText';
import AppButton from '../components/AppButton';
import HeadsAndHeart from '../components/HeadsAndHeart';
import {sendNotification, messaging} from '../utils/fcmUtils';
import {onMessage} from '@react-native-firebase/messaging';

import {useEffect} from 'react';

export default function SendLove({navigation, userData}) {
  const handleSendLove = async () => {
    // Logic to send love
    sendNotification(
      userData.partnerFcmToken,
      'Love Poopu',
      `${userData.nickname} has sent you love!`,
    );
  };

  useEffect(() => {
    const unsubscribe = onMessage(messaging, remoteMessage => {
      console.log('A new FCM message arrived!', remoteMessage);
      // Handle the message or display a notification
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
      <AppText type="heading">Love Poopu</AppText>
      <Image
        style={{position: 'absolute'}}
        source={require('../assets/infinityGraphics.png')}
      />

      <HeadsAndHeart userData={userData} />

      <AppButton
        title={`Send Love to ${userData.partnerName}`}
        onPress={handleSendLove}
      />
    </View>
  );
}
