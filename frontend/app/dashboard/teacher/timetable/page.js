"use client";
import { getTeacherTimetable } from "@/store/api/teacher.thunk";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function(){
    const dispatch = useDispatch();
    const { timetable, loading, error } = useSelector((state) => state.teacher);
    useEffect(() => {
        // Dispatch an action to fetch the teacher timetable
        dispatch(getTeacherTimetable());
    }, [dispatch]);
    return <div>Teacher Timetable</div>;
}