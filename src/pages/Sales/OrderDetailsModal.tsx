
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface OrderDetailsModalProps {
  order: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdateStatus: (status: string) => void;
}

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({ 
  order, 
  open, 
  onOpenChange, 
  onUpdateStatus 
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-dashboard-navy border-white/10 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle>Order #{order.id}</DialogTitle>
          <DialogDescription className="text-white/70">
            Order details and management options
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm text-white/60 mb-1">Customer Information</h3>
              <p className="font-medium">{order.customer}</p>
              <p className="text-sm text-white/80">{order.email}</p>
            </div>
            <div>
              <h3 className="text-sm text-white/60 mb-1">Order Summary</h3>
              <p className="font-medium">{order.items} items</p>
              <p className="text-sm text-white/80">Total: {order.amount}</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm text-white/60 mb-2">Order Status</h3>
            <div className="flex gap-2">
              {["Pending", "Processing", "Completed", "Cancelled"].map((status) => (
                <button 
                  key={status} 
                  className={`px-3 py-1.5 text-sm rounded-md ${
                    order.status === status 
                      ? "bg-dashboard-blue text-white" 
                      : "bg-dashboard-deepblue text-white/80 hover:bg-white/10"
                  }`}
                  onClick={() => onUpdateStatus(status)}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-sm text-white/60 mb-2">Item Details</h3>
            <div className="bg-dashboard-deepblue rounded-lg p-3 space-y-2">
              {[
                { name: "Product A", price: "$129.99", quantity: 1 },
                { name: "Product B", price: "$149.50", quantity: 2 },
                { name: "Product C", price: "$79.99", quantity: order.items - 3 },
              ].slice(0, order.items > 3 ? 3 : order.items).map((item, i) => (
                <div key={i} className="flex justify-between py-2 border-b border-white/10 last:border-0">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-xs text-white/60">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-mono">{item.price}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm text-white/60 mb-2">Actions</h3>
            <div className="flex flex-wrap gap-2">
              <Button 
                size="sm"
                variant="outline"
                className="border-white/10 hover:bg-dashboard-blue/20"
                onClick={() => alert("Order Processing")}
              >
                Process Order
              </Button>
              <Button 
                size="sm"
                variant="outline"
                className="border-white/10 hover:bg-dashboard-cyan/20"
                onClick={() => alert("Order Invoice")}
              >
                Generate Invoice
              </Button>
              <Button 
                size="sm"
                variant="outline"
                className="border-white/10 hover:bg-dashboard-pink/20"
                onClick={() => onOpenChange(false)}
              >
                Cancel Order
              </Button>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" className="border-white/10 hover:bg-white/5" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button 
            className="bg-dashboard-blue hover:bg-dashboard-blue/80"
            onClick={() => {
              alert("Report Details");
              onOpenChange(false);
            }}
          >
            Export Details
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsModal;
