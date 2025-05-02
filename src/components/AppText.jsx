import {StyleSheet, Text} from 'react-native';

export default function AppText({children, type, textAlign, margin}) {
  return (
    <Text
      style={{
        ...styles[type ? type : 'heading'],
        ...styles[textAlign ? textAlign : 'center'],
        marginVertical: margin ? margin : 0,
      }}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontFamily: 'Melodrama Bold',
    fontSize: 40,
    color: '#fff',
    textAlign: 'center',
  },
  subheading: {
    fontFamily: 'Melodrama Light',
    fontSize: 24,
    color: '#eee',
    textAlign: 'center',
  },
  info: {
    fontFamily: 'Melodrama Light',
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    letterSpacing: 0.8,
  },
  center: {
    textAlign: 'center',
  },
  left: {
    textAlign: 'left',
  },
});
