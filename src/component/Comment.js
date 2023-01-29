import * as React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import CommentIcon from '../imgs/comment-icon.png';

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
  },
  nickname: {
    color: '#C0C0C0',
    marginRight: 8,
  },
  comment: {
    color: '#FFFFFF',
    marginRight: 8,
    maxWidth: '90%',
  },
});
