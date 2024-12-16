'use client';

import { logInAPI } from '@/app/apis/user';
import { loginUIAtom } from '@/app/resource/recoil';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';

type Inputs = {
  email: string;
  password: string;
};

function LoginPage() {
  const [token, setToken] = useState<string | undefined>(undefined);

  const [isToken, isSetToken] = useRecoilState(loginUIAtom);

  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const email = watch('email');
  const password = watch('password');

  const mutation = useMutation({
    mutationFn: logInAPI,
    onSuccess: (data: any) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      typeof window !== 'undefined'
        ? localStorage?.setItem('authorization', data.accessToken)
        : null;
      router.replace('/');
      queryClient.invalidateQueries({ queryKey: ['getUserIdAPI'] });
      isSetToken(true);
    },
    onError: (err: any) => {
      console.error(err);
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  const onSubmit: SubmitHandler<Inputs> = useCallback(() => {
    // mutation.mutate({email,password});
    mutation.mutate({ email, password });
  }, [email, mutation, password]);

  useEffect(() => {
    const storedToken = localStorage?.getItem('authorization');
    setToken(storedToken || undefined);
  }, []); // 빈 배열로 초기 마운트 시 한 번만 실행

  useEffect(() => {
    !!isToken ? isSetToken(!!token) : isSetToken(!!token);
  }, [isSetToken, isToken, token]);
  return (
    <div>
      <div className="text-center text-2xl">Login Page</div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-4 items-center"
      >
        <div>
          <input
            type="text"
            placeholder="id"
            className="border border-slate-400"
            {...register('email')}
          />
          {errors.email && (
            <span className="text-red-500">이메일을 입력하세요</span>
          )}
        </div>
        <div>
          <input
            type="password"
            placeholder="password"
            className="border border-slate-400"
            {...register('password')}
          />
          {errors.password && (
            <span className="text-red-500">비밀번호를 입력하세요</span>
          )}
        </div>
        <div>
          {loading ? (
            <input
              type="submit"
              value="login"
              className="border border-slate-400 p-2 w-36 loading"
            />
          ) : (
            <input
              type="submit"
              value="login"
              className="border border-slate-400 p-2 w-36"
            />
          )}
        </div>
      </form>
      <div>
        <Link href="/rladudgh/signup">회원가입</Link>
      </div>
    </div>
  );
}
export default LoginPage;
