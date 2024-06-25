import { useMutation, useQueryClient } from 'react-query';
import { deleteEmergency } from '../api/emergency';

export const useCancelEmergencyMutation = () => {
  const queryClient = useQueryClient();
  const cancelEmergencyMutation = useMutation({
    mutationFn: deleteEmergency,
    onSuccess: (data) => {
      if (data) {
        console.log('success');
        queryClient.invalidateQueries({
          queryKey: ['emergency'],
        });
      }
    },
    onError: () => {
      alert('실패했어요.');
    },
  });
  return { cancelEmergencyMutate: cancelEmergencyMutation.mutate };
};
