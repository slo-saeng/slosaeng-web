import { useMutation, useQueryClient } from 'react-query';
import { deleteCancelElder } from '../api/elder';

export const useCancelElderMutation = () => {
  const queryClient = useQueryClient();
  const cancelElderMutation = useMutation({
    mutationFn: deleteCancelElder,
    onSuccess: (data) => {
      if (data) {
        alert('삭제되었어요.');
        queryClient.invalidateQueries({
          queryKey: ['elder'],
        });
      }
    },
    onError: () => {
      alert('고령자 삭제에 실패했어요.');
    },
  });
  return { cancelElderMutate: cancelElderMutation.mutate };
};
