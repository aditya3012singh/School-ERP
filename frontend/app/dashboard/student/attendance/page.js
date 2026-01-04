"use client";
import { fetchStudentPtms, getStudentAttendance } from "@/store/api/student.thunk";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"

export default function(){
    const dispatch = useDispatch();
    const {attendance, loading, error} = useSelector((state) => state.student);
    useEffect(() => {
        dispatch(getStudentAttendance());
    }, [dispatch]);

    return <div>{attendance.message} number of attendance records is {attendance.length}</div>
}