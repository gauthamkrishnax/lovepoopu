import {Pressable, Text} from 'react-native';

export default function AppButton({title, onPress}) {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => ({
        backgroundColor: pressed ? '#000' : '#F8312F',
        padding: 8,
        paddingHorizontal: 20,
        shadowColor: '#000000',
        shadowOffset: {
          width: 0,
          height: 14,
        },
        shadowOpacity: 0.8,
        shadowRadius: 15.38,
        elevation: 19,
        borderColor: pressed ? '#F8312F' : '#000',
        borderBottomWidth: 5,
        borderLeftWidth: 8,
        marginVertical: 10,
      })}>
      <Text
        style={{
          fontFamily: 'Melodrama Bold',
          fontSize: 20,
          color: '#fff',
          textAlign: 'center',
        }}>
        {title}
      </Text>
    </Pressable>
  );
}
