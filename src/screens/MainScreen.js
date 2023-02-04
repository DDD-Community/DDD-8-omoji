import * as React from 'react';
import {useEffect} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import CardStack, {Card} from 'react-native-card-stack-swiper';
import {ImageCard} from '../component/ImageCard';
import {EvaluateButton} from '../component/EvaluateButton';
import GoodOrBadLottie from '../component/GoodOrBadLottie';

const {width, height} = Dimensions.get('window');

export function MainScreen() {
  const [activeGood, setActiveGood] = React.useState(false);
  const [activeBad, setActiveBad] = React.useState(false);
  useEffect(() => {});
  return (
    <View style={styles.container}>
      <CardStack
        style={[styles.content, {width: width - 32}]}
        cardContainerStyle={{width: width - 32, flex: 1, height: '100%'}}
        secondCardZoom={0.7}
        duration={1000}
        onSwipedLeft={() => {
          console.log('left');
        }}>
        <ImageCard style={{flex: 1}} />
        <Card style={[styles.card, {backgroundColor: 'red'}]}>
          <Text style={styles.label}>B</Text>
        </Card>
        <Card style={[styles.card, {backgroundColor: 'blue'}]}>
          <Text style={styles.label}>C</Text>
        </Card>
      </CardStack>
      <View
        style={{
          position: 'absolute',
          display: 'flex',
          flexDirection: 'row',
          bottom: 50,
        }}>
        <EvaluateButton
          type="good"
          onPress={() => {
            setActiveGood(true);
            setTimeout(() => {
              setActiveGood(false);
            }, 1500);
          }}
        />
        <EvaluateButton
          type="bad"
          onPress={() => {
            setActiveBad(true);
            setTimeout(() => {
              setActiveBad(false);
            }, 1500);
          }}
        />
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
