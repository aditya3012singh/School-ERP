'use client';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { createPTM, createPTMForClass, resetPTMState } from '@/store/api/ptm.thunk';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar as CalendarIcon, Clock, Users as UsersIcon, BookOpen, Search, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

const SchedulePTMForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, success, error } = useSelector((state) => state.ptm);
  
  const [mode, setMode] = useState('individual');
  const [date, setDate] = useState();
  const [time, setTime] = useState('');
  const [agenda, setAgenda] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  // Individual scheduling state
  const [searchStudent, setSearchStudent] = useState('');
  const [searchTeacher, setSearchTeacher] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [showStudentResults, setShowStudentResults] = useState(false);
  const [showTeacherResults, setShowTeacherResults] = useState(false);
  
  // Class scheduling state
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  
  // Mock data - replace with actual API calls
  const [students] = useState([
    { id: 1, name: 'John Doe', studentId: 'ST-2025-001', class: 'Grade 10', section: 'A' },
    { id: 2, name: 'Sarah Connor', studentId: 'ST-2024-089', class: 'Grade 9', section: 'B' },
  ]);
  
  const [teachers] = useState([
    { id: 1, name: 'Dr. Smith Johnson', teacherId: 'TCH-001', subject: 'Mathematics' },
    { id: 2, name: 'Prof. Emily Davis', teacherId: 'TCH-002', subject: 'English' },
  ]);
  
  const classes = ['Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'];
  const sections = ['A', 'B', 'C', 'D'];

  // Reset form when component unmounts
  useEffect(() => {
    return () => {
      dispatch(resetPTMState());
    };
  }, [dispatch]);
  
  // Handle success/error messages
  useEffect(() => {
    if (success) {
      toast.success('PTM scheduled successfully!');
      router.push('/dashboard/admin/ptm');
    }
    
    if (error) {
      toast.error(error);
    }
  }, [success, error, router]);
  
  const validateForm = () => {
    const errors = {};
    
    if (!date) errors.date = 'Date is required';
    if (!time) errors.time = 'Time is required';
    
    if (mode === 'individual') {
      if (!selectedStudent) errors.student = 'Please select a student';
      if (!selectedTeacher) errors.teacher = 'Please select a teacher';
    } else {
      if (!selectedClass) errors.class = 'Please select a class';
      if (!selectedSection) errors.section = 'Please select a section';
      if (!selectedTeacher) errors.teacher = 'Please select a teacher';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const ptmData = {
      date: date.toISOString().split('T')[0],
      time,
      agenda: agenda || 'General discussion about student progress',
      teacherId: selectedTeacher?.id
    };
    
    try {
      setIsSubmitting(true);
      
      if (mode === 'individual') {
        ptmData.studentId = selectedStudent?.id;
        await dispatch(createPTM(ptmData)).unwrap();
      } else {
        ptmData.className = selectedClass;
        ptmData.section = selectedSection;
        await dispatch(createPTMForClass(ptmData)).unwrap();
      }
      
      setSubmitStatus('success');
      toast.success('PTM scheduled successfully!');
      
      // Reset form after successful submission
      setDate(undefined);
      setTime('');
      setAgenda('');
      setSelectedStudent(null);
      setSelectedTeacher(null);
      setSelectedClass('');
      setSelectedSection('');
      setSearchStudent('');
      setSearchTeacher('');
      
    } catch (error) {
      setSubmitStatus('error');
      toast.error(error.message || 'Failed to schedule PTM');
    } finally {
      setIsSubmitting(false);
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
    if (formErrors.student) {
      setFormErrors(prev => ({ ...prev, student: '' }));
    }
  };

  const selectTeacher = (teacher) => {
    setSelectedTeacher(teacher);
    setSearchTeacher('');
    setShowTeacherResults(false);
    if (formErrors.teacher) {
      setFormErrors(prev => ({ ...prev, teacher: '' }));
    }
  };

  const filteredStudents = searchStudent 
    ? students.filter(s => 
        s.name.toLowerCase().includes(searchStudent.toLowerCase()) ||
        s.studentId.toLowerCase().includes(searchStudent.toLowerCase())
      )
    : [];

  const filteredTeachers = searchTeacher
    ? teachers.filter(t => 
        t.name.toLowerCase().includes(searchTeacher.toLowerCase()) ||
        t.teacherId.toLowerCase().includes(searchTeacher.toLowerCase())
      )
    : [];

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Schedule Parent-Teacher Meeting</h1>
        <p className="text-muted-foreground">
          Schedule meetings between parents and teachers to discuss student progress
        </p>
      </div>
      
      <Card className="mb-8">
        <CardHeader>
          <Tabs 
            value={mode} 
            onValueChange={setMode}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 max-w-md">
              <TabsTrigger value="individual">Individual Student</TabsTrigger>
              <TabsTrigger value="class">Entire Class</TabsTrigger>
            </TabsList>
            
            <TabsContent value="individual" className="mt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Student Selection */}
                  <div className="space-y-2">
                    <Label htmlFor="student">Student</Label>
                    <div className="relative">
                      <div className="relative">
                        <Input
                          id="student"
                          placeholder="Search student by name or ID"
                          value={selectedStudent ? `${selectedStudent.name} (${selectedStudent.studentId})` : searchStudent}
                          onChange={(e) => {
                            setSearchStudent(e.target.value);
                            if (e.target.value === '') setSelectedStudent(null);
                          }}
                          onFocus={() => setSearchStudent('')}
                        />
                        <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                      </div>
                      
                      {searchStudent && !selectedStudent && filteredStudents.length > 0 && (
                        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border">
                          {filteredStudents.map((student) => (
                            <div
                              key={student.id}
                              className="px-4 py-2 hover:bg-gray-50 cursor-pointer"
                              onClick={() => {
                                setSelectedStudent(student);
                                setSearchStudent('');
                              }}
                            >
                              <div className="font-medium">{student.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {student.studentId} • {student.class} {student.section}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    {formErrors.student && (
                      <p className="text-sm text-red-500">{formErrors.student}</p>
                    )}
                  </div>
                  
                  {/* Teacher Selection */}
                  <div className="space-y-2">
                    <Label htmlFor="teacher">Teacher</Label>
                    <div className="relative">
                      <Input
                        id="teacher"
                        placeholder="Search teacher by name or ID"
                        value={selectedTeacher ? `${selectedTeacher.name} (${selectedTeacher.teacherId})` : searchTeacher}
                        onChange={(e) => {
                          setSearchTeacher(e.target.value);
                          if (e.target.value === '') setSelectedTeacher(null);
                        }}
                        onFocus={() => setSearchTeacher('')}
                      />
                      <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                      
                      {searchTeacher && !selectedTeacher && filteredTeachers.length > 0 && (
                        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border">
                          {filteredTeachers.map((teacher) => (
                            <div
                              key={teacher.id}
                              className="px-4 py-2 hover:bg-gray-50 cursor-pointer"
                              onClick={() => {
                                setSelectedTeacher(teacher);
                                setSearchTeacher('');
                              }}
                            >
                              <div className="font-medium">{teacher.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {teacher.teacherId} • {teacher.subject}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    {formErrors.teacher && (
                      <p className="text-sm text-red-500">{formErrors.teacher}</p>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Date Picker */}
                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    {formErrors.date && (
                      <p className="text-sm text-red-500">{formErrors.date}</p>
                    )}
                  </div>
                  
                  {/* Time Input */}
                  <div className="space-y-2">
                    <Label htmlFor="time">Time</Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="time"
                        type="time"
                        className="pl-10"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                      />
                    </div>
                    {formErrors.time && (
                      <p className="text-sm text-red-500">{formErrors.time}</p>
                    )}
                  </div>
                </div>
                
                {/* Agenda */}
                <div className="space-y-2">
                  <Label htmlFor="agenda">Agenda (Optional)</Label>
                  <Input
                    id="agenda"
                    placeholder="Enter meeting agenda or discussion points"
                    value={agenda}
                    onChange={(e) => setAgenda(e.target.value)}
                  />
                </div>
                
                <div className="flex justify-end space-x-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push('/dashboard/admin/ptm')}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Scheduling...
                      </>
                    ) : (
                      'Schedule Meeting'
                    )}
                  </Button>
                </div>
              </form>
            </TabsContent>
            
            <TabsContent value="class" className="mt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Class Selection */}
                  <div className="space-y-2">
                    <Label htmlFor="class">Class</Label>
                    <Select 
                      value={selectedClass} 
                      onValueChange={setSelectedClass}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select class" />
                      </SelectTrigger>
                      <SelectContent>
                        {classes.map((cls) => (
                          <SelectItem key={cls} value={cls}>
                            {cls}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {formErrors.class && (
                      <p className="text-sm text-red-500">{formErrors.class}</p>
                    )}
                  </div>
                  
                  {/* Section Selection */}
                  <div className="space-y-2">
                    <Label htmlFor="section">Section</Label>
                    <Select 
                      value={selectedSection} 
                      onValueChange={setSelectedSection}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select section" />
                      </SelectTrigger>
                      <SelectContent>
                        {sections.map((section) => (
                          <SelectItem key={section} value={section}>
                            Section {section}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {formErrors.section && (
                      <p className="text-sm text-red-500">{formErrors.section}</p>
                    )}
                  </div>
                </div>
                
                {/* Teacher Selection (Same as individual) */}
                <div className="space-y-2">
                  <Label htmlFor="teacher">Teacher</Label>
                  <div className="relative">
                    <Input
                      id="teacher"
                      placeholder="Search teacher by name or ID"
                      value={selectedTeacher ? `${selectedTeacher.name} (${selectedTeacher.teacherId})` : searchTeacher}
                      onChange={(e) => {
                        setSearchTeacher(e.target.value);
                        if (e.target.value === '') setSelectedTeacher(null);
                      }}
                      onFocus={() => setSearchTeacher('')}
                    />
                    <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                    
                    {searchTeacher && !selectedTeacher && filteredTeachers.length > 0 && (
                      <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border">
                        {filteredTeachers.map((teacher) => (
                          <div
                            key={teacher.id}
                            className="px-4 py-2 hover:bg-gray-50 cursor-pointer"
                            onClick={() => {
                              setSelectedTeacher(teacher);
                              setSearchTeacher('');
                            }}
                          >
                            <div className="font-medium">{teacher.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {teacher.teacherId} • {teacher.subject}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {formErrors.teacher && (
                    <p className="text-sm text-red-500">{formErrors.teacher}</p>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Date Picker */}
                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    {formErrors.date && (
                      <p className="text-sm text-red-500">{formErrors.date}</p>
                    )}
                  </div>
                  
                  {/* Time Input */}
                  <div className="space-y-2">
                    <Label htmlFor="time">Time</Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="time"
                        type="time"
                        className="pl-10"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                      />
                    </div>
                    {formErrors.time && (
                      <p className="text-sm text-red-500">{formErrors.time}</p>
                    )}
                  </div>
                </div>
                
                {/* Agenda */}
                <div className="space-y-2">
                  <Label htmlFor="agenda">Agenda (Optional)</Label>
                  <Input
                    id="agenda"
                    placeholder="Enter meeting agenda or discussion points"
                    value={agenda}
                    onChange={(e) => setAgenda(e.target.value)}
                  />
                </div>
                
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <AlertCircle className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        This will schedule PTMs for all students in {selectedClass} {selectedSection} with {selectedTeacher?.name}.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    type="button"
                    variant="outline"
                    onClick={() => router.push('/dashboard/admin/ptm')}
                  >
                    Cancel
                  </button>
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Scheduling...
                      </>
                    ) : (
                      'Schedule for Entire Class'
                    )}
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </CardHeader>
      </Card>
      
      {/* Help Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <HelpCircle className="mr-2 h-5 w-5 text-primary" />
            Need Help?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <UsersIcon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-medium">Individual Scheduling</h4>
                <p className="text-sm text-muted-foreground">
                  Schedule a meeting for a specific student with a teacher.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-medium">Class Scheduling</h4>
                <p className="text-sm text-muted-foreground">
                  Schedule meetings for all students in a class with a teacher.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SchedulePTMForm;