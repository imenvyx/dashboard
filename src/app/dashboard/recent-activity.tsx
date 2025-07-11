import { Icons } from "@/components/ui/icons";

interface Activity {
  id: string | number;
  user: string;
  action: string;
  time: string;
}

export function RecentActivity({ activities }: { activities: Activity[] }) {
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start">
          <div className="bg-gray-100 rounded-full p-2 mt-1">
            <Icons.activity className="h-4 w-4 text-gray-600" />
          </div>
          <div className="ml-4">
            <p className="font-medium">{activity.user}</p>
            <p className="text-gray-600">{activity.action}</p>
            <p className="text-sm text-gray-500">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
