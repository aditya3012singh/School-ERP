"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Search, User, Phone, Mail } from "lucide-react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { fetchTeachers } from "@/store/api/admin.thunk";

const TeachersPage = () => {
  const dispatch = useAppDispatch();
  const { teachers = [], loading, error } = useAppSelector(
    (s) => s.admin || {}
  );

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchTeachers());
  }, [dispatch]);

  const filteredTeachers = useMemo(() => {
    if (!search) return teachers;
    return teachers.filter((t) =>
      (t.name || "").toLowerCase().includes(search.toLowerCase())
    );
  }, [teachers, search]);

  return (
    <div className="bg-gray-50 p-8 min-h-screen">
      <div className="mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Teachers</h1>
          <p className="text-gray-600">
            Manage teacher records and contact information.
          </p>
        </div>

        {/* Search */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Search teachers by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <>
            <FilterSkeleton />
            <TeacherTableSkeleton rows={6} />
          </>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-600">Error loading teachers: {error}</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && teachers.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No Teachers Found
            </h3>
            <p className="text-gray-600">
              There are no teachers in the system yet.
            </p>
          </div>
        )}

        {/* Table */}
        {!loading && !error && teachers.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Teacher
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Subject
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Contact
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredTeachers.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="px-6 py-12 text-center">
                        <p className="text-gray-500 font-medium">
                          No teachers match your search
                        </p>
                      </td>
                    </tr>
                  ) : (
                    filteredTeachers.map((t) => (
                      <tr
                        key={t.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                              <User className="w-5 h-5 text-gray-600" />
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900">
                                {t.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                ID: {t.id}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900">
                            {t.subject || "-"}
                          </div>
                          {t.email && (
                            <div className="flex items-center gap-1 text-sm text-blue-600 mt-1">
                              <Mail className="w-4 h-4" />
                              {t.email}
                            </div>
                          )}
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-blue-600">
                            <Phone className="w-4 h-4" />
                            <span className="text-sm">
                              {t.phone || "-"}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 text-sm text-gray-600">
              Showing{" "}
              <span className="font-semibold">
                {filteredTeachers.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold">
                {teachers.length}
              </span>{" "}
              teachers
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeachersPage;

/* ===================== SKELETONS ===================== */

function FilterSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6 animate-pulse">
      <div className="h-10 w-80 bg-gray-200 rounded-lg" />
    </div>
  );
}

function TeacherTableSkeleton({ rows = 6 }) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden animate-pulse">
      <div className="bg-gray-50 border-b px-6 py-4 grid grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-4 bg-gray-200 rounded w-24" />
        ))}
      </div>

      {[...Array(rows)].map((_, idx) => (
        <div
          key={idx}
          className="px-6 py-4 grid grid-cols-3 gap-4 border-b"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-200 rounded-full" />
            <div className="space-y-2">
              <div className="h-4 w-28 bg-gray-200 rounded" />
              <div className="h-3 w-20 bg-gray-200 rounded" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="h-4 w-24 bg-gray-200 rounded" />
            <div className="h-3 w-32 bg-gray-200 rounded" />
          </div>

          <div className="h-4 w-24 bg-gray-200 rounded" />
        </div>
      ))}
    </div>
  );
}
