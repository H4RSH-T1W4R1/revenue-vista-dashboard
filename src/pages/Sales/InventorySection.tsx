
import React from 'react';
import { TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const InventorySection = () => {
  const products = [
    { id: "PRD-001", name: "Wireless Earbuds", category: "Electronics", stock: 142, price: "$89.99", status: "In Stock" },
    { id: "PRD-002", name: "Smart Watch", category: "Electronics", stock: 78, price: "$159.50", status: "In Stock" },
    { id: "PRD-003", name: "Cotton T-Shirt", category: "Apparel", stock: 3, price: "$24.95", status: "Low Stock" },
    { id: "PRD-004", name: "Bluetooth Speaker", category: "Electronics", stock: 0, price: "$129.99", status: "Out of Stock" },
    { id: "PRD-005", name: "Desk Lamp", category: "Home Goods", stock: 53, price: "$49.95", status: "In Stock" },
  ];

  return (
    <div className="glass-card rounded-xl p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Inventory Performance Tracking</h2>
        <Button 
          variant="outline" 
          className="border-white/10 hover:bg-white/5"
          onClick={() => {
            alert("Inventory Management");
          }}
        >
          <TrendingUp size={16} className="mr-2" />
          Optimize Inventory
        </Button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-white/60 border-b border-white/10">
              <th className="pb-3 pr-4">Product</th>
              <th className="pb-3 px-4">Category</th>
              <th className="pb-3 px-4">Stock</th>
              <th className="pb-3 px-4">Price</th>
              <th className="pb-3 px-4">Status</th>
              <th className="pb-3 pl-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index} className="border-b border-white/5 hover:bg-white/5">
                <td className="py-3 pr-4">{product.name}</td>
                <td className="py-3 px-4">{product.category}</td>
                <td className="py-3 px-4">{product.stock}</td>
                <td className="py-3 px-4">{product.price}</td>
                <td className="py-3 px-4">
                  <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                    product.status === "In Stock" ? "bg-green-900/30 text-green-400" : 
                    product.status === "Low Stock" ? "bg-yellow-900/30 text-yellow-400" : 
                    "bg-dashboard-pink/20 text-dashboard-pink"
                  }`}>
                    {product.status}
                  </span>
                </td>
                <td className="py-3 pl-4 text-right">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-white/70 hover:text-white hover:bg-white/10"
                    onClick={() => {
                      alert(`Restock request for ${product.name}`);
                    }}
                  >
                    Restock
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventorySection;
