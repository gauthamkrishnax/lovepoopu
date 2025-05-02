import {View, Image, ImageBackground} from 'react-native';
import AppText from '../components/AppText';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

export default function Dingolfy({navigation, userData}) {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const marks = generateRandomMarkedDates(year, month);
  return (
    <View
      style={{
        flex: 1,
        paddingBottom: 40,
        alignItems: 'center',
        // justifyContent: 'space-between',
        backgroundColor: '#ffffff11',
        borderRadius: 20,
        borderColor: '#ffffff22',
        borderWidth: 3,
        marginTop: 20,
      }}>
      <View
        style={{
          marginVertical: 20,
          backgroundColor: '#00000011',
          padding: 30,
          borderRadius: 20,
          borderColor: '#ffffff22',
          borderWidth: 1,
          borderTopColor: '#ffffff',
          borderTopWidth: 5,
        }}>
        <Calendar
          markedDates={marks}
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
      <View style={{marginTop: 20, marginHorizontal: 20}}>
        <AppText type="subheading" textAlign="left">
          Make Love Intentional for {userData.partnerName}
        </AppText>
        <AppText type="info" textAlign="left">
          We've picked 5 special days this month — surprise your partner with a
          little act of love on these dates.
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

  // Convert to markedDates format
  const marked = {};
  selectedDates.forEach(day => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(
      day,
    ).padStart(2, '0')}`;
    marked[dateStr] = {
      marked: false,
      dotColor: '#fff',
      selected: true,
      selectedColor: '#F8312F',
    };
  });

  return marked;
}
