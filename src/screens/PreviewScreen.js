import {View, Image} from 'react-native';
import React, {useState} from 'react';
import Preview1 from '../imgs/preview1.png';
import Preview2 from '../imgs/preview2.png';
import Preview3 from '../imgs/preview3.png';
import {Dimensions, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

const {width} = Dimensions.get('window');

const PreviewScreen = () => {
  const [preview, setPreview] = useState(Preview1);
  const [step, setStep] = useState(0);
  const navigation = useNavigation();
  const instes = useSafeAreaInsets();
  return (
    <SafeAreaProvider>
      <View style={{paddingTop: instes.top}}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            if (step === 0) {
              setPreview(Preview2);
              setStep(1);
            } else if (step === 1) {
              setPreview(Preview3);
              setStep(2);
            } else if (step === 2) {
              navigation.navigate('로그인');
            }
          }}>
          <Image source={preview} style={{height: '100%', width}} />
        </TouchableOpacity>
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {},
});
export default PreviewScreen;
