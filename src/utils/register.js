import 'react-native-reanimated';
import notifee from '@notifee/react-native';

notifee.requestPermission().then((permission) => {
    if (permission === notifee.AuthorizationStatus.AUTHORIZED) {
        console.log('Permission granted');
    } else {
        console.log('Permission denied');
    }
});