'use client';

// Import Swiper React components
// import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import dayjs from 'dayjs';
import Link from 'next/link';
import { memo, useState } from 'react';
// import { Pagination } from 'swiper/modules';
import { ArrowIcon } from './post';
import dynamic from 'next/dynamic';
import { dataCategoryProps, postItemsProps } from '../interafce';

const Swiper = dynamic(() => import('swiper/react').then((mod) => mod.Swiper), {
  loading: () => <p>Loading...</p>,
});

const SwiperSlide = dynamic(
  () => import('swiper/react').then((mod) => mod.SwiperSlide),
  {
    loading: () => <p>Loading...</p>,
  },
);

Swiper.displayName = 'Swiper';
SwiperSlide.displayName = 'SwiperSlide';

const Pagination: any = dynamic(
  () => import('swiper/modules').then((mod) => mod.Pagination) as any,
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  },
);

function HilightComponent({
  posts,
  category,
}: {
  posts: any;
  category: { id: string; name: string }[];
}) {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const highlightedPosts = posts
    .filter((post: any) => post.highlight) // Filter out posts that are highlighted
    .sort(
      (a: any, b: any) =>
        Number(new Date(b.createdAt)) - Number(new Date(a.createdAt)),
    );

  if (!highlightedPosts.length) {
    return null;
  }

  const mostRecentHighlightedPost: postItemsProps =
    highlightedPosts[currentPage];
  const date = dayjs(mostRecentHighlightedPost?.createdAt);

  return (
    <div className="">
      <div className="flex items-center justify-between px-4">
        <h1 className="text-4xl font-semibold ml-5 mb-5">HIGH LIGHT</h1>

        {/* 카테고리 출력 */}
        <div className="flex flex-row-reverse gap-x-5 my-4">
          {category.map((v: dataCategoryProps) => {
            // 가장 최근에 하이라이트된 게시글의 카테고리와 비교하여 일치하는 카테고리 이름 반환
            const matchingCategory = mostRecentHighlightedPost.categories.find(
              (w: dataCategoryProps) => w.id === v.id,
            );

            if (matchingCategory) {
              return (
                <div key={v.id} className="blog-date">
                  {v.name} {/* 일치하는 카테고리의 이름 반환 */}
                </div>
              );
            }
            return null; // 일치하지 않으면 아무 것도 반환하지 않음
          })}
          <div className="blog-date">{date.format('YYYY.MM.DD.')}</div>
        </div>
      </div>
      <Swiper
        pagination={true}
        modules={[Pagination]}
        className="mySwiper animate-pulse"
        onSlideChange={(v: any) => setCurrentPage(v.activeIndex)}
      >
        {posts.map((v: postItemsProps) => {
          if (v.highlight) {
            return (
              <SwiperSlide key={v.id}>
                <Link href={`/posts/${v.id}`}>
                  <div
                    className="relative bg-center bg-cover rounded-3xl"
                    style={{ backgroundImage: `url('${v.image}')` }}
                  >
                    <div className="hover-info hover:bg-slate-900/60 text-white w-full h-[475px] rounded-3xl">
                      <div className="absolute right-0 p-5 opacity-0">
                        <ArrowIcon />
                      </div>
                      <div className="absolute bottom-0 p-5 opacity-0">
                        {v.title}
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            );
          } else {
            return null;
          }
        })}
      </Swiper>
    </div>
  );
}

export default memo(HilightComponent);
