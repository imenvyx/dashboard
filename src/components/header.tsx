import { Button } from "@/components/ui/button";
// import { useAuthStore } from "@/lib/auth";

export function Header({
  email,
  onLogout,
}: {
  email?: string;
  onLogout: () => void;
}) {
  return (
    <header className="fixed top-0 left-0 right-0 z-10 bg-white shadow-sm h-16 flex items-center px-6 border-b">
      <div className="flex-1"></div> {/* Spacer */}
      <div className="flex items-center gap-4">
        {email && (
          <div className="text-sm font-medium text-gray-600">{email}</div>
        )}
        <Button
          variant="outline"
          size="sm"
          onClick={onLogout}
          className="hover:bg-red-50 hover:text-red-600"
        >
          Logout
        </Button>
      </div>
    </header>
  );
}
