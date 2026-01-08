"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTeacherClasses } from "@/store/api/teacher.thunk";
import { BookOpen, AlertCircle, Users, GraduationCap } from "lucide-react";

export default function TeacherClasses() {
  const dispatch = useDispatch();
  const { classes, loading, error } = useSelector((state) => state.teacher);

  useEffect(() => {
    dispatch(getTeacherClasses());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center w-full">
        <p>Loading classes...</p>
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

  if (!classes || classes.length === 0) {
    return (
      <div className="p-6 w-full">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <GraduationCap className="text-green-600" />
          My Classes
        </h2>
        <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
          <p className="text-yellow-800">No classes assigned</p>
        </div>
      </div>
    );
  }

  // Group classes by class-section
  const groupedClasses = classes.reduce((acc, item) => {
    const key = `${item.class}-${item.section}`;
    if (!acc[key]) {
      acc[key] = {
        class: item.class,
        section: item.section,
        subjects: [],
      };
    }
    acc[key].subjects.push(item.subject);
    return acc;
  }, {});

  const classGroups = Object.values(groupedClasses);

  return (
    <div className="p-6 space-y-6 w-full">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <GraduationCap />
          My Classes
        </h1>
        <p className="text-green-100 mt-1">
          Classes you are teaching
        </p>
      </div>

      {/* STATISTICS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-sm text-gray-500">Total Classes</p>
          <p className="text-3xl font-bold text-gray-800">{classGroups.length}</p>
        </div>
        <div className="bg-green-50 p-6 rounded-lg shadow">
          <p className="text-sm text-green-600">Total Subjects</p>
          <p className="text-3xl font-bold text-green-700">{classes.length}</p>
        </div>
        <div className="bg-emerald-50 p-6 rounded-lg shadow">
          <p className="text-sm text-emerald-600">Unique Subjects</p>
          <p className="text-3xl font-bold text-emerald-700">
            {new Set(classes.map(c => c.subject?.name)).size}
          </p>
        </div>
      </div>

      {/* CLASSES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {classGroups.map((classGroup, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500 hover:shadow-lg transition"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <Users className="text-green-600" size={24} />
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                {classGroup.subjects.length} Subject{classGroup.subjects.length > 1 ? 's' : ''}
              </span>
            </div>

            <h3 className="font-bold text-xl text-gray-900 mb-3">
              Class {classGroup.class}-{classGroup.section}
            </h3>

            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-600">Subjects:</p>
              <ul className="space-y-1">
                {classGroup.subjects.map((subject, subIndex) => (
                  <li
                    key={subIndex}
                    className="flex items-center gap-2 text-sm text-gray-700"
                  >
                    <BookOpen size={14} className="text-green-600" />
                    <span>{subject?.name || "N/A"}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* ALL SUBJECTS LIST */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="bg-green-50 px-6 py-3 border-b border-green-100">
          <h3 className="font-semibold text-lg text-green-900">All Teaching Assignments</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Class
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Section
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {classes.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.class}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {item.section}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {item.subject?.name || "N/A"}
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