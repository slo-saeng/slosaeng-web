import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { postIntensiveCare } from '../api/intensiveCare';

export const useIntensiveCareMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const intensiveCareMutation = useMutation({
    mutationFn: postIntensiveCare,
    onSuccess: (data) => {
      if (data) {
        alert('주요대상으로 등록되었습니다.');
        navigate('/');
      } else alert('잘못된 정보가 있는지 확인해주세요.');
      queryClient.invalidateQueries({
        queryKey: [`intensiveCare`],
      });
    },
    onError: () => {
      alert('주요대상 등록에 실패했어요');
    },
  });
  return { intensiveCareMutate: intensiveCareMutation.mutate };
};
