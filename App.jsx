import {useEffect, useState} from 'react';
import {
  View,
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  StatusBar,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {getAuth} from '@react-native-firebase/auth';

import Welcome from './src/screens/Welcome';
import Nickname from './src/screens/Nickname';
import ConnectPartner from './src/screens/ConnectPartner';
import ChooseHead from './src/screens/ChooseHead';
import Home from './src/screens/Home';
import {getDataFromStorage} from './src/utils/storageUtils';

const Stack = createStackNavigator();

function App() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = getAuth().onAuthStateChanged(user => {
      if (user) {
        getDataFromStorage('userData')
          .then(userData => {
            if (userData) {
              setUserData(userData);
              setLoading(false);
            } else {
              setLoading(false);
            }
          })
          .catch(error => {
            console.error('Error fetching user data from storage: ', error);
            setLoading(false);
          })
          .finally(() => {
            setLoading(false); // Set loading to false after checking auth state
          });
      } else {
        setLoading(false);
      }
    });
    return unsubscribe; // Cleanup on unmount
  }, []);

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground
        source={require('./src/assets/background.jpg')}
        resizeMode="stretch"
        style={StyleSheet.absoluteFillObject}>
        {userData?.userActionsCompleted && (
          <View
            style={{
              height: StatusBar.currentHeight
                ? StatusBar.currentHeight + 1
                : 45,
              backgroundColor: '#00000012',
            }}></View>
        )}
        <SafeAreaView style={{flex: 1}}>
          {loading ? (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator size="large" color="#fff" />
            </View>
          ) : (
            <NavigationContainer>
              <Stack.Navigator
                screenOptions={{
                  headerShown: false,
                  cardStyle: {backgroundColor: 'transparent'},
                }}
                initialRouteName={
                  userData?.userActionsCompleted ? 'Home' : 'Welcome'
                }>
                <Stack.Screen name="Welcome" component={Welcome} />
                <Stack.Screen name="Nickname" component={Nickname} />
                <Stack.Screen
                  name="ConnectPartner"
                  component={ConnectPartner}
                />
                <Stack.Screen name="ChooseHead" component={ChooseHead} />
                <Stack.Screen name="Home">
                  {props => <Home {...props} userData={userData} />}
                </Stack.Screen>
              </Stack.Navigator>
            </NavigationContainer>
          )}
        </SafeAreaView>
      </ImageBackground>
    </>
  );
}

export default App;
