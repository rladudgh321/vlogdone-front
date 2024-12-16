'use client';

import Link from 'next/link';
import PostPage from './post';
import { postItemsProps } from '../interafce';

function PostsComponent({ posts }: { posts: postItemsProps }) {
  return (
    <div key={posts.id} className="bg-white p-4 border rounded-md shadow-md">
      <Link href={`/posts/${posts.id}`}>
        <PostPage post={posts} />
      </Link>
    </div>
  );
}

export default PostsComponent;
