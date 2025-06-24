import { useEffect } from 'react';
import { useAuthStore } from '../store';

export function useAuth() {
  const { user, loading, error, initialize } = useAuthStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  return { user, loading, error };
}