import { useMutation, useQueryClient } from 'react-query';
import { deleteCancelMaster } from '../api/hospital';

export const useCancelMasterMutation = () => {
  const queryClient = useQueryClient();
  const cancelMasterMutation = useMutation({
    mutationFn: deleteCancelMaster,
    onSuccess: (data) => {
      if (data) {
        alert('삭제되었어요.');
        queryClient.invalidateQueries({
          queryKey: ['master'],
        });
      }
    },
    onError: () => {
      alert('병원 삭제에 실패했어요.');
    },
  });
  return { cancelMasterMutate: cancelMasterMutation.mutate };
};
