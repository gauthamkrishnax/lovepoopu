import {TextInput} from 'react-native';

export default function AppTextInput(props) {
  return (
    <TextInput
      secureTextEntry={props.password ? true : false}
      autoCapitalize="none"
      style={{
        fontFamily: 'Melodrama Light',
        padding: 10,
        paddingLeft: 20,
        height: 60,
        fontSize: 20,
        backgroundColor: '#00000055',
        color: '#fff',
        margin: 10,
        borderRadius: 20,
        letterSpacing: 0.8,
      }}
      placeholderTextColor="#fff"
      placeholder={props.placeholderText}
      value={props.textHolder}
      onChangeText={props.setText}
    />
  );
}
