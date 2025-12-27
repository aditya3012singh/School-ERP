"use client";
import React, { useState } from 'react';
import { Search, Calendar, Clock, BookOpen, Users, Download, Printer, ChevronDown } from 'lucide-react';

const TimetableViewer = () => {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const classes = ['Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'];
  const sections = ['A', 'B', 'C', 'D'];

  const timeSlots = [
    '08:00 - 08:45',
    '08:45 - 09:30',
    '09:30 - 10:15',
    '10:15 - 10:30',
    '10:30 - 11:15',
    '11:15 - 12:00',
    '12:00 - 12:45',
    '12:45 - 01:30'
  ];

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const mockTimetable = {
    'Grade 10-A': {
      Monday: [
        { subject: 'Mathematics', teacher: 'Dr. Smith', room: '101' },
        { subject: 'English', teacher: 'Prof. Davis', room: '205' },
        { subject: 'Physics', teacher: 'Mr. Brown', room: '301' },
        { subject: 'Break', teacher: '', room: '' },
        { subject: 'Chemistry', teacher: 'Dr. Wilson', room: '302' },
        { subject: 'History', teacher: 'Ms. Taylor', room: '108' },
        { subject: 'Lunch Break', teacher: '', room: '' },
        { subject: 'Computer Science', teacher: 'Mr. Anderson', room: 'Lab 1' }
      ],
      Tuesday: [
        { subject: 'English', teacher: 'Prof. Davis', room: '205' },
        { subject: 'Mathematics', teacher: 'Dr. Smith', room: '101' },
        { subject: 'Biology', teacher: 'Dr. Martinez', room: '303' },
        { subject: 'Break', teacher: '', room: '' },
        { subject: 'Physical Education', teacher: 'Coach Johnson', room: 'Gym' },
        { subject: 'Chemistry', teacher: 'Dr. Wilson', room: '302' },
        { subject: 'Lunch Break', teacher: '', room: '' },
        { subject: 'Geography', teacher: 'Ms. Lee', room: '107' }
      ],
      Wednesday: [
        { subject: 'Physics', teacher: 'Mr. Brown', room: '301' },
        { subject: 'Mathematics', teacher: 'Dr. Smith', room: '101' },
        { subject: 'English', teacher: 'Prof. Davis', room: '205' },
        { subject: 'Break', teacher: '', room: '' },
        { subject: 'History', teacher: 'Ms. Taylor', room: '108' },
        { subject: 'Art', teacher: 'Ms. Garcia', room: 'Art Room' },
        { subject: 'Lunch Break', teacher: '', room: '' },
        { subject: 'Chemistry', teacher: 'Dr. Wilson', room: '302' }
      ],
      Thursday: [
        { subject: 'Biology', teacher: 'Dr. Martinez', room: '303' },
        { subject: 'Computer Science', teacher: 'Mr. Anderson', room: 'Lab 1' },
        { subject: 'Mathematics', teacher: 'Dr. Smith', room: '101' },
        { subject: 'Break', teacher: '', room: '' },
        { subject: 'English', teacher: 'Prof. Davis', room: '205' },
        { subject: 'Physics', teacher: 'Mr. Brown', room: '301' },
        { subject: 'Lunch Break', teacher: '', room: '' },
        { subject: 'Music', teacher: 'Mr. Thompson', room: 'Music Room' }
      ],
      Friday: [
        { subject: 'Chemistry', teacher: 'Dr. Wilson', room: '302' },
        { subject: 'History', teacher: 'Ms. Taylor', room: '108' },
        { subject: 'Mathematics', teacher: 'Dr. Smith', room: '101' },
        { subject: 'Break', teacher: '', room: '' },
        { subject: 'Biology', teacher: 'Dr. Martinez', room: '303' },
        { subject: 'English', teacher: 'Prof. Davis', room: '205' },
        { subject: 'Lunch Break', teacher: '', room: '' },
        { subject: 'Library Period', teacher: 'Librarian', room: 'Library' }
      ],
      Saturday: [
        { subject: 'Physical Education', teacher: 'Coach Johnson', room: 'Gym' },
        { subject: 'Mathematics', teacher: 'Dr. Smith', room: '101' },
        { subject: 'Computer Science', teacher: 'Mr. Anderson', room: 'Lab 1' },
        { subject: 'Break', teacher: '', room: '' },
        { subject: 'Geography', teacher: 'Ms. Lee', room: '107' },
        { subject: 'Extra Curricular', teacher: 'Various', room: 'Campus' },
        { subject: 'Lunch Break', teacher: '', room: '' },
        { subject: 'Study Hall', teacher: '', room: '101' }
      ]
    }
  };

  const handleSearch = () => {
    if (selectedClass && selectedSection) {
      setShowResults(true);
      setSearchQuery(`${selectedClass} - Section ${selectedSection}`);
    }
  };

  const handleReset = () => {
    setSelectedClass('');
    setSelectedSection('');
    setShowResults(false);
    setSearchQuery('');
  };

  const currentTimetable = mockTimetable[`${selectedClass}-${selectedSection}`] || mockTimetable['Grade 10-A'];

  const getSubjectColor = (subject) => {
    const colors = {
      'Mathematics': 'bg-blue-100 text-blue-700 border-blue-200',
      'English': 'bg-purple-100 text-purple-700 border-purple-200',
      'Physics': 'bg-green-100 text-green-700 border-green-200',
      'Chemistry': 'bg-yellow-100 text-yellow-700 border-yellow-200',
      'Biology': 'bg-teal-100 text-teal-700 border-teal-200',
      'History': 'bg-orange-100 text-orange-700 border-orange-200',
      'Geography': 'bg-cyan-100 text-cyan-700 border-cyan-200',
      'Computer Science': 'bg-indigo-100 text-indigo-700 border-indigo-200',
      'Physical Education': 'bg-red-100 text-red-700 border-red-200',
      'Break': 'bg-gray-100 text-gray-500 border-gray-200',
      'Lunch Break': 'bg-gray-100 text-gray-500 border-gray-200'
    };
    return colors[subject] || 'bg-pink-100 text-pink-700 border-pink-200';
  };

  return (
    <div className=" bg-gray-50 p-6">
      <div className=" mx-auto">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <span className="hover:text-blue-600 cursor-pointer">Dashboard</span>
          <span>›</span>
          <span className="hover:text-blue-600 cursor-pointer">Academic</span>
          <span>›</span>
          <span className="text-gray-900 font-medium">Timetable</span>
        </div>

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Class Timetable</h1>
          <p className="text-gray-600">View and manage class schedules for different grades and sections.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Search className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-lg font-bold text-gray-900">Search Timetable</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white appearance-none"
              >
                <option value="">Select Class</option>
                {classes.map(cls => (
                  <option key={cls} value={cls}>{cls}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>

            <div className="relative">
              <select
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white appearance-none"
              >
                <option value="">Select Section</option>
                {sections.map(sec => (
                  <option key={sec} value={sec}>Section {sec}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>

            <button
              onClick={handleSearch}
              disabled={!selectedClass || !selectedSection}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              View Timetable
            </button>

            <button
              onClick={handleReset}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium text-sm"
            >
              Reset
            </button>
          </div>
        </div>

        {showResults && (
          <>
            <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Calendar className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{searchQuery}</h2>
                    <p className="text-sm text-gray-600">Academic Year 2024-2025</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium text-sm flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Download PDF
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium text-sm flex items-center gap-2">
                    <Printer className="w-4 h-4" />
                    Print
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="bg-gray-50 border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700 min-w-32">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          Time
                        </div>
                      </th>
                      {days.map(day => (
                        <th key={day} className="bg-gray-50 border border-gray-200 px-4 py-3 text-center text-sm font-semibold text-gray-700 min-w-40">
                          {day}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {timeSlots.map((time, timeIndex) => (
                      <tr key={timeIndex} className="hover:bg-gray-50 transition-colors">
                        <td className="border border-gray-200 px-4 py-3 text-sm font-medium text-gray-600 bg-gray-50">
                          {time}
                        </td>
                        {days.map(day => {
                          const period = currentTimetable[day]?.[timeIndex];
                          const isBreak = period?.subject.includes('Break');
                          
                          return (
                            <td key={day} className="border border-gray-200 p-2">
                              {period && (
                                <div className={`rounded-lg p-3 border ${getSubjectColor(period.subject)} ${isBreak ? 'text-center' : ''}`}>
                                  <div className="font-semibold text-sm mb-1 flex items-center gap-2">
                                    {!isBreak && <BookOpen className="w-3 h-3" />}
                                    {period.subject}
                                  </div>
                                  {!isBreak && (
                                    <>
                                      <div className="text-xs opacity-80 flex items-center gap-1 mt-1">
                                        <Users className="w-3 h-3" />
                                        {period.teacher}
                                      </div>
                                      <div className="text-xs opacity-70 mt-1">
                                        Room: {period.room}
                                      </div>
                                    </>
                                  )}
                                </div>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <BookOpen className="w-5 h-5 text-green-600" />
                  </div>
                  <h3 className="font-bold text-gray-900">Total Periods</h3>
                </div>
                <p className="text-3xl font-bold text-gray-900">42</p>
                <p className="text-sm text-gray-600 mt-1">Per week</p>
              </div>

              <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-gray-900">Total Teachers</h3>
                </div>
                <p className="text-3xl font-bold text-gray-900">12</p>
                <p className="text-sm text-gray-600 mt-1">Assigned to class</p>
              </div>

              <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <Calendar className="w-5 h-5 text-purple-600" />
                  </div>
                  <h3 className="font-bold text-gray-900">Working Days</h3>
                </div>
                <p className="text-3xl font-bold text-gray-900">6</p>
                <p className="text-sm text-gray-600 mt-1">Days per week</p>
              </div>
            </div>
          </>
        )}

        {!showResults && (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Timetable Selected</h3>
            <p className="text-gray-600 mb-6">Select a class and section to view the timetable</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimetableViewer;