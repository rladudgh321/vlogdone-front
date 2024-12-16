메인 페이지에서 페이지네이션

1. addpost 페이지는 관리자만 보이게
2. about 페이지에서는 상세페이지로 통이미지
3. ㅁ은 로그인 로고 페이지
4. patch를 보낼때 데이터가 없으면 null을 보내기
await axios.patch(`comment/${data.param}/${data.commentId}, null, { headers })

5. 버추얼돔에서 async를 넣으면 async/await 오류가 뜬다
data.map(async (v) => { ... }) 여기에서 async를 넣으면 오류가 나온다
오류가 나와서 react-query를 받아 올수 없었다

origin comment의 delete를 누르면
origin comment의 id를 가지는 parentId들의 좋아요를 제거

6. 코드 리팩토링에 대한 생각
문득 게시글 수정을 하려는데...
게시글 추가 기능에 대한 것을 인용하려다가 코드가 지저분함을 느꼈다
내가 생각하는 이상적인 코드는 컴포넌트로 쉽게 보여야 하는데
컴포넌트와 라이브러리코드와 내가 짠 코드가 뒤죽박죽이다
create기능을 만들 기 전에 항상 update 기능이 이용할 것이라는 생각을 하면서 코드를 짜자

즉, 컴포넌트들만으로 만드려고 하자

7. 메모이제이션을 사용해야하는 경우들
  가. props이나 state값 변경 될 우려가 있을 경우 - 자식 컴포넌트에게 등..
  나. 아주 복잡한 수식일 경우 useCallback등을 사용
  다. 타라이브러리를 이용하여 메모이제이션이 필요할 경우
  라. useEffect 등 sideEffect를 사용할 경우
  마. prev를 사용할 때
  const increment = useCallback(() => {
    setCount((prevCount) => prevCount + 1);
  }, []);

8. 메모이제이션이 필요 없는 경우들
  가. 단순 사용시

9. 프로퍼티와 서치파라미터의 관계를 이용할 때 미리미리 console을 찍어보아라
  괜히 categoryId를 URL로 보내서 API소통보다 최대한 줄이는게 비용적으로 이득이다
data.map((v:any) => {
          console.log('Home Data mapping', v);
          // v.categoryId와 쿼리스트링의 카테고리 아이디가 같으면 같은것 끼리 보여주고
          if(v.categoryId === categoryId) {
            return (
              <div key={v.id} className="grid mx-auto md:grid-cols-[500px,500px] justify-center">
                <PostsComponent post={v} />
              </div>
            )
          } else {
          // 쿼리스트링이 없으면 전체를 보여주어라
            console.log('categoryId',categoryId) // null
            if(categoryId === null) {
              return (
                <div key={v.id} className="grid mx-auto md:grid-cols-[500px,500px] justify-center">
                  <PostsComponent post={v} />
                </div>
              ) 
            }
          }
        })

10. 페이지네이션을 누르면 selected가 1로 초기화
  가. 우선 selected를 currentPage 전역변수로 가지고 와서
  나. Nav컴포넌트에서 import한 다음
  다. Link에 onClick이벤트에 삽입

11. Nav에서 전체보기를 하면 데이터가 변하지 않는 현상
  가. Link

12. onClick에는 selected가 있는데 all에 있다가 Nav에서 category를 클릭하면 selcted가 0이되었으면 좋겠다

13. nav의 카테고리를 누르면 selected의 값이 자동으로 0으로 설정되면 좋겠다
forcePage의 값은 항상 selected를 변화시킬까?

14. 같은 카테고리에서는 데이터가 변함을 감지 안하다가 다른카테고리로 변경 되었을 때 데이터가 감지 되도록해서 

15. *****/* 페이지네이션 완성 *-**********
가. 결국에 카테고리별로 각각 컴포넌트를 넣어주는게 답이다
카테고리 별로 맵핑을 돌아서 해당 라우터와 맞는(router.get('category')) 걸로 돌아서
컴포넌트를 리턴시켰다

(pageCategoryCount > 0 && 
          dataCategory.map((v) => {
            if(router.get('category') === v.id) {
              return (
                <>
                <PagenationComponent
                  pageCount={Math.max(1, pageCategoryCount)}
                  onPageChange={handleCategoryPageChange}
                  currentPage={currentPage}
                  onClickPagination={onClickPagination}
                />
                </>
                )
            }
          })
        )
나. forcePage는 0으로

16. 댓글작성시 댓글의 시간을 바꾸고자할때 게시글의 작성시간보다 더 빠를 때
confirm으로 물어보기 - 댓글일시가 게시글일시보다 빠릅니다. 진행하시겠습니까?

17. 배열을 mapping해서 grid라던가 flex를 주려면 mapping의 부모에 grid나 flex를 줘야한다
{
  //전체보기 선택
  !categorySelect &&
  postItems?.length > 0&&
  <div className="grid mx-auto md:grid-cols-[500px,500px] justify-center">
    {postItems.map((v) => {
      console.log('postItems v', v);
      
      return (
        <div key={v?.id}>
          <PostsComponent posts={v} />
        </div>
      )
    })}
  </div>
}

<div className="flex">
  array.map((v) =>
  (
    <div key={v.id}>
     v.title
    </div>
  ))
</div>

18. API가 작동을 하지 않을 때의 나만의 방법
  가. 먼저 api를 따로 테스트를 한다 swagger
  나. front에서 테스트를 할 때는 axios api로 보내는 경로를 확인한다 before data
  다. api로 보내는 매개변수들을 추적한다


19. useComments 코드 뜯어보자 



20. 좋아요 로그인상태마다 다르게 표현하기 중복
  <!-- 리팩토링된후 -->
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

<!-- 리팩토링 전 -->
                      {dataUser?.id ? (
                        <div className="flex gap-x-2 items-center">
                          {dataUser.id === comment.userId?.userId ? (
                            <div
                              onClick={() => onClickDeleteHeart(comment)}
                              className="cursor-pointer"
                            >
                              <BsBalloonHeart className="text-red-500" />
                            </div>
                          ) : (
                            <div
                              onClick={() => onClickHeart(comment)}
                              className="cursor-pointer"
                            >
                              <BsBalloonHeart />
                            </div>
                          )}
                          <span>{comment.commentLikeCount || 0}</span>
                        </div>
                      ) : (
                        <div className="flex gap-x-2 items-center">
                          <BsBalloonHeart />
                          <span>{comment.commentLikeCount || 0}</span>
                        </div>
                      )}






21. 중복
<!-- 코드 클린 후 -->
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
import { useCallback } from 'react';
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
  const token = localStorage?.getItem('authorization') as string;
  
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

  const onClickDeletePostButton = useCallback(async () => {
    await mutationIfDeletePost_deleteManyLike.mutateAsync({ token, param }); //like 전체 지우기
    await mutationComments.mutateAsync({ token, postId: param }); //comments 전체 지우기
    await deleteMutation.mutateAsync({ token, id: param }); // post 지우기
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
                  `삭제하시면 복구할수 없습니다.\n 정말로 삭제하시겠습니까??`
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

<!-- 코드 클린 전 -->

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
import { useCallback } from 'react';
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
  const token = localStorage?.getItem('authorization') as string;
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

  const onClickDeletePostButton = useCallback(async () => {
    await mutationIfDeletePost_deleteManyLike.mutateAsync({ token, param }); //like 전체 지우기
    await mutationComments.mutateAsync({ token, postId: param }); //comments 전체 지우기
    await deleteMutation.mutateAsync({ token, id: param }); // post 지우기
  }, [
    deleteMutation,
    mutationComments,
    mutationIfDeletePost_deleteManyLike,
    param,
    token,
  ]);

  return (
    <div className="max-w-[768px] text-center mx-auto">
      <div className="">
        <h2 className="blog-title">{title}</h2>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex my-4 gap-4 items-center">
          <div className="blog-date">{date.format('YYYY-MM-DD')}</div>
          {categories.map((v) => (
            <div className="blog-date">{v.name}</div>
          ))}
          <div>
            <GetTimeDiff timeToCompare={dayjs(createdAt)} />
          </div>
        </div>
        {dataUser?.id && dataUser?.role === 'ADMIN' ? ( // 로그인 사용자가 아니면 수정과 삭제가 보이지 않음 //로그인사용자가 Admin유저라면 게시글 글쓴이와 다르더라도 수정삭제가 보임
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
        ) : dataUser?.role === 'ADMIN' ? (
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
        ) : dataUser?.id === authorId ? ( // 로그인 사용자와 글쓴이가 다르면 보이지 않음
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
        ) : (
          <div className="blog-date">{name}</div>
        )}
      </div>
      <div>
        <img src={image} alt="사진" />
      </div>
    </div>
  );
}

export default TitleComponent;
