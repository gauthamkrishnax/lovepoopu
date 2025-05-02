import {StyleSheet, View} from 'react-native';
import AppText from '../components/AppText';
import {Calendar} from 'react-native-calendars';
import {useEffect, useState} from 'react';
import {storeDataInStorage, getDataFromStorage} from '../utils/storageUtils';
import getRandomReminder from '../constants/dingolfyIdeas';
import {scheduleSpecialDayNotifications} from '../utils/localNotification';

export default function Dingolfy({navigation, userData}) {
  const [markedDates, setMarkedDates] = useState({});

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  useEffect(() => {
    getDataFromStorage('calendarMarks').then(data => {
      if (data && data?.month === month && data?.markedDates) {
        setMarkedDates(data?.markedDates);
      } else {
        setMarkedDates(generateRandomMarkedDates(year, month));
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.calendar}>
        <Calendar
          markedDates={markedDates}
          theme={{
            calendarBackground: 'transparent',
            backgroundColor: 'transparent',
            textSectionTitleColor: '#fff',
            dayTextColor: '#fff',
            todayTextColor: '#F8312F',
            todayBackgroundColor: '#fff',
            monthTextColor: '#fff',
            arrowColor: '#fff',
          }}
          style={{
            borderRadius: 20,
            overflow: 'hidden',
            width: 300,
            backgroundColor: 'transparent',
          }}
          onDayPress={day => {
            console.log('selected day', day);
          }}
        />
      </View>
      <View style={{marginHorizontal: 25}}>
        <AppText type="subheading" textAlign="left" margin={10}>
          Make Love Intentional for {userData.partnerName}
        </AppText>
        <AppText type="info" textAlign="left" margin={10}>
          ➡️ We've picked 5 special days this month marked in 🔴 — surprise{' '}
          {userData.partnerName} with a little act of love on these dates.
        </AppText>
        <AppText type="info" textAlign="left" margin={10}>
          ➡️ Plan a date, gift something cute, or just Dingolfy 😈 Whatever you
          do, make it a surprise.
        </AppText>
        <AppText type="info" textAlign="left" margin={10}>
          ➡️ {userData.partnerName} will also have 5 special days marked in
          their app.
        </AppText>
      </View>
    </View>
  );
}

function generateRandomMarkedDates(year, month) {
  const totalDays = new Date(year, month + 1, 0).getDate(); // days in the month
  const selectedDates = [];

  while (selectedDates.length < 5) {
    const candidate = Math.floor(Math.random() * totalDays) + 1;

    const isTooClose = selectedDates.some(
      date => Math.abs(date - candidate) < 4,
    );

    if (!isTooClose) {
      selectedDates.push(candidate);
    }
  }

  const SPECIALDATES = [];

  // Convert to markedDates format
  const marked = {};
  selectedDates.forEach(day => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(
      day,
    ).padStart(2, '0')}`;

    SPECIALDATES.push({
      date: dateStr,
      title: 'Time to Dingolfy! 🔴',
      body: getRandomReminder(),
    });

    marked[dateStr] = {
      marked: false,
      dotColor: '#fff',
      selected: true,
      selectedColor: '#F8312F',
    };
  });

  storeDataInStorage('calendarMarks', {
    month: month,
    markedDates: marked,
  });

  scheduleSpecialDayNotifications(SPECIALDATES);

  return marked;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 40,
    alignItems: 'center',
    backgroundColor: '#ffffff11',
    borderRadius: 20,
    borderColor: '#ffffff22',
    borderWidth: 3,
    marginTop: 20,
  },
  calendar: {
    marginVertical: 20,
    backgroundColor: '#00000011',
    padding: 30,
    borderRadius: 20,
    borderColor: '#ffffff22',
    borderWidth: 1,
    borderTopColor: '#ffffff',
    borderTopWidth: 5,
  },
});
