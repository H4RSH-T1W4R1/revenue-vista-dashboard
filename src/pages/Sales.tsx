import React, { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";
import { FilterBar, FilterState } from "@/components/dashboard/FilterBar";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import SalesOverview from "./Sales/SalesOverview";
import OrdersTable from "./Sales/OrdersTable";
import CustomersSection from "./Sales/CustomersSection";
import InventorySection from "./Sales/InventorySection";
import OrderDetailsModal from "./Sales/OrderDetailsModal";

const Sales = () => {
  const [filters, setFilters] = useState<FilterState>({
    date: undefined,
    region: "all",
    category: "all"
  });
  
  const { toast } = useToast();
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("orders");
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    setIsRefreshing(true);
    
    // Simulate refresh
    setTimeout(() => {
      setIsRefreshing(false);
      toast({
        title: "Data Updated",
        description: "Sales data has been filtered.",
      });
    }, 800);
  };

  const handleViewOrder = (order: any) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  const handleRefreshOrders = () => {
    setIsRefreshing(true);
    
    // Simulate refresh
    setTimeout(() => {
      setIsRefreshing(false);
      toast({
        title: "Orders Refreshed",
        description: "Latest order data has been loaded.",
      });
    }, 1200);
  };

  return (
    <div className="flex h-screen bg-dashboard-deepblue text-white overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        
        <div className="flex-1 overflow-y-auto p-6 pb-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-2">
              <h1 className="text-2xl font-bold">Sales Management Dashboard</h1>
              
              <Tabs 
                value={activeTab} 
                onValueChange={setActiveTab} 
                className="w-full md:w-auto"
              >
                <TabsList className="grid w-full md:w-[400px] grid-cols-3 bg-dashboard-navy/40">
                  <TabsTrigger value="orders">Orders</TabsTrigger>
                  <TabsTrigger value="customers">Customers</TabsTrigger>
                  <TabsTrigger value="inventory">Inventory</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            <SalesOverview />
            
            <FilterBar onFiltersChange={handleFiltersChange} />
            
            <Tabs value={activeTab}>
              <TabsContent value="orders">
                <OrdersTable 
                  isRefreshing={isRefreshing}
                  onRefresh={handleRefreshOrders}
                  onViewOrder={handleViewOrder}
                />
              </TabsContent>
              
              <TabsContent value="customers">
                <CustomersSection />
              </TabsContent>
              
              <TabsContent value="inventory">
                <InventorySection />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      
      {selectedOrder && (
        <OrderDetailsModal 
          order={selectedOrder}
          open={showOrderModal}
          onOpenChange={setShowOrderModal}
          onUpdateStatus={(status) => {
            toast({
              title: "Order Status Updated",
              description: `Order #${selectedOrder.id} has been marked as ${status}.`,
            });
          }}
        />
      )}
    </div>
  );
};

export default Sales;
