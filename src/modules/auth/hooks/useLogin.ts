import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signIn } from '../services/auth.service';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import type { LoginCredentials } from '../types/auth.types';

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ email, password }: LoginCredentials) =>
      signIn(email, password),
    onSuccess: () => {
      toast.success('Welcome back, Admin!');
      queryClient.clear(); // Clear cache to prevent stale data
      navigate('/dashboard-admin-xyz');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to login');
    },
  });
};
