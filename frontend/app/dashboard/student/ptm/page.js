"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentPtms } from "@/store/api/student.thunk";
import { Users, AlertCircle, Calendar, Clock, BookOpen } from "lucide-react";

export default function StudentPTM() {
  const dispatch = useDispatch();
  const { ptms, loading, error } = useSelector((state) => state.student);

  useEffect(() => {
    dispatch(fetchStudentPtms());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center w-full">
        <p>Loading PTM records...</p>
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

  // Handle API response structure - data may be wrapped in data property
  const ptmsData = Array.isArray(ptms) 
    ? ptms 
    : Array.isArray(ptms?.data) 
      ? ptms.data 
      : [];

  if (!ptmsData || ptmsData.length === 0) {
    return (
      <div className="p-6 w-full">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Users className="text-blue-600" />
          Parent-Teacher Meetings
        </h2>
        <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
          <p className="text-yellow-800">No PTM records available</p>
        </div>
      </div>
    );
  }

  // Separate upcoming and past PTMs
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingPTMs = ptmsData.filter((ptm) => new Date(ptm.date) >= today);
  const pastPTMs = ptmsData.filter((ptm) => new Date(ptm.date) < today);

  return (
    <div className="p-6 space-y-6 w-full">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Users />
          Parent-Teacher Meetings
        </h1>
        <p className="text-blue-100 mt-1">
          View scheduled meetings with teachers
        </p>
      </div>

      {/* UPCOMING PTMS */}
      {upcomingPTMs.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Upcoming Meetings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcomingPTMs.map((ptm) => (
              <div
                key={ptm.id}
                className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500 hover:shadow-lg transition"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Users className="text-blue-600" size={24} />
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                    Upcoming
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-lg text-gray-900">
                    {ptm.teacher?.name || "Teacher"}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <BookOpen size={16} />
                    <span>{ptm.teacher?.subject || "N/A"}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar size={16} />
                    <span>{new Date(ptm.date).toLocaleDateString()}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock size={16} />
                    <span>
                      {ptm.startTime} - {ptm.endTime}
                    </span>
                  </div>

                  {ptm.remarks && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Remarks: </span>
                        {ptm.remarks}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PAST PTMS */}
      {pastPTMs.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Past Meetings</h2>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Teacher
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Subject
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Remarks
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {pastPTMs.map((ptm) => (
                  <tr key={ptm.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(ptm.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {ptm.teacher?.name || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {ptm.teacher?.subject || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {ptm.startTime} - {ptm.endTime}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {ptm.remarks || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}