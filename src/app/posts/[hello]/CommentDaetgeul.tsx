'use client';
import {
  addCommentaAPI,
  addLikeCommentAPI,
  getCommentaAPI,
  removeCommentAPI,
  removeDaetguelLikesAPI,
  removeLikeCommentAPI,
} from '@/app/apis/comment';
import { GetTimeDiff } from '@/app/components/date';
import { datePickerAtom } from '@/app/resource/recoil';
import DatePickerComponent from '@/app/rladudgh/addpost/date-picker';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { SubmitHandler, useFormContext } from 'react-hook-form';
import { BsBalloonHeart } from 'react-icons/bs';
import { useRecoilState } from 'recoil';

type Inputs = {
  commentDaetgeul: string;
};

interface loginUserProps {
  id: string;
  role: string;
}

export default function CommentDaetgeulComponent({
  parentId,
  param,
  loginUser,
  isAdmin,
}: {
  parentId: string;
  param: string;
  loginUser: loginUserProps | undefined;
  isAdmin: string | undefined;
}) {
  const {
    register,
    handleSubmit,
    resetField,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    formState: { errors },
  } = useFormContext<Inputs>();

  const queryClient = useQueryClient();
  const token = localStorage?.getItem('authorization') as string;
  const router = useRouter();
  const { isPending, error, data } = useQuery({
    queryKey: ['getCommentaAPI'],
    queryFn: () => getCommentaAPI({ token, param, parentId }),
  });

  const [dateOpen, dateSetOpen] = useState<boolean>(false);
  const onClickOption = useCallback(() => {
    dateSetOpen((prev) => !prev);
  }, []);
  const [select, setSelect] = useRecoilState<Date>(datePickerAtom);

  const mutation = useMutation({
    mutationFn: addCommentaAPI,
    onSuccess: () => {
      return Promise.all([
        queryClient.invalidateQueries({ queryKey: ['getCommentaAPI'] }),
        queryClient.invalidateQueries({ queryKey: ['getCommentAPI'] }),
      ]);
    },
    onError: (err: any) => {
      console.error(err);
    },
    onSettled: () => {
      resetField('commentDaetgeul');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: removeCommentAPI,
    onSuccess: () => {
      return Promise.all([
        queryClient.invalidateQueries({ queryKey: ['getCommentaAPI'] }),
        queryClient.invalidateQueries({ queryKey: ['getCommentAPI'] }),
      ]);
    },
    onError: (err: any) => {
      console.error(err);
    },
  });
  const mutationAddLike = useMutation({
    mutationFn: addLikeCommentAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getCommentaAPI'] });
    },
    onError: (err: any) => {
      console.error(err);
    },
  });

  const onClickHeart = useCallback(
    (a: any) => {
      mutationAddLike.mutate({
        token,
        param,
        commentId: a.id,
      });
    },
    [mutationAddLike, param, token],
  );

  const mutationDeleteLike = useMutation({
    mutationFn: removeLikeCommentAPI,
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ['getCommentaAPI'] });
    },
    onError: (err: any) => {
      console.error(err);
    },
  });

  const mutationRemoveDaetguelLikes = useMutation({
    mutationFn: removeDaetguelLikesAPI,
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ['getCommentaAPI'] });
    },
    onError: (err: any) => {
      console.error(err);
    },
  });

  const onClickDeleteHeart = useCallback(
    (b: any) => {
      mutationDeleteLike.mutate({
        token,
        param,
        commentId: b.id,
      });
    },
    [mutationDeleteLike, param, token],
  );

  const onClickDeleteButton = useCallback(
    async (v: any) => {
      //like 전부 지우기
      if (
        !window.confirm(
          `삭제하시면 복구할수 없습니다.\n 정말로 삭제하시겠습니까??`,
        )
      ) {
        return false;
      }
      await mutationRemoveDaetguelLikes.mutateAsync({
        token,
        param,
        commentId: v.id,
      });
      //댓글 지우기
      await deleteMutation.mutateAsync({
        postId: param,
        commentId: v?.id,
        token,
      });
    },
    [deleteMutation, mutationRemoveDaetguelLikes, param, token],
  );

  const onClickText = useCallback(() => {
    if (!loginUser?.id) {
      if (
        !window.confirm(
          `로그인을 해야 이용하실 수 있습니다.\n 로그인 페이지로 가시겠습니까??`,
        )
      ) {
        return false;
      } else {
        router.push('/rladudgh/login');
      }
    }
  }, [loginUser?.id, router]);

  const onSubmit: SubmitHandler<Inputs> = (data: any) => {
    mutation.mutate({
      token,
      param,
      content: data.commentDaetgeul,
      select,
      parentId,
    });
  };

  if (isPending) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  return (
    <div className="relative bg-slate-300 max-w-2xl">
      <div className="border border-slate-300 p-4">
        {data.map((v: any) => {
          const date = dayjs(v.createdAt);

          return (
            <div key={v?.id} className="z-10">
              <div className="flex items-center  justify-between">
                <div className="flex gap-x-4 p-4">
                  <div>
                    <img
                      className="w-10 h-10 rounded-full"
                      src={v?.profile}
                      alt="profile"
                    />
                  </div>
                  <div>{v?.name}</div>
                </div>
                <div className="flex gap-x-2">
                  <div>
                    <GetTimeDiff timeToCompare={date} />
                  </div>
                </div>
              </div>
              <hr />
              <div className="my-5 p-5 w-[576px] break-words">{v?.content}</div>
              <div className="flex gap-x-4 relative">
                <div>
                  {
                    //로그인 아이디     ===   댓글에 좋아요 한 사람(다대다모델에 접근하여 사람 commentonUser의 userId와 같은지...)
                    !loginUser?.id ? (
                      <div className="flex gap-x-2 items-center">
                        <BsBalloonHeart /> {v.commentLikeCount || 0}
                      </div>
                    ) : loginUser?.id === v?.userId?.userId ? (
                      <div className="flex gap-x-2 items-center">
                        <BsBalloonHeart
                          onClick={() => onClickDeleteHeart(v)}
                          className="text-red-500"
                        />{' '}
                        {v.commentLikeCount || 0}
                      </div>
                    ) : (
                      <div className="flex gap-x-2 items-center">
                        <BsBalloonHeart onClick={() => onClickHeart(v)} />{' '}
                        {v.commentLikeCount || 0}
                      </div>
                    )
                  }
                </div>
                {loginUser?.id && loginUser?.role === 'ADMIN' ? (
                  <div onClick={() => onClickDeleteButton(v)}>
                    <img
                      src="/delete.png"
                      alt="delete"
                      className="w-8 cursor-pointer"
                    />
                  </div>
                ) : loginUser?.role === 'ADMIN' ? (
                  <div onClick={() => onClickDeleteButton(v)}>
                    <img
                      src="/delete.png"
                      alt="delete"
                      className="w-8 cursor-pointer"
                    />
                  </div>
                ) : loginUser?.id === v.authorId ? (
                  <div onClick={() => onClickDeleteButton(v)}>
                    <img
                      src="/delete.png"
                      alt="delete"
                      className="w-8 cursor-pointer"
                    />
                  </div>
                ) : null}
              </div>
              <hr />
            </div>
          );
        })}
      </div>
      <hr />
      <div className="bg-slate-300">
        <form onSubmit={handleSubmit(onSubmit)} className="my-10 max-w-lg z-10">
          <textarea
            placeholder={
              loginUser ? '댓글을 작성해주세요' : '로그인하고 댓글 작성하기'
            }
            className="border border-slate-300 p-5 w-full flex justify-center"
            {...register('commentDaetgeul')}
            onClick={onClickText}
          />
          <div className="flex justify-between">
            <div>
              {isAdmin === 'ADMIN' && (
                <div onClick={onClickOption}>고급 옵션</div>
              )}
              {dateOpen && (
                <DatePickerComponent
                  createdAt={null}
                  params={null}
                  select={select}
                  setSelect={setSelect}
                />
              )}
            </div>
            <button type="submit" className="border border-slate-300 p-5">
              작성하기
            </button>
          </div>
        </form>
      </div>
      <hr />
    </div>
  );
}
