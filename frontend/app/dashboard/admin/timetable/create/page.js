"use client";
import React, { useState } from 'react';
import { Calendar, Clock, Book, Users, HelpCircle, CheckCircle, AlertCircle, Trash2, Plus } from 'lucide-react';

const TimetableCreator = () => {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errors, setErrors] = useState({});

  // Define time slots
  const timeSlots = [
    { id: 1, start: '08:00', end: '09:00', label: '8:00 AM - 9:00 AM' },
    { id: 2, start: '09:00', end: '10:00', label: '9:00 AM - 10:00 AM' },
    { id: 3, start: '10:00', end: '11:00', label: '10:00 AM - 11:00 AM' },
    { id: 4, start: '11:00', end: '12:00', label: '11:00 AM - 12:00 PM' },
    { id: 5, start: '12:00', end: '13:00', label: '12:00 PM - 1:00 PM', isBreak: true },
    { id: 6, start: '13:00', end: '14:00', label: '1:00 PM - 2:00 PM' },
    { id: 7, start: '14:00', end: '15:00', label: '2:00 PM - 3:00 PM' },
    { id: 8, start: '15:00', end: '16:00', label: '3:00 PM - 4:00 PM' },
  ];

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const classes = ['Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'];
  const sections = ['A', 'B', 'C', 'D'];

  // Mock subjects and teachers
  const mockSubjects = [
    { id: 1, name: 'Mathematics', code: 'MATH' },
    { id: 2, name: 'English', code: 'ENG' },
    { id: 3, name: 'Physics', code: 'PHY' },
    { id: 4, name: 'Chemistry', code: 'CHEM' },
    { id: 5, name: 'Biology', code: 'BIO' },
    { id: 6, name: 'History', code: 'HIST' },
    { id: 7, name: 'Geography', code: 'GEO' },
    { id: 8, name: 'Computer Science', code: 'CS' },
  ];

  const mockTeachers = [
    { id: 1, name: 'Dr. Smith', subjects: [1, 3] },
    { id: 2, name: 'Prof. Johnson', subjects: [2] },
    { id: 3, name: 'Ms. Williams', subjects: [4, 5] },
    { id: 4, name: 'Mr. Brown', subjects: [6, 7] },
    { id: 5, name: 'Dr. Davis', subjects: [8] },
  ];

  // Initialize timetable state
  const [timetable, setTimetable] = useState(() => {
    const initial = {};
    days.forEach(day => {
      initial[day] = {};
      timeSlots.forEach(slot => {
        if (!slot.isBreak) {
          initial[day][slot.id] = { subjectId: '', teacherId: '' };
        }
      });
    });
    return initial;
  });

  const handleSlotChange = (day, slotId, field, value) => {
    setTimetable(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [slotId]: {
          ...prev[day][slotId],
          [field]: value
        }
      }
    }));
  };

  const getAvailableTeachers = (subjectId, day, slotId) => {
    if (!subjectId) return [];
    
    // Filter teachers who teach this subject
    const teachersForSubject = mockTeachers.filter(t => 
      t.subjects.includes(parseInt(subjectId))
    );

    // Check if teacher is already assigned in this slot on this day
    return teachersForSubject.map(teacher => {
      const isAssigned = Object.keys(timetable[day] || {}).some(slot => 
        slot !== slotId.toString() && timetable[day][slot]?.teacherId === teacher.id.toString()
      );
      return { ...teacher, available: !isAssigned };
    });
  };

  const clearSlot = (day, slotId) => {
    setTimetable(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [slotId]: { subjectId: '', teacherId: '' }
      }
    }));
  };

  const clearDay = (day) => {
    setTimetable(prev => ({
      ...prev,
      [day]: Object.keys(prev[day]).reduce((acc, slotId) => {
        acc[slotId] = { subjectId: '', teacherId: '' };
        return acc;
      }, {})
    }));
  };

  const validateTimetable = () => {
    const newErrors = {};
    
    if (!selectedClass) newErrors.class = 'Please select a class';
    if (!selectedSection) newErrors.section = 'Please select a section';

    let hasAnySlot = false;
    days.forEach(day => {
      Object.keys(timetable[day] || {}).forEach(slotId => {
        const slot = timetable[day][slotId];
        if (slot.subjectId || slot.teacherId) {
          hasAnySlot = true;
          if (slot.subjectId && !slot.teacherId) {
            newErrors[`${day}-${slotId}`] = 'Please assign a teacher';
          }
          if (!slot.subjectId && slot.teacherId) {
            newErrors[`${day}-${slotId}`] = 'Please select a subject';
          }
        }
      });
    });

    if (!hasAnySlot) {
      newErrors.slots = 'Please configure at least one time slot';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    setSubmitStatus(null);
    
    if (!validateTimetable()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare timetable entries
      const entries = [];
      days.forEach(day => {
        Object.keys(timetable[day]).forEach(slotId => {
          const slot = timetable[day][slotId];
          if (slot.subjectId && slot.teacherId) {
            const timeSlot = timeSlots.find(ts => ts.id.toString() === slotId);
            entries.push({
              className: selectedClass,
              section: selectedSection,
              day,
              startTime: timeSlot.start,
              endTime: timeSlot.end,
              subjectId: parseInt(slot.subjectId),
              teacherId: parseInt(slot.teacherId)
            });
          }
        });
      });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In real app:
      // const response = await fetch('/api/timetable/create-bulk', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ entries })
      // });
      
      setSubmitStatus('success');
      
      setTimeout(() => {
        setSelectedClass('');
        setSelectedSection('');
        setTimetable(() => {
          const initial = {};
          days.forEach(day => {
            initial[day] = {};
            timeSlots.forEach(slot => {
              if (!slot.isBreak) {
                initial[day][slot.id] = { subjectId: '', teacherId: '' };
              }
            });
          });
          return initial;
        });
        setSubmitStatus(null);
      }, 3000);
      
    } catch (error) {
      setSubmitStatus('error');
      setErrors({ submit: error.message || 'Failed to create timetable. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className=" bg-gray-50 p-6">
      <div className="mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <span className="hover:text-blue-600 cursor-pointer">Dashboard</span>
          <span>›</span>
          <span className="hover:text-blue-600 cursor-pointer">Timetable</span>
          <span>›</span>
          <span className="text-gray-900 font-medium">Create Entry</span>
        </div>

        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Timetable Entry</h1>
            <p className="text-gray-600 text-sm">
              Configure class schedules by assigning teachers and subjects to specific time slots. Ensure there are no scheduling conflicts before saving.
            </p>
          </div>
          <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm">
            <HelpCircle className="w-4 h-4" />
            Help & Documentation
          </button>
        </div>

        {/* Success/Error Messages */}
        {submitStatus === 'success' && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-green-900">Timetable Created Successfully!</h3>
              <p className="text-sm text-green-700">The class schedule has been configured and saved.</p>
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

        {errors.slots && (
          <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-yellow-700">{errors.slots}</p>
            </div>
          </div>
        )}

        {/* Main Form */}
        <div className="bg-white rounded-2xl shadow-sm">
          {/* Class Details */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-lg font-bold text-gray-900">Class Details</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Class Name
                </label>
                <input
                  type="text"
                  value={selectedClass}
                  onChange={(e) => {
                    setSelectedClass(e.target.value);
                    if (errors.class) setErrors(prev => ({ ...prev, class: '' }));
                  }}
                  placeholder="e.g. Grade 10"
                  className={`w-full px-4 py-2.5 border ${errors.class ? 'border-red-300' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm`}
                />
                {errors.class && <p className="text-red-500 text-xs mt-1">{errors.class}</p>}
                <p className="text-xs text-gray-500 mt-1">The grade level for this schedule.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Section
                </label>
                <select
                  value={selectedSection}
                  onChange={(e) => {
                    setSelectedSection(e.target.value);
                    if (errors.section) setErrors(prev => ({ ...prev, section: '' }));
                  }}
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

          {/* Timetable Grid */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-lg font-bold text-gray-900">Schedule Timing</h2>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-3 h-3 bg-green-100 border border-green-300 rounded" />
                  <span className="text-gray-600">Available</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-3 h-3 bg-red-100 border border-red-300 rounded" />
                  <span className="text-gray-600">Busy</span>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-900 sticky left-0 bg-gray-50 z-10">
                      Time Slot
                    </th>
                    {days.map(day => (
                      <th key={day} className="border border-gray-200 px-4 py-3 text-center text-sm font-semibold text-gray-900 min-w-[200px]">
                        <div className="flex items-center justify-between">
                          <span>{day}</span>
                          <button
                            onClick={() => clearDay(day)}
                            className="text-red-600 hover:text-red-700 text-xs"
                            title="Clear day"
                          >
                            Clear
                          </button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {timeSlots.map(slot => (
                    <tr key={slot.id}>
                      <td className="border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 sticky left-0 bg-white z-10">
                        {slot.label}
                      </td>
                      {days.map(day => (
                        <td key={`${day}-${slot.id}`} className="border border-gray-200 p-2">
                          {slot.isBreak ? (
                            <div className="text-center py-4 bg-orange-50 rounded-lg">
                              <span className="text-sm font-medium text-orange-700">Lunch Break</span>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              {/* Subject Select */}
                              <select
                                value={timetable[day]?.[slot.id]?.subjectId || ''}
                                onChange={(e) => handleSlotChange(day, slot.id, 'subjectId', e.target.value)}
                                className="w-full px-2 py-1.5 border border-gray-200 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                              >
                                <option value="">Select Subject</option>
                                {mockSubjects.map(subject => (
                                  <option key={subject.id} value={subject.id}>
                                    {subject.code}
                                  </option>
                                ))}
                              </select>

                              {/* Teacher Select */}
                              {timetable[day]?.[slot.id]?.subjectId && (
                                <select
                                  value={timetable[day]?.[slot.id]?.teacherId || ''}
                                  onChange={(e) => handleSlotChange(day, slot.id, 'teacherId', e.target.value)}
                                  className="w-full px-2 py-1.5 border border-gray-200 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                                >
                                  <option value="">Select Teacher</option>
                                  {getAvailableTeachers(
                                    timetable[day][slot.id].subjectId,
                                    day,
                                    slot.id
                                  ).map(teacher => (
                                    <option 
                                      key={teacher.id} 
                                      value={teacher.id}
                                      disabled={!teacher.available}
                                      className={teacher.available ? '' : 'text-gray-400'}
                                    >
                                      {teacher.name} {!teacher.available ? '(Busy)' : ''}
                                    </option>
                                  ))}
                                </select>
                              )}

                              {/* Clear Button */}
                              {(timetable[day]?.[slot.id]?.subjectId || timetable[day]?.[slot.id]?.teacherId) && (
                                <button
                                  onClick={() => clearSlot(day, slot.id)}
                                  className="w-full flex items-center justify-center gap-1 px-2 py-1 text-xs text-red-600 hover:bg-red-50 rounded transition-colors"
                                >
                                  <Trash2 className="w-3 h-3" />
                                  Clear
                                </button>
                              )}

                              {/* Error Message */}
                              {errors[`${day}-${slot.id}`] && (
                                <p className="text-red-500 text-xs">{errors[`${day}-${slot.id}`]}</p>
                              )}
                            </div>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Resources Assignment Info */}
          <div className="px-6 pb-6">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Book className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-blue-900 text-sm mb-1">Resources Assignment</h3>
                  <p className="text-xs text-blue-700">
                    Select the subject code or name. Teachers are automatically filtered based on subject expertise and availability. Teachers marked as "Busy" are already assigned to another class during this time slot.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="p-6 bg-gray-50 rounded-b-2xl flex items-center justify-between border-t border-gray-100">
            <button
              type="button"
              onClick={() => {
                setSelectedClass('');
                setSelectedSection('');
                setTimetable(() => {
                  const initial = {};
                  days.forEach(day => {
                    initial[day] = {};
                    timeSlots.forEach(slot => {
                      if (!slot.isBreak) {
                        initial[day][slot.id] = { subjectId: '', teacherId: '' };
                      }
                    });
                  });
                  return initial;
                });
                setErrors({});
                setSubmitStatus(null);
              }}
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
                  Creating Timetable...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  Create Timetable Entry
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimetableCreator;