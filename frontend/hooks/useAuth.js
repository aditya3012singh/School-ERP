import { useAppSelector } from "./useAppSelector";

export const useAuth = () => {
  const { user, token, loading } = useAppSelector((state) => state.auth);

  return {
    user,
    token,
    isAuthenticated: Boolean(token),
    role: user?.role || null,
    loading,
  };
};
