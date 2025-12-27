"use client";
import React, { useState } from 'react';
import { Search, ChevronDown, Phone, User } from 'lucide-react';

const StudentDirectory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');

  const students = [
    {
      id: 1,
      name: 'Emma Thompson',
      rollNo: 'ST-2024-001',
      class: 'Class 5',
      section: 'Section A',
      attendance: 96,
      attendanceLabel: 'Present',
      attendanceColor: 'bg-green-500',
      parent: 'Sarah Thompson',
      parentRelation: 'Mother',
      phone: '+1 (555) 123-4567',
      avatar: 'bg-orange-200'
    },
    {
      id: 2,
      name: 'Liam Wilson',
      rollNo: 'ST-2024-002',
      class: 'Class 5',
      section: 'Section B',
      attendance: 82,
      attendanceLabel: 'Average',
      attendanceColor: 'bg-yellow-500',
      parent: 'Robert Wilson',
      parentRelation: 'Father',
      phone: '+1 (555) 987-6543',
      avatar: 'bg-gray-300'
    },
    {
      id: 3,
      name: 'Olivia Davis',
      rollNo: 'ST-2024-003',
      class: 'Class 5',
      section: 'Section C',
      attendance: 65,
      attendanceLabel: 'Low',
      attendanceColor: 'bg-red-500',
      parent: 'James Davis',
      parentRelation: 'Father',
      phone: '+1 (555) 456-7890',
      avatar: 'bg-orange-300'
    },
    {
      id: 4,
      name: 'Noah Brown',
      rollNo: 'ST-2024-004',
      class: 'Class 5',
      section: 'Section A',
      attendance: 100,
      attendanceLabel: 'Excellent',
      attendanceColor: 'bg-green-500',
      parent: 'Emily Brown',
      parentRelation: 'Mother',
      phone: '+1 (555) 111-2222',
      avatar: 'bg-yellow-200'
    }
  ];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.rollNo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = !selectedClass || student.class === selectedClass;
    const matchesSection = !selectedSection || student.section === selectedSection;
    return matchesSearch && matchesClass && matchesSection;
  });

  return (
    <div className=" bg-gray-50 p-8">
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
                <option value="">Select Class</option>
                <option value="Class 5">Class 5</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>
            <div className="relative">
              <select
                className="appearance-none px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white cursor-pointer"
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
              >
                <option value="">Select Section</option>
                <option value="Section A">Section A</option>
                <option value="Section B">Section B</option>
                <option value="Section C">Section C</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>
            <button
              className="px-6 py-2 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => {
                setSearchTerm('');
                setSelectedClass('');
                setSelectedSection('');
              }}
            >
              Reset
            </button>
          </div>
        </div>

        {/* Table */}
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
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full ${student.avatar} flex items-center justify-center`}>
                          <User className="w-6 h-6 text-gray-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{student.name}</div>
                          <div className="text-sm text-gray-500">Roll No: {student.rollNo}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{student.class}</div>
                      <div className="inline-block mt-1 px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded">
                        {student.section}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-semibold text-gray-900">{student.attendance}%</span>
                            <span className="text-xs text-gray-500">{student.attendanceLabel}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`${student.attendanceColor} h-2 rounded-full transition-all`}
                              style={{ width: `${student.attendance}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-start gap-2 mb-2">
                        <User className="w-4 h-4 text-gray-400 mt-0.5" />
                        <div>
                          <span className="font-medium text-gray-900">{student.parent}</span>
                          <span className="ml-2 text-xs text-gray-500">{student.parentRelation}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-blue-600">
                        <Phone className="w-4 h-4" />
                        <span className="text-sm">{student.phone}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-gray-400 hover:text-gray-600">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing <span className="font-semibold">1</span> to <span className="font-semibold">4</span> of{' '}
              <span className="font-semibold">124</span> students
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Previous
              </button>
              <button className="px-4 py-2 text-sm text-white bg-blue-600 border border-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDirectory;