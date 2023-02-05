import {View, Text, StyleSheet, Pressable} from 'react-native';
import React, {useState} from 'react';

export default function UploadTag({text}) {
  const [clicked, setClicked] = useState(false);
  return (
    <Pressable
      onPress={() => {
        setClicked(!clicked);
      }}>
      <View style={clicked ? styles.clickedUploadTag : styles.uploadTag}>
        <Text style={clicked ? styles.clickedText : styles.text}>{text}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  uploadTag: {
    height: 36,
    display: 'flex',
    alignSelf: 'flex-start',
    justifyContent: 'center',
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 12,
    paddingRight: 12,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#555555',
    borderRadius: 8,
  },
  clickedUploadTag: {
    height: 36,
    display: 'flex',
    alignSelf: 'flex-start',
    justifyContent: 'center',
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 12,
    paddingRight: 12,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#C0C0C0',
    borderRadius: 8,
    backgroundColor: '#C0C0C0',
  },
  text: {
    color: '#fff',
    fontWeight: '700',
  },
  clickedText: {
    color: '#17171B',
    fontWeight: '700',
  },
});
