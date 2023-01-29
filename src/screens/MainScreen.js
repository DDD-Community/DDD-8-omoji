import * as React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import CardStack, {Card} from 'react-native-card-stack-swiper';
import {ImageCard} from '../component/ImageCard';

const {width, height} = Dimensions.get('window');

export function MainScreen() {
  return (
    <View style={styles.container}>
      <CardStack
        style={[styles.content, {width: width - 32}]}
        cardContainerStyle={{width: width - 32, flex: 1, height: '100%'}}
        secondCardZoom={0.7}
        duratio={1000}
        onSwipedLeft={() => {
          console.log('left');
        }}
        ref={swiper => {
          this.swiper = swiper;
        }}>
        <ImageCard style={{flex: 1}}></ImageCard>
        <Card style={[styles.card, {backgroundColor: 'red'}]}>
          <Text style={styles.label}>B</Text>
        </Card>
        <Card style={[styles.card, {backgroundColor: 'blue'}]}>
          <Text style={styles.label}>C</Text>
        </Card>
      </CardStack>
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
