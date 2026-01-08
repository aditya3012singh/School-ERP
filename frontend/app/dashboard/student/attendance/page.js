"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStudentAttendance } from "@/store/api/student.thunk";
import { CalendarCheck, AlertCircle } from "lucide-react";

export default function StudentAttendance() {
  const dispatch = useDispatch();
  const { attendance, loading, error } = useSelector((state) => state.student);

  useEffect(() => {
    dispatch(getStudentAttendance());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center w-full">
        <p>Loading attendance...</p>
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

  if (!attendance || attendance.length === 0) {
    return (
      <div className="p-6 w-full">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <CalendarCheck className="text-blue-600" />
          My Attendance
        </h2>
        <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
          <p className="text-yellow-800">No attendance records available</p>
        </div>
      </div>
    );
  }

  // Calculate attendance statistics
  const totalRecords = attendance.length;
  const presentCount = attendance.filter((a) => a.status === "PRESENT").length;
  const absentCount = attendance.filter((a) => a.status === "ABSENT").length;
  const attendancePercentage = ((presentCount / totalRecords) * 100).toFixed(1);

  return (
    <div className="p-6 space-y-6 w-full">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <CalendarCheck />
          My Attendance
        </h1>
        <p className="text-blue-100 mt-1">Track your attendance records</p>
      </div>

      {/* STATISTICS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-sm text-gray-500">Total Records</p>
          <p className="text-3xl font-bold text-gray-800">{totalRecords}</p>
        </div>
        <div className="bg-green-50 p-6 rounded-lg shadow">
          <p className="text-sm text-green-600">Present</p>
          <p className="text-3xl font-bold text-green-700">{presentCount}</p>
        </div>
        <div className="bg-red-50 p-6 rounded-lg shadow">
          <p className="text-sm text-red-600">Absent</p>
          <p className="text-3xl font-bold text-red-700">{absentCount}</p>
        </div>
        <div className="bg-blue-50 p-6 rounded-lg shadow">
          <p className="text-sm text-blue-600">Percentage</p>
          <p className="text-3xl font-bold text-blue-700">{attendancePercentage}%</p>
        </div>
      </div>

      {/* ATTENDANCE TABLE */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {attendance.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(record.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {record.subject?.name || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        record.status === "PRESENT"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}