"use client";

import { useEffect, useState } from "react";

import { getTeacherClassAttendanceSummary, getTeacherClasses } from "@/store/api/teacher.thunk";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
export default function AttendanceView() {
  const dispatch = useDispatch();
  const { classes = [], attendanceSummary, loading, error } = useSelector(
    (state) => state.teacher
  );

  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");

  useEffect(() => {
    dispatch(getTeacherClasses());
  }, [dispatch]);

  // Get unique classes and sections
  const safeClasses = Array.isArray(classes) ? classes : [];
  const uniqueClasses = [...new Set(safeClasses.map((c) => c.class))];
  const sectionsForClass = selectedClass
    ? [...new Set(safeClasses.filter((c) => c.class === selectedClass).map((c) => c.section))]
    : [];

  useEffect(() => {
    if (selectedClass && selectedSection) {
      dispatch(
        getTeacherClassAttendanceSummary({
          className: selectedClass,
          section: selectedSection,
        })
      );
    }
  }, [selectedClass, selectedSection, dispatch]);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-4">Attendance Management</h1>
        <Link
          href="/dashboard/teacher/attendance/mark"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          + Mark Attendance
        </Link>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2">Select Class</label>
          <select
            value={selectedClass}
            onChange={(e) => {
              setSelectedClass(e.target.value);
              setSelectedSection("");
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">Choose a class</option>
            {uniqueClasses.map((cls) => (
              <option key={cls} value={cls}>
                Class {cls}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Select Section
          </label>
          <select
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            disabled={!selectedClass}
          >
            <option value="">Choose a section</option>
            {sectionsForClass.map((section) => (
              <option key={section} value={section}>
                Section {section}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading && (
        <div className="text-center text-gray-500 py-8">
          Loading attendance summary...
        </div>
      )}

      {!loading && selectedClass && selectedSection && (
        <>
          {Array.isArray(attendanceSummary) && attendanceSummary.length > 0 ? (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">
                Attendance Summary - Class {selectedClass} Section {selectedSection}
              </h2>
              <Card className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100 border-b">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold">
                        Student Name
                      </th>
                      <th className="px-4 py-3 text-center font-semibold">
                        Total Classes
                      </th>
                      <th className="px-4 py-3 text-center font-semibold">
                        Present
                      </th>
                      <th className="px-4 py-3 text-center font-semibold">
                        Absent
                      </th>
                      <th className="px-4 py-3 text-center font-semibold">
                        Percentage
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceSummary.map((record, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-3">{record.studentName}</td>
                        <td className="px-4 py-3 text-center">{record.totalClasses}</td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded">
                            {record.present}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-block bg-red-100 text-red-800 px-2 py-1 rounded">
                            {record.absent}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center font-semibold">
                          {record.percentage}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              No attendance records found for this class
            </div>
          )}
        </>
      )}
    </div>
  );
}