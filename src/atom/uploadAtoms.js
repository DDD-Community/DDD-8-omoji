import {atom} from 'recoil';

export const uploadFormState = atom({
  key: 'uploadFormState',
  default: {
    title: '',
    imgs: [],
    description: '',
    events: [],
  },
});
