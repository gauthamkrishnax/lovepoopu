// import {View, Image} from 'react-native';
// import AppText from '../components/AppText';
// import AppButton from '../components/AppButton';
// import HeadsAndHeart from '../components/HeadsAndHeart';
// import {sendNotification, messaging} from '../utils/fcmUtils';
// import {onMessage} from '@react-native-firebase/messaging';
// import {useEffect} from 'react';

import SendLove from './SendLove';
import Dingolfy from './Dingolfy';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

export default function Home({navigation, userData}) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        sceneStyle: {
          backgroundColor: 'transparent', // Remove background
        },
        tabBarStyle: {
          backgroundColor: '#00000012', // Remove background
          elevation: 0, // Remove shadow on Android
          shadowOpacity: 0, // Remove shadow on iOS
          borderBottomWidth: 0, // Remove bottom border
          borderTopWidth: 0, // Remove top border
        },
        tabBarIndicatorStyle: {
          backgroundColor: '#ffffff22', // Change indicator color
          height: 3, // Change indicator height
        },
        tabBarLabelStyle: {
          fontFamily: 'Melodrama Light',
          letterSpacing: 0.8,
          fontSize: 16,
          color: '#fff', // Change text color
        },
      }}>
      <Tab.Screen
        name="SendLove"
        options={{
          tabBarLabel: 'Send Love',
          headerShown: false,
        }}>
        {props => <SendLove {...props} userData={userData} />}
      </Tab.Screen>
      <Tab.Screen
        name="Dingolfy"
        options={{
          tabBarLabel: 'Dingolfy',
          headerShown: false,
        }}>
        {props => <Dingolfy {...props} userData={userData} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
