import {View, Image, ActivityIndicator} from 'react-native';
import AppText from '../components/AppText';
import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';
import {useState, useEffect} from 'react';
import {signInOrSignUp} from '../utils/firebaseUtils';
import {getAuth} from '@react-native-firebase/auth';

export default function Welcome({navigation}) {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [infoText, setInfoText] = useState(false);

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Check if the user is already signed in when the component mounts
  useEffect(() => {
    const unsubscribe = getAuth().onAuthStateChanged(user => {
      if (user) {
        console.log('User is signed in:', user);
        navigation.navigate('Nickname');
      }
    });
    setLoading(false); // Set loading to false after checking auth state
    return unsubscribe; // Cleanup on unmount
  }, []);

  // Function to handle the "Get Started" button press
  function handleGetStarted() {
    if (!isValidEmail(email)) {
      setInfoText('Enter a valid email address');
      return;
    }
    if (password.length < 6) {
      setInfoText('Enter a password with at least 6 characters');
      return;
    }

    setLoading(true);
    signInOrSignUp(email, password)
      .then(() => {
        setInfoText('User signed in successfully');
        console.log('User signed in successfully');
        navigation.navigate('Nickname');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          setInfoText('Incorrect email or password');
        }
        console.error('Error signing in: ', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return loading ? (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
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
      <View>
        <AppText>Love Poopu </AppText>
        <AppText type="subheading">
          Your journey to cuteness begins here.
        </AppText>
      </View>
      <View>
        <Image
          source={require('../assets/arrow.png')}
          style={{
            width: 80,
            height: 300,
            opacity: 0.8,
            marginVertical: 20,
          }}></Image>
      </View>
      <View style={{width: '100%'}}>
        <AppTextInput
          textHolder={email}
          setText={setEmail}
          placeholderText="Enter your email"
        />
        <AppTextInput
          textHolder={password}
          setText={setPassword}
          password={true}
          placeholderText="Enter your Password"
        />
        {infoText && <AppText type="info">{infoText}</AppText>}
        <AppButton title="Get Started" onPress={handleGetStarted} />
      </View>
    </View>
  );
}
