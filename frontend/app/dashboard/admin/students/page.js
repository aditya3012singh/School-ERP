"use client";
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search, ChevronDown, Phone, User, Mail } from 'lucide-react';
import { fetchStudents } from '@/store/api/admin.thunk';

const StudentDirectory = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  
  // Get students from Redux store
  const { students = [], loading = false, error = null } = useSelector((state) => state.admin || {});

  // Fetch all students on component mount
  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  // Debug: Log students data
  useEffect(() => {
    console.log('Students in component:', students);
    console.log('Loading:', loading);
    console.log('Error:', error);
  }, [students, loading, error]);

  // Calculate attendance percentage from array
  const calculateAttendance = (attendanceArray) => {
    if (!attendanceArray || attendanceArray.length === 0) return 0;
    const presentDays = attendanceArray.filter(record => record.status === 'present').length;
    return Math.round((presentDays / attendanceArray.length) * 100);
  };

  // Calculate attendance label and color
  const getAttendanceInfo = (attendancePercent) => {
    if (attendancePercent >= 90) return { label: 'Excellent', color: 'bg-green-500' };
    if (attendancePercent >= 80) return { label: 'Good', color: 'bg-green-500' };
    if (attendancePercent >= 65) return { label: 'Average', color: 'bg-yellow-500' };
    if (attendancePercent > 0) return { label: 'Low', color: 'bg-red-500' };
    return { label: 'No Data', color: 'bg-gray-400' };
  };

  // Get random avatar color
  const getAvatarColor = (id) => {
    const colors = ['bg-orange-200', 'bg-gray-300', 'bg-orange-300', 'bg-yellow-200', 'bg-blue-200', 'bg-purple-200'];
    const hash = id?.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) || 0;
    return colors[hash % colors.length];
  };

  // Filter students based on search term, class, and section
  const filteredStudents = (students || []).filter(student => {
    const matchesSearch = student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.rollNo?.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Handle both "1" and "Class 1" formats
    const matchesClass = !selectedClass || 
                        student.class === selectedClass || 
                        `Class ${student.class}` === selectedClass ||
                        student.class === selectedClass.replace('Class ', '');
    
    const matchesSection = !selectedSection || student.section === selectedSection;
    
    return matchesSearch && matchesClass && matchesSection;
  });

  // Get unique classes from students data
  const uniqueClasses = [...new Set((students || []).map(s => {
    // Normalize class format
    const className = s.class;
    if (!className) return null;
    if (className.startsWith('Class ')) return className;
    return `Class ${className}`;
  }).filter(Boolean))].sort((a, b) => {
    // Sort numerically
    const numA = parseInt(a.replace('Class ', ''));
    const numB = parseInt(b.replace('Class ', ''));
    return numA - numB;
  });

  // Fallback to default classes if no students loaded yet
  const classOptions = uniqueClasses.length > 0 ? uniqueClasses : [
    'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5',
    'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'
  ];

  const handleReset = () => {
    setSearchTerm('');
    setSelectedClass('');
    setSelectedSection('');
  };

  return (
    <div className="bg-gray-50 p-8 min-h-screen">
      <div className="mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Student Directory</h1>
          <p className="text-gray-600">Manage student records, track attendance, and view parent contacts.</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by name or roll number..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="relative">
              <select
                className="appearance-none px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white cursor-pointer"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                <option value="">All Classes</option>
                {classOptions.map(cls => (
                  <option key={cls} value={cls}>{cls}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>
            <div className="relative">
              <select
                className="appearance-none px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white cursor-pointer"
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
              >
                <option value="">All Sections</option>
                <option value="A">Section A</option>
                <option value="B">Section B</option>
                <option value="C">Section C</option>
                <option value="D">Section D</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>
            {(searchTerm || selectedClass || selectedSection) && (
              <button
                className="px-6 py-2 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition-colors"
                onClick={handleReset}
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
            <>
              <FilterSkeleton />
              <TableSkeleton rows={8} />
            </>
          )}


        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-600">Error loading students: {error}</p>
          </div>
        )}

        {/* Empty State - No Students in System */}
        {!loading && !error && students.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Students Found</h3>
            <p className="text-gray-600">There are no students in the system yet</p>
          </div>
        )}

        {/* Table */}
        {!loading && !error && students.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Student Details
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Class Info
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Attendance
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Parent / Guardian
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredStudents.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-12 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                          <Search className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-gray-500 font-medium">No students found</p>
                        <p className="text-sm text-gray-400 mt-1">Try adjusting your search or filters</p>
                      </td>
                    </tr>
                  ) : (
                    filteredStudents.map((student) => {
                      const attendancePercent = calculateAttendance(student.attendance);
                      const attendanceInfo = getAttendanceInfo(attendancePercent);
                      const parentName = student.parents?.[0]?.name || 'N/A';
                      
                      return (
                        <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-full ${getAvatarColor(student.id)} flex items-center justify-center flex-shrink-0`}>
                                <User className="w-6 h-6 text-gray-600" />
                              </div>
                              <div>
                                <div className="font-semibold text-gray-900">{student.name}</div>
                                <div className="text-sm text-gray-500">Roll No: {student.rollNo}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="font-medium text-gray-900">
                              {student.class?.startsWith('Class ') ? student.class : `Class ${student.class}`}
                            </div>
                            <div className="inline-block mt-1 px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded">
                              Section {student.section}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="flex-1 min-w-32">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-sm font-semibold text-gray-900">{attendancePercent}%</span>
                                  <span className="text-xs text-gray-500">{attendanceInfo.label}</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div
                                    className={`${attendanceInfo.color} h-2 rounded-full transition-all`}
                                    style={{ width: `${attendancePercent}%` }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-start gap-2 mb-2">
                              <User className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                              <div>
                                <span className="font-medium text-gray-900">{parentName}</span>
                              </div>
                            </div>
                            {student.user?.email && (
                              <div className="flex items-center gap-2 text-blue-600 text-sm">
                                <Mail className="w-4 h-4 flex-shrink-0" />
                                <span className="break-all">{student.user.email}</span>
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <button className="text-gray-400 hover:text-gray-600 transition-colors">
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Showing <span className="font-semibold">{filteredStudents.length}</span> of{' '}
                <span className="font-semibold">{students.length}</span> student{students.length !== 1 ? 's' : ''}
              </div>
              <div className="flex gap-2">
                <button 
                  className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled
                >
                  Previous
                </button>
                <button 
                  className="px-4 py-2 text-sm text-white bg-blue-600 border border-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/* ===================== SKELETONS ===================== */

function FilterSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6 animate-pulse">
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-64 h-10 bg-gray-200 rounded-lg" />
        <div className="w-40 h-10 bg-gray-200 rounded-lg" />
        <div className="w-40 h-10 bg-gray-200 rounded-lg" />
        <div className="w-24 h-10 bg-gray-200 rounded-lg" />
      </div>
    </div>
  );
}

function TableSkeleton({ rows = 8 }) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden animate-pulse">
      {/* Header */}
      <div className="bg-gray-50 border-b px-6 py-4 grid grid-cols-5 gap-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-4 bg-gray-200 rounded w-24" />
        ))}
      </div>

      {/* Rows */}
      {[...Array(rows)].map((_, idx) => (
        <div
          key={idx}
          className="px-6 py-4 grid grid-cols-5 gap-4 border-b"
        >
          {/* Student */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-200 rounded-full" />
            <div className="space-y-2">
              <div className="h-4 w-28 bg-gray-200 rounded" />
              <div className="h-3 w-20 bg-gray-200 rounded" />
            </div>
          </div>

          {/* Class */}
          <div className="space-y-2">
            <div className="h-4 w-20 bg-gray-200 rounded" />
            <div className="h-5 w-16 bg-gray-200 rounded" />
          </div>

          {/* Attendance */}
          <div className="space-y-2">
            <div className="h-4 w-12 bg-gray-200 rounded" />
            <div className="h-2 w-full bg-gray-200 rounded" />
          </div>

          {/* Parent */}
          <div className="space-y-2">
            <div className="h-4 w-24 bg-gray-200 rounded" />
            <div className="h-3 w-32 bg-gray-200 rounded" />
          </div>

          {/* Actions */}
          <div className="h-6 w-6 bg-gray-200 rounded-full" />
        </div>
      ))}
    </div>
  );
}


export default StudentDirectory;