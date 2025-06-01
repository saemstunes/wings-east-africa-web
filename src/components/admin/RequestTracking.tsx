
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { TrendingUp, Clock, User, AlertCircle, CheckCircle, Calendar, MessageSquare } from 'lucide-react';

interface RequestTracking {
  id: string;
  contact_submission_id: number;
  quote_id: string | null;
  status: string;
  status_updated_at: string;
  notes: string | null;
  assigned_to: string | null;
  priority: string;
  follow_up_date: string | null;
  customer_notified_at: string | null;
  created_at: string;
  updated_at: string;
  contact_submissions: {
    name: string;
    email: string;
    company: string;
    subject: string;
    product_name: string;
  };
  quotes: {
    quote_number: string;
    amount: number;
  } | null;
}

const RequestTracking = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedRequest, setSelectedRequest] = useState<RequestTracking | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');

  // Fetch request tracking data
  const { data: requests, isLoading } = useQuery({
    queryKey: ['request-tracking', filterStatus, filterPriority],
    queryFn: async () => {
      let query = supabase
        .from('request_tracking')
        .select(`
          *,
          contact_submissions (
            name,
            email,
            company,
            subject,
            product_name
          ),
          quotes (
            quote_number,
            amount
          )
        `)
        .order('created_at', { ascending: false });

      if (filterStatus !== 'all') {
        query = query.eq('status', filterStatus);
      }
      if (filterPriority !== 'all') {
        query = query.eq('priority', filterPriority);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as RequestTracking[];
    },
  });

  // Update request mutation
  const updateRequestMutation = useMutation({
    mutationFn: async (updates: { id: string; status?: string; notes?: string; assigned_to?: string; priority?: string; follow_up_date?: string }) => {
      const { error } = await supabase
        .from('request_tracking')
        .update(updates)
        .eq('id', updates.id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Request Updated",
        description: "Request tracking information has been updated successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['request-tracking'] });
      setSelectedRequest(null);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update request. Please try again.",
        variant: "destructive"
      });
    }
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'quoted': return 'bg-purple-100 text-purple-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'normal': return 'secondary';
      case 'low': return 'outline';
      default: return 'secondary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted': return <Clock className="h-4 w-4" />;
      case 'in_progress': return <TrendingUp className="h-4 w-4" />;
      case 'quoted': return <MessageSquare className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'cancelled': return <AlertCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const handleUpdateRequest = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedRequest) return;

    const formData = new FormData(e.currentTarget);
    const updates = {
      id: selectedRequest.id,
      status: formData.get('status') as string,
      notes: formData.get('notes') as string,
      assigned_to: formData.get('assigned_to') as string,
      priority: formData.get('priority') as string,
      follow_up_date: formData.get('follow_up_date') as string || null,
    };

    updateRequestMutation.mutate(updates);
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loading request tracking...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Request Tracking
              </CardTitle>
              <CardDescription>
                Monitor and manage customer request lifecycle
              </CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full sm:w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="submitted">Submitted</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="quoted">Quoted</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterPriority} onValueChange={setFilterPriority}>
                <SelectTrigger className="w-full sm:w-32">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Follow Up</TableHead>
                  <TableHead>Quote</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests?.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{request.contact_submissions.name}</p>
                        <p className="text-sm text-muted-foreground">{request.contact_submissions.email}</p>
                        {request.contact_submissions.product_name && (
                          <p className="text-xs text-muted-foreground">
                            {request.contact_submissions.product_name}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(request.status)}>
                        <span className="flex items-center gap-1">
                          {getStatusIcon(request.status)}
                          {request.status.replace('_', ' ')}
                        </span>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getPriorityColor(request.priority)}>
                        {request.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {request.assigned_to ? (
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {request.assigned_to}
                        </div>
                      ) : (
                        <span className="text-muted-foreground">Unassigned</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {request.follow_up_date ? (
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(request.follow_up_date).toLocaleDateString()}
                        </div>
                      ) : (
                        '-'
                      )}
                    </TableCell>
                    <TableCell>
                      {request.quotes ? (
                        <div>
                          <p className="font-medium">{request.quotes.quote_number}</p>
                          <p className="text-sm text-muted-foreground">
                            ${request.quotes.amount?.toFixed(2) || 'TBD'}
                          </p>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">No quote</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedRequest(request)}
                          >
                            Manage
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Manage Request</DialogTitle>
                            <DialogDescription>
                              Update request status, assign team members, and add notes
                            </DialogDescription>
                          </DialogHeader>
                          {selectedRequest && (
                            <form onSubmit={handleUpdateRequest} className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label htmlFor="status">Status</Label>
                                  <Select name="status" defaultValue={selectedRequest.status}>
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="submitted">Submitted</SelectItem>
                                      <SelectItem value="in_progress">In Progress</SelectItem>
                                      <SelectItem value="quoted">Quoted</SelectItem>
                                      <SelectItem value="completed">Completed</SelectItem>
                                      <SelectItem value="cancelled">Cancelled</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div>
                                  <Label htmlFor="priority">Priority</Label>
                                  <Select name="priority" defaultValue={selectedRequest.priority}>
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="high">High</SelectItem>
                                      <SelectItem value="normal">Normal</SelectItem>
                                      <SelectItem value="low">Low</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label htmlFor="assigned_to">Assigned To</Label>
                                  <Input
                                    id="assigned_to"
                                    name="assigned_to"
                                    defaultValue={selectedRequest.assigned_to || ''}
                                    placeholder="Team member name"
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="follow_up_date">Follow Up Date</Label>
                                  <Input
                                    id="follow_up_date"
                                    name="follow_up_date"
                                    type="date"
                                    defaultValue={selectedRequest.follow_up_date || ''}
                                  />
                                </div>
                              </div>
                              <div>
                                <Label htmlFor="notes">Notes</Label>
                                <Textarea
                                  id="notes"
                                  name="notes"
                                  defaultValue={selectedRequest.notes || ''}
                                  placeholder="Add notes about this request..."
                                  rows={3}
                                />
                              </div>
                              <Button 
                                type="submit" 
                                disabled={updateRequestMutation.isPending}
                                className="w-full"
                              >
                                {updateRequestMutation.isPending ? 'Updating...' : 'Update Request'}
                              </Button>
                            </form>
                          )}
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RequestTracking;
