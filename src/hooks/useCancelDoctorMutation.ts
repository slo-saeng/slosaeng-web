import { useMutation, useQueryClient } from 'react-query';
import { deleteCancelDoctor } from '../api/doctor';

export const useCancelDoctorMutation = () => {
  const queryClient = useQueryClient();
  const cancelDoctorMutation = useMutation({
    mutationFn: deleteCancelDoctor,
    onSuccess: (data) => {
      if (data) {
        alert('거절되었어요.');
        queryClient.invalidateQueries({
          queryKey: ['cancelDoctor'],
        });
      }
    },
    onError: () => {
      alert('의료진 거절에 실패했어요.');
    },
  });
  return { cancelDoctorMutate: cancelDoctorMutation.mutate };
};
