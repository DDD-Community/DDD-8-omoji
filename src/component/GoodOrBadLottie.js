import React from 'react';
import LottieView from 'lottie-react-native';

export default function GoodOrBadLottie({type}) {
  return (
    <LottieView
      source={
        type === 'good'
          ? require('../imgs/good.json')
          : require('../imgs/bad.json')
      }
      style={{width: 200, position: 'absolute'}}
      loop={false}
    />
  );
}
