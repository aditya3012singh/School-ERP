"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchParentProfile } from "@/store/api/parent.thunk";
import { User, AlertCircle, BookOpen, Hash, Calendar } from "lucide-react";

export default function ParentChildren() {
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector((state) => state.parent);

  useEffect(() => {
    dispatch(fetchParentProfile());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center w-full">
        <p>Loading child information...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 w-full">
        <div className="flex items-center gap-2">
          <AlertCircle />
          {error}
        </div>
      </div>
    );
  }

  const student = profile?.student;

  return (
    <div className="p-6 space-y-6 w-full">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <User />
          Child Information
        </h1>
        <p className="text-indigo-100 mt-1">View your child&apos;s details</p>
      </div>

      {/* CHILD DETAILS */}
      {student ? (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-indigo-50 px-6 py-4 border-b border-indigo-100">
            <h2 className="text-xl font-semibold text-indigo-900">Student Profile</h2>
          </div>
          
          <div className="p-6 space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <div className="bg-indigo-100 p-3 rounded-lg">
                  <User className="text-indigo-600" size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Student Name</p>
                  <p className="font-semibold text-gray-900">{student.name}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-indigo-100 p-3 rounded-lg">
                  <BookOpen className="text-indigo-600" size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Class & Section</p>
                  <p className="font-semibold text-gray-900">
                    Class {student.class}-{student.section}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-indigo-100 p-3 rounded-lg">
                  <Hash className="text-indigo-600" size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Roll Number</p>
                  <p className="font-semibold text-gray-900">{student.rollNo}</p>
                </div>
              </div>

              {student.id && (
                <div className="flex items-start gap-3">
                  <div className="bg-indigo-100 p-3 rounded-lg">
                    <Hash className="text-indigo-600" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Student ID</p>
                    <p className="font-semibold text-gray-900">{student.id}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <button className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition font-medium text-sm">
                  View Attendance
                </button>
                <button className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition font-medium text-sm">
                  View Timetable
                </button>
                <button className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition font-medium text-sm">
                  View PTMs
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-yellow-50 p-8 rounded-lg border border-yellow-200 text-center">
          <AlertCircle className="mx-auto text-yellow-600 mb-3" size={48} />
          <h3 className="text-lg font-semibold text-yellow-900 mb-2">
            No Student Linked
          </h3>
          <p className="text-yellow-800">
            No student is currently linked to your parent account. Please contact the school administration.
          </p>
        </div>
      )}
    </div>
  );
}