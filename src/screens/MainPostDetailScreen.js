import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {Comment} from '../component/Comment';
import {Tag} from '../component/Tag';
import {ScrollView} from 'react-native-gesture-handler';
import CommentIcon from '../imgs/comment.png';
const {width, height} = Dimensions.get('window');

export function MainPostDetailScreen() {
  const [commentValue, setCommentValue] = useState('');

  const tags = ['test', 'test2'];
  const comments = [
    {
      nickname: 'test',
      comment: 'test',
    },
    {
      nickname: 'test',
      comment: 'test',
    },
    {
      nickname: 'test',
      comment: 'test',
    },
  ];
  return (
    <View>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>MainPostDetailScreen</Text>
        <View style={styles.tagContainer}>
          {tags.map(tag => {
            return <Tag text={tag} />;
          })}
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.content}>content</Text>
        </View>

        <View style={styles.commentContainer}>
          <Text style={styles.commentTitle}>댓글</Text>
          {comments.map(comment => {
            return (
              <Comment nickname={comment.nickname} comment={comment.comment} />
            );
          })}
        </View>
      </ScrollView>
      <View style={styles.inputContainer}>
        <Image
          source={CommentIcon}
          style={{width: 30, height: 30, marginRight: 6}}
        />
        <TextInput
          style={styles.input}
          placeholder="댓글쓰기..."
          placeholderTextColor="#fff"
          value={commentValue}
          onChangeText={text => setCommentValue(text)}
        />
        <Text
          style={{
            paddingLeft: 20,
            paddingRight: 20,
            color: '#fff',
          }}>
          게시
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 18,
    paddingRight: 16,
    paddingBottom: 18,
    paddingLeft: 16,
    height: height - 250,
  },
  title: {
    fontSize: 21,
    color: '#fff',
    marginTop: 32,
    fontWeight: 700,
  },
  tagContainer: {
    marginTop: 32,
    display: 'flex',
    flexDirection: 'row',
  },
  contentContainer: {
    marginTop: 32,
  },
  content: {
    fontSize: 14,
    fontWeight: 400,
    color: '#DDDDDD',
  },

  commentContainer: {
    marginTop: 32,
  },

  commentTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 700,
    marginBottom: 32,
  },

  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopColor: '#66666680',
    borderWidth: 1,
    height: 80,
  },
  input: {
    color: '#fff',
    width: width - 110,
  },
});
