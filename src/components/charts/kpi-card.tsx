import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface KpiCardProps {
  title: string;
  value: number;
  currency?: boolean;
  className?: string;
}

export function KpiCard({ title, value, currency = false, className }: KpiCardProps) {
  const formattedValue = currency 
    ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
    : new Intl.NumberFormat('en-US').format(value);

  return (
    <Card className={cn("shadow-sm border-0 bg-gradient-to-br from-white to-gray-50", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium text-gray-500">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{formattedValue}</div>
      </CardContent>
    </Card>
  );
}

export function KpiCardSkeleton() {
  return (
    <Card className="border-0 bg-gray-50">
      <CardHeader className="pb-2">
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-7 w-3/4 mt-1" />
      </CardContent>
    </Card>
  );
}