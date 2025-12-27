"use client";
import React, { useState } from 'react';
import { Users, Calendar, FileText, Search, Info, HelpCircle, Clock, CheckCircle, AlertCircle, UserCheck } from 'lucide-react';

const SchedulePTMForm = () => {
  const [schedulingMode, setSchedulingMode] = useState('individual');
  const [searchStudent, setSearchStudent] = useState('');
  const [searchTeacher, setSearchTeacher] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [showStudentResults, setShowStudentResults] = useState(false);
  const [showTeacherResults, setShowTeacherResults] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errors, setErrors] = useState({});
  
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    agenda: ''
  });

  const mockStudents = [
    { id: 1, name: 'John Doe', studentId: 'ST-2025-001', class: 'Grade 10', section: 'A' },
    { id: 2, name: 'Sarah Connor', studentId: 'ST-2024-089', class: 'Grade 9', section: 'B' },
    { id: 3, name: 'Michael Ross', studentId: 'ST-2023-045', class: 'Grade 11', section: 'A' }
  ];

  const mockTeachers = [
    { id: 1, name: 'Dr. Smith Johnson', teacherId: 'TCH-001', subject: 'Mathematics', available: true },
    { id: 2, name: 'Prof. Emily Davis', teacherId: 'TCH-002', subject: 'English', available: true },
    { id: 3, name: 'Mr. Robert Brown', teacherId: 'TCH-003', subject: 'Physics', available: false }
  ];

  const mockUpcomingPTMs = [
    { date: 'OCT 24', name: 'Sarah Connor', time: '02:00 PM', department: 'Physics Dept' },
    { date: 'OCT 25', name: 'Michael Ross', time: '10:30 AM', department: 'English Dept' }
  ];

  const classes = ['Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'];
  const sections = ['A', 'B', 'C', 'D'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleStudentSearch = (value) => {
    setSearchStudent(value);
    setShowStudentResults(value.length > 0);
  };

  const handleTeacherSearch = (value) => {
    setSearchTeacher(value);
    setShowTeacherResults(value.length > 0);
  };

  const selectStudent = (student) => {
    setSelectedStudent(student);
    setSearchStudent('');
    setShowStudentResults(false);
    if (errors.student) {
      setErrors(prev => ({ ...prev, student: '' }));
    }
  };

  const selectTeacher = (teacher) => {
    setSelectedTeacher(teacher);
    setSearchTeacher('');
    setShowTeacherResults(false);
    if (errors.teacher) {
      setErrors(prev => ({ ...prev, teacher: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (schedulingMode === 'individual') {
      if (!selectedStudent) newErrors.student = 'Please select a student';
    } else {
      if (!selectedClass) newErrors.class = 'Please select a class';
      if (!selectedSection) newErrors.section = 'Please select a section';
    }
    
    if (!selectedTeacher) newErrors.teacher = 'Please select a teacher';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.time) newErrors.time = 'Time slot is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    setSubmitStatus(null);
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitStatus('success');
      
      setTimeout(() => {
        setFormData({ date: '', time: '', agenda: '' });
        setSelectedStudent(null);
        setSelectedTeacher(null);
        setSelectedClass('');
        setSelectedSection('');
        setSubmitStatus(null);
      }, 3000);
      
    } catch (error) {
      setSubmitStatus('error');
      setErrors({ submit: error.message || 'Failed to schedule PTM. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBulkSchedule = async () => {
    setSubmitStatus(null);
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitStatus('bulk-success');
      
      setTimeout(() => {
        setFormData({ date: '', time: '', agenda: '' });
        setSelectedStudent(null);
        setSelectedTeacher(null);
        setSelectedClass('');
        setSelectedSection('');
        setSubmitStatus(null);
      }, 3000);
      
    } catch (error) {
      setSubmitStatus('error');
      setErrors({ submit: error.message || 'Failed to schedule PTMs. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredStudents = searchStudent 
    ? mockStudents.filter(s => 
        s.name.toLowerCase().includes(searchStudent.toLowerCase()) ||
        s.studentId.toLowerCase().includes(searchStudent.toLowerCase())
      )
    : [];

  const filteredTeachers = searchTeacher
    ? mockTeachers.filter(t => 
        t.name.toLowerCase().includes(searchTeacher.toLowerCase()) ||
        t.teacherId.toLowerCase().includes(searchTeacher.toLowerCase())
      )
    : [];

  return (
    <div className=" bg-gray-50 p-6">
      <div className=" mx-auto">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <span className="hover:text-blue-600 cursor-pointer">Dashboard</span>
          <span>›</span>
          <span className="hover:text-blue-600 cursor-pointer">PTM Management</span>
          <span>›</span>
          <span className="text-gray-900 font-medium">Create New</span>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Schedule New PTM</h1>
            <p className="text-gray-600 text-sm">
              Fill in the details below to organize a new parent-teacher session. Ensure all participants are available at the selected time.
            </p>
          </div>
          <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm">
            <HelpCircle className="w-4 h-4" />
            Need Help?
          </button>
        </div>

        {submitStatus === 'success' && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-green-900">PTM Scheduled Successfully!</h3>
              <p className="text-sm text-green-700">The parent-teacher meeting has been scheduled and notifications sent.</p>
            </div>
          </div>
        )}

        {submitStatus === 'bulk-success' && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-green-900">Bulk PTMs Scheduled Successfully!</h3>
              <p className="text-sm text-green-700">
                PTMs have been scheduled for all students in {selectedClass} - Section {selectedSection}.
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm">
              <div className="p-6 border-b border-gray-100">
                <div className="flex gap-2">
                  <button
                    onClick={() => setSchedulingMode('individual')}
                    className={`flex-1 py-3 px-4 rounded-lg font-medium text-sm transition-all ${
                      schedulingMode === 'individual'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <UserCheck className="w-4 h-4 inline-block mr-2" />
                    Individual Student
                  </button>
                  <button
                    onClick={() => setSchedulingMode('bulk')}
                    className={`flex-1 py-3 px-4 rounded-lg font-medium text-sm transition-all ${
                      schedulingMode === 'bulk'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Users className="w-4 h-4 inline-block mr-2" />
                    Entire Class
                  </button>
                </div>
                {schedulingMode === 'bulk' && (
                  <div className="mt-3 bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-start gap-2">
                    <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-blue-700">
                      <strong>Bulk Mode:</strong> Schedule PTMs for all students in a class at once.
                    </p>
                  </div>
                )}
              </div>

              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center gap-2 mb-6">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-900">Participants</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {schedulingMode === 'individual' ? (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Student
                      </label>
                      {!selectedStudent ? (
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="text"
                            value={searchStudent}
                            onChange={(e) => handleStudentSearch(e.target.value)}
                            placeholder="Search by Name or ID..."
                            className={`w-full pl-10 pr-4 py-2.5 border ${errors.student ? 'border-red-300' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm`}
                          />
                          {showStudentResults && filteredStudents.length > 0 && (
                            <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                              {filteredStudents.map(student => (
                                <div
                                  key={student.id}
                                  onClick={() => selectStudent(student)}
                                  className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-0"
                                >
                                  <h4 className="font-medium text-gray-900 text-sm">{student.name}</h4>
                                  <p className="text-xs text-gray-500">{student.studentId}</p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold text-gray-900 text-sm">{selectedStudent.name}</h4>
                            <p className="text-xs text-gray-600">{selectedStudent.studentId}</p>
                          </div>
                          <button
                            onClick={() => setSelectedStudent(null)}
                            className="text-blue-600 hover:text-blue-700 text-xs font-medium"
                          >
                            Change
                          </button>
                        </div>
                      )}
                      {errors.student && <p className="text-red-500 text-xs mt-1">{errors.student}</p>}
                      <p className="text-xs text-gray-500 mt-1">e.g., John Doe (ST-2025-001)</p>
                    </div>
                  ) : (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Select Class
                        </label>
                        <select
                          value={selectedClass}
                          onChange={(e) => {
                            setSelectedClass(e.target.value);
                            if (errors.class) setErrors(prev => ({ ...prev, class: '' }));
                          }}
                          className={`w-full px-4 py-2.5 border ${errors.class ? 'border-red-300' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white`}
                        >
                          <option value="">Select class...</option>
                          {classes.map(cls => (
                            <option key={cls} value={cls}>{cls}</option>
                          ))}
                        </select>
                        {errors.class && <p className="text-red-500 text-xs mt-1">{errors.class}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Select Section
                        </label>
                        <select
                          value={selectedSection}
                          onChange={(e) => {
                            setSelectedSection(e.target.value);
                            if (errors.section) setErrors(prev => ({ ...prev, section: '' }));
                          }}
                          className={`w-full px-4 py-2.5 border ${errors.section ? 'border-red-300' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white`}
                        >
                          <option value="">Select section...</option>
                          {sections.map(sec => (
                            <option key={sec} value={sec}>Section {sec}</option>
                          ))}
                        </select>
                        {errors.section && <p className="text-red-500 text-xs mt-1">{errors.section}</p>}
                      </div>
                    </>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Teacher
                    </label>
                    {!selectedTeacher ? (
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          value={searchTeacher}
                          onChange={(e) => handleTeacherSearch(e.target.value)}
                          placeholder="Search by Name or ID..."
                          className={`w-full pl-10 pr-4 py-2.5 border ${errors.teacher ? 'border-red-300' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm`}
                        />
                        {showTeacherResults && filteredTeachers.length > 0 && (
                          <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                            {filteredTeachers.map(teacher => (
                              <div
                                key={teacher.id}
                                onClick={() => teacher.available && selectTeacher(teacher)}
                                className={`p-3 border-b border-gray-100 last:border-0 ${
                                  teacher.available 
                                    ? 'hover:bg-gray-50 cursor-pointer' 
                                    : 'opacity-50 cursor-not-allowed'
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <div>
                                    <h4 className="font-medium text-gray-900 text-sm">{teacher.name}</h4>
                                    <p className="text-xs text-gray-500">{teacher.teacherId}</p>
                                  </div>
                                  {!teacher.available && (
                                    <span className="text-xs text-red-600 font-medium">Unavailable</span>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-900 text-sm">{selectedTeacher.name}</h4>
                          <p className="text-xs text-gray-600">{selectedTeacher.subject}</p>
                        </div>
                        <button
                          onClick={() => setSelectedTeacher(null)}
                          className="text-green-600 hover:text-green-700 text-xs font-medium"
                        >
                          Change
                        </button>
                      </div>
                    )}
                    {errors.teacher && <p className="text-red-500 text-xs mt-1">{errors.teacher}</p>}
                    <p className="text-xs text-gray-500 mt-1">Class teacher is pre-selected if available.</p>
                  </div>
                </div>
              </div>

              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center gap-2 mb-6">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Calendar className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-900">Schedule</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 border ${errors.date ? 'border-red-300' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm`}
                    />
                    {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Time Slot
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <select
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-2.5 border ${errors.time ? 'border-red-300' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white appearance-none`}
                      >
                        <option value="">Select a time...</option>
                        <option value="09:00">09:00 AM</option>
                        <option value="10:00">10:00 AM</option>
                        <option value="11:00">11:00 AM</option>
                        <option value="14:00">02:00 PM</option>
                        <option value="15:00">03:00 PM</option>
                        <option value="16:00">04:00 PM</option>
                      </select>
                    </div>
                    {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time}</p>}
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-900">Details</h2>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Agenda / Notes <span className="text-gray-400">(Optional)</span>
                  </label>
                  <textarea
                    name="agenda"
                    value={formData.agenda}
                    onChange={handleChange}
                    placeholder="Enter meeting agenda or specific topics to discuss..."
                    rows="4"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
                  />
                </div>
              </div>

              <div className="p-6 bg-gray-50 rounded-b-2xl flex items-center justify-between border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => {
                    setFormData({ date: '', time: '', agenda: '' });
                    setSelectedStudent(null);
                    setSelectedTeacher(null);
                    setSelectedClass('');
                    setSelectedSection('');
                    setErrors({});
                    setSubmitStatus(null);
                  }}
                  className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium text-sm"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={schedulingMode === 'bulk' ? handleBulkSchedule : handleSubmit}
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Scheduling...
                    </>
                  ) : (
                    <>
                      <Calendar className="w-4 h-4" />
                      {schedulingMode === 'bulk' ? 'Schedule for Class' : 'Schedule Meeting'}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Info className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-gray-900">Quick Guidelines</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                  <p className="text-sm text-gray-700">Standard meeting duration is 30 minutes.</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                  <p className="text-sm text-gray-700">Notifications will be sent to both parents and teachers via email.</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                  <p className="text-sm text-gray-700">Check teacher availability before scheduling.</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900">Upcoming PTMs</h3>
                <button className="text-blue-600 text-xs font-medium hover:text-blue-700">
                  View All
                </button>
              </div>
              <div className="space-y-3">
                {mockUpcomingPTMs.map((ptm, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="text-center bg-white rounded-lg px-3 py-2 border border-gray-200">
                      <div className="text-blue-600 text-xs font-medium">{ptm.date.split(' ')[0]}</div>
                      <div className="text-gray-900 text-lg font-bold">{ptm.date.split(' ')[1]}</div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm">{ptm.name}</h4>
                      <p className="text-xs text-gray-500">{ptm.time} • {ptm.department}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchedulePTMForm;