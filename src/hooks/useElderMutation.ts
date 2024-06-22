import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { postElder } from '../api/elder';

export const useElderMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const elderMutation = useMutation({
    mutationFn: postElder,
    onSuccess: (data) => {
      if (data) {
        alert('고령자가 등록되었습니다.');
        navigate('/');
      } else alert('잘못된 정보가 있는지 확인해주세요.');
      queryClient.invalidateQueries({
        queryKey: ['elder'],
      });
    },
    onError: () => {
      alert('고령자 등록에 실패했어요.');
    },
  });
  return { elderMutate: elderMutation.mutate };
};
