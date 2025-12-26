import { useAuth } from "./useAuth";

export const useRole = () => {
  const { role } = useAuth();

  return {
    isAdmin: role === "ADMIN",
    isTeacher: role === "TEACHER",
    isStudent: role === "STUDENT",
    isParent: role === "PARENT",
  };
};
