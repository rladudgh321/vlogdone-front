import { faker } from '@faker-js/faker';

export const loginUserData = {
  id: 4,
  name: '홍길동',
  profile: faker.image.urlPicsumPhotos(),
  email: '111@gmail.com',
  password: '111',
};
