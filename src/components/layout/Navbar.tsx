
import { Search, ChevronDown } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { NotificationsDropdown } from "@/components/dashboard/NotificationsDropdown";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function Navbar() {
  const { toast } = useToast();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast({
        title: "Search initiated",
        description: `Searching for "${searchQuery}"`,
      });
    }
  };
  
  const handleLogout = () => {
    setShowLogoutDialog(false);
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
  };
  
  return (
    <>
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
        <h1 className="text-2xl font-semibold text-white">Sales Dashboard</h1>
        
        <div className="flex items-center space-x-4">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
            <input 
              type="text" 
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-md py-1.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-dashboard-blue w-64"
            />
          </form>
          
          <NotificationsDropdown />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 p-1.5 rounded-md hover:bg-white/5 transition-colors">
                <div className="h-8 w-8 bg-gradient-to-br from-dashboard-blue to-dashboard-purple rounded-full"></div>
                <span className="text-sm font-medium">John Doe</span>
                <ChevronDown size={16} className="text-white/60" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-dashboard-navy border-white/10">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem 
                className="hover:bg-white/5 cursor-pointer"
                onClick={() => toast({ title: "Profile", description: "View and edit your profile" })}
              >
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="hover:bg-white/5 cursor-pointer"
                onClick={() => toast({ title: "Settings", description: "Manage your account settings" })}
              >
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="hover:bg-white/5 cursor-pointer"
                onClick={() => toast({ title: "Billing", description: "View your billing information" })}
              >
                Billing
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem 
                className="hover:bg-white/5 cursor-pointer text-dashboard-pink"
                onClick={() => setShowLogoutDialog(true)}
              >
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <DialogContent className="bg-dashboard-navy border-white/10 text-white">
          <DialogHeader>
            <DialogTitle>Log out</DialogTitle>
            <DialogDescription className="text-white/70">
              Are you sure you want to log out of your account?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" className="border-white/10 hover:bg-white/5" onClick={() => setShowLogoutDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-dashboard-pink hover:bg-dashboard-pink/80" onClick={handleLogout}>
              Log out
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
