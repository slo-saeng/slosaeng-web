import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { postHelper } from '../api/signup';

export const useHelperMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const helperMutation = useMutation({
    mutationFn: postHelper,
    onSuccess: (data) => {
      if (data) {
        alert('회원가입을 축하해요!');
        navigate('/');
      } else alert('잘못된 정보가 있는지 확인해주세요.');
      queryClient.invalidateQueries({
        queryKey: ['helper'],
      });
    },
    onError: () => {
      alert('회원가입에 실패했어요.');
    },
  });
  return { helperMutate: helperMutation.mutate };
};
