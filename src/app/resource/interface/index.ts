interface UserProps {
  id: number;
  name: string;
  profile: string;
}

interface CommentProps {
  id: number;
  content: string;
  User: UserProps;
}

export interface postsInterface {
  idx: string;
  id: number;
  title?: string;
  content?: string;
  highlight: boolean;
  image?: string;
  category: string;
  Comment?: CommentProps[];
}
