'use client';

import { getCategoriesAPI } from '@/app/apis/category';
import { getPostsAPI, updatePostAPI } from '@/app/apis/post';
import { postIncludeItemsProps } from '@/app/interafce';
import QuillEditor from '@/app/rladudgh/addpost/editor';
import TitleComponent from '@/app/rladudgh/addpost/Title';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
  highlight: boolean;
  title: string;
  category_type: string;
};

export default function UpdatePostPage({
  params,
}: {
  params: { postId: string };
}) {
  const queryClient = useQueryClient();

  const { isPending, error, data } = useQuery({
    queryKey: ['getPostsAPI'],
    queryFn: getPostsAPI,
  });

  const {
    isPending: isPendingCategory,
    error: isErrorCategory,
    data: dataCategory,
  } = useQuery({
    queryKey: ['getCategoriesAPI'],
    queryFn: getCategoriesAPI,
  });

  const [, setCategory] = useState<[string, string]>(['', '']);
  const [html, setHtml] = useState<string>('');
  const [select, setSelect] = useState<Date>(new Date());
  const [profileImage, setProfileImage] = useState<string>('');
  const [highlight, setHighlight] = useState<boolean>(false);
  const router = useRouter();
  const methods = useForm<Inputs>();
  const {
    register,
    handleSubmit,
    watch,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    formState: { errors },
    setValue,
  } = methods;
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (data) {
      const post = data.find(
        (category: postIncludeItemsProps) => category.id === params.postId,
      );
      if (post) {
        setValue('title', post.title); // Set the default value of title input
        setCategory(post.categories); // Set other default values if necessary
        setHtml(post.content); // Assuming you want to set the HTML editor with the post content
        setHighlight(post.highlight);
        setSelect(new Date(post.createdAt));
      }
    }
  }, [data, params.postId, setValue]);
  const mutation = useMutation({
    mutationFn: updatePostAPI,
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
      const token = localStorage?.getItem('authorization') as string;
      mutation.mutate({
        params: params.postId,
        title: watch('title'),
        content: html,
        token,
        highlight,
        image: profileImage,
        categories: data.categories,
        select,
      });
    },
    [highlight, html, mutation, params.postId, profileImage, select, watch],
  );

  if (isPending) return 'Loading...';
  if (isPendingCategory) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;
  if (isErrorCategory)
    return 'An error has occurred: ' + isErrorCategory.message;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {data.map((v: any) => {
          if (v.id === params.postId) {
            const TitleComponentData = v;
            return (
              <div key={v.id}>
                <TitleComponent
                  createdAt={v.createdAt}
                  params={params.postId}
                  TitleComponentData={TitleComponentData}
                  forWhat="글수정"
                  categoryList={dataCategory}
                  setCategory={setCategory}
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
                <QuillEditor html={html} setHtml={setHtml} />
                <div>
                  {loading ? (
                    <input
                      type="submit"
                      value="완료"
                      className="border border-slate-400 p-2 w-36 loading"
                    />
                  ) : (
                    <input
                      type="submit"
                      value="완료"
                      className="border border-slate-400 p-2 w-36"
                    />
                  )}
                </div>
              </div>
            );
          } else {
            return null; //404 page
          }
        })}
      </form>
    </FormProvider>
  );
}
