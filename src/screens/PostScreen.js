import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {Comment} from '../component/Comment';
import {Tag} from '../component/Tag';
import {ScrollView} from 'react-native-gesture-handler';
import CommentIcon from '../imgs/comment.png';
import {useRoute} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import {requestGetPost} from '../api/posts';
import GoodIcon from '../imgs/good.png';
import HmmIcon from '../imgs/hmm.png';

const {width, height} = Dimensions.get('window');

export default function PostScreen() {
  const [commentText, setCommentText] = useState('');
  const route = useRoute();
  const {id} = route.params;

  const {data: post, isLoading} = useQuery(['post', id], async () => {
    const {data} = await requestGetPost(id);
    return data;
  });

  if (isLoading) {
    return (
      <View>
        <Text>loading</Text>
      </View>
    );
  }

  return (
    <View>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>{post.title}</Text>
        <View style={styles.tagContainer}>
          {post.hashtags.map((tag, idx) => (
            <Tag text={tag} key={idx} />
          ))}
        </View>

        {post.isOwner && (
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 32,
            }}>
            <View style={styles.GoodHmmButton}>
              <Image source={GoodIcon} style={styles.GoodHmmImage} />
              <Text style={styles.GoodHmmButtonText}>{post.likeCount}</Text>
            </View>
            <View style={styles.GoodHmmButton}>
              <Image source={HmmIcon} style={styles.GoodHmmImage} />
              <Text style={styles.GoodHmmButtonText}>{post.dislikeCount}</Text>
            </View>
          </View>
        )}

        <View style={styles.contentContainer}>
          <Text style={styles.content}>{post.description}</Text>
        </View>

        <View style={styles.commentContainer}>
          <Text style={styles.commentTitle}>댓글</Text>
          {/* TODO: 댓글 받아오기 */}
          {/* {comments.map(comment => {
            return (
              <Comment nickname={comment.nickname} comment={comment.comment} />
            );
          })} */}
        </View>
      </ScrollView>
      {/* <View style={styles.inputContainer}>
        <Image
          source={CommentIcon}
          style={{width: 30, height: 30, marginRight: 6}}
        />
        <TextInput
          style={styles.input}
          placeholder="댓글쓰기..."
          placeholderTextColor="#fff"
          value={commentText}
          onChangeText={text => setCommentText(text)}
        />
        <Text style={styles.GoodHmmButtonText}>게시</Text>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  title: {
    fontSize: 21,
    color: '#fff',
    marginTop: 32,
    fontWeight: '700',
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
    fontWeight: '400',
    color: '#DDDDDD',
  },

  commentContainer: {
    marginTop: 32,
  },

  commentTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
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

  GoodHmmButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 68,
    backgroundColor: '#282828',
    borderRadius: 12,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 20,
    paddingBottom: 20,
  },
  GoodHmmImage: {width: 32, height: 32},
  GoodHmmButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
    marginLeft: 12,
  },
});
