import {useEffect, useRef, useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';

import CardStack from 'react-native-card-stack-swiper';

import {requestGetEvaluate, requestPostEvaluate} from '../api/posts';
import {EvaluateButton} from '../component/EvaluateButton';
import GoodOrBadLottie from '../component/GoodOrBadLottie';
import {ImageCard} from '../component/ImageCard';

const {width} = Dimensions.get('window');

export function MainScreen() {
  const [activeGood, setActiveGood] = useState(false);
  const [activeGoodOrBad, setActiveGoodOrBad] = useState(false);
  const [posts, setPosts] = useState([]);
  const swiper = useRef(null);
  useEffect(() => {
    const requestPosts = async () => {
      try {
        const {data} = await requestGetEvaluate();
        setPosts(data);
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    };
    requestPosts();
  }, []);

  const onPressGood = () => {
    swiper.current.swipeTop();
  };

  const onPressBad = () => {
    swiper.current.swipeBottom();
  };

  const onPressGoodOrBad = () => {
    setActiveGoodOrBad(true);
    setTimeout(() => {
      setActiveGoodOrBad(false);
    }, 800);
  };

  const activateGood = async index => {
    try {
      const res = await requestPostEvaluate(posts[index].id, 'LIKE');
      console.log(res);
      setActiveGood(true);
      onPressGoodOrBad();
    } catch (e) {
      console.log(e);
    }
  };

  const deactivateGood = async index => {
    try {
      const res = await requestPostEvaluate(posts[index].id, 'DISLIKE');
      console.log(res);
      setActiveGood(false);
      onPressGoodOrBad();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <CardStack
        ref={swiper}
        style={styles.content}
        cardContainerStyle={styles.cardContainer}
        secondCardZoom={0.7}
        verticalThreshold={100}
        onSwipedTop={activateGood}
        onSwipedBottom={deactivateGood}>
        {posts.map(post => (
          <ImageCard
            key={post.id}
            style={{flex: 1}}
            title={post.title}
            imgs={post.imgs}
          />
        ))}
      </CardStack>
      <GoodOrBadLottie
        type={activeGood ? 'good' : 'bad'}
        activated={activeGoodOrBad}
      />
      <View style={styles.buttonContainer}>
        <EvaluateButton type="good" onPress={onPressGood} />
        <EvaluateButton type="bad" onPress={onPressBad} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 18,
    paddingRight: 16,
    paddingBottom: 18,
    paddingLeft: 16,
    borderRadius: 10,
  },
  content: {
    flex: 1,
    height: '100%',
    borderRadius: 10,
    width: width - 32,
  },
  cardContainer: {
    width: width - 32,
    flex: 1,
    height: '100%',
    borderRadius: 10,
  },
  buttonContainer: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    bottom: 50,
    borderRadius: 10,
  },
});
