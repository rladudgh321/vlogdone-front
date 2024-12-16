'use client';

import Link from 'next/link';
import { useCallback, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { signupAPI } from '@/app/apis/user';
import { useRouter } from 'next/navigation';

type Inputs = {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  gender: string;
};

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const onSubmit: SubmitHandler<Inputs> = useCallback(() => {
    if (watch('password') === watch('passwordConfirm')) {
      setLoading(true);
      signupAPI({
        email: watch('email'),
        password: watch('password'),
        passwordConfirm: watch('passwordConfirm'),
        name: watch('name'),
        gender: watch('gender'),
      })
        .then(() => {
          router.replace('/rladudgh/login');
        })
        .catch((error) => {
          alert(error.response.data);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [router, watch]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
      <div className="flex justify-between border-b border-slate-400">
        <div>SIGNUP Page</div>
        <Link href="/">To HOME</Link>
      </div>
      <div>
        <input
          type="email"
          placeholder="email"
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
        <input
          type="password"
          placeholder="passwordConfirm"
          className="border border-slate-400"
          {...register('passwordConfirm')}
        />
        {errors.passwordConfirm && (
          <span className="text-red-500">비밀번호확인을 입력하세요</span>
        )}
      </div>
      <div>
        <input
          type="text"
          placeholder="name"
          className="border border-slate-400"
          {...register('name')}
        />
        {errors.name && <span className="text-red-500">이름을 입력하세요</span>}
      </div>

      <div>
        {loading ? (
          <input
            type="submit"
            value="SignUp"
            className="border border-slate-400 p-2 w-36 loading"
          />
        ) : (
          <input
            type="submit"
            value="SignUp"
            className="border border-slate-400 p-2 w-36"
          />
        )}
      </div>

      <div>
        <Link href="/login">Back to LoginPage</Link>
      </div>
    </form>
  );
}
