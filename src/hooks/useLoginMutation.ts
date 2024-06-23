import { useMutation, useQueryClient } from 'react-query';
import { postLogin } from '../api/login';

export const useLoginMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: postLogin,
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({
          queryKey: ['login'],
        });
        window.location.href = '/';
      } else alert('아이디나 비밀번호를 확인해주세요.');
    },
    onError: () => {
      alert('로그인에 실패했습니다.');
    },
  });
  return { loginMutate: mutation.mutate };
};
