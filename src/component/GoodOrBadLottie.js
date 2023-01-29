import React from 'react';
import LottieView from 'lottie-react-native';

export default function GoodOrBadLottie({type, loop}) {
  return (
    <LottieView
      source={
        type === 'good'
          ? require('../imgs/good.json')
          : require('../imgs/bad.json')
      }
      autoPlay
      style={{width: 200, height: 200}}
      loop
    />
  );
}
