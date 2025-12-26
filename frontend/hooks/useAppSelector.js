import { useSelector } from "react-redux";


export const user = useSelector((state) => state.auth.user);
