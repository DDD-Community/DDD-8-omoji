import {useEffect, useRef, useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import CardStack from 'react-native-card-stack-swiper';
import {ImageCard} from '../component/ImageCard';
import {EvaluateButton} from '../component/EvaluateButton';
import GoodOrBadLottie from '../component/GoodOrBadLottie';
import {requestGetPosts} from '../api/posts';

const {width, height} = Dimensions.get('window');

export function MainScreen() {
  const [activeGood, setActiveGood] = useState(false);
  const [activeBad, setActiveBad] = useState(false);
  const [posts, setPosts] = useState([]);
  const swiper = useRef(null);
  useEffect(() => {
    const requestPosts = async () => {
      try {
        const {data} = await requestGetPosts();
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
    setActiveGood(true);
    setTimeout(() => {
      setActiveGood(false);
    }, 1300);
  };

  const onPressBad = () => {
    swiper.current.swipeBottom();
    setActiveBad(true);
    setTimeout(() => {
      setActiveBad(false);
    }, 1300);
  };

  return (
    <View style={styles.container}>
      <CardStack
        ref={swiper}
        style={[styles.content, {width: width - 32}]}
        cardContainerStyle={{width: width - 32, flex: 1, height: '100%'}}
        secondCardZoom={0.7}
        duration={1000}
        onSwipe={(x, y) => {
          console.log(x, y);
          if (y === 0) {
            return;
          }
          if (y > 0) {
            setActiveGood(true);
          } else {
            setActiveBad(true);
          }
        }}
        onSwipedTop={() => setActiveGood(false)}
        onSwipedBottom={() => setActiveBad(false)}>
        {posts.map(post => (
          <ImageCard
            key={post.id}
            style={{flex: 1}}
            title={post.title}
            imgs={post.imgs}
          />
        ))}
      </CardStack>
      <View
        style={{
          position: 'absolute',
          display: 'flex',
          flexDirection: 'row',
          bottom: 50,
        }}>
        <EvaluateButton type="good" onPress={onPressGood} />
        <EvaluateButton type="bad" onPress={onPressBad} />
      </View>
      <View
        style={{
          position: 'absolute',
          top: height / 4,
          left: width / 4,
        }}>
        {activeGood && <GoodOrBadLottie type={'good'} />}
        {activeBad && <GoodOrBadLottie type={'bad'} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 18,
    paddingRight: 16,
    paddingBottom: 18,
    paddingLeft: 16,
  },
  content: {
    flex: 1,
    height: '100%',
  },
  card: {
    flex: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  text: {
    height: '100%',
    textAlign: 'center',
    fontSize: 50,
    backgroundColor: 'transparent',
  },
});
