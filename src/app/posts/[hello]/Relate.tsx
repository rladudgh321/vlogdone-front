'use client';

import { pagenationFindAllAPI } from '@/app/apis/post';
import Pagination from '../../components/Pagination';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import Link from 'next/link';
import { memo, useCallback, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
dayjs.locale('ko');

function RelateComponent({ params }: { params: string }) {
  const queryClient = useQueryClient();
  const [listPage, setListPage] = useState<number>(1);
  const page = listPage || 1;
  const limit = 5;

  const {
    isPending: isPendingPagination,
    error: errorPagination,
    data: dataPagination,
  } = useQuery({
    queryKey: ['pagenationFindAllAPI'],
    // queryFn: () => pagenationFindAllAPI({ page, limit, categories }),
    queryFn: () => pagenationFindAllAPI({ page, limit }),
  });

  const totalAllItems = (dataPagination?.total || 0) as number;
  const itemsPerPage = Number(limit);

  const pageCategoryCount = Math.ceil(totalAllItems / itemsPerPage);

  const paginationMutation = useMutation({
    mutationFn: pagenationFindAllAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pagenationFindAllAPI'] });
    },
    onError: (err: any) => {
      console.error(err);
    },
  });

  const handleCategoryPageChange = useCallback(
    (selectedPage: number) => {
      setListPage(selectedPage); // 페이지 인덱스를 1부터 시작하도록 설정

      paginationMutation.mutate({
        page: selectedPage,
        limit,
      });
    },
    [paginationMutation],
  );

  const filterData = dataPagination?.items?.filter((v: any) => v.id !== params);

  if (isPendingPagination) return 'Loading...';
  if (errorPagination)
    return 'An error has occurred: ' + errorPagination.message;

  return (
    <div className="max-w-[768px] text-left mx-auto my-10 text-2xl">
      {totalAllItems > 1 ? (
        <div>관련 포스트가 {totalAllItems - 1}개가 더 있어요</div>
      ) : null}
      {filterData?.map((v: any) => {
        const date = dayjs(v.createdAt);
        return (
          <div key={v.id}>
            <div className="flex gap-x-4 items-center p-4 justify-between">
              <Link href={`/posts/${v.id}`}>
                <div>{v.title}</div>
              </Link>
              <div>{date.format('YYYY-MM-DD')}</div>
            </div>
            <hr />
          </div>
        );
      })}
      {totalAllItems >= 6 && (
        <Pagination
          currentPage={listPage}
          pageAllCount={pageCategoryCount}
          handlePageChange={handleCategoryPageChange}
        />
      )}
    </div>
  );
}

export default memo(RelateComponent);
