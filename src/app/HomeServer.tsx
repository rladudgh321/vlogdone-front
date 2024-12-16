// app/HomeServer.tsx
import { getCategoriesAPI } from './apis/category';
import { navCountAPI, pagenationFindAllAPI } from './apis/post';

export default async function HomeServer({
  categorySelect,
  page,
  limit,
}: {
  categorySelect: string;
  page: number;
  limit: number;
}) {
  // 서버 사이드에서 데이터 패칭
  const dataNavCount = await navCountAPI();
  // const { data: dataNavCount } = await navCountAPI();
  const dataCategory = await getCategoriesAPI();
  const dataPagination = await pagenationFindAllAPI({
    page,
    limit,
    category: categorySelect,
  });

  // 데이터를 클라이언트 컴포넌트로 전달
  return {
    dataNavCount,
    dataCategory,
    dataPagination,
  };
}
