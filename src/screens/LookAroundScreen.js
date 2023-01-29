import {View, Image} from 'react-native';
import React, {useState} from 'react';
import LookAround1 from '../imgs/lookAround1.png';
import LookAround2 from '../imgs/lookAround2.png';
import LookAround3 from '../imgs/lookAround3.png';
import {Dimensions, TouchableOpacity, StyleSheet} from 'react-native';

const {width} = Dimensions.get('window');

const LookAroundScreen = () => {
  const [lookAround, setLookAround] = useState(LookAround1);
  const [step, setStep] = useState(0);
  return (
    <View>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          if (step === 0) {
            setLookAround(LookAround2);
            setStep(1);
          } else if (step === 1) {
            setLookAround(LookAround3);
            setStep(2);
          } else if (step === 2) {
            // TODO: main screen으로 route
          }
        }}>
        <Image source={lookAround} style={{height: '100%', width}} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  hidden: {
    width: 0,
    height: 0,
  },
});

export default LookAroundScreen;
