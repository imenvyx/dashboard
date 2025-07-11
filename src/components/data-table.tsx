"use client";
import { useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  MoreHorizontal,
  Pencil,
  Trash2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export interface ColumnDef<T> {
  id?: string;
  accessorKey?: keyof T;
  header: string;
  cell?: (value: unknown, row: T) => React.ReactNode;
}

interface DataTableProps<T extends { id: string }> {
  data: T[];
  columns: ColumnDef<T>[];
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
}

export function DataTable<T extends { id: string }>({
  data,
  columns,
  onEdit,
  onDelete,
}: DataTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T;
    direction: "asc" | "desc";
  } | null>(null);
  const [filter, setFilter] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedData, setEditedData] = useState<Partial<T> | null>(null);

  // Sorting function
  const sortedData = useMemo(() => {
    if (!sortConfig) return data;

    return [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);

  // Filtering function
  const filteredData = useMemo(() => {
    if (!filter) return sortedData;

    return sortedData.filter((item) =>
      Object.values(item as Record<string, unknown>).some((value) =>
        String(value).toLowerCase().includes(filter.toLowerCase())
      )
    );
  }, [sortedData, filter]);

  // Sorting handler
  const handleSort = (key: keyof T) => {
    let direction: "asc" | "desc" = "asc";

    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }

    setSortConfig({ key, direction });
  };

  // Edit handler
  const handleEdit = (item: T) => {
    setEditingId(item.id);
    setEditedData({ ...item });
  };

  // Save edit handler
  const handleSave = () => {
    if (onEdit && editedData) {
      onEdit(editedData as T);
    }
    setEditingId(null);
    setEditedData(null);
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="p-4 bg-gray-50 border-b">
        <Input
          placeholder="Buscar..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="max-w-xs"
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100 hover:bg-gray-100">
            {columns.map((column) => (
              <TableHead key={String(column.accessorKey)}>
                <button
                  onClick={() => column.accessorKey && handleSort(column.accessorKey)}
                  className="flex items-center gap-1 font-semibold"
                >
                  {column.header}
                  {sortConfig?.key === column.accessorKey &&
                    (sortConfig?.direction === "asc" ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    ))}
                </button>
              </TableHead>
            ))}
            <TableHead className="w-20">Acciones</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filteredData.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length + 1}
                className="h-24 text-center text-gray-500"
              >
                No se encontraron registros
              </TableCell>
            </TableRow>
          ) : (
            filteredData.map((item, index) => (
              <TableRow key={index}>
                {columns.map((column) => {
                  const value = column.accessorKey ? item[column.accessorKey] : undefined;
                  const isEditing = editingId === item.id;

                  return (
                    <TableCell key={String(column.accessorKey)}>
                      {isEditing && column.accessorKey ? (
                        <Input
                          value={
                            (editedData?.[column.accessorKey] as string) || ""
                          }
                          onChange={(e) =>
                            setEditedData(
                              (prev) =>
                                ({
                                  ...(prev ?? {}),
                                  [column.accessorKey!]: e.target.value,
                                } as Partial<T>)
                            )
                          }
                        />
                      ) : column.cell ? (
                        column.cell(value, item)
                      ) : (
                        <>{value}</>
                      )}
                    </TableCell>
                  );
                })}

                <TableCell>
                  {editingId === item.id ? (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setEditingId(null);
                          setEditedData(null);
                        }}
                      >
                        Cancelar
                      </Button>
                      <Button size="sm" onClick={handleSave}>
                        Guardar
                      </Button>
                    </div>
                  ) : (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(item)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => onDelete && onDelete(item)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
