import { atom } from 'recoil';
import { loginUserData } from './loginUserData';
import { postsData } from './postsData';

const postsKey = 'postsKey';
const categoryKey = 'categoryKey';
const loginUserKey = 'loginUserKey';
const datePickerKey = 'datePickerKey';
const postMainImageKey = 'postMainImageKey';
const currentPageKey = 'currentPageKey';
const postItemsKey = 'postItemsKey';
const selectedKey = 'selectedKey';
const loginUIKey = 'loginUIKey';

export const postsAtom = atom({
  key: postsKey,
  default: postsData,
});

export const categoryAtom = atom({
  key: categoryKey,
  default: '',
});

export const currentPageAtom = atom({
  key: currentPageKey,
  default: 1,
});

export const loginUserAtom = atom({
  key: loginUserKey,
  default: loginUserData,
});

export const datePickerAtom = atom({
  key: datePickerKey,
  default: new Date(Date.now()),
});

export const postMainImage = atom({
  key: postMainImageKey,
  default: '',
});

export const postItemsAtom = atom({
  key: postItemsKey,
  default: [],
});

export const selectedAtom = atom({
  key: selectedKey,
  default: 0,
});

export const loginUIAtom = atom({
  key: loginUIKey,
  default: false,
});
