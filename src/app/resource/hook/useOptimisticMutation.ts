import {
  useMutation,
  UseMutationResult,
  MutationFunction,
} from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';

interface OptimisticMutationProps {
  queryKey: string[];
  mutationFn: MutationFunction<any, any>; // mutationFn의 타입을 MutationFunction으로 지정
  optimisticUpdate: (previousData: any, variables: any) => any; // 낙관적 업데이트 로직
  onSuccess?: () => void;
  onError?: (err: any) => void;
  onSettled?: () => void;
  setLoading?: (loading: boolean) => void;
}

export const useOptimisticMutation = ({
  queryKey,
  mutationFn,
  optimisticUpdate,
  onSuccess,
  onError,
  onSettled,
  setLoading,
}: OptimisticMutationProps): UseMutationResult<any, any, any, any> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn,
    onMutate: async (variables) => {
      if (setLoading) setLoading(true); // 로딩 시작

      // 이전 상태를 가져오기 위해 QueryClient 사용
      await queryClient.cancelQueries({ queryKey });

      const previousData = queryClient.getQueryData(queryKey);

      // 이전 데이터가 없으면 아무것도 하지 않음
      if (!previousData) return;

      // 낙관적 업데이트 로직 실행
      const updatedData = optimisticUpdate(previousData, variables);

      // QueryClient에 업데이트된 데이터를 낙관적으로 적용
      queryClient.setQueryData(queryKey, updatedData);

      return { previousData };
    },
    onError: (err, variables, context) => {
      console.error('Error:', err);

      // 에러 발생 시, 이전 데이터를 롤백
      if (context?.previousData) {
        queryClient.setQueryData(queryKey, context.previousData);
      }

      if (onError) onError(err);
    },
    onSettled: () => {
      // API 요청이 끝나면 데이터를 재조회하여 최신 상태로 갱신
      queryClient.invalidateQueries({ queryKey });
      if (setLoading) setLoading(false); // 로딩 종료
      if (onSettled) onSettled();
      if (onSuccess) onSuccess();
    },
  });
};
