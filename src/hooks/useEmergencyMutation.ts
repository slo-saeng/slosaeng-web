import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { postEmergency } from '../api/emergency';

export const useEmergencyMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const emergencyMutation = useMutation({
    mutationFn: postEmergency,
    onSuccess: (data) => {
      if (!data) {
        alert('요청에 실패했어요. 잘못된 정보가 없는지 확인해주세요.');
        navigate('/');
      } else
        queryClient.invalidateQueries({
          queryKey: ['emergency'],
        });
    },
    onError: () => {
      alert('요청에 실패했어요.');
    },
  });
  return {
    emergencyMutate: emergencyMutation.mutate,
    isError: emergencyMutation.isError,
    isSuccess: emergencyMutation.isSuccess,
  };
};
