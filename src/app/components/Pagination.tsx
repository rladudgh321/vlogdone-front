'use client';

import React from 'react';
import { clsx } from 'clsx';

interface PaginationProps {
  currentPage: number;
  pageAllCount: number;
  handlePageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  pageAllCount,
  handlePageChange,
}) => {
  // 페이지 번호 배열 생성
  const pageNumbers = [];
  for (let i = 1; i <= pageAllCount; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center items-center mt-8 gap-2">
      {/* 이전 버튼 */}
      <button
        className="px-4 py-2 bg-gray-200 rounded-md text-gray-600 hover:bg-gray-300 disabled:opacity-50"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt;
      </button>

      {/* 페이지 번호 */}
      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          className={clsx(
            'px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100',
            {
              'bg-blue-500 text-white': currentPage === pageNumber,
              'bg-white': currentPage !== pageNumber,
            },
          )}
          onClick={() => handlePageChange(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}

      {/* 다음 버튼 */}
      <button
        className="px-4 py-2 bg-gray-200 rounded-md text-gray-600 hover:bg-gray-300 disabled:opacity-50"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === pageAllCount}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
