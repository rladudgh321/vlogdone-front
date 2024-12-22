'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { memo, useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { getCategoryAPI } from '../apis/category';
import { categoryAtom } from '../resource/recoil';

function Nav({
  dataNavCount,
  dataCategory,
}: {
  dataNavCount: {
    categoryCount: { id: string; name: string; _count: { posts: number } }[];
    total: number;
  };
  dataCategory: { id: string; name: string }[];
}) {
  const queryClient = useQueryClient();
  const [categorySelect, setCategorySelect] = useRecoilState(categoryAtom);
  const [title, setTitle] = useState<string>('전체 보기');
  const pathname = usePathname(); // 경로 가져오기
  const searchParams = useSearchParams(); // 쿼리스트링 파라미터를 가져오기

  const mutation = useMutation({
    mutationFn: getCategoryAPI,
    onSuccess: async (data: any) => {
      setTitle(data);
      queryClient.invalidateQueries({
        queryKey: ['pagenationFindAllAPI'],
      });
    },
    onError: (err: any) => {
      console.error(err);
    },
  });

  // 카테고리 클릭 시 처리하는 함수
  const onClickLink = useCallback(
    async (categoryId: string) => {
      if (!categoryId) {
        setTitle('전체 보기');
        return;
      }
      try {
        await mutation.mutateAsync(categoryId);
      } catch (error) {
        console.error('Error during mutation:', error);
      }
    },
    [mutation],
  );

  // 쿼리 파라미터에서 category 값이 변경되면 페이지를 1로 리셋
  useEffect(() => {
    const currentCategory = searchParams.get('category');

    // 카테고리가 바뀌면 페이지를 1로 리셋
    if (currentCategory !== categorySelect) {
      setCategorySelect(currentCategory || '');
    }
  }, [searchParams, categorySelect, setCategorySelect]);

  // 카테고리별 게시물 개수 가져오기
  const dataNavFunc = useCallback(
    (v: { id: string; name: string }) => {
      const category = dataNavCount.categoryCount.find((w) => {
        return w.id === v.id ? w._count.posts : 0;
      });
      return category?.id === v.id ? category._count.posts : 0;
    },
    [dataNavCount],
  );

  // 쿼리스트링 업데이트 함수
  const updateQueryParams = (category: string, page: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('category', category);
    params.set('page', page);
    window.history.replaceState(null, '', `${pathname}?${params.toString()}`);
  };

  return (
    <nav className="mt-10">
      {/* 제목 표시 */}
      <h2 className="blog-title text-2xl font-semibold text-center mb-4">
        {categorySelect ? title : '전체 보기'}
      </h2>

      {/* 카테고리 목록 */}
      <div className="flex flex-wrap justify-center mx-auto gap-6 mb-8">
        <Link href="/" passHref>
          <div
            className="inline-block p-3 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300 transition"
            onClick={() => {
              setCategorySelect('');
              updateQueryParams('', '1'); // 전체보기에서 category는 비워두고, 페이지는 1로 설정
              setTitle('전체 보기');
            }}
          >
            전체 보기 ({dataNavCount ? dataNavCount.total : 0})
          </div>
        </Link>

        {/* 카테고리 항목 */}
        {dataCategory.map((category) => {
          return (
            <Link
              href={`/?category=${category.id}`}
              key={category.id}
              passHref
              legacyBehavior
            >
              <div
                className="inline-block p-3 bg-blue-100 rounded-full cursor-pointer hover:bg-blue-200 transition"
                onClick={() => {
                  setCategorySelect(category.id);
                  onClickLink(category.id);
                  updateQueryParams(category.id, '1'); // 카테고리와 페이지를 업데이트
                }}
              >
                {category.name} ({dataNavFunc(category)})
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export default memo(Nav);
