"use client";
import { fetchStudentPtms } from "@/store/api/student.thunk";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"

export default function(){
    const dipatch = useDispatch();
    const {ptms, loading, error} = useSelector((state) => state.student);
    useEffect(() => {
        dipatch(fetchStudentPtms());
    }, [dipatch]);

    return <div>{ptms.message} number of ptms is {ptms.length}</div>
}