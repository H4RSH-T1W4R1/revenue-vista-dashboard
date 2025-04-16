
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Filter, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useToast } from "@/components/ui/use-toast";

interface FilterBarProps {
  onFiltersChange: (filters: FilterState) => void;
}

export interface FilterState {
  date: Date | undefined;
  region: string;
  category: string;
}

export function FilterBar({ onFiltersChange }: FilterBarProps) {
  const { toast } = useToast();
  const [date, setDate] = useState<Date>();
  const [region, setRegion] = useState("all");
  const [category, setCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(false);

  const handleApplyFilters = () => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      onFiltersChange({ date, region, category });
      setIsLoading(false);
      
      toast({
        title: "Filters applied",
        description: "Dashboard data has been updated",
      });
    }, 800);
  };

  const handleClearFilters = () => {
    setDate(undefined);
    setRegion("all");
    setCategory("all");
    
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      onFiltersChange({ date: undefined, region: "all", category: "all" });
      setIsLoading(false);
      
      toast({
        title: "Filters cleared",
        description: "Dashboard showing all data",
      });
    }, 500);
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
      <div className="flex items-center">
        <Filter size={16} className="text-white/60 mr-2" />
        <span className="text-sm font-medium text-white/80">Filters:</span>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="border-white/10 bg-dashboard-navy hover:bg-white/10"
            >
              <CalendarIcon className="mr-2 h-4 w-4 text-dashboard-cyan" />
              {date ? format(date, "PPP") : "Select date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-dashboard-navy border-white/10">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
              className="bg-dashboard-navy text-white"
            />
          </PopoverContent>
        </Popover>

        <Select value={region} onValueChange={setRegion}>
          <SelectTrigger className="w-[160px] border-white/10 bg-dashboard-navy">
            <SelectValue placeholder="All Regions" />
          </SelectTrigger>
          <SelectContent className="bg-dashboard-navy border-white/10">
            <SelectItem value="all">All Regions</SelectItem>
            <SelectItem value="north-america">North America</SelectItem>
            <SelectItem value="europe">Europe</SelectItem>
            <SelectItem value="asia">Asia</SelectItem>
            <SelectItem value="australia">Australia</SelectItem>
            <SelectItem value="africa">Africa</SelectItem>
          </SelectContent>
        </Select>

        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-[180px] border-white/10 bg-dashboard-navy">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent className="bg-dashboard-navy border-white/10">
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="electronics">Electronics</SelectItem>
            <SelectItem value="clothing">Clothing</SelectItem>
            <SelectItem value="home">Home & Garden</SelectItem>
            <SelectItem value="sports">Sports & Outdoors</SelectItem>
          </SelectContent>
        </Select>

        <Button 
          className="bg-dashboard-blue hover:bg-dashboard-blue/80"
          onClick={handleApplyFilters}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Updating...
            </>
          ) : (
            "Apply Filters"
          )}
        </Button>
        
        <Button 
          variant="outline" 
          className="border-white/10 text-white hover:bg-white/10"
          onClick={handleClearFilters}
          disabled={isLoading}
        >
          Clear
        </Button>
      </div>
    </div>
  );
}
