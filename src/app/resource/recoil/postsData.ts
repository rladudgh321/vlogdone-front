import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';
import { postsInterface } from '../interface';

export const postsData: postsInterface[] = [
  {
    idx: uuidv4(),
    id: 1,
    title: faker.lorem.words(),
    content: faker.lorem.sentences(20),
    highlight: false,
    image: faker.image.urlPicsumPhotos(),
    category: '음식',
    Comment: [
      {
        id: 1,
        content: '안녕 친구야',
        User: {
          id: 2,
          name: '권현주',
          profile: faker.image.urlPicsumPhotos(),
        },
      },
      {
        id: 2,
        content: '힘내용',
        User: {
          id: 3,
          name: '김지유',
          profile: faker.image.urlPicsumPhotos(),
        },
      },
    ],
  },
  {
    idx: uuidv4(),
    id: 2,
    title: faker.lorem.words(),
    content: faker.lorem.sentences(20),
    highlight: false,
    image: faker.image.urlPicsumPhotos(),
    category: '음식',
    Comment: [
      {
        id: 1,
        content: '안녕 친구야',
        User: {
          id: 2,
          name: '권현주',
          profile: faker.image.urlPicsumPhotos(),
        },
      },
      {
        id: 2,
        content: '힘내용',
        User: {
          id: 3,
          name: '김지유',
          profile: faker.image.urlPicsumPhotos(),
        },
      },
    ],
  },
  {
    idx: uuidv4(),
    id: 3,
    title: faker.lorem.words(),
    content: faker.lorem.sentences(20),
    highlight: false,
    image: faker.image.urlPicsumPhotos(),
    category: '음식',
    Comment: [
      {
        id: 1,
        content: '안녕 친구야',
        User: {
          id: 2,
          name: '권현주',
          profile: faker.image.urlPicsumPhotos(),
        },
      },
      {
        id: 2,
        content: '힘내용',
        User: {
          id: 3,
          name: '김지유',
          profile: faker.image.urlPicsumPhotos(),
        },
      },
    ],
  },
  {
    idx: uuidv4(),
    id: 4,
    title: faker.lorem.words(),
    content: faker.lorem.sentences(20),
    highlight: false,
    image: faker.image.urlPicsumPhotos(),
    category: '음식',
    Comment: [
      {
        id: 1,
        content: '안녕 친구야',
        User: {
          id: 2,
          name: '권현주',
          profile: faker.image.urlPicsumPhotos(),
        },
      },
      {
        id: 2,
        content: '힘내용',
        User: {
          id: 3,
          name: '김지유',
          profile: faker.image.urlPicsumPhotos(),
        },
      },
    ],
  },
  {
    idx: uuidv4(),
    id: 5,
    title: faker.lorem.words(),
    content: faker.lorem.sentences(20),
    highlight: false,
    image: faker.image.urlPicsumPhotos(),
    category: '청소',
    Comment: [
      {
        id: 1,
        content: '안녕 친구야',
        User: {
          id: 2,
          name: '권현주',
          profile: faker.image.urlPicsumPhotos(),
        },
      },
      {
        id: 2,
        content: '힘내용',
        User: {
          id: 3,
          name: '김지유',
          profile: faker.image.urlPicsumPhotos(),
        },
      },
    ],
  },
  {
    idx: uuidv4(),
    id: 6,
    title: faker.lorem.words(),
    content: faker.lorem.sentences(20),
    highlight: false,
    image: faker.image.urlPicsumPhotos(),
    category: '청소',
    Comment: [
      {
        id: 1,
        content: '안녕 친구야',
        User: {
          id: 2,
          name: '권현주',
          profile: faker.image.urlPicsumPhotos(),
        },
      },
      {
        id: 2,
        content: '힘내용',
        User: {
          id: 3,
          name: '김지유',
          profile: faker.image.urlPicsumPhotos(),
        },
      },
    ],
  },
  {
    idx: uuidv4(),
    id: 7,
    title: faker.lorem.words(),
    content: faker.lorem.sentences(20),
    highlight: false,
    image: faker.image.urlPicsumPhotos(),
    category: '청소',
    Comment: [
      {
        id: 1,
        content: '안녕 친구야',
        User: {
          id: 2,
          name: '권현주',
          profile: faker.image.urlPicsumPhotos(),
        },
      },
      {
        id: 2,
        content: '힘내용',
        User: {
          id: 3,
          name: '김지유',
          profile: faker.image.urlPicsumPhotos(),
        },
      },
    ],
  },
  {
    idx: uuidv4(),
    id: 8,
    title: faker.lorem.words(),
    content: faker.lorem.sentences(20),
    highlight: false,
    image: faker.image.urlPicsumPhotos(),
    category: '노하우',
    Comment: [
      {
        id: 1,
        content: '안녕 친구야',
        User: {
          id: 2,
          name: '권현주',
          profile: faker.image.urlPicsumPhotos(),
        },
      },
      {
        id: 2,
        content: '힘내용',
        User: {
          id: 3,
          name: '김지유',
          profile: faker.image.urlPicsumPhotos(),
        },
      },
    ],
  },
  {
    idx: uuidv4(),
    id: 9,
    title: faker.lorem.words(),
    content: faker.lorem.sentences(20),
    highlight: false,
    image: faker.image.urlPicsumPhotos(),
    category: '노하우',
    Comment: [
      {
        id: 1,
        content: '안녕 친구야',
        User: {
          id: 2,
          name: '권현주',
          profile: faker.image.urlPicsumPhotos(),
        },
      },
      {
        id: 2,
        content: '힘내용',
        User: {
          id: 3,
          name: '김지유',
          profile: faker.image.urlPicsumPhotos(),
        },
      },
    ],
  },
  {
    idx: uuidv4(),
    id: 10,
    title: faker.lorem.words(),
    content: faker.lorem.sentences(20),
    highlight: false,
    image: faker.image.urlPicsumPhotos(),
    category: '기타',
    Comment: [
      {
        id: 1,
        content: '안녕 친구야',
        User: {
          id: 2,
          name: '권현주',
          profile: faker.image.urlPicsumPhotos(),
        },
      },
      {
        id: 2,
        content: '힘내용',
        User: {
          id: 3,
          name: '김지유',
          profile: faker.image.urlPicsumPhotos(),
        },
      },
    ],
  },
];
