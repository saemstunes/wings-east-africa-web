
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Eye, Mail, Phone, Calendar, Package } from 'lucide-react';

interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
  request_type: string;
  product_name: string;
  request_metadata: any;
  image_storage_url: string;
  has_attachment: boolean;
  submission_date: string;
  created_at: string;
}

const AdminPartRequests = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedRequest, setSelectedRequest] = useState<ContactSubmission | null>(null);

  // Fetch all contact submissions
  const { data: requests, isLoading } = useQuery({
    queryKey: ['admin-contact-submissions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as ContactSubmission[];
    },
  });

  // Create quote mutation
  const createQuoteMutation = useMutation({
    mutationFn: async (requestId: number) => {
      const { data, error } = await supabase
        .from('quotes')
        .insert([{
          contact_submission_id: requestId,
          quote_number: `QT-${new Date().getFullYear()}-${String(Date.now()).slice(-4)}`,
          status: 'pending'
        }])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast({
        title: "Quote Created",
        description: "A new quote has been created successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['admin-contact-submissions'] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create quote. Please try again.",
        variant: "destructive"
      });
    }
  });

  const getRequestTypeColor = (type: string) => {
    switch (type) {
      case 'part_request': return 'bg-blue-100 text-blue-800';
      case 'service_request': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loading requests...</CardTitle>
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
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Contact Requests & Part Inquiries
          </CardTitle>
          <CardDescription>
            Manage all customer inquiries and part requests
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Attachment</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests?.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{request.name}</p>
                        <p className="text-sm text-muted-foreground">{request.email}</p>
                        {request.company && (
                          <p className="text-xs text-muted-foreground">{request.company}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getRequestTypeColor(request.request_type || 'general')}>
                        {request.request_type === 'part_request' ? 'Part Request' : 
                         request.subject || 'General Inquiry'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{request.subject}</p>
                        {request.product_name && (
                          <p className="text-sm text-muted-foreground">
                            Product: {request.product_name}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="h-4 w-4" />
                        {new Date(request.created_at).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      {request.has_attachment ? (
                        <Badge variant="secondary">Yes</Badge>
                      ) : (
                        <Badge variant="outline">No</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setSelectedRequest(request)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Request Details</DialogTitle>
                              <DialogDescription>
                                Full details of the customer request
                              </DialogDescription>
                            </DialogHeader>
                            {selectedRequest && (
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <h4 className="font-medium">Customer Information</h4>
                                    <p className="text-sm">{selectedRequest.name}</p>
                                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                                      <Mail className="h-3 w-3" />
                                      {selectedRequest.email}
                                    </p>
                                    {selectedRequest.phone && (
                                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                                        <Phone className="h-3 w-3" />
                                        {selectedRequest.phone}
                                      </p>
                                    )}
                                    {selectedRequest.company && (
                                      <p className="text-sm text-muted-foreground">
                                        Company: {selectedRequest.company}
                                      </p>
                                    )}
                                  </div>
                                  <div>
                                    <h4 className="font-medium">Request Details</h4>
                                    <p className="text-sm">Subject: {selectedRequest.subject}</p>
                                    {selectedRequest.product_name && (
                                      <p className="text-sm">Product: {selectedRequest.product_name}</p>
                                    )}
                                    <p className="text-sm">
                                      Date: {new Date(selectedRequest.created_at).toLocaleDateString()}
                                    </p>
                                  </div>
                                </div>
                                
                                <div>
                                  <h4 className="font-medium mb-2">Message</h4>
                                  <p className="text-sm bg-gray-50 p-3 rounded-md">
                                    {selectedRequest.message}
                                  </p>
                                </div>

                                {selectedRequest.image_storage_url && (
                                  <div>
                                    <h4 className="font-medium mb-2">Attached Image</h4>
                                    <img 
                                      src={selectedRequest.image_storage_url} 
                                      alt="Part request" 
                                      className="max-w-full h-auto rounded-md border"
                                    />
                                  </div>
                                )}

                                <div className="flex gap-2 pt-4">
                                  <Button 
                                    onClick={() => createQuoteMutation.mutate(selectedRequest.id)}
                                    disabled={createQuoteMutation.isPending}
                                  >
                                    Create Quote
                                  </Button>
                                  <Button variant="outline" asChild>
                                    <a href={`mailto:${selectedRequest.email}?subject=Re: ${selectedRequest.subject}`}>
                                      Reply via Email
                                    </a>
                                  </Button>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => createQuoteMutation.mutate(request.id)}
                          disabled={createQuoteMutation.isPending}
                        >
                          Quote
                        </Button>
                      </div>
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

export default AdminPartRequests;
