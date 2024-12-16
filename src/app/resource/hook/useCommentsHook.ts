'use client';

import { useQuery, useMutation } from '@tanstack/react-query';
import {
  getCommentPaginationAPI,
  addLikeCommentAPI,
  removeLikeCommentAPI,
  addCommentAPI,
} from '@/app/apis/comment';

export const useComments = (
  page: number,
  limit: number,
  param: string,
  token: string,
) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['getCommentPaginationAPI', page, limit],
    queryFn: () => getCommentPaginationAPI({ page, limit, param, token }),
  });

  const mutationAddLike = useMutation({
    mutationFn: addLikeCommentAPI,
    onSuccess: () => {
      // Success logic
    },
    onError: (err: any) => {
      console.error(err);
    },
  });

  const mutationDeleteLike = useMutation({
    mutationFn: removeLikeCommentAPI,
    onSuccess: () => {
      // Success logic
    },
    onError: (err: any) => {
      console.error(err);
    },
  });

  // 댓글 작성
  const mutationAddComment = useMutation({
    mutationFn: (data: { token: string; postId: string; content: string }) =>
      addCommentAPI(data),
    onSuccess: () => {
      // 댓글 추가 후 재조회 또는 상태 업데이트
    },
  });

  return {
    data,
    isLoading,
    error,
    mutationAddLike,
    mutationDeleteLike,
    mutationAddComment,
  };
};
