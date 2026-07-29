import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signOut } from '../services/auth.service';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      queryClient.clear();
      navigate('/');
      toast.success('Logged out successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to logout');
    },
  });
};
