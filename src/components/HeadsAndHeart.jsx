import {View, Image} from 'react-native';
import images from '../constants/headImage';

export default function HeadsAndHeart({userData}) {
  return (
    <View
      style={{
        width: '100%',
        position: 'relative',
      }}>
      <Image
        style={{
          height: 180,
          width: 180,
          position: 'absolute',
          zIndex: 1,
          bottom: 0,
          left: 30,
        }}
        source={images.find(image => image.id === userData.head).source}
      />
      <Image
        style={{width: 250, height: 250, marginHorizontal: 'auto'}}
        source={require('../assets/heart.png')}
      />
      <Image
        style={{
          height: 180,
          width: 180,
          position: 'absolute',
          zIndex: 1,
          bottom: 0,
          right: 30,
        }}
        source={images.find(image => image.id === userData.partnerHead).source}
      />
    </View>
  );
}
