"use client";

import { getStudentTimetable } from "@/store/api/student.thunk";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
export default function StudentTimetable() {
  const dispatch = useDispatch();
  const { timetable, loading, error } = useSelector(
    (state) => state.student
  );

  useEffect(() => {
    dispatch(getStudentTimetable());
  }, [dispatch]);

  if (loading) {
    return <div>Loading timetable...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!timetable || timetable.length === 0) {
    return <p>No timetable available.</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Student Timetable</h2>

      <ul className="space-y-2">
        
      </ul>
    </div>
  );
}
