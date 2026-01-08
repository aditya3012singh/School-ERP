"use client";

import { useEffect } from "react";
import { User, Calendar, Users, Clock, BookOpen, Phone, Mail } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchParentProfile } from "@/store/api/parent.thunk";

export default function ParentDashboard() {
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector((state) => state.parent);

  useEffect(() => {
    dispatch(fetchParentProfile());
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

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center w-full">
        No profile data available
      </div>
    );
  }

  const { name, contact, relation, student } = profile;

  return (
    <div className="p-6 space-y-6 w-full">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold">Welcome, {name}</h1>
        <p className="text-indigo-100 mt-1">Parent Dashboard</p>
      </div>

      {/* PARENT INFO */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="flex items-center gap-2 text-xl font-semibold mb-4 text-gray-800">
          <User className="text-indigo-600" /> Parent Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="font-medium">{name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Relation</p>
            <p className="font-medium capitalize">{relation}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Contact</p>
            <p className="font-medium flex items-center gap-2">
              <Phone size={16} className="text-indigo-600" />
              {contact}
            </p>
          </div>
        </div>
      </div>

      {/* CHILD INFO */}
      {student ? (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="flex items-center gap-2 text-xl font-semibold mb-4 text-gray-800">
            <BookOpen className="text-indigo-600" /> Child Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-500">Student Name</p>
              <p className="font-medium">{student.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Class & Section</p>
              <p className="font-medium">
                Class {student.class}-{student.section}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Roll Number</p>
              <p className="font-medium">{student.rollNo}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
          <p className="text-yellow-800">No student linked to your account</p>
        </div>
      )}

      {/* QUICK LINKS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="text-indigo-600" size={24} />
            <h3 className="font-semibold text-gray-800">Attendance</h3>
          </div>
          <p className="text-sm text-gray-600">
            View your child&apos;s attendance records
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="text-indigo-600" size={24} />
            <h3 className="font-semibold text-gray-800">Timetable</h3>
          </div>
          <p className="text-sm text-gray-600">
            Check your child&apos;s class schedule
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer">
          <div className="flex items-center gap-3 mb-2">
            <Users className="text-indigo-600" size={24} />
            <h3 className="font-semibold text-gray-800">PTM</h3>
          </div>
          <p className="text-sm text-gray-600">
            View parent-teacher meeting schedules
          </p>
        </div>
      </div>
    </div>
  );
}