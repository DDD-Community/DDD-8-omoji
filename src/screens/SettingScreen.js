import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

export function SettingScreen({navigation}) {
  return (
    <View style={{padding: 16}}>
      <View>
        {/* 공지사항, 로그아웃, 탈퇴하기 */}
        <View>
          <View style={styles.row}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: 'white',
              }}>
              공지사항
            </Text>
          </View>
          <View style={styles.row}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: 'white',
              }}>
              로그아웃
            </Text>
          </View>
          <View style={styles.row}>
            <Pressable
              onPress={() => {
                navigation.navigate('탈퇴하기');
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: 'white',
                }}>
                탈퇴하기
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
});
