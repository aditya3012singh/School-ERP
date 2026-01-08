"use client";

import { useEffect, useMemo } from "react";
import { fetchMe } from "@/store/api/auth.thunk";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User, Mail, BookOpen, Phone, GraduationCap } from "lucide-react";

export default function TeacherProfilePage() {
  const dispatch = useAppDispatch();
  const { user, loading, error } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchMe());
  }, [dispatch]);

  const details = useMemo(() => {
    if (!user?.teacher) return [];

    return [
      { label: "Name", value: user.teacher.name || "-", icon: User },
      { label: "Email", value: user.email || "-", icon: Mail },
      { label: "Subject", value: user.teacher.subject || "-", icon: BookOpen },
      { label: "Contact", value: user.teacher.contact || "-", icon: Phone },
    ];
  }, [user]);

  if (loading && !user) {
    return (
      <div className="p-6 w-full">
        <Card className="animate-pulse">
          <CardHeader>
            <CardTitle>Loading profile…</CardTitle>
            <CardDescription>Fetching your latest details</CardDescription>
          </CardHeader>
          <CardContent className="h-20" />
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 w-full">
        <Card className="border-red-200 bg-red-50 text-red-900">
          <CardHeader>
            <CardTitle>Could not load profile</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (!user || !user.teacher) {
    return (
      <div className="p-6 w-full">
        <Card>
          <CardHeader>
            <CardTitle>No profile found</CardTitle>
            <CardDescription>Please try again later.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 w-full space-y-6">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <GraduationCap />
          Teacher Profile
        </h1>
        <p className="text-green-100 mt-1">Your professional information</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Overview</CardTitle>
          <CardDescription>Basic teacher details</CardDescription>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {details.map((item) => {
              const IconComponent = item.icon;
              return (
                <div key={item.label} className="rounded-lg border p-4">
                  <dt className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground mb-2">
                    <IconComponent size={14} className="text-green-600" />
                    {item.label}
                  </dt>
                  <dd className="text-base font-medium text-foreground">
                    {item.value}
                  </dd>
                </div>
              );
            })}
          </dl>
        </CardContent>
      </Card>

      {/* ACCOUNT INFORMATION */}
      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
          <CardDescription>Login and authentication details</CardDescription>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-lg border p-4">
              <dt className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground mb-2">
                <Mail size={14} className="text-green-600" />
                Email
              </dt>
              <dd className="text-base font-medium text-foreground">
                {user.email || "-"}
              </dd>
            </div>
            <div className="rounded-lg border p-4">
              <dt className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground mb-2">
                <User size={14} className="text-green-600" />
                Role
              </dt>
              <dd className="text-base font-medium text-foreground capitalize">
                {user.role || "-"}
              </dd>
            </div>
          </dl>
        </CardContent>
      </Card>
    </div>
  );
}
