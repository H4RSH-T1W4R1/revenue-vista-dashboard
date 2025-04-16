
import React from 'react';
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface OrdersTableProps {
  isRefreshing: boolean;
  onRefresh: () => void;
  onViewOrder: (order: any) => void;
}

const OrdersTable: React.FC<OrdersTableProps> = ({ isRefreshing, onRefresh, onViewOrder }) => {
  const orders = [
    { id: "ORD-7892", customer: "John Smith", email: "john@example.com", amount: "$429.99", status: "Completed", date: "Apr 14, 2025", items: 3 },
    { id: "ORD-7891", customer: "Sarah Johnson", email: "sarah@example.com", amount: "$1,024.50", status: "Processing", date: "Apr 14, 2025", items: 7 },
    { id: "ORD-7890", customer: "Michael Brown", email: "michael@example.com", amount: "$65.25", status: "Completed", date: "Apr 13, 2025", items: 1 },
    { id: "ORD-7889", customer: "Emily Davis", email: "emily@example.com", amount: "$782.00", status: "Pending", date: "Apr 13, 2025", items: 4 },
    { id: "ORD-7888", customer: "Robert Wilson", email: "robert@example.com", amount: "$129.99", status: "Completed", date: "Apr 12, 2025", items: 2 },
  ];

  return (
    <div className="glass-card rounded-xl p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Recent Order Analytics</h2>
        <Button 
          variant="outline" 
          className="border-white/10 hover:bg-white/5 flex items-center gap-2"
          onClick={onRefresh}
          disabled={isRefreshing}
        >
          {isRefreshing ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              <span>Refreshing...</span>
            </>
          ) : (
            <>
              <Download size={16} />
              Refresh Data
            </>
          )}
        </Button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-white/60 border-b border-white/10">
              <th className="pb-3 pr-4">Order ID</th>
              <th className="pb-3 px-4">Customer</th>
              <th className="pb-3 px-4">Amount</th>
              <th className="pb-3 px-4">Status</th>
              <th className="pb-3 px-4">Date</th>
              <th className="pb-3 pl-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index} className="border-b border-white/5 hover:bg-white/5">
                <td className="py-3 pr-4">#{order.id}</td>
                <td className="py-3 px-4">{order.customer}</td>
                <td className="py-3 px-4">{order.amount}</td>
                <td className="py-3 px-4">
                  <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                    order.status === "Completed" ? "bg-green-900/30 text-green-400" : 
                    order.status === "Processing" ? "bg-blue-900/30 text-blue-400" : 
                    "bg-yellow-900/30 text-yellow-400"
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="py-3 px-4">{order.date}</td>
                <td className="py-3 pl-4 text-right">
                  <div className="flex gap-2 justify-end">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-white/70 hover:text-white hover:bg-white/10"
                      onClick={() => onViewOrder(order)}
                    >
                      View
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersTable;
