"use client";

import { fetchMe } from "@/store/api/auth.thunk";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function AppInit({ children }) {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(fetchMe());
    }
  }, [dispatch, isAuthenticated]);

  return children;
}
