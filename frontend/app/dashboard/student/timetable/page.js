"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStudentTimetable } from "@/store/api/student.thunk";
import { Clock, AlertCircle, BookOpen } from "lucide-react";

export default function StudentTimetable() {
  const dispatch = useDispatch();
  const { timetable, loading, error } = useSelector(
    (state) => state.student
  );

  useEffect(() => {
    dispatch(getStudentTimetable());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center w-full">
        <p>Loading timetable...</p>
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
  const timetableData = Array.isArray(timetable) 
    ? timetable 
    : Array.isArray(timetable?.data) 
      ? timetable.data 
      : [];

  if (!timetableData || timetableData.length === 0) {
    return (
      <div className="p-6 w-full">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Clock className="text-blue-600" />
          My Timetable
        </h2>
        <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
          <p className="text-yellow-800">No timetable available</p>
        </div>
      </div>
    );
  }

  // Group timetable by day
  const daysOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const groupedTimetable = timetableData.reduce((acc, slot) => {
    if (!acc[slot.day]) {
      acc[slot.day] = [];
    }
    acc[slot.day].push(slot);
    return acc;
  }, {});

  // Sort slots within each day by start time
  Object.keys(groupedTimetable).forEach((day) => {
    groupedTimetable[day].sort((a, b) => a.startTime.localeCompare(b.startTime));
  });

  return (
    <div className="p-6 space-y-6 w-full">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Clock />
          My Timetable
        </h1>
        <p className="text-blue-100 mt-1">Your weekly class schedule</p>
      </div>

      {/* TIMETABLE BY DAY */}
      <div className="space-y-4">
        {daysOrder.map((day) => {
          const slots = groupedTimetable[day];
          if (!slots || slots.length === 0) return null;

          return (
            <div key={day} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="bg-blue-50 px-6 py-3 border-b border-blue-100">
                <h3 className="font-semibold text-lg text-blue-900">{day}</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {slots.map((slot) => (
                  <div
                    key={slot.id}
                    className="px-6 py-4 hover:bg-gray-50 transition"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="bg-blue-100 p-3 rounded-lg">
                          <Clock className="text-blue-600" size={20} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <BookOpen size={16} className="text-gray-500" />
                            <h4 className="font-semibold text-gray-900">
                              {slot.subject?.name || "N/A"}
                            </h4>
                          </div>
                          <p className="text-sm text-gray-600">
                            Teacher: {slot.teacher?.name || "N/A"}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">
                          {slot.startTime} - {slot.endTime}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
