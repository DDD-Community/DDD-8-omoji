import {Dimensions, StyleSheet, Text, TextInput, View} from 'react-native';

import {useRecoilState} from 'recoil';

import CustomIcon from './CustomIcon';
import UploadTag from './UploadTag';
import {uploadFormState} from '../atom/uploadAtoms';

const TITLE_MAX_LENGTH = 38;
const CONTENT_MAX_LENGTH = 100;

const Events = ['결혼식', '여행', '휴가', '데이트'];
const Events2 = ['학교', '출근', '데일리'];

export function ImageUploadForm() {
  const [form, setForm] = useRecoilState(uploadFormState);

  const onChangeText = prop => value => {
    setForm({
      ...form,
      [prop]: value,
    });
  };

  const onClickEvent = event => {
    if (form.events.includes(event)) {
      deleteEvent(event);
    } else {
      addEvent(event);
    }
  };

  const addEvent = event => {
    setForm({
      ...form,
      events: [...form.events, event],
    });
  };

  const deleteEvent = event => {
    setForm({
      ...form,
      events: form.events.filter(e => e !== event),
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
        <Text style={styles.formTitle}>상황</Text>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          {Events.map((event, idx) => {
            return (
              <View style={{marginLeft: idx === 0 ? 0 : 8}} key={idx}>
                <UploadTag
                  text={event}
                  onClick={() => {
                    onClickEvent(event);
                  }}
                />
              </View>
            );
          })}
        </View>
        <View style={{display: 'flex', flexDirection: 'row', marginTop: 8}}>
          {Events2.map((event, idx) => {
            return (
              <View style={{marginLeft: idx === 0 ? 0 : 8}} key={idx}>
                <UploadTag
                  text={event}
                  onClick={() => {
                    onClickEvent(event);
                  }}
                />
              </View>
            );
          })}
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
    </View>
  );
}

const styles = StyleSheet.create({
  formLayout: {
    marginBottom: 36,
  },
  formTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    marginBottom: 16,
    fontWeight: '700',
  },
  formInputArea: {
    backgroundColor: '#282828',
    borderRadius: 8,
    padding: 12,
  },
  input: {
    padding: 0,
    color: '#FFFFFF',
  },
  formTextCountContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  formTextCount: {
    alignSelf: 'flex-end',
    color: '#8F8F8F',
    fontSize: 12,
  },
});
