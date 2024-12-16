'use client';

import { getCategoriesAPI } from '@/app/apis/category';
import { addPostAPI } from '@/app/apis/post';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import TitleComponent from './Title';
import dynamic from 'next/dynamic';

dayjs.locale('ko');
dayjs.extend(utc);
dayjs.extend(timezone);

const Editor: any = dynamic(() => import('./editor.tsx') as any, {
  loading: () => <p>Loading...</p>,
});

type Inputs = {
  highlight: boolean;
  title: string;
  category_type: string;
  date_hour: number;
  date_minute: number;
  categories: string[]; // categories는 카테고리 ID 배열
};

export default function AddPostPage() {
  const [token, setToken] = useState<string | null>(null);

  const queryClient = useQueryClient();

  dayjs.tz.setDefault('Asia/Seoul');

  const {
    isPending: isPendingCategory,
    error: isErrorCategory,
    data: dataCategory,
  } = useQuery({
    queryKey: ['getCategoriesAPI'],
    queryFn: getCategoriesAPI,
  });

  const methods = useForm<Inputs>();
  const { register, handleSubmit } = methods;
  const [html, setHtml] = useState<string>('');
  const [select, setSelect] = useState<Date>(new Date());
  const [profileImage, setProfileImage] = useState<string>('');
  const [highlight, setHighlight] = useState<boolean>(false);
  const [, setCategory] = useState<[string, string]>(['', '']); // setCategory 추가
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const mutation = useMutation({
    mutationFn: addPostAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getPostsAPI'] });
      router.replace('/');
    },
    onError: (err: any) => {
      console.error(err);
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  const onSubmit: SubmitHandler<Inputs> = useCallback(
    (data: any) => {
      const selectedDateInKorea = dayjs(select).tz('Asia/Seoul');
      if (data.category_type === '카테고리설정') {
        return alert('카테고리를 선택하셔야 합니다');
      }
      mutation.mutate({
        title: data.title,
        content: html,
        token,
        highlight,
        image: profileImage,
        categories: data.categories,
        select: selectedDateInKorea.format(),
        date_hour: data.date_hour,
        date_minute: data.date_minute,
      });
    },
    [highlight, html, mutation, profileImage, select, token],
  );

  useEffect(() => {
    // 클라이언트 사이드에서만 localStorage에 접근하도록 하기 위해 useEffect 사용
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('authorization');
      setToken(storedToken); // localStorage에서 token을 가져와 상태로 설정
    }
  }, []);

  if (isPendingCategory) return 'Loading...';
  if (isErrorCategory)
    return 'An error has occurred: ' + isErrorCategory.message;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TitleComponent
          createdAt={null}
          params={null}
          TitleComponentData={null}
          forWhat="글쓰기"
          categoryList={dataCategory}
          setCategory={setCategory} // setCategory 전달
          setHighlight={setHighlight}
          select={select}
          setSelect={setSelect}
          profileImage={profileImage}
          setProfileImage={setProfileImage}
        />
        <div className="flex justify-center gap-x-1 my-10 w-[80vh] mx-auto">
          <label className="blog-date" htmlFor="title">
            제목
          </label>
          <input
            className="blog-input grow"
            id="title"
            type="text"
            {...register('title')}
          />
        </div>
        <Editor html={html} setHtml={setHtml} />
        <div>
          {loading ? (
            <input
              type="submit"
              value="글작성"
              className="border border-slate-400 p-2 w-36 loading"
            />
          ) : (
            <input
              type="submit"
              value="글작성"
              className="border border-slate-400 p-2 w-36"
            />
          )}
        </div>
      </form>
    </FormProvider>
  );
}
