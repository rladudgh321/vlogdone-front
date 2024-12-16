import {
  ifDeletePost_deleteManyLikeAPI,
  removeCommentsAPI,
} from '@/app/apis/comment';
import { removePostAPI } from '@/app/apis/post';
import { GetTimeDiff } from '@/app/components/date';
import { CommentProps } from '@/app/interafce';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import duration from 'dayjs/plugin/duration';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
dayjs.extend(duration);
dayjs.locale('ko');

interface dataUserProps {
  id: string;
  role: string;
}

function TitleComponent({
  title,
  image,
  categories,
  createdAt,
  param,
  comments,
  dataUser,
  authorId,
  name,
}: {
  title: string;
  image: string;
  categories: { id: string; name: string }[];
  createdAt: string;
  param: string;
  comments: (CommentProps | null)[];
  dataUser: dataUserProps | null;
  authorId: string;
  name: string;
}) {
  const date = dayjs(createdAt);
  const router = useRouter();
  const queryClient = useQueryClient();
  const [token, setToken] = useState<string | null>(null);

  const deleteMutation = useMutation({
    mutationFn: removePostAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getPostsAPI'] });
      router.replace('/');
    },
    onError: (err: any) => {
      console.error(err);
    },
  });

  const mutationComments = useMutation({
    mutationFn: removeCommentsAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getPostsAPI'] });
    },
    onError: (err: any) => {
      console.error(err);
    },
  });

  const mutationIfDeletePost_deleteManyLike = useMutation({
    mutationFn: ifDeletePost_deleteManyLikeAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getPosts'] });
    },
    onError: (err: any) => {
      console.error(err);
    },
  });

  useEffect(() => {
    const storedToken = localStorage.getItem('authorization');
    setToken(storedToken); // 상태 업데이트
  }, []);

  const onClickDeletePostButton = useCallback(async () => {
    await mutationIfDeletePost_deleteManyLike.mutateAsync({ token, param }); //like 전체 지우기
    await mutationComments.mutateAsync({ token, postId: param }); //comments 전체 지우기
    await deleteMutation.mutateAsync({ token: token!, id: param }); // post 지우기
  }, [
    deleteMutation,
    mutationComments,
    mutationIfDeletePost_deleteManyLike,
    param,
    token,
  ]);

  // 공통된 삭제 및 수정 버튼 렌더링 함수
  const renderActionButtons = () => {
    if (dataUser?.role === 'ADMIN' || dataUser?.id === authorId) {
      return (
        <div className="flex items-center gap-x-2">
          <Link className="blog-date" href={`/rladudgh/update/${param}`}>
            수정
          </Link>
          <div className="blog-date">{name}</div>
          <div
            className="blog-date cursor-pointer"
            onClick={() => {
              if (
                !window.confirm(
                  `삭제하시면 복구할수 없습니다.\n 정말로 삭제하시겠습니까??`,
                )
              ) {
                return false;
              } else {
                return onClickDeletePostButton();
              }
            }}
          >
            삭제
          </div>
        </div>
      );
    } else {
      return <div className="blog-date">{name}</div>;
    }
  };

  return (
    <div className="max-w-[768px] text-center mx-auto">
      <div className="">
        <h2 className="blog-title">{title}</h2>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex my-4 gap-4 items-center">
          <div className="blog-date">{date.format('YYYY-MM-DD')}</div>
          {categories.map((v) => (
            <div className="blog-date" key={v.id}>
              {v.name}
            </div>
          ))}
          <div>
            <GetTimeDiff timeToCompare={dayjs(createdAt)} />
          </div>
        </div>
        {renderActionButtons()}
      </div>
      <div>
        <img src={image} alt="사진" />
      </div>
    </div>
  );
}

export default TitleComponent;
