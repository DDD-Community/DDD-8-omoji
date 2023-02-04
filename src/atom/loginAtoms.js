import {atom} from 'recoil';

export const loginState = atom({
  key: 'loginState',
  default: {
    accessToken: '',
    expiresAtUnixSecondString: '',
    refreshToken: '',
  },
});

export const userState = atom({
  key: 'userState',
  default: {
    nickname: '',
    accessToken: '',
    refreshToken: '',
  },
});
