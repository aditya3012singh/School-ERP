"use client";

import { useEffect } from "react";
import { User, Calendar, Users, Clock, BookOpen } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getStudentDashboard } from "@/store/api/student.thunk";


export default function StudentDashboard() {
  const dispatch = useDispatch();
  const { dashboard, loading, error } = useSelector(
    (state) => state.student
  );

  useEffect(() => {
    
      dispatch(getStudentDashboard());
    
  }, [ dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  if (!dashboard?.student) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        No dashboard data available
      </div>
    );
  }

  const { student, parents, ptms, timetable } = dashboard;

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div className="bg-blue-600 text-white p-6 rounded-lg">
        <h1 className="text-2xl font-bold">
          Welcome, {student.name}
        </h1>
        <p>
          Class {student.class}-{student.section} | Roll No:{" "}
          {student.rollNo}
        </p>
      </div>

      {/* STUDENT INFO */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <User /> Student Info
        </h2>
        <p>Name: {student.name}</p>
        <p>DOB: {new Date(student.dob).toDateString()}</p>
      </div>

      {/* PARENTS */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <Users /> Parents
        </h2>

        {parents.length === 0 ? (
          <p className="text-gray-500">No parent info available</p>
        ) : (
          parents.map((p) => (
            <p key={p.id}>
              {p.name} ({p.relation})
            </p>
          ))
        )}
      </div>

      {/* PTMs */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <Calendar /> PTMs
        </h2>

        {ptms.length === 0 ? (
          <p className="text-gray-500">No PTMs scheduled</p>
        ) : (
          ptms.map((ptm) => (
            <p key={ptm.id}>
              {ptm.teacher?.name} – {ptm.teacher?.subject}
            </p>
          ))
        )}
      </div>

      {/* TIMETABLE */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <Clock /> Timetable
        </h2>

        {timetable.length === 0 ? (
          <p className="text-gray-500">No timetable available</p>
        ) : (
          timetable.map((slot) => (
            <div key={slot.id} className="border-b py-2">
              <p>
                {slot.day} | {slot.startTime} - {slot.endTime}
              </p>
              <p className="text-sm text-gray-600">
                {slot.subject?.name} — {slot.teacher?.name}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
