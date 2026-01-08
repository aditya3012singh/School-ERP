"use client";

import { useEffect } from "react";
import { User, Calendar, Users, Clock, BookOpen, GraduationCap } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getStudentDashboard } from "@/store/api/student.thunk";

export default function StudentDashboard() {
  const dispatch = useDispatch();
  const { dashboard, loading, error } = useSelector(
    (state) => state.student
  );

  useEffect(() => {
    dispatch(getStudentDashboard());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center w-full">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 w-full">
        {error}
      </div>
    );
  }

  if (!dashboard?.student) {
    return (
      <div className="min-h-screen flex items-center justify-center w-full">
        No dashboard data available
      </div>
    );
  }

  const { student, parents, ptms, timetable } = dashboard;

  return (
    <div className="p-6 space-y-6 w-full">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <GraduationCap size={32} />
          Welcome, {student.name}
        </h1>
        <p className="text-blue-100 mt-1">
          Class {student.class}-{student.section} | Roll No: {student.rollNo}
        </p>
      </div>

      {/* STUDENT INFO */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="flex items-center gap-2 text-xl font-semibold mb-4 text-gray-800">
          <User className="text-blue-600" /> Student Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Full Name</p>
            <p className="font-medium">{student.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Date of Birth</p>
            <p className="font-medium">{new Date(student.dob).toLocaleDateString()}</p>
          </div>
          {student.address && (
            <div className="md:col-span-2">
              <p className="text-sm text-gray-500">Address</p>
              <p className="font-medium">{student.address}</p>
            </div>
          )}
        </div>
      </div>

      {/* PARENTS */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="flex items-center gap-2 text-xl font-semibold mb-4 text-gray-800">
          <Users className="text-blue-600" /> Parents / Guardians
        </h2>
        {parents.length === 0 ? (
          <p className="text-gray-500">No parent information available</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {parents.map((p) => (
              <div key={p.id} className="border rounded-lg p-4">
                <p className="font-semibold text-gray-900">{p.name}</p>
                <p className="text-sm text-gray-600 capitalize">Relation: {p.relation}</p>
                <p className="text-sm text-gray-600">Contact: {p.contact}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* PTMs & TIMETABLE OVERVIEW */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* PTMs */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="flex items-center gap-2 text-lg font-semibold mb-4 text-gray-800">
            <Calendar className="text-blue-600" /> Recent PTMs
          </h2>
          {ptms.length === 0 ? (
            <p className="text-gray-500 text-sm">No PTMs scheduled</p>
          ) : (
            <div className="space-y-3">
              {ptms.slice(0, 3).map((ptm) => (
                <div key={ptm.id} className="border-l-4 border-blue-500 pl-3 py-2">
                  <p className="font-medium text-gray-900">{ptm.teacher?.name}</p>
                  <p className="text-sm text-gray-600">{ptm.teacher?.subject}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(ptm.date).toLocaleDateString()}
                  </p>
                </div>
              ))}
              {ptms.length > 3 && (
                <p className="text-sm text-blue-600 font-medium">
                  +{ptms.length - 3} more
                </p>
              )}
            </div>
          )}
        </div>

        {/* TIMETABLE */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="flex items-center gap-2 text-lg font-semibold mb-4 text-gray-800">
            <Clock className="text-blue-600" /> Today&apos;s Classes
          </h2>
          {timetable.length === 0 ? (
            <p className="text-gray-500 text-sm">No classes scheduled</p>
          ) : (
            <div className="space-y-3">
              {timetable.slice(0, 3).map((slot) => (
                <div key={slot.id} className="border-l-4 border-cyan-500 pl-3 py-2">
                  <p className="font-medium text-gray-900">{slot.subject?.name}</p>
                  <p className="text-sm text-gray-600">{slot.teacher?.name}</p>
                  <p className="text-xs text-gray-500">
                    {slot.startTime} - {slot.endTime}
                  </p>
                </div>
              ))}
              {timetable.length > 3 && (
                <p className="text-sm text-cyan-600 font-medium">
                  +{timetable.length - 3} more classes
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* QUICK LINKS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="text-blue-600" size={24} />
            <h3 className="font-semibold text-gray-800">Attendance</h3>
          </div>
          <p className="text-sm text-gray-600">View your attendance records</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="text-blue-600" size={24} />
            <h3 className="font-semibold text-gray-800">Timetable</h3>
          </div>
          <p className="text-sm text-gray-600">Check your weekly schedule</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer">
          <div className="flex items-center gap-3 mb-2">
            <Users className="text-blue-600" size={24} />
            <h3 className="font-semibold text-gray-800">PTM</h3>
          </div>
          <p className="text-sm text-gray-600">Parent-teacher meetings</p>
        </div>
      </div>
    </div>
  );
}
