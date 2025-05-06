// import { getApp } from '@react-native-firebase/app';
import { getMessaging, getToken } from '@react-native-firebase/messaging';
import axios from 'axios';

export const messaging = getMessaging();

export const getFcmToken = async () => {
    const token = await getToken(messaging);
    return token;
};

export const sendNotification = async (payload) => {
    console.log('payload', payload);
    try {
        const response = await axios.post(true ? "http://192.168.1.9:8888/.netlify/functions/app" : "https://lovepoopu.netlify.app/.netlify/functions/app", payload)
        console.log('Notification sent successfully:', response.data);
    } catch (error) {
        console.error('Error sending notification:', error);
    }
};
