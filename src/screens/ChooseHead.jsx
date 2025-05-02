import {View, Image, TouchableOpacity, ActivityIndicator} from 'react-native';
import {useState} from 'react';
import AppText from '../components/AppText';
import AppButton from '../components/AppButton';
import {fetchUserData} from '../utils/firebaseUtils';
import {storeDataInStorage} from '../utils/storageUtils';
import images from '../constants/headImage';

export default function ChooseHead({navigation}) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSelect = id => {
    setSelectedImage(id);
  };

  function handleSubmit() {
    setLoading(true);
    let data = {
      head: selectedImage,
      partnerHead: images.find(image => image.id !== selectedImage).id,
    };

    fetchUserData()
      .then(userData => {
        data = {
          ...data,
          ...userData,
          userActionsCompleted: true,
        };
        storeDataInStorage('userData', data)
          .then(() => {
            setLoading(false);
            navigation.navigate('Home', {
              userData: data,
            });
          })
          .catch(error => {
            console.error('Error storing user data: ', error);
          });
      })
      .catch(error => {
        console.error('Error fetching user data: ', error);
      });
  }

  return loading ? (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" color="#fff" />
    </View>
  ) : (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <AppText type="heading">Choose your head</AppText>
      <View style={{flexDirection: 'row', margin: 20}}>
        {images.map(image => (
          <TouchableOpacity
            key={image.id}
            onPress={() => handleSelect(image.id)}>
            <Image
              source={image.source}
              style={{
                width: '200',
                height: '200',
                opacity: selectedImage === image.source ? 1 : 0.5,
              }}
            />
          </TouchableOpacity>
        ))}
      </View>
      <AppButton title="Start Loving 🍑" onPress={handleSubmit} />
    </View>
  );
}
