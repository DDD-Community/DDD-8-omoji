import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export function Tag({text}) {
  return (
    <View style={styles.tag}>
      <Text>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tag: {
    backgroundColor: '#fff',
    height: 24,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 8,
    padding: 3,
    paddingLeft: 8,
    paddingRight: 8,
  },
});
