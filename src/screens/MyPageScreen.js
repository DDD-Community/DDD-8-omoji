import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import MyPageImageCard from '../component/MyPageImageCard';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {useInfiniteQuery} from '@tanstack/react-query';
import {requestGetMyPosts} from '../api/posts';
import {useRecoilState} from 'recoil';
import {userState} from '../atom/loginAtoms';

const {width} = Dimensions.get('window');

const myPosts = [
  {
    id: 3,
    likeCount: 0,
    dislikeCount: 0,
    imgs: [
      'https://storage.googleapis.com/download/storage/v1/b/omoji-bucket/o/img%2Fimg3-8a505878-0381-4c6b-b25d-c6a5fa46f019.jpg?generation=1674902367056469&alt=media',
      'https://storage.googleapis.com/download/storage/v1/b/omoji-bucket/o/img%2Fimg4-4263dd11-3e93-4547-baa7-11b00f0686e5.jpg?generation=1674902367168958&alt=media',
    ],
    hashtags: ['test'],
  },
  {
    id: 2,
    likeCount: 0,
    dislikeCount: 0,
    imgs: [
      'https://storage.googleapis.com/download/storage/v1/b/omoji-bucket/o/img%2Fimg3-c4775cdb-5c3e-4c99-a5d6-302667b17829.jpg?generation=1674902361038169&alt=media',
      'https://storage.googleapis.com/download/storage/v1/b/omoji-bucket/o/img%2Fimg4-01fa22cb-1e1d-4c48-ab6d-672ab0a08017.jpg?generation=1674902361136808&alt=media',
    ],
    hashtags: ['데일리', '서울 용산구'],
  },
  {
    id: 1,
    likeCount: 0,
    dislikeCount: 0,
    imgs: [
      'https://storage.googleapis.com/download/storage/v1/b/omoji-bucket/o/img%2Fimg3-c5630973-68c7-4a7b-9f0a-32d836c56b7e.jpg?generation=1674902349894186&alt=media',
      'https://storage.googleapis.com/download/storage/v1/b/omoji-bucket/o/img%2Fimg4-eda20c00-bdbb-4e2a-af5d-c85705eadc23.jpg?generation=1674902350053425&alt=media',
    ],
    hashtags: ['test', 'test'],
  },
];

export default function MyPageScreen() {
  const navigator = useNavigation();
  const [user] = useRecoilState(userState);

  // const {
  //   data: myPosts,
  //   isLoading,
  //   error,
  // } = useInfiniteQuery({
  //   queryKey: ['myPosts'],
  //   queryFn: async () => {
  //     const {data} = await requestGetMyPosts(0, 5);
  //     return data;
  //   },
  // });

  if (false) {
    return (
      <View>
        <Text>loading</Text>
      </View>
    );
  }

  return (
    <View>
      <View style={{paddingTop: 16, paddingLeft: 20, paddingBottom: 18}}>
        <Text style={{fontWeight: '700', fontSize: 24, color: '#fff'}}>
          {user.nickname}
        </Text>
        <Text
          style={{
            fontWeight: '400',
            fontSize: 14,
            color: '#858585',
            marginTop: 8,
          }}
        />
      </View>

      <View>
        <FlatList
          keyExtractor={item => item.id}
          data={myPosts}
          scrollEnabled={true}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                navigator.navigate('게시글', {
                  id: item.id,
                });
              }}>
              <View style={styles.imageWrapper}>
                <MyPageImageCard {...item} />
              </View>
            </TouchableOpacity>
          )}
          numColumns={2}
          windowSize={6}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'contain',
    width: width / 2,
    height: 250,
  },
  imageWrapper: {
    flex: 1,
    flexDirection: 'column',
    margin: 0,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -20,
    },
    shadowOpacity: 0.3,
    shadowRadius: 7,
  },
});
