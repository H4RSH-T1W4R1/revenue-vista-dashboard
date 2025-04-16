
import React from 'react';
import { FileChartColumn } from "lucide-react";
import { Button } from "@/components/ui/button";

const CustomersSection = () => {
  const customers = [
    { name: "Sarah Johnson", email: "sarah@example.com", orders: 32, totalSpent: "$5,840.50", status: "Active" },
    { name: "John Smith", email: "john@example.com", orders: 28, totalSpent: "$4,129.75", status: "Active" },
    { name: "Emily Davis", email: "emily@example.com", orders: 17, totalSpent: "$3,782.20", status: "Inactive" },
    { name: "Michael Brown", email: "michael@example.com", orders: 14, totalSpent: "$2,845.10", status: "Active" },
  ];

  return (
    <div className="glass-card rounded-xl p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Customer Engagement Metrics</h2>
        <Button 
          variant="outline" 
          className="border-white/10 hover:bg-white/5"
          onClick={() => {
            alert("Customer Insights Export");
          }}
        >
          <FileChartColumn size={16} className="mr-2" />
          Export Insights
        </Button>
      </div>
      
      <div className="space-y-3">
        {customers.map((customer, index) => (
          <div key={index} className="p-4 bg-dashboard-navy rounded-lg hover:bg-dashboard-navy/80 transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-dashboard-blue to-dashboard-cyan flex items-center justify-center text-lg font-bold">
                  {customer.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="text-white font-medium">{customer.name}</h3>
                  <p className="text-sm text-white/60">{customer.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-10">
                <div>
                  <p className="text-xs text-white/60">Orders</p>
                  <p className="font-medium">{customer.orders}</p>
                </div>
                <div>
                  <p className="text-xs text-white/60">Total Spent</p>
                  <p className="font-medium">{customer.totalSpent}</p>
                </div>
                <div>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                    customer.status === "Active" ? "bg-green-900/30 text-green-400" : 
                    "bg-yellow-900/30 text-yellow-400"
                  }`}>
                    {customer.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomersSection;
