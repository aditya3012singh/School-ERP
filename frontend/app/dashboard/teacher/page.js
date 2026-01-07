"use client";
import { getTeacherDashboard } from "@/store/api/teacher.thunk";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Users, BookOpen, Calendar, TrendingUp, Clock } from "lucide-react";

export default function TeacherDashboard() {
  const dispatch = useDispatch();
  const { dashboard, loading, error } = useSelector((state) => state.teacher);

  useEffect(() => {
    dispatch(getTeacherDashboard());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <p className="text-red-600 font-medium">Error loading dashboard</p>
          <p className="text-red-500 text-sm mt-2">{error}</p>
        </div>
      </div>
    );
  }

  if (!dashboard?.data) {
    return null;
  }

  const { teacher, stats, todayClasses } = dashboard.data;

  const statCards = [
    {
      title: "Assigned Classes",
      value: stats.totalAssignedClasses,
      icon: BookOpen,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Total Students",
      value: stats.totalStudents,
      icon: Users,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      title: "Attendance Records",
      value: stats.totalAttendanceRecords,
      icon: Calendar,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      title: "Present Rate",
      value: `${stats.presentPercentage}%`,
      icon: TrendingUp,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Welcome back, {teacher.name}!
          </h1>
          <p className="text-gray-600 text-lg">
            {teacher.subject} Teacher • Dashboard Overview
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`${stat.bgColor} p-3 rounded-lg`}>
                    <Icon className={`w-6 h-6 ${stat.iconColor}`} />
                  </div>
                </div>
                <h3 className="text-gray-600 text-sm font-medium mb-1">
                  {stat.title}
                </h3>
                <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
              </div>
            );
          })}
        </div>

        {/* Today's Classes Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-indigo-50 p-2 rounded-lg">
              <Clock className="w-6 h-6 text-indigo-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              Today's Classes
            </h2>
          </div>

          {todayClasses.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-gray-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-10 h-10 text-gray-400" />
              </div>
              <p className="text-gray-600 text-lg mb-2">No classes scheduled today</p>
              <p className="text-gray-500 text-sm">Enjoy your day off!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {todayClasses.map((classItem, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">
                      {classItem.name}
                    </h3>
                    <p className="text-sm text-gray-600">{classItem.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-4 hover:shadow-lg transition-all font-medium">
            Mark Attendance
          </button>
          <button className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg p-4 hover:shadow-lg transition-all font-medium">
            View All Classes
          </button>
          <button className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg p-4 hover:shadow-lg transition-all font-medium">
            Generate Report
          </button>
        </div>
      </div>
    </div>
  );
}