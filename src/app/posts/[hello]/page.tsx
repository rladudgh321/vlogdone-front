'use client';

import { getPostsAPI } from '@/app/apis/post';
import { getUserIdAPI } from '@/app/apis/user';
import { useQuery } from '@tanstack/react-query';
import { FormProvider, useForm } from 'react-hook-form';
import CommentComponent from './Comment';
import ContentComponent from './Content';
import RealteComponent from './Relate';
import Title from './Title';
import { CommentProps, postItemsExpendProps } from '@/app/interafce';
import { useState, useEffect } from 'react';

type Inputs = {
  highlight: boolean;
  title: string;
  category_type: string;
  date_hour: number;
  date_minute: number;
};

export default function HelloPage({ params }: { params: { hello: string } }) {
  const [token, setToken] = useState<string | undefined>(undefined);

  const methods = useForm<Inputs>();

  // useEffect를 사용하여 컴포넌트 마운트 시 localStorage에서 token을 가져옵니다.
  useEffect(() => {
    const storedToken = localStorage?.getItem('authorization');
    setToken(storedToken || undefined);
  }, []); // 빈 배열로 초기 마운트 시 한 번만 실행

  const {
    isPending: isPendingUser,
    error: isErrorUser,
    data: dataUser,
  } = useQuery({
    enabled: !!token, // token이 있을 때만 호출
    queryKey: ['getUserIdAPI'],
    queryFn: () => getUserIdAPI({ token }),
  });

  const { isPending, error, data } = useQuery({
    queryKey: ['getPostsAPI'],
    queryFn: getPostsAPI,
  });

  if (isPending) return 'Loading... posts';
  if (token) {
    if (isPendingUser) return 'Loading... user';
  }

  if (error) return 'An error has occurred: ' + error.message;
  if (isErrorUser) return 'An error has occurred: ' + isErrorUser.message;
  return (
    <FormProvider {...methods}>
      {data?.map((v: postItemsExpendProps) => {
        if (v.id === params.hello) {
          const comments = v.comments.map((w: CommentProps) => {
            if (w.postId === v.id) {
              return w;
            } else {
              return null;
            }
          });
          return (
            <div key={v.id}>
              <Title
                comments={comments}
                title={v.title}
                image={v.image}
                categories={v.categories}
                createdAt={v.createdAt}
                param={params.hello}
                dataUser={dataUser}
                authorId={v.authorId}
                name={v.author.name}
              />
              <ContentComponent content={v.content} />
              <RealteComponent
                post={data}
                params={params.hello}
                categories={v.categories}
              />
              <CommentComponent
                token={token}
                dataUser={dataUser}
                param={params.hello}
              />
            </div>
          );
        } else {
          return null; //404 페이지 만들기
        }
      })}
    </FormProvider>
  );
}
