"use client";
import React, { useState } from 'react';
import { UserPlus, Search, CheckCircle, Eye, EyeOff, Mail, Phone, Lock, AlertCircle } from 'lucide-react';

const AddParentForm = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isInviting, setIsInviting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [registrationMode, setRegistrationMode] = useState('direct'); // 'direct' or 'invite'
  const [errors, setErrors] = useState({});
  
  const [formData, setFormData] = useState({
    fullName: '',
    relationship: '',
    email: '',
    contact: '',
    password: '',
    confirmPassword: ''
  });

  // Mock student data - replace with actual API call
  const mockStudents = [
    { id: 1, name: 'Liam Johnson', studentId: 'STU-2024-089', grade: 'Grade 10-B', avatar: '👨' },
    { id: 2, name: 'Emma Davis', studentId: 'STU-2024-045', grade: 'Grade 9-A', avatar: '👩' },
    { id: 3, name: 'Noah Wilson', studentId: 'STU-2024-112', grade: 'Grade 11-C', avatar: '👦' }
  ];

  const relationships = ['Father', 'Mother', 'Guardian', 'Sibling', 'Other'];

  const handleSearch = (value) => {
    setSearchQuery(value);
    // In real app, debounce and call API
  };

  const handleSelectStudent = (student) => {
    setSelectedStudent(student);
    setSearchQuery('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (isInviteMode = false) => {
    const newErrors = {};
    
    if (!selectedStudent) newErrors.student = 'Please select a student';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Only validate these fields for direct registration
    if (!isInviteMode) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
      if (!formData.relationship) newErrors.relationship = 'Please select a relationship';
      if (!formData.contact.trim()) {
        newErrors.contact = 'Contact number is required';
      } else if (!/^\+?\d{10,15}$/.test(formData.contact.replace(/[\s()-]/g, ''))) {
        newErrors.contact = 'Please enter a valid contact number';
      }
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    setSubmitStatus(null);
    
    if (!validateForm(false)) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real application, call your API:
      // const response = await fetch('/api/parents/link-student', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     studentId: selectedStudent.id,
      //     name: formData.fullName,
      //     email: formData.email,
      //     password: formData.password,
      //     contact: formData.contact,
      //     relation: formData.relationship
      //   })
      // });
      
      setSubmitStatus('success');
      
      // Reset form after success
      setTimeout(() => {
        setFormData({
          fullName: '',
          relationship: '',
          email: '',
          contact: '',
          password: '',
          confirmPassword: ''
        });
        setSelectedStudent(null);
        setSubmitStatus(null);
      }, 3000);
      
    } catch (error) {
      setSubmitStatus('error');
      setErrors({ submit: error.message || 'Failed to link parent. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendInvitation = async () => {
    setSubmitStatus(null);
    
    if (!validateForm(true)) {
      return;
    }

    setIsInviting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real application, call your API:
      // const response = await fetch('/api/parents/invite', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     email: formData.email,
      //     studentId: selectedStudent.id
      //   })
      // });
      
      setSubmitStatus('invited');
      
      // Reset form after success
      setTimeout(() => {
        setFormData({
          fullName: '',
          relationship: '',
          email: '',
          contact: '',
          password: '',
          confirmPassword: ''
        });
        setSelectedStudent(null);
        setSubmitStatus(null);
      }, 3000);
      
    } catch (error) {
      setSubmitStatus('error');
      setErrors({ submit: error.message || 'Failed to send invitation. Please try again.' });
    } finally {
      setIsInviting(false);
    }
  };

  const filteredStudents = searchQuery 
    ? mockStudents.filter(s => 
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.studentId.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className=" bg-gray-50 p-6">
      <div className=" mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <span className="hover:text-blue-600 cursor-pointer">Home</span>
          <span>›</span>
          <span className="hover:text-blue-600 cursor-pointer">Students</span>
          <span>›</span>
          <span className="text-blue-600 font-medium">Add Parent</span>
        </div>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Link Parent to Student</h1>
          <p className="text-gray-600 text-sm">
            Create a new parent account and associate it with an enrolled student record. Ensure the student ID is verified before proceeding.
          </p>
        </div>

        {/* Success/Error Messages */}
        {submitStatus === 'success' && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-green-900">Parent Account Created Successfully!</h3>
              <p className="text-sm text-green-700">The parent account has been created and linked to the student.</p>
            </div>
          </div>
        )}

        {submitStatus === 'invited' && (
          <div className="mb-6 bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
            <Mail className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-900">Invitation Sent Successfully!</h3>
              <p className="text-sm text-blue-700">
                An invitation email has been sent to <strong>{formData.email}</strong>. The parent can set their password using the link provided (valid for 24 hours).
              </p>
            </div>
          </div>
        )}

        {submitStatus === 'error' && errors.submit && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-900">Error</h3>
              <p className="text-sm text-red-700">{errors.submit}</p>
            </div>
          </div>
        )}

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-sm">
          {/* Header */}
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-blue-100 p-2 rounded-lg">
                <UserPlus className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-lg font-bold text-gray-900">Parent Registration Form</h2>
            </div>
            <span className="bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full">
              New Entry
            </span>
          </div>

          {/* Student Search Section */}
          <div className="p-6 border-b border-gray-100">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select Student <span className="text-red-500">*</span>
            </label>
            
            {!selectedStudent ? (
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search by Student Name or ID (e.g. STU-2024-001)"
                  className={`w-full pl-10 pr-4 py-3 border ${errors.student ? 'border-red-300' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm`}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                  Press Enter to verify
                </span>
                
                {/* Search Results Dropdown */}
                {searchQuery && filteredStudents.length > 0 && (
                  <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {filteredStudents.map(student => (
                      <div
                        key={student.id}
                        onClick={() => handleSelectStudent(student)}
                        className="p-3 hover:bg-gray-50 cursor-pointer flex items-center gap-3 border-b border-gray-100 last:border-0"
                      >
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-xl">
                          {student.avatar}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 text-sm">{student.name}</h4>
                          <p className="text-xs text-gray-500">ID: {student.studentId} • {student.grade}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl">
                    {selectedStudent.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{selectedStudent.name}</h4>
                    <p className="text-sm text-gray-600">ID: {selectedStudent.studentId} • {selectedStudent.grade}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-green-700 text-sm font-medium">Verified</span>
                </div>
              </div>
            )}
            {errors.student && <p className="text-red-500 text-xs mt-2">{errors.student}</p>}
          </div>

          {/* Parent Information */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-gray-900">Parent Information</h3>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setRegistrationMode('direct')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    registrationMode === 'direct'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Direct Registration
                </button>
                <button
                  type="button"
                  onClick={() => setRegistrationMode('invite')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    registrationMode === 'invite'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Send Invitation
                </button>
              </div>
            </div>

            {registrationMode === 'invite' && (
              <div className="mb-4 bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-start gap-2">
                <Mail className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-blue-700">
                  <strong>Invitation Mode:</strong> Only email is required. The parent will receive a secure link to set their password and complete their profile.
                </p>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Email - Always visible */}
              <div className={registrationMode === 'invite' ? 'md:col-span-2' : ''}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    className={`w-full pl-10 pr-4 py-2.5 border ${errors.email ? 'border-red-300' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm`}
                  />
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              {/* Show remaining fields only in Direct Registration mode */}
              {registrationMode === 'direct' && (
                <>
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Enter full name"
                      className={`w-full px-4 py-2.5 border ${errors.fullName ? 'border-red-300' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm`}
                    />
                    {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                  </div>

                  {/* Relationship */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Relationship to Student
                    </label>
                    <select
                      name="relationship"
                      value={formData.relationship}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 border ${errors.relationship ? 'border-red-300' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white`}
                    >
                      <option value="">Select relationship</option>
                      {relationships.map(rel => (
                        <option key={rel} value={rel}>{rel}</option>
                      ))}
                    </select>
                    {errors.relationship && <p className="text-red-500 text-xs mt-1">{errors.relationship}</p>}
                  </div>

                  {/* Contact */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="tel"
                        name="contact"
                        value={formData.contact}
                        onChange={handleChange}
                        placeholder="+1 (555) 000-0000"
                        className={`w-full pl-10 pr-4 py-2.5 border ${errors.contact ? 'border-red-300' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm`}
                      />
                    </div>
                    {errors.contact && <p className="text-red-500 text-xs mt-1">{errors.contact}</p>}
                  </div>

                  {/* Create Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Create Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className={`w-full pl-10 pr-10 py-2.5 border ${errors.password ? 'border-red-300' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                    <p className="text-xs text-gray-500 mt-1">Must be at least 8 characters with 1 special symbol.</p>
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className={`w-full pl-10 pr-10 py-2.5 border ${errors.confirmPassword ? 'border-red-300' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Form Actions */}
          <div className="p-6 bg-gray-50 rounded-b-2xl flex items-center justify-end gap-3 border-t border-gray-100">
            <button
              type="button"
              onClick={() => {
                setFormData({
                  fullName: '',
                  relationship: '',
                  email: '',
                  contact: '',
                  password: '',
                  confirmPassword: ''
                });
                setSelectedStudent(null);
                setErrors({});
                setSubmitStatus(null);
              }}
              className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium text-sm"
            >
              Cancel
            </button>
            
            {registrationMode === 'invite' ? (
              <button
                type="button"
                onClick={handleSendInvitation}
                disabled={isInviting}
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isInviting ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4" />
                    Send Invitation
                  </>
                )}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Creating...
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" />
                    Add Parent
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* API Integration Note */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <h3 className="font-semibold text-blue-900 text-sm mb-2">🔌 Backend Integration</h3>
          <p className="text-xs text-blue-700 mb-3">This form supports both registration modes:</p>
          
          <div className="space-y-3">
            <div className="bg-white rounded-lg p-3">
              <p className="text-xs font-semibold text-blue-900 mb-2">1. Direct Registration (addParentToStudentService)</p>
              <code className="block text-xs text-blue-900">
                <div>POST /api/parents/link-student</div>
                <div className="mt-1">{'{'}</div>
                <div className="ml-4">studentId, name, email, password, contact, relation</div>
                <div>{'}'}</div>
              </code>
            </div>
            
            <div className="bg-white rounded-lg p-3">
              <p className="text-xs font-semibold text-blue-900 mb-2">2. Send Invitation (inviteParentService)</p>
              <code className="block text-xs text-blue-900">
                <div>POST /api/parents/invite</div>
                <div className="mt-1">{'{'}</div>
                <div className="ml-4">email, studentId</div>
                <div>{'}'}</div>
              </code>
              <p className="text-xs text-blue-700 mt-2">
                ✉️ Generates a token, stores invite in DB, and sends email with 24-hour link to set password
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddParentForm;