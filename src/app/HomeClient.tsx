'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useRecoilValue } from 'recoil';
import { categoryAtom } from './resource/recoil';
import Pagination from './components/Pagination'; // Pagination 컴포넌트 import
import Highlight from './components/Highlight';
import PostsComponent from './components/posts';
import Nav from './common/Nav';
import { postItemsProps } from './interafce';

export default function HomeClient({
  dataNavCount,
  dataCategory,
  dataPagination,
}: any) {
  const nextRouter = useRouter();
  const router = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const categorySelect = useRecoilValue(categoryAtom);

  const limit = Number(router.get('limit')) || 10; // 기본 limit 10
  const itemsPerPage = limit;
  const currentItems = dataPagination?.items || [];
  const totalAllItems = dataPagination?.total || 0;
  const pageAllCount = Math.ceil(totalAllItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    nextRouter.push(`/?category=${categorySelect}&page=${page}&limit=${limit}`);
  };

  const pageNumbers = [];
  for (let i = 1; i <= pageAllCount; i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    setCurrentPage(1); // 카테고리 변경 시 페이지 1로 리셋
  }, [categorySelect]);

  // 카테고리가 없는 전체 페이지 처리
  if (categorySelect === '') {
    return (
      <div>
        <Nav dataNavCount={dataNavCount} dataCategory={dataCategory} />
        <Highlight posts={currentItems} category={dataCategory} />
        <br />
        <div className="grid mx-auto md:grid-cols-[500px,500px] justify-center">
          {currentItems.map((v: postItemsProps) => (
            <div key={v.id}>
              <PostsComponent posts={v} />
            </div>
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          pageAllCount={pageAllCount}
          handlePageChange={handlePageChange}
        />
      </div>
    );
  }

  // 카테고리 선택에 맞는 게시글 필터링
  const categoryFilteredItems = currentItems.filter((v: postItemsProps) =>
    v.categories.some((category) => category.id === categorySelect),
  );

  return (
    <div>
      <Nav dataNavCount={dataNavCount} dataCategory={dataCategory} />
      <Highlight posts={categoryFilteredItems} category={dataCategory} />
      <br />
      <div className="grid mx-auto md:grid-cols-[500px,500px] justify-center">
        {categoryFilteredItems.map((v: postItemsProps) => (
          <div key={v.id}>
            <PostsComponent posts={v} />
          </div>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        pageAllCount={pageAllCount}
        handlePageChange={handlePageChange}
      />
    </div>
  );
}
