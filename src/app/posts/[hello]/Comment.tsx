'use client';

import {
  addCommentAPI,
  addLikeCommentAPI,
  getCommentPaginationAPI,
  ifOriginremoveComment_removeWithItsParentIdAPI,
  removeCommentAPI,
  removeLikeCommentAPI,
} from '@/app/apis/comment';
import { GetTimeDiff } from '@/app/components/date';
import { currentPageAtom, datePickerAtom } from '@/app/resource/recoil';
import DatePickerComponent from '@/app/rladudgh/addpost/date-picker';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useRouter, useSearchParams } from 'next/navigation';
import { memo, useCallback, useMemo, useState } from 'react';
import { SubmitHandler, useFormContext } from 'react-hook-form';
import { BsBalloonHeart } from 'react-icons/bs';
import { useRecoilState } from 'recoil';
import CommentDaetgeulComponent from './CommentDaetgeul';
import PaginationComponent from '@/app/components/Pagination'; // Pagination 컴포넌트 import
import { useOptimisticMutation } from '@/app/resource/hook/useOptimisticMutation';
import {
  optimisticUpdateAddComment,
  optimisticUpdateAddLike,
  optimisticUpdateRemoveComment,
  optimisticUpdateRemoveLike,
  optimisticUpdateRemoveWithParentId,
} from '@/app/resource/optimisticUpdate';

type Inputs = {
  comment: string;
  date_hour: number;
  date_minute: number;
};

interface DataUserProps {
  id: string;
  role: string;
}

function CommentComponent({
  param,
  dataUser,
  token,
}: {
  param: string;
  dataUser: DataUserProps | undefined;
  token: string | undefined;
}) {
  const queryClient = useQueryClient();
  const router = useSearchParams();
  const nextRouter = useRouter();
  const [select, setSelect] = useRecoilState<Date>(datePickerAtom);
  const [dateOpen, dateSetOpen] = useState<boolean>(false);
  const [openCommentId, setOpenCommentId] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useFormContext<Inputs>();
  const [currentPage, setCurrentPage] = useRecoilState<number>(currentPageAtom);
  const page = currentPage || Number(router.get('page')) || 1;
  const limit = Number(router.get('limit')) || 10;

  // Fetch comments using React Query
  const {
    data: dataGetCommentPagination,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['getCommentPaginationAPI', page, limit],
    queryFn: () => getCommentPaginationAPI({ page, limit, param, token }),
  });

  const { mutate: addLike } = useOptimisticMutation({
    queryKey: ['getCommentPaginationAPI'],
    mutationFn: addLikeCommentAPI, // addLikeCommentAPI는 실제 API 호출 함수
    optimisticUpdate: optimisticUpdateAddLike, // 낙관적 업데이트 함수
  });

  const onClickHeart = useCallback(
    (comment: any) => {
      addLike({ token, param, commentId: comment.id });
    },
    [addLike, param, token],
  );

  const { mutate: mutationDeleteLike } = useOptimisticMutation({
    queryKey: ['getCommentPaginationAPI'],
    mutationFn: removeLikeCommentAPI, // addLikeCommentAPI는 실제 API 호출 함수
    optimisticUpdate: optimisticUpdateRemoveLike, // 낙관적 업데이트 함수
  });

  const onClickDeleteHeart = useCallback(
    (comment: any) => {
      mutationDeleteLike({ token, param, commentId: comment.id });
    },
    [mutationDeleteLike, param, token],
  );

  const mutation = useOptimisticMutation({
    queryKey: ['getCommentPaginationAPI'],
    mutationFn: addCommentAPI,
    optimisticUpdate: optimisticUpdateAddComment,
  });

  const deleteMutation = useOptimisticMutation({
    queryKey: ['getCommentPaginationAPI'],
    mutationFn: removeCommentAPI,
    optimisticUpdate: optimisticUpdateRemoveComment,
  });

  const ifOriginremoveComment_removeWithItsParentIdMutation =
    useOptimisticMutation({
      queryKey: ['getCommentPaginationAPI'],
      mutationFn: ifOriginremoveComment_removeWithItsParentIdAPI,
      optimisticUpdate: optimisticUpdateRemoveWithParentId,
    });

  const onClickDeleteButton = useCallback(
    async (comment: any) => {
      if (
        !window.confirm(
          '삭제하시면 복구할 수 없습니다. 정말로 삭제하시겠습니까?',
        )
      )
        return;

      await ifOriginremoveComment_removeWithItsParentIdMutation.mutateAsync({
        token,
        param,
        commentId: comment.id,
      });
      await deleteMutation.mutateAsync({
        postId: param,
        commentId: comment.id,
        token,
      });
    },
    [
      deleteMutation,
      ifOriginremoveComment_removeWithItsParentIdMutation,
      param,
      token,
    ],
  );

  const onClickOption = useCallback(() => {
    dateSetOpen((prev) => !prev);
  }, []);

  const onClickDaetgeul = useCallback((commentId: string) => {
    setOpenCommentId((prevId) => (prevId === commentId ? null : commentId));
  }, []);

  const onClickText = useCallback(() => {
    if (!dataUser?.id) {
      if (
        !window.confirm(
          '로그인을 해야 이용하실 수 있습니다. 로그인 페이지로 가시겠습니까?',
        )
      )
        return;
      nextRouter.push('/rladudgh/login');
    }
  }, [dataUser?.id, nextRouter]);

  const paginationMutation = useMutation({
    mutationFn: getCommentPaginationAPI,
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ['getCommentPaginationAPI'] });
    },
    onError: (err: any) => {
      console.error(err);
    },
  });

  const itemsPerPage = limit;
  const totalAllItems = dataGetCommentPagination?.total || 0;
  const pageAllCount = Math.ceil(totalAllItems / itemsPerPage);

  const handleAllPageChange = useCallback(
    (selected: number) => {
      const newPage = selected;
      paginationMutation.mutate({ page: newPage, limit, token, param });
      nextRouter.push(`/posts/${param}?page=${newPage}&limit=${limit}`, {
        scroll: false,
      });
      setCurrentPage(newPage);
    },
    [limit, nextRouter, paginationMutation, param, setCurrentPage, token],
  );

  const onSubmitDisabled = useMemo(() => !dataUser?.id, [dataUser?.id]);

  const onSubmit: SubmitHandler<Inputs> = useCallback(
    (data) => {
      mutation.mutate({
        token,
        postId: param,
        content: data.comment,
        select,
        date_hour: data.date_hour,
        date_minute: data.date_minute,
        userId: dataUser?.id,
      });
      reset();
    },
    [dataUser?.id, mutation, param, reset, select, token],
  );

  if (isLoading) return 'Loading...';

  if (error) return `An error has occurred: ${error.message}`;

  return (
    <div className="max-w-[768px] text-left mx-auto my-10 text-2xl">
      {dataGetCommentPagination.total > 0 && (
        <>
          <div>{dataGetCommentPagination.total}개의 댓글이 있어요</div>
          <div className="border border-slate-300 p-4">
            {dataGetCommentPagination.items?.map((comment: any) => {
              const date = dayjs(comment?.createdAt).tz('Asia/Seoul');
              return (
                <div key={comment.id}>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-x-4 p-4">
                      <img
                        className="w-10 h-10 rounded-full"
                        src={comment?.profile}
                        alt="profile"
                      />
                      <div>{comment?.name}</div>
                    </div>
                    <div>
                      <GetTimeDiff timeToCompare={date} />
                    </div>
                  </div>
                  <hr />
                  <div className="my-5 p-5">{comment?.content}</div>
                  <div className="flex gap-x-4 relative">
                    <div className="flex gap-x-2 items-center">
                      <div
                        onClick={
                          dataUser?.id === comment.userId?.userId
                            ? () => onClickDeleteHeart(comment)
                            : () => onClickHeart(comment)
                        }
                        className="cursor-pointer"
                      >
                        <BsBalloonHeart
                          className={
                            dataUser?.id === comment.userId?.userId
                              ? 'text-red-500'
                              : ''
                          }
                        />
                      </div>
                      <span>{comment.commentLikeCount || 0}</span>
                    </div>
                    <div>
                      <div onClick={() => onClickDaetgeul(comment.id)}>
                        답글 {comment.commentCount}
                      </div>
                      {openCommentId === comment.id && (
                        <CommentDaetgeulComponent
                          isAdmin={dataUser?.role}
                          parentId={comment.id}
                          param={param}
                          loginUser={dataUser}
                        />
                      )}
                    </div>
                    {(dataUser?.role === 'ADMIN' ||
                      dataUser?.id === comment.userId?.userId) && (
                      <div onClick={() => onClickDeleteButton(comment)}>
                        <img
                          src="/delete.png"
                          alt="delete"
                          className="w-8 cursor-pointer"
                        />
                      </div>
                    )}
                  </div>
                  <hr />
                </div>
              );
            })}
            {pageAllCount > 0 && (
              <PaginationComponent
                currentPage={page}
                pageAllCount={pageAllCount}
                handlePageChange={handleAllPageChange}
              />
            )}
          </div>
        </>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="my-10">
        <textarea
          placeholder="로그인하고 댓글 작성하기"
          className="border border-slate-300 p-5 w-full"
          {...register('comment')}
          onClick={onClickText}
        />
        {errors.comment && <span>{errors.comment.message}</span>}
        <div className="flex justify-between">
          <div>
            {dataUser?.role === 'ADMIN' && (
              <div className="cursor-pointer" onClick={onClickOption}>
                고급 옵션
              </div>
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
          <input
            type="submit"
            value="글작성"
            className="border border-slate-400 p-2 w-36"
            disabled={onSubmitDisabled}
          />
        </div>
      </form>
    </div>
  );
}

export default memo(CommentComponent);
