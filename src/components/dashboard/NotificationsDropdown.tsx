
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Bell, Package, CreditCard, UserPlus, LineChart } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  icon: React.ElementType;
  read: boolean;
}

export function NotificationsDropdown() {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "New Order Received",
      description: "Order #45678 has been placed",
      time: "10 minutes ago",
      icon: Package,
      read: false,
    },
    {
      id: "2",
      title: "Payment Successful",
      description: "$1,200 payment received",
      time: "1 hour ago",
      icon: CreditCard,
      read: false,
    },
    {
      id: "3",
      title: "New User Registered",
      description: "John Davis joined your platform",
      time: "2 hours ago",
      icon: UserPlus,
      read: false,
    },
    {
      id: "4",
      title: "Monthly Report Available",
      description: "Your April report is ready to view",
      time: "1 day ago",
      icon: LineChart,
      read: true,
    },
  ]);

  const unreadCount = notifications.filter((notification) => !notification.read).length;

  const handleNotificationClick = (id: string) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
    
    toast({
      title: "Notification marked as read",
      description: "You can view all notifications in your profile",
    });
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification => ({ ...notification, read: true }))
    );
    
    toast({
      title: "All notifications marked as read",
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="relative p-1.5 bg-white/5 rounded-md hover:bg-white/10 transition-colors">
          <Bell size={18} />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 w-2 h-2 bg-dashboard-pink rounded-full"></span>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-dashboard-navy border-white/10 w-80">
        <div className="flex items-center justify-between px-4 py-2 border-b border-white/10">
          <span className="font-medium text-white">Notifications</span>
          {unreadCount > 0 && (
            <button 
              className="text-xs text-dashboard-cyan hover:text-dashboard-cyan/80" 
              onClick={handleMarkAllAsRead}
            >
              Mark all as read
            </button>
          )}
        </div>
        <DropdownMenuGroup className="max-h-80 overflow-y-auto">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div key={notification.id}>
                <DropdownMenuItem 
                  className={`px-4 py-3 flex items-start gap-3 cursor-pointer ${notification.read ? 'opacity-60' : ''}`}
                  onClick={() => handleNotificationClick(notification.id)}
                >
                  <div className={`p-2 rounded-lg ${!notification.read ? 'bg-dashboard-blue/20 text-dashboard-cyan' : 'bg-white/5 text-white/60'}`}>
                    <notification.icon size={16} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">{notification.title}</p>
                    <p className="text-xs text-white/60 mt-0.5">{notification.description}</p>
                    <p className="text-xs text-white/40 mt-1">{notification.time}</p>
                  </div>
                  {!notification.read && (
                    <div className="w-2 h-2 bg-dashboard-pink rounded-full mt-1"></div>
                  )}
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/5" />
              </div>
            ))
          ) : (
            <div className="px-4 py-6 text-center">
              <p className="text-sm text-white/60">No new notifications</p>
            </div>
          )}
        </DropdownMenuGroup>
        <div className="p-2 border-t border-white/10">
          <button className="w-full py-2 text-sm text-dashboard-cyan hover:bg-white/5 rounded-md transition-colors">
            View all notifications
          </button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
