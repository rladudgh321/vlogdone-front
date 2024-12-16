'use client';

import Link from 'next/link';
import { GoPerson } from 'react-icons/go';
import { getUserIdAPI } from '../apis/user';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { loginUIAtom } from '../resource/recoil';

function Header() {
  // 로그인 상태와 token을 관리하는 Recoil 상태
  const [isToken, setIsToken] = useRecoilState(loginUIAtom);
  const [token, setToken] = useState<string | null>(null);

  // 클라이언트에서 토큰을 가져오는 effect
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('authorization');
      setToken(storedToken); // token 상태를 업데이트
      setIsToken(!!storedToken); // 로그인 상태 업데이트
    }
  }, [setIsToken]);

  // 사용자 데이터 조회
  const {
    error: isErrorUser,
    isLoading,
    data: dataUser,
  } = useQuery({
    queryKey: ['getUserIdAPI', token],
    queryFn: () => (token ? getUserIdAPI({ token }) : null),
    enabled: !!token, // token이 있을 때만 실행
  });

  // 로딩 중일 때
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // 사용자 데이터 로딩 실패 시
  if (isErrorUser) {
    return <div>An error has occurred: {isErrorUser.message}</div>;
  }

  return (
    <header className="flex justify-between h-[70px] items-center">
      <div className="flex items-center p-4">
        <Link href="/">Blog</Link>
      </div>
      <div>
        <img
          src="http://m.xn--vk1bn00an1hivg.kr/img_up/shop_pds/ehompy0402/design/2021/logo.png"
          alt="팔천순대"
        />
      </div>
      <div className="flex items-center p-4 gap-x-4">
        {dataUser?.role === 'ADMIN' && (
          <Link href="/rladudgh/option">고급옵션</Link>
        )}
        {isToken && <Link href="/rladudgh/addpost">글쓰기</Link>}
        <Link href="/about">About</Link>
        {isToken ? (
          <>
            <Link
              href="/"
              onClick={() => {
                if (typeof window !== 'undefined') {
                  localStorage.clear(); // 로그아웃 시 localStorage 클리어
                  setIsToken(false); // 로그인 상태 업데이트
                }
              }}
            >
              로그아웃
            </Link>
            {dataUser && (
              <Link href="/rladudgh/login">
                <GoPerson className="text-xl" />
              </Link>
            )}
          </>
        ) : (
          <Link href="/rladudgh/login">
            <GoPerson className="text-xl" />
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
