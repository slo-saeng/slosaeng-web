import { useMutation, useQueryClient } from 'react-query';
import { postApproveDoctor } from '../api/doctor';

export const useApproveDoctorMutation = () => {
  const queryClient = useQueryClient();
  const approveDoctorMutation = useMutation({
    mutationFn: postApproveDoctor,
    onSuccess: (data) => {
      if (data) {
        alert('승인되었어요!');
        queryClient.invalidateQueries({
          queryKey: ['approveDoctor'],
        });
      }
    },
    onError: () => {
      alert('의료진 승인에 실패했어요.');
    },
  });
  return { approveDoctorMutate: approveDoctorMutation.mutate };
};
