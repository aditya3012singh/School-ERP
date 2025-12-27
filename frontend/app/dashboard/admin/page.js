import React from 'react';
import { GraduationCap, Users, UserCheck, BookOpen, Clock, Calendar, Search, Bell } from 'lucide-react';

const SchoolDashboard = () => {
  const dashboardData = {
    users: {
      students: { total: 1240, growth: 5, growthDirection: 'up' },
      teachers: { total: 84, type: 'Full-time staff' },
      parents: { total: 2100, status: 'Active accounts' }
    },
    academics: {
      subjects: { total: 42, label: 'Active Subjects' },
      timetableSlots: { total: 120, label: 'Timetable Slots' }
    },
    attendance: {
      today: { percentage: 94, present: 1165, total: 1240, absent: 75, target: 95 },
      weekly: [
        { day: 'MON', percentage: 80 },
        { day: 'TUE', percentage: 85 },
        { day: 'TODAY', percentage: 94, isToday: true },
        { day: 'THU', percentage: null },
        { day: 'FRI', percentage: null }
      ]
    },
    ptm: {
      upcoming: [
        { id: 1, title: 'Grade 5 & 6 Meeting', date: 'OCT', day: '24', time: '09:00 AM - 12:00 PM' },
        { id: 2, title: 'Grade 10 Review', date: 'OCT', day: '28', time: '10:00 AM - 02:00 PM' },
        { id: 3, title: 'Sports Day Prep', date: 'NOV', day: '05', time: '03:00 PM - 05:00 PM' }
      ]
    }
  };

  return (
    <div className="w-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">Dashboard Overview</h1>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search students, classes..."
                className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-80"
              />
            </div>
            <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
              <Bell className="w-5 h-5 text-gray-600" />
            </button>
            <div className="w-10 h-10 bg-orange-200 rounded-full flex items-center justify-center">
              <span className="text-orange-600 font-medium text-sm">A</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        {/* Top Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* Total Students */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-500 text-sm mb-1">Total Students</p>
                <h3 className="text-4xl font-bold text-gray-900 mb-2">1,240</h3>
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                  </svg>
                  <span className="text-green-500 text-sm font-medium">+5%</span>
                  <span className="text-gray-400 text-sm">vs last month</span>
                </div>
              </div>
              <div className="bg-blue-100 p-3 rounded-xl">
                <GraduationCap className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Total Teachers */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-500 text-sm mb-1">Total Teachers</p>
                <h3 className="text-4xl font-bold text-gray-900 mb-2">84</h3>
                <p className="text-gray-400 text-sm">Full-time staff</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-xl">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>

          {/* Total Parents */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-500 text-sm mb-1">Total Parents</p>
                <h3 className="text-4xl font-bold text-gray-900 mb-2">2,100</h3>
                <p className="text-gray-400 text-sm">Active accounts</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-xl">
                <UserCheck className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Middle Row */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
          {/* Active Subjects */}
          <div className="md:col-span-2 bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm mb-1">Active Subjects</p>
                <h3 className="text-4xl font-bold text-gray-900">42</h3>
              </div>
              <div className="bg-gray-100 p-4 rounded-xl">
                <BookOpen className="w-8 h-8 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Timetable Slots */}
          <div className="md:col-span-2 bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm mb-1">Timetable Slots</p>
                <h3 className="text-4xl font-bold text-gray-900">120</h3>
              </div>
              <div className="bg-gray-100 p-4 rounded-xl">
                <Clock className="w-8 h-8 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Today's Attendance */}
          <div className="md:col-span-1 bg-blue-600 rounded-2xl p-6 shadow-sm text-white">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-medium">Today's Attendance</p>
              <Calendar className="w-5 h-5" />
            </div>
            <h2 className="text-5xl font-bold mb-1">94%</h2>
            <p className="text-sm mb-3 opacity-90">Target: 95%</p>
            <div className="text-sm mb-4 opacity-90">1,165 / 1,240</div>
            <div className="bg-white/20 rounded-full h-1.5 mb-4">
              <div className="bg-white rounded-full h-1.5" style={{ width: '94%' }} />
            </div>
            <div className="pt-3 border-t border-white/20">
              <div className="flex items-center justify-between text-sm">
                <span>Absentees</span>
                <span className="font-bold">75 Students</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* Attendance Overview */}
          <div className="lg:col-span-3 bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Attendance Overview</h2>
                <p className="text-sm text-gray-500">Weekly student presence</p>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium">
                  Weekly
                </button>
                <button className="px-4 py-1.5 text-gray-600 hover:bg-gray-50 rounded-lg text-sm font-medium">
                  Monthly
                </button>
              </div>
            </div>
            
            <div className="flex items-end justify-between gap-3 h-64">
              {dashboardData.attendance.weekly.map((day, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full">
                  {day.percentage !== null ? (
                    <>
                      <div className="w-full flex items-end justify-center mb-2" style={{ height: '200px' }}>
                        <div
                          className={`w-full rounded-t-xl transition-all ${
                            day.isToday ? 'bg-blue-600' : 'bg-blue-300'
                          }`}
                          style={{ height: `${(day.percentage / 100) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-700 mb-1">{day.percentage}%</span>
                    </>
                  ) : (
                    <div className="h-full" />
                  )}
                  <span className={`text-sm ${day.isToday ? 'font-bold text-gray-900' : 'text-gray-500'}`}>
                    {day.day}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming PTMs */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4">Upcoming PTMs</h3>
            <div className="space-y-3">
              {dashboardData.ptm.upcoming.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl cursor-pointer transition-colors border border-gray-100"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-center bg-gray-50 rounded-lg px-3 py-2">
                      <div className="text-blue-600 text-xs font-medium">{event.date}</div>
                      <div className="text-gray-900 text-xl font-bold">{event.day}</div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm mb-0.5">{event.title}</h4>
                      <p className="text-xs text-gray-500">{event.time}</p>
                    </div>
                  </div>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 text-blue-600 text-sm font-semibold hover:bg-blue-50 py-2.5 rounded-xl transition-colors">
              View All Events
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolDashboard;   