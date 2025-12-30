"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GraduationCap,
  Users,
  UserCheck,
  BookOpen,
  Clock,
  Calendar,
  Search,
  Bell,
  ArrowUpRight,
} from "lucide-react";
import { fetchDashboardStats } from "@/store/api/admin.thunk";

export default function SchoolDashboard() {
  const dispatch = useDispatch();
  const { stats, loading, error } = useSelector(
    (state) => state.adminDashboard
  );

  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  if (loading) return <DashboardSkeleton />;
  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!stats) return null;

  const { users, academics, attendance, ptm } = stats;

  const attendanceTrend = [
    { day: "Mon", value: 82 },
    { day: "Tue", value: 86 },
    { day: "Wed", value: 90 },
    { day: "Thu", value: 88 },
    { day: "Fri", value: 94 },
  ];

  return (
    <div className="min-h-screen bg-[#f4f6f8]">
      {/* HEADER */}


      {/* CONTENT */}
      <main className="max-w-[1600px] mx-auto p-6 space-y-6">

        {/* KPI CARDS */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <KpiCard title="Students" value={users.students} icon={GraduationCap} accent="blue" />
          <KpiCard title="Teachers" value={users.teachers} icon={Users} accent="orange" />
          <KpiCard title="Parents" value={users.parents} icon={UserCheck} accent="purple" />
        </section>

        {/* QUICK ACTIONS */}
        <section className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <QuickAction label="Add Student" />
            <QuickAction label="Add Teacher" />
            <QuickAction label="Schedule PTM" />
            <QuickAction label="Create Timetable" />
          </div>
        </section>

        {/* ACADEMICS */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard title="Subjects" value={academics.subjects} icon={BookOpen} />
          <InfoCard title="Timetable Slots" value={academics.timetableSlots} icon={Clock} />

          <div className="bg-gradient-to-br from-blue-600 to-blue-500 text-white rounded-2xl p-6">
            <div className="flex justify-between">
              <p className="text-sm">Today's Attendance</p>
              <Calendar />
            </div>
            <h2 className="text-5xl font-bold mt-3">{attendance.today}</h2>
            <p className="text-sm mt-1 opacity-90">
              Total records: {attendance.total}
            </p>
          </div>
        </section>

        {/* GRAPHS */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AttendanceBarChart data={attendanceTrend} />
          <UserDonutChart users={users} />
        </section>

        {/* ALERTS */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AlertCard title="Low Attendance" value="2 Classes" color="red" />
          <AlertCard title="Pending PTMs" value={ptm.upcoming} color="orange" />
          <AlertCard title="System Status" value="All Good" color="green" />
        </section>

        {/* ACTIVITY + PTM */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentActivity />
          <PTMSummary count={ptm.upcoming} />
        </section>
      </main>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function KpiCard({ title, value, icon: Icon, accent }) {
  const map = {
    blue: "bg-blue-100 text-blue-600",
    orange: "bg-orange-100 text-orange-600",
    purple: "bg-purple-100 text-purple-600",
  };
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h2 className="text-4xl font-bold">{value}</h2>
        </div>
        <div className={`p-3 rounded-xl ${map[accent]}`}>
          <Icon />
        </div>
      </div>
    </div>
  );
}

function InfoCard({ title, value, icon: Icon }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm flex justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h2 className="text-3xl font-bold">{value}</h2>
      </div>
      <div className="p-4 bg-gray-100 rounded-xl">
        <Icon />
      </div>
    </div>
  );
}

function QuickAction({ label }) {
  return (
    <button className="border rounded-xl p-4 text-sm font-medium hover:bg-blue-50 hover:border-blue-300 transition">
      {label}
    </button>
  );
}

function AttendanceBarChart({ data }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h3 className="font-semibold mb-4">Attendance Trend</h3>
      <div className="flex items-end gap-4 h-48">
        {data.map((d) => (
          <div key={d.day} className="flex-1 text-center">
            <div className="h-40 bg-gray-100 rounded-lg flex items-end">
              <div className="w-full bg-blue-600 rounded-lg" style={{ height: `${d.value}%` }} />
            </div>
            <p className="text-xs mt-2">{d.day}</p>
            <p className="text-xs font-medium">{d.value}%</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function UserDonutChart({ users }) {
  const total = users.students + users.teachers + users.parents;
  const s = (users.students / total) * 100;
  const t = (users.teachers / total) * 100;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h3 className="font-semibold mb-4">User Distribution</h3>
      <div className="flex gap-6">
        <svg width="160" height="160" viewBox="0 0 36 36">
          <circle cx="18" cy="18" r="15.9" fill="none" stroke="#E5E7EB" strokeWidth="3" />
          <circle cx="18" cy="18" r="15.9" fill="none" stroke="#3B82F6" strokeWidth="3" strokeDasharray={`${s} 100`} />
          <circle cx="18" cy="18" r="15.9" fill="none" stroke="#F97316" strokeWidth="3" strokeDasharray={`${t} 100`} strokeDashoffset={`-${s}`} />
        </svg>
        <div className="space-y-2 text-sm">
          <Legend label="Students" value={users.students} color="bg-blue-600" />
          <Legend label="Teachers" value={users.teachers} color="bg-orange-500" />
          <Legend label="Parents" value={users.parents} color="bg-purple-500" />
        </div>
      </div>
    </div>
  );
}

function Legend({ label, value, color }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`w-3 h-3 rounded-full ${color}`} />
      {label}: <strong>{value}</strong>
    </div>
  );
}

function AlertCard({ title, value, color }) {
  const map = {
    red: "text-red-600",
    orange: "text-orange-600",
    green: "text-green-600",
  };
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <h3 className={`text-2xl font-bold mt-2 ${map[color]}`}>{value}</h3>
    </div>
  );
}

function RecentActivity() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h3 className="font-semibold mb-4">Recent Activity</h3>
      <ul className="space-y-2 text-sm text-gray-600">
        <li>• Attendance marked for Class 10-A</li>
        <li>• New student admitted in Class 8-B</li>
        <li>• PTM scheduled for Class 5</li>
        <li>• Teacher profile updated</li>
      </ul>
    </div>
  );
}

function PTMSummary({ count }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h3 className="font-semibold mb-2">Upcoming PTMs</h3>
      <div className="text-4xl font-bold">{count}</div>
      <p className="text-sm text-gray-500">meetings scheduled</p>
      <button className="flex items-center gap-1 mt-3 text-sm text-blue-600">
        View all <ArrowUpRight size={14} />
      </button>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="p-6 space-y-6 animate-pulse">
      <div className="h-8 w-64 bg-gray-200 rounded" />
      <div className="grid grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-32 bg-gray-200 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}
