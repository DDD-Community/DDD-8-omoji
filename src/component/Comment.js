import * as React from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';

import CommentIcon from '../../assets/three-dot.png';

const {width} = Dimensions.get('window');

export function Comment({nickname, comment}) {
  return (
    <View style={styles.commentContainer}>
      <Text style={styles.nickname}>{nickname}</Text>
      <View>
        <Text style={styles.comment}>{comment}</Text>
      </View>
      <Image source={CommentIcon} />
    </View>
  );
}

const styles = StyleSheet.create({
  commentContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 16,
  },
  nickname: {
    color: '#C0C0C0',
    marginRight: 8,
  },
  comment: {
    color: '#FFFFFF',
    marginRight: 8,
    width: width - 100,
  },
});
