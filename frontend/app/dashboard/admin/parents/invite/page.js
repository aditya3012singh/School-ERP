"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { addParentToStudent, fetchStudents, inviteParent } from "@/store/api/admin.thunk";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle, Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function InviteParentPage() {
  const dispatch = useDispatch();
  const {
    students = [],
    loading,
    error,
    inviteLoading,
    inviteSuccess,
    inviteError,
    addParentLoading,
    addParentSuccess,
    addParentError,
  } = useSelector((state) => state.admin);

  const [mode, setMode] = useState("invite");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [email, setEmail] = useState("");
  const [parentName, setParentName] = useState("");
  const [contact, setContact] = useState("");
  const [relation, setRelation] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState(null);

  const loadStudents = useCallback(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  useEffect(() => {
    if (!Array.isArray(students) || students.length === 0) {
      loadStudents();
    }
  }, [students, loadStudents]);

  useEffect(() => {
    if (inviteSuccess && mode === "invite") {
      setEmail("");
      setSelectedStudent(null);
    }
  }, [inviteSuccess, mode]);

  useEffect(() => {
    if (addParentSuccess && mode === "direct") {
      setEmail("");
      setParentName("");
      setContact("");
      setRelation("");
      setPassword("");
      setSelectedStudent(null);
    }
  }, [addParentSuccess, mode]);

  const filteredStudents = useMemo(() => {
    if (!Array.isArray(students)) return [];
    if (!searchTerm.trim()) return students.slice(0, 8);
    const term = searchTerm.toLowerCase();
    return students
      .filter((student) => {
        return (
          student.name?.toLowerCase().includes(term) ||
          student.rollNo?.toLowerCase().includes(term) ||
          `${student.class}${student.section}`.toLowerCase().includes(term)
        );
      })
      .slice(0, 12);
  }, [students, searchTerm]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError(null);

    if (!selectedStudent) {
      setFormError("Select a student to invite their parent");
      return;
    }

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setFormError("Parent email is required");
      return;
    }
    if (!emailRegex.test(trimmedEmail)) {
      setFormError("Enter a valid email");
      return;
    }

    if (mode === "invite") {
      await dispatch(
        inviteParent({ email: trimmedEmail, studentId: selectedStudent.id })
      );
      return;
    }

    if (!parentName.trim() || !contact.trim() || !relation.trim()) {
      setFormError("Name, relation and contact are required");
      return;
    }

    if (!password || password.length < 6) {
      setFormError("Password must be at least 6 characters");
      return;
    }

    await dispatch(
      addParentToStudent({
        studentId: selectedStudent.id,
        name: parentName.trim(),
        email: trimmedEmail,
        password,
        contact: contact.trim(),
        relation: relation.trim(),
      })
    );
  };

  const isLoadingStudents = loading && (!students || students.length === 0);
  const primaryLoading = mode === "invite" ? inviteLoading : addParentLoading;
  const successMessage = mode === "invite" ? inviteSuccess : addParentSuccess;
  const errorMessage = mode === "invite" ? inviteError : addParentError;

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <p className="text-sm text-gray-600">Admin / Parents / Invite</p>
        <h1 className="text-3xl font-bold">Parent Access</h1>
        <p className="text-sm text-gray-600">
          Send an invite email or directly create a parent account linked to a student.
        </p>
      </div>

      {error && (
        <div className="flex items-start gap-2 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800">
          <AlertCircle className="h-4 w-4 mt-0.5" />
          <span>{error}</span>
          <Button variant="outline" size="sm" className="ml-auto" onClick={loadStudents}>
            Retry
          </Button>
        </div>
      )}

      {formError && (
        <div className="flex items-start gap-2 rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
          <AlertCircle className="h-4 w-4 mt-0.5" />
          <span>{formError}</span>
        </div>
      )}

      {errorMessage && (
        <div className="flex items-start gap-2 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800">
          <AlertCircle className="h-4 w-4 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      {successMessage && (
        <div className="flex items-start gap-2 rounded-md border border-green-200 bg-green-50 p-3 text-sm text-green-800">
          <CheckCircle className="h-4 w-4 mt-0.5" />
          <span>{successMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 p-4 space-y-4">
          <div className="flex gap-2">
            <Button
              type="button"
              variant={mode === "invite" ? "default" : "outline"}
              onClick={() => {
                setMode("invite");
                setFormError(null);
              }}
            >
              Send Invite
            </Button>
            <Button
              type="button"
              variant={mode === "direct" ? "default" : "outline"}
              onClick={() => {
                setMode("direct");
                setFormError(null);
              }}
            >
              Create Parent Account
            </Button>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-800">Search Student</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search by name, roll number, class or section"
                className="pl-9"
              />
            </div>
          </div>

          <div className="max-h-80 overflow-y-auto rounded-md border border-gray-100">
            {isLoadingStudents && (
              <div className="p-4 text-sm text-gray-500">Loading students...</div>
            )}

            {!isLoadingStudents && filteredStudents.length === 0 && (
              <div className="p-4 text-sm text-gray-500">No students found</div>
            )}

            {!isLoadingStudents && filteredStudents.length > 0 && (
              <div className="divide-y divide-gray-100">
                {filteredStudents.map((student) => (
                  <button
                    type="button"
                    key={student.id}
                    onClick={() => setSelectedStudent(student)}
                    className={`w-full text-left px-4 py-3 transition hover:bg-blue-50 ${
                      selectedStudent?.id === student.id
                        ? "bg-blue-50 border-l-4 border-blue-500"
                        : ""
                    }`}
                  >
                    <div className="font-semibold text-gray-900">{student.name}</div>
                    <div className="text-xs text-gray-600 space-x-2">
                      <span>Roll: {student.rollNo || "N/A"}</span>
                      <span>
                        Class: {student.class || ""}
                        {student.section || ""}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </Card>

        <Card className="p-4 space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-800">Parent Email</label>
            <Input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="parent@example.com"
            />
          </div>

          {mode === "direct" && (
            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-800">Parent Name</label>
                <Input
                  value={parentName}
                  onChange={(event) => setParentName(event.target.value)}
                  placeholder="Parent full name"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-800">Relation</label>
                <Input
                  value={relation}
                  onChange={(event) => setRelation(event.target.value)}
                  placeholder="e.g., Mother, Father, Guardian"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-800">Contact</label>
                <Input
                  value={contact}
                  onChange={(event) => setContact(event.target.value)}
                  placeholder="Contact number"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-800">Password</label>
                <Input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="At least 6 characters"
                />
              </div>
            </div>
          )}

          <div className="space-y-1 text-sm text-gray-600">
            <div className="font-semibold text-gray-800">Selected Student</div>
            {selectedStudent ? (
              <div className="rounded-md border border-gray-100 p-3 bg-gray-50">
                <div className="font-semibold text-gray-900">{selectedStudent.name}</div>
                <div className="text-xs text-gray-600 space-x-2">
                  <span>Roll: {selectedStudent.rollNo || "N/A"}</span>
                  <span>
                    Class: {selectedStudent.class || ""}
                    {selectedStudent.section || ""}
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-xs text-gray-500">No student selected</div>
            )}
          </div>

          <Button
            type="submit"
            disabled={primaryLoading}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            {primaryLoading
              ? mode === "invite"
                ? "Sending invite..."
                : "Creating parent..."
              : mode === "invite"
                ? "Send Invitation"
                : "Create & Link Parent"}
          </Button>
        </Card>
      </form>
    </div>
  );
}

