"use client";
import React, { useEffect, useMemo, useState } from "react";
import { User, Phone } from "lucide-react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { fetchTeachers } from "@/store/api/admin.thunk";

const TeachersPage = () => {
  const dispatch = useAppDispatch();
  const { teachers = [], loading, error } = useAppSelector((s) => s.admin || {});
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchTeachers());
  }, [dispatch]);

  const filtered = useMemo(() => {
    if (!search) return teachers;
    return teachers.filter((t) => (t.name || "").toLowerCase().includes(search.toLowerCase()));
  }, [teachers, search]);

  return (
    <div className="bg-gray-50 p-8">
      <div className="mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Teachers</h1>
          <p className="text-gray-600">Manage teacher records and create new teachers.</p>
        </div>

        <div className="mb-6 flex items-center gap-3">
          <input
            className="w-full max-w-sm px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Search teachers by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Subject</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Contact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {loading && (
                  <tr>
                    <td colSpan={3} className="px-6 py-6 text-center text-sm text-gray-500">Loading...</td>
                  </tr>
                )}
                {!loading && error && (
                  <tr>
                    <td colSpan={3} className="px-6 py-6 text-center text-sm text-red-600">{error}</td>
                  </tr>
                )}

                {!loading && filtered.length === 0 && !error && (
                  <tr>
                    <td colSpan={3} className="px-6 py-6 text-center text-sm text-gray-500">No teachers found</td>
                  </tr>
                )}

                {!loading && filtered.map((t) => (
                  <tr key={t.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center`}>
                          <User className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{t.name}</div>
                          <div className="text-sm text-gray-500">ID: {t.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{t.subject || '-'}</div>
                      <div className="text-sm text-gray-500">{t.email || ''}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-blue-600">
                        <Phone className="w-4 h-4" />
                        <span className="text-sm">{t.phone || '-'}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeachersPage;