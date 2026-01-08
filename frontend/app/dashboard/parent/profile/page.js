"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchParentProfile, updateParentProfile } from "@/store/api/parent.thunk";
import { User, Phone, Heart, Save, AlertCircle, CheckCircle } from "lucide-react";

export default function ParentProfile() {
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector((state) => state.parent);
  
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    dispatch(fetchParentProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        contact: profile.contact || "",
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateSuccess(false);
    
    try {
      await dispatch(updateParentProfile(formData)).unwrap();
      setUpdateSuccess(true);
      setIsEditing(false);
      
      setTimeout(() => {
        setUpdateSuccess(false);
      }, 3000);
    } catch (err) {
      console.error("Failed to update profile:", err);
    }
  };

  const handleCancel = () => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        contact: profile.contact || "",
      });
    }
    setIsEditing(false);
  };

  if (loading && !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center w-full">
        <p>Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 w-full">
        <div className="flex items-center gap-2">
          <AlertCircle />
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 w-full">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <User />
          Profile Settings
        </h1>
        <p className="text-indigo-100 mt-1">Manage your profile information</p>
      </div>

      {/* SUCCESS MESSAGE */}
      {updateSuccess && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center gap-2">
          <CheckCircle size={20} />
          <span>Profile updated successfully!</span>
        </div>
      )}

      {/* PROFILE FORM */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-indigo-50 px-6 py-4 border-b border-indigo-100 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-indigo-900">Personal Information</h2>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-sm font-medium"
            >
              Edit Profile
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Name Field */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <User size={16} className="text-indigo-600" />
              Full Name
            </label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                placeholder="Enter your full name"
              />
            ) : (
              <p className="px-4 py-2 bg-gray-50 rounded-lg text-gray-900">
                {profile?.name || "N/A"}
              </p>
            )}
          </div>

          {/* Contact Field */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Phone size={16} className="text-indigo-600" />
              Contact Number
            </label>
            {isEditing ? (
              <input
                type="tel"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                placeholder="Enter your contact number"
              />
            ) : (
              <p className="px-4 py-2 bg-gray-50 rounded-lg text-gray-900">
                {profile?.contact || "N/A"}
              </p>
            )}
          </div>

          {/* Relation Field (Read-only) */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Heart size={16} className="text-indigo-600" />
              Relation
            </label>
            <p className="px-4 py-2 bg-gray-50 rounded-lg text-gray-900 capitalize">
              {profile?.relation || "N/A"}
            </p>
          </div>

          {/* Action Buttons */}
          {isEditing && (
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save size={18} />
                {loading ? "Saving..." : "Save Changes"}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                disabled={loading}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            </div>
          )}
        </form>
      </div>

      {/* CHILD INFO (READ-ONLY) */}
      {profile?.student && (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-indigo-50 px-6 py-4 border-b border-indigo-100">
            <h2 className="text-xl font-semibold text-indigo-900">Child Information</h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">Student Name</p>
              <p className="font-semibold text-gray-900">{profile.student.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Class & Section</p>
              <p className="font-semibold text-gray-900">
                Class {profile.student.class}-{profile.student.section}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Roll Number</p>
              <p className="font-semibold text-gray-900">{profile.student.rollNo}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
