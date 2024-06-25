import { useMutation, useQueryClient } from 'react-query';
import { deleteCancelIntensiveCare } from '../api/intensiveCare';

export const useCancelIntensiveMutation = () => {
  const queryClient = useQueryClient();
  const cancelIntensiveMutation = useMutation({
    mutationFn: deleteCancelIntensiveCare,
    onSuccess: (data) => {
      if (data) {
        alert('삭제되었어요.');
        queryClient.invalidateQueries({
          queryKey: ['intensive-care'],
        });
      }
    },
    onError: () => {
      alert('주요대상 삭제에 실패했어요.');
    },
  });
  return { cancelIntensiveMutate: cancelIntensiveMutation.mutate };
};
