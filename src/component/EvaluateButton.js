import * as React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import HmmImage from '../imgs/hmm.png';
import GoodImage from '../imgs/good.png';

export function EvaluateButton({type, onPress}) {
  const image = type === 'good' ? GoodImage : HmmImage;

  return (
    <View style={styles.evaluateButton} onTouchEnd={onPress}>
      <Image source={image} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  evaluateButton: {
    borderRadius: 100,
    padding: 18,
    width: 72,
    height: 72,
    backgroundColor: '#17171B',
    opacity: 0.85,
  },
  image: {
    width: 36,
    height: 36,
  },
});
