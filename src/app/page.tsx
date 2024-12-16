// app/page.tsx

import { Suspense } from 'react';
import HomeServer from './HomeServer';
import HomeClient from './HomeClient';

export default async function Page({ searchParams }: { searchParams: any }) {
  const categorySelect = searchParams.category || ''; // 카테고리 없으면 빈 문자열
  const page = Number(searchParams.page) || 1; // 기본 페이지 1
  const limit = Number(searchParams.limit) || 10; // 기본 limit 10

  // 서버에서 데이터 패칭
  const { dataNavCount, dataCategory, dataPagination } = await HomeServer({
    categorySelect,
    page,
    limit,
  });

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeClient
        dataNavCount={dataNavCount}
        dataCategory={dataCategory}
        dataPagination={dataPagination}
      />
    </Suspense>
  );
}
