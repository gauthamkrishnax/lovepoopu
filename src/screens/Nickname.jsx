import {View, ActivityIndicator} from 'react-native';
import AppText from '../components/AppText';
import AppTextInput from '../components/AppTextInput';
import {useState} from 'react';
import AppButton from '../components/AppButton';
import {setUserData} from '../utils/firebaseUtils';
import {getApp} from '@react-native-firebase/app';
import {getFcmToken} from '../utils/fcmUtils';

export default function Nickname({navigation}) {
  const [nickname, setNickname] = useState('');
  const [loading, setLoading] = useState(false);

  // Function to handle the "Ready for some love" button press
  async function setUserNickname() {
    const fcmToken = await getFcmToken();
    await setUserData('users', getApp().auth().currentUser.uid, {
      nickname: nickname,
      email: getApp().auth().currentUser.email,
      myReferenceId: Math.random().toString(36).substring(4, 10),
      createdAt: new Date(),
      myfcmToken: fcmToken,
    });
  }

  function handlePress() {
    if (nickname.trim().length) {
      setLoading(true);
      setUserNickname()
        .then(() => {
          console.log('Nickname set successfully');
          navigation.navigate('ConnectPartner');
        })
        .catch(error => {
          console.error('Error setting nickname: ', error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }

  return loading ? (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ActivityIndicator size="large" color="#fff" />
    </View>
  ) : (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
      }}>
      <AppText type="heading">What should your partner call you?</AppText>
      <View style={{marginVertical: 20, width: '100%'}}>
        <AppTextInput
          textHolder={nickname}
          setText={setNickname}
          placeholderText="Enter your Nickname"
        />
      </View>
      <AppButton title="Ready for some love" onPress={handlePress} />
    </View>
  );
}
