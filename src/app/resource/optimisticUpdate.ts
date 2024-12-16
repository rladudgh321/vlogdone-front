interface CommentPaginationData {
  total: number;
  items: Comment[];
}

interface Comment {
  id: string;
  commentLikeCount: number;
  // 기타 댓글 필드들...
}

export const optimisticUpdateAddLike = (
  previousData: CommentPaginationData,
  variables: any,
) => {
  const updatedData = {
    ...previousData,
    items: previousData.items.map((comment) => {
      if (comment.id === variables.commentId) {
        return {
          ...comment,
          commentLikeCount: comment.commentLikeCount + 1, // 좋아요 카운트 증가
        };
      }
      return comment;
    }),
  };

  return updatedData;
};

export const optimisticUpdateRemoveLike = (
  previousData: CommentPaginationData,
  variables: any,
) => {
  const updatedData = {
    ...previousData,
    items: previousData.items.map((comment) => {
      if (comment.id === variables.commentId) {
        return {
          ...comment,
          commentLikeCount: Math.max(comment.commentLikeCount - 1, 0), // 좋아요 수 감소 (최소 0)
        };
      }
      return comment;
    }),
  };

  return updatedData;
};

export const optimisticUpdateAddComment = (
  previousData: CommentPaginationData,
  variables: { content: string; userId: string },
) => {
  const newComment = {
    id: 'new-comment-id', // 임시로 새로운 댓글의 ID를 설정 (서버에서 실제 ID를 받으면 갱신)
    content: variables.content,
    commentLikeCount: 0, // 새로운 댓글은 기본적으로 좋아요 수가 0
    createdAt: new Date().toISOString(), // 현재 시간을 임시로 사용
    userId: { userId: variables.userId }, // 댓글 작성자의 ID (로그인된 사용자가 있으면 사용)
    // 추가 필드들...
  };

  return {
    ...previousData,
    items: [newComment, ...previousData.items], // 새 댓글을 가장 앞에 추가
  };
};

export const optimisticUpdateRemoveComment = (
  previousData: CommentPaginationData,
  variables: { commentId: string },
) => {
  const updatedData = {
    ...previousData,
    items: previousData.items.filter(
      (comment) => comment.id !== variables.commentId,
    ), // 삭제된 댓글을 목록에서 제거
  };

  return updatedData;
};

export const optimisticUpdateRemoveWithParentId = (
  previousData: CommentPaginationData,
  variables: { commentId: string },
) => {
  const updatedData = {
    ...previousData,
    items: previousData.items.filter(
      (comment) => comment.id !== variables.commentId,
    ), // 삭제된 댓글을 목록에서 제거
  };

  return updatedData;
};
