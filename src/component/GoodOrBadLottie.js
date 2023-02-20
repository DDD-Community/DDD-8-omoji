import {useEffect, useRef, useState} from 'react';
import React from 'react';
import {Animated, View} from 'react-native';

import LottieView from 'lottie-react-native';

export default function GoodOrBadLottie({type, activated}) {
  const animationProgress = useRef(new Animated.Value(0));
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(false);
    if (activated) {
      setIsActive(true);
      animationProgress.current.setValue(0);
      Animated.timing(animationProgress.current, {
        toValue: 1,
        duration: 800,
        useNativeDriver: false,
      }).start(() => setIsActive(false));
    }
  }, [activated]);

  return (
    <>
      {isActive && (
        <View
          style={{
            position: 'absolute',
            display: 'flex',
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
          }}>
          <LottieView
            source={
              type === 'good'
                ? require('../../assets/lottie/good.json')
                : require('../../assets/lottie/bad.json')
            }
            progress={animationProgress.current}
            style={{
              width: 200,
              height: 200,
              borderRadius: 10,
            }}
          />
        </View>
      )}
    </>
  );
}
