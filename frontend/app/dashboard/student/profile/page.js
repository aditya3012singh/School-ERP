"use client";

import { useEffect, useMemo } from "react";
import { fetchStudentProfile } from "@/store/api/student.thunk";
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

export default function StudentProfilePage() {
    const dispatch = useAppDispatch();
    const { profile, loading, error } = useAppSelector((state) => state.student);

    useEffect(() => {
        dispatch(fetchStudentProfile());
    }, [dispatch]);

    const details = useMemo(() => {
        if (!profile) return [];
        const formatDate = (date) =>
            date ? new Date(date).toLocaleDateString() : "Not provided";

        return [
            { label: "Name", value: profile.name || "-" },
            { label: "Roll No", value: profile.rollNo || "-" },
            { label: "Class", value: profile.class || "-" },
            { label: "Section", value: profile.section || "-" },
            { label: "Date of Birth", value: formatDate(profile.dob) },
            { label: "Address", value: profile.address || "-" },
        ];
    }, [profile]);

    const parents = profile?.parents || [];

    if (loading && !profile) {
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

    if (!profile) {
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
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold">Student Profile</h1>
                    <p className="text-sm text-muted-foreground">Your latest information</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Overview</CardTitle>
                    <CardDescription>Basic student details</CardDescription>
                </CardHeader>
                <CardContent>
                    <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {details.map((item) => (
                            <div key={item.label} className="rounded-lg border p-3">
                                <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                                    {item.label}
                                </dt>
                                <dd className="text-base font-medium text-foreground">
                                    {item.value}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Parents / Guardians</CardTitle>
                    <CardDescription>Contact and relationship details</CardDescription>
                </CardHeader>
                <CardContent>
                    {parents.length === 0 ? (
                        <p className="text-sm text-muted-foreground">No parent records linked.</p>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Relation</TableHead>
                                    <TableHead>Contact</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {parents.map((parent) => (
                                    <TableRow key={parent.id}>
                                        <TableCell className="font-medium">{parent.name}</TableCell>
                                        <TableCell>{parent.relation}</TableCell>
                                        <TableCell>{parent.contact}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}