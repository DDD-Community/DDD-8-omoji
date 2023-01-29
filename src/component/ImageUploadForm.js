import {
  Button,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useState} from 'react';
import CustomIcon from './CustomIcon';
import {useRecoilState} from 'recoil';
import {uploadFormState} from '../atom/uploadAtoms';

interface Props {
  title: string;
  imgs: any;
  description?: string;
  onSubmit: () => void;
}

const TITLE_MAX_LENGTH = 38;
const CONTENT_MAX_LENGTH = 100;

export function ImageUploadForm() {
  const [form, setForm] = useRecoilState(uploadFormState);

  const onChangeText = (prop: string) => (value: string) => {
    setForm({
      ...form,
      [prop]: value,
    });
  };

  return (
    <View style={{width: '100%'}}>
      <View style={styles.formLayout}>
        <Text style={styles.formTitle}>제목 *</Text>
        <View style={styles.formInputArea}>
          <TextInput
            editable
            multiline
            numberOfLines={1}
            maxLength={TITLE_MAX_LENGTH}
            placeholder="제목을 입력해주세요."
            placeholderTextColor="#8F8F8F"
            style={styles.input}
            onChangeText={onChangeText('title')}
            value={form.title}
          />
          <View style={styles.formTextCountContainer}>
            <Text style={[styles.formTextCount, {color: '#FFFFFF'}]}>
              {form.title?.length}
            </Text>
            <Text style={styles.formTextCount}>/{TITLE_MAX_LENGTH}</Text>
          </View>
        </View>
      </View>
      <View style={styles.formLayout}>
        <Text style={styles.formTitle}>내용</Text>
        <View style={styles.formInputArea}>
          <TextInput
            editable
            multiline
            numberOfLines={4}
            minHeight={96}
            maxLength={CONTENT_MAX_LENGTH}
            placeholder="예시) 주말에 제주도 여행가는데 1번과 2번 중에 어떤 스타일이 더 좋을까요?"
            placeholderTextColor="#8F8F8F"
            style={styles.input}
            onChangeText={onChangeText('description')}
            value={form.description}
          />
          <View style={styles.formTextCountContainer}>
            <Text style={[styles.formTextCount, {color: '#FFFFFF'}]}>
              {form.description?.length}
            </Text>
            <Text style={styles.formTextCount}>/{CONTENT_MAX_LENGTH}</Text>
          </View>
        </View>
      </View>
      <View style={[styles.formLayout, {paddingTop: 16, paddingBottom: 16}]}>
        <Text style={styles.formTitle}>태그</Text>
        <View style={[styles.formInputArea, {flexDirection: 'row'}]}>
          <CustomIcon
            name="iconSearch"
            color={'#FFFFFF'}
            size={24}
            style={{marginRight: 8}}
          />
          <TextInput
            placeholder="더 빠르게 피드백 받을 수 있어요."
            placeholderTextColor="#8F8F8F"
            style={styles.input}
            onChangeText={onChangeText('gender')}
          />
        </View>
      </View>
      {/*<Button onPress={() => onSubmit(form)} title="Submit"></Button>*/}
    </View>
  );
}

const styles = StyleSheet.create({
  formLayout: {
    marginBottom: 36,
  },
  formTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    marginBottom: 16,
    fontWeight: "700"
  },
  formInputArea: {
    backgroundColor: "#282828",
    borderRadius: 8,
    padding: 12,
  },
  input: {
    padding: 0,
    color: "#FFFFFF",
  },
  formTextCountContainer: {
    flexDirection: "row",
    alignSelf: "flex-end",
  },
  formTextCount: {
    alignSelf: "flex-end",
    color: "#8F8F8F",
    fontSize: 12,
  },
});
