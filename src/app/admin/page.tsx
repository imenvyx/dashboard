"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { getUsers, getCompanies, deleteUser, deleteCompany } from "@/lib/admin";
import { UserForm } from "./components/user-form";
import { CompanyForm } from "./components/company-form";
import { AssignmentForm } from "./components/assignment-form";
import { Company, User } from "@/types";
import { ColumnDef, DataTable } from "@/components/data-table";

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [userDialogOpen, setUserDialogOpen] = useState(false);
  const [companyDialogOpen, setCompanyDialogOpen] = useState(false);
  const [assignmentDialogOpen, setAssignmentDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  // Columnas para la tabla de usuarios
  const userColumns: ColumnDef<User>[] = [
    {
      accessorKey: "name" as keyof User,
      header: "Name",
    },
    {
      accessorKey: "email" as keyof User,
      header: "Email",
    },
    {
      id: "actions",
      header: "Actions",
      cell: (_value: unknown, row: User) => (
        <div className="flex space-x-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setSelectedUser(row);
              setUserDialogOpen(true);
            }}
          >
            Edit
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => {
              deleteUser(row.id);
              refreshData();
            }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  // Columnas para la tabla de empresas
  const companyColumns: ColumnDef<Company>[] = [
    {
      accessorKey: "name",
      header: "Company Name",
    },
    {
      accessorKey: "industry",
      header: "Industry",
    },
    {
      id: "actions",
      header: "Actions",
      cell: (_value: unknown, row: Company) => (
        <div className="flex space-x-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setSelectedCompany(row);
              setCompanyDialogOpen(true);
            }}
          >
            Edit
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => {
              deleteCompany(row.id);
              refreshData();
            }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  // Función para refrescar los datos
  const refreshData = () => {
    setUsers(getUsers());
    setCompanies(getCompanies());
  };

  // Cargar datos iniciales
  useEffect(() => {
    refreshData();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div className="flex space-x-2">
          <Button onClick={() => setAssignmentDialogOpen(true)}>
            Manage Assignments
          </Button>
        </div>
      </div>

      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="companies">Companies</TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <div className="flex justify-end mb-4">
            <Button
              onClick={() => {
                setSelectedUser(null);
                setUserDialogOpen(true);
              }}
            >
              Add User
            </Button>
          </div>
          <DataTable columns={userColumns} data={users} />
        </TabsContent>

        <TabsContent value="companies">
          <div className="flex justify-end mb-4">
            <Button
              onClick={() => {
                setSelectedCompany(null);
                setCompanyDialogOpen(true);
              }}
            >
              Add Company
            </Button>
          </div>
          <DataTable columns={companyColumns} data={companies} />
        </TabsContent>
      </Tabs>

      {/* Diálogos */}
      <UserForm
        user={selectedUser ?? undefined}
        open={userDialogOpen}
        onClose={() => {
          setUserDialogOpen(false);
          setSelectedUser(null);
        }}
        onSave={refreshData}
      />

      <CompanyForm
        company={selectedCompany ?? undefined}
        open={companyDialogOpen}
        onClose={() => {
          setCompanyDialogOpen(false);
          setSelectedCompany(null);
        }}
        onSave={refreshData}
      />

      <AssignmentForm
        open={assignmentDialogOpen}
        onClose={() => setAssignmentDialogOpen(false)}
      />
    </div>
  );
}
