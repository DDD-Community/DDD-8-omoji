import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  Image,
  Alert,
  Button,
  Pressable,
} from 'react-native';
import Modal from 'react-native-modal';
import React, {useState} from 'react';
import {Comment} from '../component/Comment';
import {Tag} from '../component/Tag';
import {ScrollView} from 'react-native-gesture-handler';
import CommentIcon from '../imgs/comment.png';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import {
  requestGetPost,
  requestGetComments,
  requestPostComment,
  requestDeletePost,
} from '../api/posts';
import GoodIcon from '../imgs/good.png';
import HmmIcon from '../imgs/hmm.png';
import PostImageCard from '../component/PostImageCard';
import {EvaluateButton} from '../component/EvaluateButton';
import {useMutation} from '@tanstack/react-query';

const {width, height} = Dimensions.get('window');

export default function PostScreen() {
  const onPressGood = () => {};
  const onPressBad = () => {};
  const navigator = useNavigation();
  const [commentText, setCommentText] = useState('');
  const route = useRoute();
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const {id} = route.params;

  const {data: post, isLoading} = useQuery(['post', id], async () => {
    const {data} = await requestGetPost(id);
    return data;
  });

  const {data: comments} = useQuery(['comments', id], async () => {
    const {data} = await requestGetComments(id);
    console.log(data);
    return data;
  });

  const postDeleteMutation = useMutation(
    async postId => {
      const {data} = await requestDeletePost(postId);
      return data;
    },
    {
      onError: error => {
        Alert.alert(error);
      },
      onSuccess: () => {
        navigator.navigate('메인');
      },
    },
  );

  const postComment = async () => {
    try {
      const {data, request} = await requestPostComment(id, 'testset');
    } catch (e) {
      console.log(e);
    }
    // mutation.mutate();
  };

  if (isLoading) {
    return (
      <View>
        <Text>loading</Text>
      </View>
    );
  }

  return (
    <View>
      <Modal isVisible={isModalVisible} backdropColor={'#555555'}>
        <View
          style={{
            height: height,
            flexDirection: 'column-reverse',
            marginBottom: 100,
          }}>
          <Pressable
            style={styles.modalButton}
            onPress={() => {
              toggleModal();
            }}>
            <Text style={{color: '#fff', fontWeight: '400', fontSize: 14}}>
              취소
            </Text>
          </Pressable>

          <Pressable
            style={{...styles.modalButton, marginBottom: 12}}
            onPress={() => {
              postDeleteMutation.mutate(id);
            }}>
            <Text style={{color: '#F84C4C', fontSize: 14, fontWeight: '700'}}>
              삭제하기
            </Text>
          </Pressable>
        </View>
      </Modal>
      <ScrollView style={styles.container}>
        <View>
          {post && <PostImageCard imgs={post.imgs} />}

          {/* TODO: 내글인 경우 제거 */}
          <View style={styles.buttonContainer}>
            <EvaluateButton type="good" onPress={onPressGood} />
            <EvaluateButton type="bad" onPress={onPressBad} />
          </View>
        </View>

        <View
          style={{
            paddingLeft: 35,
            paddingRight: 35,
            paddingTop: 10,
          }}>
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
                <Text style={styles.GoodHmmButtonText}>
                  {post.dislikeCount}
                </Text>
              </View>
            </View>
          )}

          <View style={styles.contentContainer}>
            <Text style={styles.content}>{post.description}</Text>
          </View>

          <View style={styles.commentContainer}>
            <Text style={styles.commentTitle}>댓글</Text>
            {comments &&
              comments.map(comment => {
                return (
                  <Comment
                    nickname={comment.member.nickname}
                    comment={comment.comment}
                  />
                );
              })}
          </View>
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
          value={commentText}
          onChangeText={text => setCommentText(text)}
        />
        <Text style={styles.GoodHmmButtonText} onPress={postComment}>
          게시
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 80,
  },
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
    lineHeight: 22,
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
    position: 'absolute',
    bottom: 0,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
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
    height: 60,
    width: 147.5,
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

  buttonContainer: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    bottom: 20,
    width: width,
    borderRadius: 10,
  },
  modalButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#17171B',
    height: 59,
    borderRadius: 12,
    color: '#fff',
  },
});
