
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { TrendingUp, Edit, Plus, Calendar, DollarSign } from 'lucide-react';

const AdminQuotes = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [editingQuote, setEditingQuote] = useState<any>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  // Fetch quotes with contact submission details
  const { data: quotes, isLoading } = useQuery({
    queryKey: ['admin-quotes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('quotes')
        .select(`
          *,
          contact_submissions (
            id,
            name,
            email,
            company,
            subject,
            product_name
          )
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  // Update quote mutation
  const updateQuoteMutation = useMutation({
    mutationFn: async (quote: any) => {
      const { error } = await supabase
        .from('quotes')
        .update({
          amount: quote.amount,
          status: quote.status,
          valid_until: quote.valid_until,
          notes: quote.notes,
          updated_at: new Date().toISOString()
        })
        .eq('id', quote.id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Quote Updated",
        description: "Quote has been updated successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['admin-quotes'] });
      setEditingQuote(null);
    },
  });

  // Create quote mutation
  const createQuoteMutation = useMutation({
    mutationFn: async (quote: any) => {
      const { error } = await supabase
        .from('quotes')
        .insert([{
          quote_number: `QT-${new Date().getFullYear()}-${String(Date.now()).slice(-4)}`,
          ...quote
        }]);
      
      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Quote Created",
        description: "New quote has been created successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['admin-quotes'] });
      setIsCreateDialogOpen(false);
    },
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'secondary';
      case 'sent': return 'default';
      case 'accepted': return 'default';
      case 'rejected': return 'destructive';
      case 'expired': return 'outline';
      default: return 'secondary';
    }
  };

  const handleQuoteSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editingQuote) {
      updateQuoteMutation.mutate(editingQuote);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loading quotes...</CardTitle>
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
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Quote Management
            </span>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  New Quote
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Quote</DialogTitle>
                  <DialogDescription>
                    Create a quote for a customer request
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  createQuoteMutation.mutate({
                    amount: parseFloat(formData.get('amount') as string),
                    status: formData.get('status'),
                    valid_until: formData.get('valid_until'),
                    notes: formData.get('notes'),
                  });
                }} className="space-y-4">
                  <div>
                    <Label htmlFor="amount">Amount ($)</Label>
                    <Input
                      id="amount"
                      name="amount"
                      type="number"
                      step="0.01"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="valid_until">Valid Until</Label>
                    <Input
                      id="valid_until"
                      name="valid_until"
                      type="date"
                    />
                  </div>
                  <div>
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                      id="notes"
                      name="notes"
                      placeholder="Additional notes for the quote..."
                    />
                  </div>
                  <Button 
                    type="submit" 
                    disabled={createQuoteMutation.isPending}
                  >
                    Create Quote
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </CardTitle>
          <CardDescription>
            Track and manage customer quotes and follow-ups
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Quote #</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Valid Until</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {quotes?.map((quote) => (
                <TableRow key={quote.id}>
                  <TableCell className="font-mono">
                    {quote.quote_number}
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">
                        {quote.contact_submissions?.name || 'Direct Quote'}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {quote.contact_submissions?.email}
                      </p>
                      {quote.contact_submissions?.product_name && (
                        <p className="text-xs text-muted-foreground">
                          {quote.contact_submissions.product_name}
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      {quote.amount ? quote.amount.toFixed(2) : 'TBD'}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(quote.status)}>
                      {quote.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {quote.valid_until ? (
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(quote.valid_until).toLocaleDateString()}
                      </div>
                    ) : (
                      '-'
                    )}
                  </TableCell>
                  <TableCell>
                    {new Date(quote.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setEditingQuote({ ...quote })}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Quote</DialogTitle>
                          <DialogDescription>
                            Update quote details and status
                          </DialogDescription>
                        </DialogHeader>
                        {editingQuote && (
                          <form onSubmit={handleQuoteSubmit} className="space-y-4">
                            <div>
                              <Label htmlFor="edit-amount">Amount ($)</Label>
                              <Input
                                id="edit-amount"
                                type="number"
                                step="0.01"
                                value={editingQuote.amount || ''}
                                onChange={(e) => setEditingQuote({
                                  ...editingQuote,
                                  amount: parseFloat(e.target.value) || null
                                })}
                              />
                            </div>
                            <div>
                              <Label htmlFor="edit-status">Status</Label>
                              <Select
                                value={editingQuote.status}
                                onValueChange={(value) => setEditingQuote({
                                  ...editingQuote,
                                  status: value
                                })}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="pending">Pending</SelectItem>
                                  <SelectItem value="sent">Sent</SelectItem>
                                  <SelectItem value="accepted">Accepted</SelectItem>
                                  <SelectItem value="rejected">Rejected</SelectItem>
                                  <SelectItem value="expired">Expired</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label htmlFor="edit-valid-until">Valid Until</Label>
                              <Input
                                id="edit-valid-until"
                                type="date"
                                value={editingQuote.valid_until || ''}
                                onChange={(e) => setEditingQuote({
                                  ...editingQuote,
                                  valid_until: e.target.value
                                })}
                              />
                            </div>
                            <div>
                              <Label htmlFor="edit-notes">Notes</Label>
                              <Textarea
                                id="edit-notes"
                                value={editingQuote.notes || ''}
                                onChange={(e) => setEditingQuote({
                                  ...editingQuote,
                                  notes: e.target.value
                                })}
                              />
                            </div>
                            <Button 
                              type="submit" 
                              disabled={updateQuoteMutation.isPending}
                            >
                              Update Quote
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
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminQuotes;
