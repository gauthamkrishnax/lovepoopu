import { PermissionsAndroid } from 'react-native';

//Function to request user permission for notifications in IOS and Android
// async function requestUserPermission() {
//     const authStatus = await messaging().requestPermission();
//     const enabled =
//         authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//         authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//     if (enabled) {
//         console.log('Authorization status:', authStatus);
//     }
// }


PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);