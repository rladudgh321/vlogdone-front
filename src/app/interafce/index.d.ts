import { postItemsProps } from './index.d';
export interface dataCategoryProps {
  id: string;
  name: string;
}

export interface postItemsProps {
  authorId: string;
  categories: { id: string; name: string }[];
  content: string;
  createdAt: string;
  highlight: boolean;
  id: string;
  image: string;
  select: string;
  title: string;
  updatedAt: string;
}

export interface postIncludeItemsProps extends postItemsProps {
  author: { name: string };
  category: { id: string; name: string };
}

export interface paginationOnData {
  items: postItemsProps[];
  total: number;
}

export interface CommentProps {
  content: string;
  createdAt: string;
  id: string;
  parentId: null | string;
  postId: string;
  userId: string;
}

export interface postItemsExpendProps extends postItemsProps {
  author: { name: string };
  categories: { id: string; name: string }[];
  comments: CommentProps[];
}

export interface pageProps {
  limit: number;
  page: number;
  param: string;
  token?: string;
}

export interface likeProps {
  commentId: string;
  param: string;
  token?: string;
}
