import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import MyPageImageCard from '../component/MyPageImageCard';
import testImage1 from '../../assets/mock-images/image01.png';
import {useNavigation} from '@react-navigation/native';
import React from 'react';

const data = [
  {
    image: testImage1,
    id: 1,
  },
  {
    image: testImage1,
    id: 2,
  },
  {
    image: testImage1,
    id: 3,
  },
  {
    image: testImage1,
    id: 4,
  },
  {
    image: testImage1,
    id: 1,
  },
  {
    image: testImage1,
    id: 2,
  },
  {
    image: testImage1,
    id: 3,
  },
  {
    image: testImage1,
    id: 4,
  },
  {
    image: testImage1,
    id: 1,
  },
  {
    image: testImage1,
    id: 2,
  },
  {
    image: testImage1,
    id: 3,
  },
  {
    image: testImage1,
    id: 4,
  },
  {
    image: testImage1,
    id: 1,
  },
  {
    image: testImage1,
    id: 2,
  },
  {
    image: testImage1,
    id: 3,
  },
  {
    image: testImage1,
    id: 4,
  },
  {
    image: testImage1,
    id: 1,
  },
  {
    image: testImage1,
    id: 2,
  },
  {
    image: testImage1,
    id: 3,
  },
  {
    image: testImage1,
    id: 4,
  },
  {
    image: testImage1,
    id: 3,
  },
  {
    image: testImage1,
    id: 4,
  },
];

const {width} = Dimensions.get('window');

export default function MyPageScreen() {
  const navigator = useNavigation();

  return (
    <View>
      <View style={{paddingTop: 16, paddingLeft: 20, paddingBottom: 18}}>
        <Text style={{fontWeight: '700', fontSize: 24, color: '#fff'}}>
          닉네임
        </Text>
        <Text
          style={{
            fontWeight: '400',
            fontSize: 14,
            color: '#858585',
            marginTop: 8,
          }}>
          게시물 수
        </Text>
      </View>

      <View>
        <FlatList
          keyExtractor={item => item.id}
          data={data}
          scrollEnabled={true}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                navigator.navigate('게시글', {
                  id: item.id,
                });
              }}>
              <View style={styles.imageWrapper}>
                <MyPageImageCard image={item.image} />
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
