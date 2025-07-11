import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function Sidebar({ reports }: { reports: string[] }) {
  const pathname = usePathname();
  
  // Mock report data - in real app this would come from API
  const reportData = [
    { id: "sales", name: "Sales Report" },
    { id: "inventory", name: "Inventory Report" },
  ];

  // Filter reports based on user permissions
  const availableReports = reportData.filter(report => 
    reports.includes(report.id)
  );

  if (availableReports.length === 0) return null;

  return (
    <aside className="fixed top-16 bottom-0 w-64 border-r bg-gray-50 overflow-auto">
      <div className="p-4">
        <h3 className="font-semibold mb-2 text-gray-700">Reports</h3>
        <nav>
          <ul className="space-y-1">
            {availableReports.map((report) => (
              <li key={report.id}>
                <Link
                  href={`/report/${report.id}`}
                  className={cn(
                    "block px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    pathname === `/report/${report.id}`
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:bg-gray-100"
                  )}
                >
                  {report.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}