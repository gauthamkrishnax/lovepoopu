// import { getApp } from '@react-native-firebase/app';
import { getMessaging, getToken } from '@react-native-firebase/messaging';
import axios from 'axios';

export const messaging = getMessaging();

export const getFcmToken = async () => {
    const token = await getToken(messaging);
    return token;
};

export const sendNotification = async (targetFcmToken) => {
    try {
        const response = await axios.post("https://lovepoopu.netlify.app/.netlify/functions/app", {
            token: targetFcmToken
        })
        console.log('Notification sent successfully:', response.data);
    } catch (error) {
        console.error('Error sending notification:', error);
    }
};
