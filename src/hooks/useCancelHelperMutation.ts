import { useMutation, useQueryClient } from 'react-query';
import { deleteCancelHelper } from '../api/helper';

export const useCancelHelperMutation = () => {
  const queryClient = useQueryClient();
  const cancelHelperMutation = useMutation({
    mutationFn: deleteCancelHelper,
    onSuccess: (data) => {
      if (data) {
        alert('삭제되었어요.');
        queryClient.invalidateQueries({
          queryKey: ['helper'],
        });
      }
    },
    onError: () => {
      alert('보호자 삭제에 실패했어요.');
    },
  });
  return { cancelHelperMutate: cancelHelperMutation.mutate };
};
