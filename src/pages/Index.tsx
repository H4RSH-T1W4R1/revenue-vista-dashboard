
import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";
import { StatCard } from "@/components/dashboard/StatCard";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { FilterBar, FilterState } from "@/components/dashboard/FilterBar";
import { DonutChart } from "@/components/dashboard/DonutChart";
import { TransactionsTable } from "@/components/dashboard/TransactionsTable";
import { DollarSign, TrendingUp, ShoppingCart, LineChart } from "lucide-react";

const Index = () => {
  const [filters, setFilters] = useState<FilterState>({
    date: undefined,
    region: "all",
    category: "all"
  });
  
  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  return (
    <div className="flex h-screen bg-dashboard-deepblue text-white overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        
        <div className="flex-1 overflow-y-auto p-6 pb-8">
          <div className="max-w-7xl mx-auto">
            {/* KPI Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <StatCard 
                title="Total Revenue" 
                value="$458,273" 
                trend={12.5} 
                icon={<DollarSign size={18} className="text-white" />} 
                iconColor="bg-dashboard-blue"
                textColor="text-white"
              />
              <StatCard 
                title="Monthly Growth" 
                value="15.3%" 
                trend={4.2} 
                icon={<TrendingUp size={18} className="text-white" />} 
                iconColor="bg-dashboard-cyan"
                textColor="text-dashboard-cyan"
              />
              <StatCard 
                title="Number of Sales" 
                value="2,849" 
                trend={-2.4} 
                icon={<ShoppingCart size={18} className="text-white" />} 
                iconColor="bg-dashboard-pink"
                textColor="text-white"
              />
              <StatCard 
                title="Average Order Value" 
                value="$160.95" 
                trend={8.3} 
                icon={<LineChart size={18} className="text-white" />} 
                iconColor="bg-dashboard-purple"
                textColor="text-white"
              />
            </div>
            
            {/* Filters and Chart */}
            <FilterBar onFiltersChange={handleFiltersChange} />
            
            {/* Changed layout: Revenue chart next to Donut chart */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <RevenueChart filters={filters} />
              <DonutChart />
            </div>
            
            {/* Transactions Table in full width */}
            <div className="mb-6">
              <TransactionsTable />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
