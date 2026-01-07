"use client";

import { useState } from "react";

import { markTeacherAttendance } from "@/store/api/teacher.thunk";
import { getTeacherClasses } from "@/store/api/teacher.thunk";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppDispatch";
import { useDispatch, useSelector } from "react-redux";

export default function MarkAttendance() {
  const dispatch = useDispatch();
  const { classes = [], attendanceSubmitting, attendanceSuccess, error } =
    useSelector     ((state) => state.teacher);

  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [attendanceDate, setAttendanceDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [studentRecords, setStudentRecords] = useState([]);
  const [classStudents, setClassStudents] = useState([]);

  // Fetch classes on mount
  useEffect(() => {
    dispatch(getTeacherClasses());
  }, [dispatch]);

  // Extract unique subjects and students for selected class
  useEffect(() => {
    const safeClasses = Array.isArray(classes) ? classes : [];

    if (selectedClass && safeClasses.length > 0) {
      const classData = safeClasses.find(
        (c) => `${c.class}-${c.section}` === selectedClass
      );

      if (classData) {
        // Get unique subjects for this class
        const uniqueSubjects = [...new Set(classData.subjects || [])];
        setStudentRecords([]);

        // Get students for this class
        if (classData.students) {
          setClassStudents(classData.students);
          // Initialize attendance records for all students
          const initialRecords = classData.students.map((student) => ({
            studentId: student.id,
            name: student.name,
            status: "PRESENT",
          }));
          setStudentRecords(initialRecords);
        }
      }
    }
  }, [selectedClass, classes]);

  const handleAttendanceChange = (studentId, status) => {
    setStudentRecords((prev) =>
      prev.map((record) =>
        record.studentId === studentId
          ? { ...record, status }
          : record
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedClass || !selectedSubject || !attendanceDate) {
      alert("Please select class, subject, and date");
      return;
    }

    if (studentRecords.length === 0) {
      alert("No students to mark attendance for");
      return;
    }

    // Find subject ID (you may need to adjust based on your API response)
    const recordsPayload = studentRecords.map((record) => ({
      studentId: record.studentId,
      status: record.status,
    }));

    await dispatch(
      markTeacherAttendance({
        subjectId: selectedSubject,
        date: attendanceDate,
        records: recordsPayload,
      })
    );
  };

  const markAllPresent = () => {
    setStudentRecords((prev) =>
      prev.map((record) => ({ ...record, status: "PRESENT" }))
    );
  };

  const markAllAbsent = () => {
    setStudentRecords((prev) =>
      prev.map((record) => ({ ...record, status: "ABSENT" }))
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Mark Attendance</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {attendanceSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          Attendance marked successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Class Selection */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Select Class
            </label>
            <select
              value={selectedClass}
              onChange={(e) => {
                setSelectedClass(e.target.value);
                setSelectedSubject("");
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="">Choose a class</option>
              {(Array.isArray(classes) ? classes : []).map((c) => (
                <option key={c.id} value={`${c.class}-${c.section}`}>
                  Class {c.class} - Section {c.section}
                </option>
              ))}
            </select>
          </div>

          {/* Subject Selection */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Select Subject
            </label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              disabled={!selectedClass}
            >
              <option value="">Choose a subject</option>
              {selectedClass &&
                classes
                  .find((c) => `${c.class}-${c.section}` === selectedClass)
                  ?.subjects?.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
            </select>
          </div>

          {/* Date Selection */}
          <div>
            <label className="block text-sm font-medium mb-2">Date</label>
            <Input
              type="date"
              value={attendanceDate}
              onChange={(e) => setAttendanceDate(e.target.value)}
            />
          </div>
        </div>

        {/* Quick Actions */}
        {studentRecords.length > 0 && (
          <div className="flex gap-2">
            <Button
              type="button"
              onClick={markAllPresent}
              variant="outline"
              className="bg-green-50 hover:bg-green-100"
            >
              Mark All Present
            </Button>
            <Button
              type="button"
              onClick={markAllAbsent}
              variant="outline"
              className="bg-red-50 hover:bg-red-100"
            >
              Mark All Absent
            </Button>
          </div>
        )}

        {/* Students Attendance Table */}
        {studentRecords.length > 0 && (
          <Card className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">
                    Roll No
                  </th>
                  <th className="px-4 py-3 text-left font-semibold">
                    Student Name
                  </th>
                  <th className="px-4 py-3 text-center font-semibold">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {studentRecords.map((record, index) => (
                  <tr key={record.studentId} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3">{record.name}</td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            handleAttendanceChange(
                              record.studentId,
                              "PRESENT"
                            )
                          }
                          className={`px-4 py-2 rounded font-medium transition ${
                            record.status === "PRESENT"
                              ? "bg-green-500 text-white"
                              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                          }`}
                        >
                          Present
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            handleAttendanceChange(
                              record.studentId,
                              "ABSENT"
                            )
                          }
                          className={`px-4 py-2 rounded font-medium transition ${
                            record.status === "ABSENT"
                              ? "bg-red-500 text-white"
                              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                          }`}
                        >
                          Absent
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        )}

        {studentRecords.length === 0 && selectedClass && (
          <div className="text-center text-gray-500 py-8">
            No students found for this class
          </div>
        )}

        {/* Submit Button */}
        <div className="flex gap-2">
          <Button
            type="submit"
            disabled={attendanceSubmitting || studentRecords.length === 0}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
          >
            {attendanceSubmitting ? "Submitting..." : "Submit Attendance"}
          </Button>
        </div>
      </form>
    </div>
  );
}