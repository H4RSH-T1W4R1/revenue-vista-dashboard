
import { Home, BarChart2, DollarSign, LineChart, Settings, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const SidebarItem = ({ icon: Icon, label, active, onClick }: SidebarItemProps) => {
  return (
    <li 
      className={cn(
        "flex items-center gap-3 px-3 py-3 rounded-lg cursor-pointer transition-all",
        active 
          ? "bg-dashboard-blue/20 text-white" 
          : "text-sidebar-foreground hover:bg-white/5"
      )}
      onClick={onClick}
    >
      <Icon size={18} className={cn(active ? "text-dashboard-blue" : "text-sidebar-foreground")} />
      <span>{label}</span>
    </li>
  );
};

export function Sidebar() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [showConfirmLogout, setShowConfirmLogout] = useState(false);
  const [emailFrequency, setEmailFrequency] = useState("daily");
  const [defaultChartType, setDefaultChartType] = useState("line");

  const getActiveItem = () => {
    const path = location.pathname;
    if (path === "/") return "Dashboard";
    if (path === "/reports") return "Reports";
    if (path === "/sales") return "Sales";
    if (path === "/analytics") return "Analytics";
    if (path === "/settings") return "Settings";
    return "Dashboard";
  };
  
  const menuItems = [
    { label: "Dashboard", icon: Home, path: "/" },
    { label: "Reports", icon: BarChart2, path: "/reports" },
    { label: "Sales", icon: DollarSign, path: "/sales" },
    { label: "Analytics", icon: LineChart, path: "/analytics" },
    { label: "Settings", icon: Settings, path: "/settings" },
  ];
  
  const handleMenuItemClick = (label: string, path: string) => {
    // If clicking on settings, show dialog instead of navigating
    if (label === "Settings") {
      setShowSettingsDialog(true);
    } else {
      navigate(path);
      toast({
        title: `Navigating to ${label}`,
        description: `You've selected the ${label} section`,
      });
    }
  };

  const handleEmailConfigClick = () => {
    toast({
      title: "Email Preferences Updated",
      description: `Email notifications will be sent ${emailFrequency}`,
    });
  };

  const handleSecurityAction = (action: string) => {
    toast({
      title: action,
      description: `${action} dialog would appear here`,
      variant: "default",
    });
  };

  const applyThemeChanges = () => {
    toast({
      title: "Theme Changed",
      description: `The ${darkMode ? 'Dark' : 'Light'} theme has been applied`,
      variant: "default",
    });
  };

  const applyChartPreference = () => {
    toast({
      title: "Chart Preference Saved",
      description: `Default chart type set to ${defaultChartType}`,
      variant: "default",
    });
  };

  return (
    <>
      <div 
        className={cn(
          "flex flex-col h-screen bg-dashboard-navy border-r border-white/5 transition-all duration-300 ease-in-out",
          collapsed ? "w-16" : "w-64"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-white/5">
          {!collapsed && (
            <div className="flex items-center">
              <div className="h-8 w-8 bg-dashboard-blue rounded-md flex items-center justify-center">
                <span className="text-white font-bold">SD</span>
              </div>
              <h2 className="ml-3 font-heading font-semibold text-lg text-white">SalesDash</h2>
            </div>
          )}
          <button 
            className="p-1 ml-auto bg-white/5 rounded hover:bg-white/10 transition-colors"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>
        
        <nav className="flex-1 py-4 overflow-y-auto">
          <ul className="space-y-1 px-2">
            {menuItems.map((item) => (
              <SidebarItem 
                key={item.label}
                icon={item.icon} 
                label={!collapsed ? item.label : ""}
                active={getActiveItem() === item.label}
                onClick={() => handleMenuItemClick(item.label, item.path)}
              />
            ))}
          </ul>
        </nav>
        
        <div className="p-4 border-t border-white/5">
          {!collapsed && (
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 bg-purple-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-white/60">admin@salesdash.com</p>
              </div>
              <button 
                className="p-1.5 rounded hover:bg-white/10"
                onClick={() => setShowConfirmLogout(true)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/70">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
      
      <Dialog open={showSettingsDialog} onOpenChange={setShowSettingsDialog}>
        <DialogContent className="bg-dashboard-navy border-white/10 text-white">
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
            <DialogDescription className="text-white/70">
              Adjust your dashboard settings and preferences.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium flex justify-between">
                  Theme
                  <span className="text-dashboard-blue">
                    {darkMode ? "Dark" : "Light"}
                  </span>
                </label>
                <div className="flex p-1 bg-dashboard-deepblue rounded">
                  <button 
                    className={`flex-1 text-xs py-1.5 rounded ${!darkMode ? 'bg-dashboard-blue text-white' : ''}`}
                    onClick={() => setDarkMode(false)}
                  >
                    Light
                  </button>
                  <button 
                    className={`flex-1 text-xs py-1.5 rounded ${darkMode ? 'bg-dashboard-blue text-white' : ''}`}
                    onClick={() => setDarkMode(true)}
                  >
                    Dark
                  </button>
                </div>
                <Button 
                  size="sm" 
                  className="w-full mt-1 bg-dashboard-blue hover:bg-dashboard-blue/80"
                  onClick={applyThemeChanges}
                >
                  Apply Theme
                </Button>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Default Chart</label>
                <select 
                  className="w-full p-2 rounded bg-dashboard-deepblue border border-white/10 text-white"
                  value={defaultChartType}
                  onChange={(e) => setDefaultChartType(e.target.value)}
                >
                  <option value="line">Line Chart</option>
                  <option value="bar">Bar Chart</option>
                  <option value="donut">Donut Chart</option>
                  <option value="area">Area Chart</option>
                </select>
                <Button 
                  size="sm" 
                  className="w-full bg-dashboard-blue hover:bg-dashboard-blue/80"
                  onClick={applyChartPreference}
                >
                  Save Preference
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium flex justify-between">
                Notifications
                <span className="text-dashboard-blue">
                  {notificationsEnabled ? "Enabled" : "Disabled"}
                </span>
              </label>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label htmlFor="email-notif" className="text-sm flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      id="email-notif" 
                      className="rounded bg-dashboard-deepblue border-white/20 focus:ring-dashboard-blue"
                      checked={notificationsEnabled}
                      onChange={() => setNotificationsEnabled(!notificationsEnabled)} 
                    />
                    Email Notifications
                  </label>
                  
                  <div className="flex gap-2 items-center">
                    <select 
                      className="text-xs p-1 rounded bg-dashboard-deepblue border border-white/10 text-white"
                      value={emailFrequency}
                      onChange={(e) => setEmailFrequency(e.target.value)}
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="instantly">Instantly</option>
                    </select>
                    <button 
                      className="text-xs px-2 py-1 bg-dashboard-blue rounded hover:bg-dashboard-blue/80 transition-colors"
                      onClick={handleEmailConfigClick}
                    >
                      Apply
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <label htmlFor="app-notif" className="text-sm flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      id="app-notif" 
                      className="rounded bg-dashboard-deepblue border-white/20 focus:ring-dashboard-blue" 
                      defaultChecked 
                    />
                    In-App Notifications
                  </label>
                  <button 
                    className="text-xs px-2 py-1 bg-dashboard-blue rounded hover:bg-dashboard-blue/80 transition-colors"
                    onClick={() => {
                      toast({
                        title: "App Notification Settings",
                        description: "In-app notification preferences saved.",
                      });
                    }}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Account Security</label>
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  variant="outline" 
                  className="border-white/10 hover:bg-white/5 text-left justify-start text-sm h-auto py-3"
                  onClick={() => handleSecurityAction("Change Password")}
                >
                  <div>
                    <p className="font-medium">Change Password</p>
                    <p className="text-xs text-white/60 mt-1">Update your account password</p>
                  </div>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="border-white/10 hover:bg-white/5 text-left justify-start text-sm h-auto py-3"
                  onClick={() => handleSecurityAction("Two-Factor Authentication")}
                >
                  <div>
                    <p className="font-medium">Enable 2FA</p>
                    <p className="text-xs text-white/60 mt-1">Secure your account</p>
                  </div>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="border-white/10 hover:bg-white/5 text-left justify-start text-sm h-auto py-3 col-span-2"
                  onClick={() => handleSecurityAction("Account Privacy")}
                >
                  <div>
                    <p className="font-medium">Privacy Settings</p>
                    <p className="text-xs text-white/60 mt-1">Manage your data and privacy options</p>
                  </div>
                </Button>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" className="border-white/10 hover:bg-white/5" onClick={() => setShowSettingsDialog(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-dashboard-blue hover:bg-dashboard-blue/80" 
              onClick={() => {
                setShowSettingsDialog(false);
                toast({
                  title: "Settings saved",
                  description: "Your preferences have been updated",
                });
              }}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showConfirmLogout} onOpenChange={setShowConfirmLogout}>
        <DialogContent className="bg-dashboard-navy border-white/10 text-white max-w-sm">
          <DialogHeader>
            <DialogTitle>Confirm Logout</DialogTitle>
            <DialogDescription className="text-white/70">
              Are you sure you want to log out of SalesDash?
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter className="mt-4">
            <Button variant="outline" className="border-white/10 hover:bg-white/5" onClick={() => setShowConfirmLogout(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-dashboard-pink hover:bg-dashboard-pink/80" 
              onClick={() => {
                setShowConfirmLogout(false);
                toast({
                  title: "Logged Out",
                  description: "You have been successfully logged out.",
                });
              }}
            >
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
