'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { User } from '@/types';
import { saveUser } from '@/lib/admin';
import { getCompanies, getReports } from '@/lib/admin';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MultiSelect } from '@/components/ui/multi-select';

const userFormSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  companies: z.array(z.string()),
  reports: z.array(z.string()),
});

export function UserForm({
  user,
  open,
  onClose,
  onSave,
}: {
  user?: User;
  open: boolean;
  onClose: () => void;
  onSave: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [companies, setCompanies] = useState<{ value: string; label: string }[]>([]);
  const [reports, setReports] = useState<{ value: string; label: string }[]>([]);

  const form = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      companies: [],
      reports: [],
    },
  });

  useEffect(() => {
    if (open) {
      // Cargar datos para los selects
      const companyOptions = getCompanies().map(c => ({
        value: c.id,
        label: c.name,
      }));
      setCompanies(companyOptions);

      const reportOptions = getReports().map(r => ({
        value: r.id,
        label: r.name,
      }));
      setReports(reportOptions);

      // Establecer valores iniciales
      if (user) {
        form.reset({
          name: user.name,
          email: user.email,
          companies: [],
          reports: [],
        });
      } else {
        form.reset();
      }
    }
  }, [open, user]);

  const onSubmit = async (values: z.infer<typeof userFormSchema>) => {
    setLoading(true);
    
    const userData: User = {
      id: user?.id || Date.now().toString(),
      name: values.name,
      email: values.email,
    };

    saveUser(userData);
    
    // Guardar asignaciones
    // (Implementarías aquí la lógica para guardar las asignaciones)
    
    setLoading(false);
    onSave();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{user ? 'Edit User' : 'Create User'}</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="companies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Companies</FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={companies}
                      selected={field.value}
                      onChange={field.onChange}
                      placeholder="Select companies"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="reports"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reports</FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={reports}
                      selected={field.value}
                      onChange={field.onChange}
                      placeholder="Select reports"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? 'Saving...' : 'Save'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}