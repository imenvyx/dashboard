'use client';

import { useState, useEffect } from 'react';
import { 
  getUsers, 
  getCompanies, 
  getReports,
  getUserCompanies,
  getUserReports,
  saveUserCompanyAssignment,
  saveUserReportAssignment,
  deleteUserCompanyAssignment,
  deleteUserReportAssignment
} from '@/lib/admin';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { MultiSelect } from '@/components/ui/multi-select';

export function AssignmentForm({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<{ value: string; label: string }[]>([]);
  const [companies, setCompanies] = useState<{ value: string; label: string }[]>([]);
  const [reports, setReports] = useState<{ value: string; label: string }[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [selectedReports, setSelectedReports] = useState<string[]>([]);

  useEffect(() => {
    if (open) {
      // Cargar datos
      const userOptions = getUsers().map(u => ({
        value: u.id,
        label: `${u.name} (${u.email})`,
      }));
      setUsers(userOptions);

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
    }
  }, [open]);

  useEffect(() => {
    if (selectedUser) {
      // Cargar asignaciones existentes
      const userCompanies = getUserCompanies(selectedUser).map(c => c.id);
      setSelectedCompanies(userCompanies);
      
      const userReports = getUserReports(selectedUser).map(r => r.id);
      setSelectedReports(userReports);
    } else {
      setSelectedCompanies([]);
      setSelectedReports([]);
    }
  }, [selectedUser]);

  const handleSave = async () => {
    setLoading(true);
    
    if (!selectedUser) return;
    
    // Guardar asignaciones de empresas
    const currentCompanies = getUserCompanies(selectedUser).map(c => c.id);
    
    // Añadir nuevas asignaciones
    selectedCompanies
      .filter(id => !currentCompanies.includes(id))
      .forEach(companyId => {
        saveUserCompanyAssignment({ userId: selectedUser, companyId });
      });
    
    // Eliminar asignaciones removidas
    currentCompanies
      .filter(id => !selectedCompanies.includes(id))
      .forEach(companyId => {
        deleteUserCompanyAssignment(selectedUser, companyId);
      });
    
    // Guardar asignaciones de reportes
    const currentReports = getUserReports(selectedUser).map(r => r.id);
    
    // Añadir nuevas asignaciones
    selectedReports
      .filter(id => !currentReports.includes(id))
      .forEach(reportId => {
        saveUserReportAssignment({ userId: selectedUser, reportId });
      });
    
    // Eliminar asignaciones removidas
    currentReports
      .filter(id => !selectedReports.includes(id))
      .forEach(reportId => {
        deleteUserReportAssignment(selectedUser, reportId);
      });
    
    setLoading(false);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Assign Users to Companies & Reports</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label>Select User</Label>
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select a user</option>
              {users.map(user => (
                <option key={user.value} value={user.value}>
                  {user.label}
                </option>
              ))}
            </select>
          </div>
          
          {selectedUser && (
            <>
              <div className="space-y-2">
                <Label>Assign Companies</Label>
                <MultiSelect
                  options={companies}
                  selected={selectedCompanies}
                  onChange={setSelectedCompanies}
                  placeholder="Select companies"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Assign Reports</Label>
                <MultiSelect
                  options={reports}
                  selected={selectedReports}
                  onChange={setSelectedReports}
                  placeholder="Select reports"
                />
              </div>
            </>
          )}
        </div>
        
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            type="button" 
            onClick={handleSave}
            disabled={!selectedUser || loading}
          >
            {loading ? 'Saving...' : 'Save Assignments'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}