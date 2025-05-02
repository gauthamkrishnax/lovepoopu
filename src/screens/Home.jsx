import SendLove from './SendLove';
import Dingolfy from './Dingolfy';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

export default function Home({navigation, userData}) {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
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

const screenOptions = {
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
    lineHeight: 20,
  },
};
