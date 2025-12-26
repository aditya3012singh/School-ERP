import { useAppSelector } from "@/hooks/useAppSelector";

const user = useAppSelector((state) => state.auth.user);
