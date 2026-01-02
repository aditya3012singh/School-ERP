'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPTMs, resetPTMState } from '@/store/api/ptm.thunk';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format } from 'date-fns';
import { PlusCircle, Search } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

export default function PTMPage() {
  const dispatch = useDispatch();
  const { ptms, loading, error } = useSelector((state) => state.ptm);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [role, setRole] = useState('teacher'); // Default to teacher view

  useEffect(() => {
    // Fetch PTMs based on the role
    dispatch(fetchPTMs(role));
    
    // Reset state when component unmounts
    return () => {
      dispatch(resetPTMState());
    };
  }, [dispatch, role]);

  const filteredPTMs = ptms?.filter(ptm => {
    const matchesSearch = 
      ptm.student?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ptm.teacher?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ptm.id?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || ptm.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    const statusMap = {
      SCHEDULED: 'bg-blue-100 text-blue-800',
      COMPLETED: 'bg-green-100 text-green-800',
      CANCELLED: 'bg-red-100 text-red-800',
      RESCHEDULED: 'bg-yellow-100 text-yellow-800',
    };
    
    return (
      <Badge className={`${statusMap[status] || 'bg-gray-100 text-gray-800'}`}>
        {status?.toLowerCase()}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Parent-Teacher Meetings</h1>
          <p className="text-muted-foreground">
            View and manage all scheduled parent-teacher meetings
          </p>
        </div>
        <Link href="/dashboard/admin/ptm/create">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Schedule New PTM
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by student, teacher, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
                
              />
            </div>
            <div className="flex items-center gap-4">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="SCHEDULED">Scheduled</SelectItem>
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                  <SelectItem value="CANCELLED">Cancelled</SelectItem>
                  <SelectItem value="RESCHEDULED">Rescheduled</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="View as" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="teacher">Teacher View</SelectItem>
                  <SelectItem value="student">Student View</SelectItem>
                  <SelectItem value="parent">Parent View</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">{error}</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Teacher</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPTMs?.length > 0 ? (
                  filteredPTMs.map((ptm) => (
                    <TableRow key={ptm.id}>
                      <TableCell className="font-medium">{ptm.student?.name || 'N/A'}</TableCell>
                      <TableCell>{ptm.teacher?.name || 'N/A'}</TableCell>
                      <TableCell>{ptm.date ? format(new Date(ptm.date), 'PP') : 'N/A'}</TableCell>
                      <TableCell>{ptm.time || 'N/A'}</TableCell>
                      <TableCell>{getStatusBadge(ptm.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/dashboard/admin/ptm/${ptm.id}`}>View Details</Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      No PTMs found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}