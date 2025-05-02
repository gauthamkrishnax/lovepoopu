import {Text, View, ActivityIndicator} from 'react-native';
import AppText from '../components/AppText';
import {useEffect, useState} from 'react';
import {fetchUserData, listenToUserDocument} from '../utils/firebaseUtils.js'; // Adjust the import path as necessary
import AppTextInput from '../components/AppTextInput.jsx';
import AppButton from '../components/AppButton.jsx';

import {connectPartner} from '../utils/firebaseUtils.js'; // Adjust the import path as necessary

export default function ConnectPartnerComponent({navigation}) {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [partnerCode, setPartnerCode] = useState('');
  const [infoText, setInfoText] = useState('');

  function handlePress() {
    if (partnerCode.trim().length === 6) {
      setLoading(true);
      // Call the function to connect with the partner using the partner code
      connectPartner(partnerCode, userData)
        .then(() => {
          console.log('Partner connected successfully');
        })
        .catch(error => {
          console.error('Error connecting with partner:', error);
          setInfoText('Error connecting with partner');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setInfoText('Enter a valid code');
    }
  }

  useEffect(() => {
    fetchUserData()
      .then(data => {
        console.log('User data:', data);
        setUserData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });

    const unsubscribe = listenToUserDocument(userData => {
      if (userData.connected && userData.partnerName) {
        setInfoText(`You are connected to ${userData.partnerName}`);
        // navigation.navigate('ChooseHead');
      }
    });
  }, []);

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
        justifyContent: 'space-around',
        alignItems: 'center',
        margin: 15,
      }}>
      <View>
        <AppText type="heading">
          {userData.nickname}, Are you ready to link hearts?
        </AppText>
        <AppText type="subheading">
          Share this secret love code with your partner. When they enter it, the
          universe will know you belong together 💘
        </AppText>
        <Text
          style={{
            backgroundColor: '#fff',
            borderRadius: 10,
            padding: 10,
            marginTop: 10,
            marginHorizontal: 30,
            textAlign: 'center',
            fontFamily: 'Melodrama Bold',
            fontSize: 28,
            color: '#000',
            letterSpacing: 3,
          }}>
          {userData.myReferenceId}
        </Text>
      </View>
      <View>
        <AppText type="heading">Enter your partners code</AppText>
        <AppTextInput
          textHolder={partnerCode}
          setText={setPartnerCode}
          placeholderText="Your partner's code"
        />
        <AppButton title="Connect" onPress={handlePress} />
        {infoText && <AppText type="info">{infoText}</AppText>}
      </View>
    </View>
  );
}
