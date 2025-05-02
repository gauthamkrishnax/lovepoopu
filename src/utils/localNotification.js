import notifee, { TimestampTrigger, TriggerType, AndroidImportance } from '@notifee/react-native';

notifee.requestPermission().then((permission) => {
    if (permission === notifee.AuthorizationStatus.AUTHORIZED) {
        console.log('Permission granted');
    } else {
        console.log('Permission denied');
    }
});



export async function scheduleSpecialDayNotifications(SPECIAL_DATES) {
    // Create channel for Android
    const channelId = await notifee.createChannel({
        id: 'special-days',
        name: 'Special Days',
        importance: AndroidImportance.HIGH,
    });

    for (const item of SPECIAL_DATES) {
        const { date, title, body } = item;

        const triggerDate = new Date(`${date}T09:00:00`); // 9 AM on that day

        const trigger = {
            type: TriggerType.TIMESTAMP,
            timestamp: triggerDate.getTime(),
            alarmManager: true,
        };

        await notifee.createTriggerNotification(
            {
                title,
                body,
                android: {
                    channelId,
                    pressAction: { id: 'default' },
                },
                ios: {
                    sound: 'default',
                },
            },
            trigger
        );

    }
}

export async function sendLocalNotification(title, body) {
    // Create a notification channel (Android only, required)
    const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        importance: AndroidImportance.HIGH,
    });

    // Display a notification
    await notifee.displayNotification({
        title,
        body,
        android: {
            channelId,
            smallIcon: 'ic_launcher', // Ensure you have this in your res folder
            pressAction: {
                id: 'default',
            },
        },
        ios: {
            sound: 'default',
        },
    });
}