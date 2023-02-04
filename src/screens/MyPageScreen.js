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
import {useInfiniteQuery, useQuery} from '@tanstack/react-query';
import {requestGetMyPosts} from '../api/posts';
import {useRecoilState} from 'recoil';
import {userState} from '../atom/loginAtoms';

const {width} = Dimensions.get('window');

export default function MyPageScreen() {
  const navigator = useNavigation();
  const [user] = useRecoilState(userState);

  const {
    data: myPosts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['myPosts'],
    queryFn: async ({pageParam = 0}) => {
      const {data} = await requestGetMyPosts(pageParam, pageParam + 5);
      return data;
    },
  });

  if (isLoading) {
    return (
      <View>
        <Text>loading</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text>{JSON.stringify(error)}</Text>
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
