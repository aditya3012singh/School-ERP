"use client";
import React, { useState } from 'react';
import { User, GraduationCap, Home, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';

const CreateStudentForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errors, setErrors] = useState({});
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    rollNo: '',
    className: '',
    section: '',
    dob: '',
    address: ''
  });

  const classes = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12'];
  const sections = ['A', 'B', 'C', 'D', 'E'];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (!formData.rollNo.trim()) newErrors.rollNo = 'Roll number is required';
    if (!formData.className) newErrors.className = 'Class is required';
    if (!formData.section) newErrors.section = 'Section is required';
    if (!formData.dob) newErrors.dob = 'Date of birth is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async () => {
    setSubmitStatus(null);
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real application, you would call your API here:
      // const response = await fetch('/api/students', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      // const data = await response.json();
      
      setSubmitStatus('success');
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          password: '',
          rollNo: '',
          className: '',
          section: '',
          dob: '',
          address: ''
        });
        setSubmitStatus(null);
      }, 3000);
      
    } catch (error) {
      setSubmitStatus('error');
      setErrors({ submit: error.message || 'Failed to create student. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      rollNo: '',
      className: '',
      section: '',
      dob: '',
      address: ''
    });
    setErrors({});
    setSubmitStatus(null);
  };

  return (
    <div className="w-[210%] bg-gray-50 p-6">
      <div className=" mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Student</h1>
          <p className="text-gray-600 text-sm">
            Enter the student's details below to register them in the system. Please ensure all required fields are filled correctly.
          </p>
        </div>

        {/* Success/Error Message */}
        {submitStatus === 'success' && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-green-900">Student Created Successfully!</h3>
              <p className="text-sm text-green-700">The student has been registered in the system.</p>
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

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-sm">
          {/* Account Information */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-blue-100 p-2 rounded-lg">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-lg font-bold text-gray-900">Account Information</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. John Doe"
                  className={`w-full px-4 py-2.5 border ${errors.name ? 'border-red-300' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm`}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. john.doe@school.edu"
                  className={`w-full px-4 py-2.5 border ${errors.email ? 'border-red-300' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
            </div>

            {/* Password */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full px-4 py-2.5 border ${errors.password ? 'border-red-300' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm pr-10`}
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
              <p className="text-xs text-gray-500 mt-1">Min. 8 characters with letters & numbers.</p>
            </div>
          </div>

          {/* Academic Details */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-blue-100 p-2 rounded-lg">
                <GraduationCap className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-lg font-bold text-gray-900">Academic Details</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Roll Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Roll Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="rollNo"
                  value={formData.rollNo}
                  onChange={handleChange}
                  placeholder="e.g. 2024001"
                  className={`w-full px-4 py-2.5 border ${errors.rollNo ? 'border-red-300' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm`}
                />
                {errors.rollNo && <p className="text-red-500 text-xs mt-1">{errors.rollNo}</p>}
              </div>

              {/* Class */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Class <span className="text-red-500">*</span>
                </label>
                <select
                  name="className"
                  value={formData.className}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 border ${errors.className ? 'border-red-300' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white`}
                >
                  <option value="">Select Class</option>
                  {classes.map(cls => (
                    <option key={cls} value={cls}>{cls}</option>
                  ))}
                </select>
                {errors.className && <p className="text-red-500 text-xs mt-1">{errors.className}</p>}
              </div>

              {/* Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Section <span className="text-red-500">*</span>
                </label>
                <select
                  name="section"
                  value={formData.section}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 border ${errors.section ? 'border-red-300' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white`}
                >
                  <option value="">Select Section</option>
                  {sections.map(sec => (
                    <option key={sec} value={sec}>{sec}</option>
                  ))}
                </select>
                {errors.section && <p className="text-red-500 text-xs mt-1">{errors.section}</p>}
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Home className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-lg font-bold text-gray-900">Personal Information</h2>
            </div>

            {/* Date of Birth */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date of Birth <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                placeholder="mm/dd/yyyy"
                className={`w-full px-4 py-2.5 border ${errors.dob ? 'border-red-300' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm`}
              />
              {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob}</p>}
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address <span className="text-red-500">*</span>
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter full residential address..."
                rows="3"
                className={`w-full px-4 py-2.5 border ${errors.address ? 'border-red-300' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none`}
              />
              {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
            </div>
          </div>

          {/* Form Actions */}
          <div className="p-6 bg-gray-50 rounded-b-2xl flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium text-sm"
            >
              Cancel
            </button>
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
                'Create Student'
              )}
            </button>
          </div>
        </div>

        {/* API Integration Note */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <h3 className="font-semibold text-blue-900 text-sm mb-2">🔌 API Integration Ready</h3>
          <p className="text-xs text-blue-700 mb-3">This form is ready to connect to your backend. To integrate with your createStudentService:</p>
          <div className="bg-white rounded-lg p-3 text-xs">
            <code className="text-blue-900">
              <div>const response = await fetch('/api/students', {'{'}</div>
              <div className="ml-4">method: 'POST',</div>
              <div className="ml-4">headers: {'{'} 'Content-Type': 'application/json' {'}'},</div>
              <div className="ml-4">body: JSON.stringify(formData)</div>
              <div>{'});'}</div>
            </code>
          </div>
          <p className="text-xs text-blue-700 mt-2">Form data matches your service parameters: name, email, password, rollNo, className, section, dob, address</p>
        </div>
      </div>
    </div>
  );
};

export default CreateStudentForm;