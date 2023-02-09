import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Easing,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  Alert,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ImageUploader} from '../component/ImageUploader';
import {ImageUploadForm} from '../component/ImageUploadForm';
import CustomIcon from '../component/CustomIcon';
import {useRecoilState, useResetRecoilState} from 'recoil';
import {uploadFormState} from '../atom/uploadAtoms';
import {requestPostPosts} from '../api/posts';
import {ScrollView} from 'react-native-gesture-handler';
import {useMutation} from '@tanstack/react-query';

const DEFAULT_HEIGHT = 300;

function useAnimatedBottom(show, height = DEFAULT_HEIGHT) {
  const animatedValue = useRef(new Animated.Value(0));

  const bottom = animatedValue.current.interpolate({
    inputRange: [0, 1],
    outputRange: [-height, 0],
  });

  useEffect(() => {
    if (show) {
      Animated.timing(animatedValue.current, {
        toValue: 1,
        duration: 350,
        easing: Easing.bezier(0.28, 0, 0.63, 1),
        useNativeDriver: false, // 'bottom' is not supported by native animated module
      }).start();
    } else {
      Animated.timing(animatedValue.current, {
        toValue: 0,
        duration: 250,
        easing: Easing.cubic,
        useNativeDriver: false,
      }).start();
    }
  }, [show]);

  return bottom;
}

export function UploadScreen({show, onOuterClick}) {
  const [images, setImages] = useState([]);
  const {height: screenHeight} = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [form] = useRecoilState(uploadFormState);
  const resetForm = useResetRecoilState(uploadFormState);

  const {mutate} = useMutation(
    formData => {
      return requestPostPosts(formData);
    },
    {
      onError: error => {
        Alert.alert(error.message);
      },
    },
  );

  const bottom = useAnimatedBottom(show, screenHeight);

  function validateUpload() {
    if (!images.length) {
      Alert.alert('이미지를 선택해주세요.');
      return false;
    }

    if (!form.title) {
      Alert.alert('제목을 입력해주세요.');
      return false;
    }

    return true;
  }

  const onClickUpload = () => {
    if (!validateUpload()) {
      return;
    }

    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('description', form.description);
    formData.append('events', form.events);
    formData.append('styles', form.styles);
    formData.append('location', form.location);
    form.imgs.forEach(img =>
      formData.append('imgs', {
        name: img.name,
        type: img.type,
        uri: Platform.OS === 'ios' ? img.uri.replace('file://', '') : img.url,
      }),
    );

    mutate(formData);
    resetForm();
    setImages([]);

    return onOuterClick();
  };

  return (
    <Animated.View
      style={[styles.uploadScreen, {height: screenHeight, bottom}]}>
      <ScrollView>
        <View
          style={[
            styles.uploadScreenContainer,
            {
              paddingTop: insets.top,
              paddingRight: insets.right + 16,
              paddingBottom: insets.bottom,
              paddingLeft: insets.left + 16,
            },
          ]}>
          <View style={styles.uploadScreenHeader}>
            <Pressable>
              <CustomIcon
                name="iconClose"
                color={'#FFFFFF'}
                size={18}
                onPress={onOuterClick}
              />
            </Pressable>
            <Pressable>
              <Text style={styles.button} onPress={onClickUpload}>
                완료
              </Text>
            </Pressable>
          </View>
          <ImageUploader images={images} setImages={setImages} />
          <ImageUploadForm />
        </View>
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  uploadScreen: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 1,
    backgroundColor: '#17171B',
    borderRadius: 16,
  },
  uploadScreenContainer: {
    height: '100%',
    alignItems: 'center',
  },
  uploadScreenHeader: {
    height: 60,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    paddingRight: 2,
    paddingBottom: 16,
    paddingLeft: 2,
  },
  button: {
    color: '#8F8F8F',
    fontSize: 16,
  },
  headerTitle: {
    color: '#FFFFFF',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    rowGap: 8,
    paddingTop: 25,
    paddingLeft: 12,
    paddingRight: 12,
    paddingBottom: 25,
  },
  uploadButton: {
    width: '30%',
    height: 96,
  },
  openPicker: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
});
