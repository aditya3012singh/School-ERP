"use client";
import { getTeacherPTMs } from "@/store/api/teacher.thunk";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function (){
    const dispatch = useDispatch();
    const { ptms, loading, error } = useSelector((state) => state.teacher);
    useEffect(() => {
        // Dispatch an action to fetch the teacher PTMs
        dispatch(getTeacherPTMs());
    }, [dispatch]);
    return <div>Teacher PTM</div>
}