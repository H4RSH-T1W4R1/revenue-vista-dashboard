
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { KPIDetailsModal } from "./KPIDetailsModal";

interface StatCardProps {
  title: string;
  value: string;
  trend?: number;
  icon?: React.ReactNode;
  iconColor?: string;
  textColor?: string;
  onClick?: () => void;
}

export function StatCard({ 
  title, 
  value, 
  trend, 
  icon, 
  iconColor = "bg-dashboard-blue", 
  textColor,
  onClick
}: StatCardProps) {
  const [showModal, setShowModal] = useState(false);
  const isTrendPositive = trend && trend > 0;
  
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      setShowModal(true);
    }
  };
  
  return (
    <>
      <div 
        className={cn(
          "glass-card rounded-xl p-6 hoverable-card glow cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98]",
          onClick ? "hover:shadow-lg" : ""
        )}
        onClick={handleClick}
      >
        <div className="flex items-start justify-between mb-4">
          <p className="text-sm font-medium text-white/60">{title}</p>
          {icon && (
            <div className={cn("p-2 rounded-lg", iconColor)}>
              {icon}
            </div>
          )}
        </div>
        
        <div className="mb-2">
          <h3 
            className={cn(
              "text-3xl font-bold", 
              textColor || "text-white"
            )}
          >
            {value}
          </h3>
        </div>
        
        {trend !== undefined && (
          <div className="flex items-center">
            <span className={cn(
              "text-sm font-medium flex items-center gap-1",
              isTrendPositive ? "text-green-400" : "text-dashboard-pink"
            )}>
              {isTrendPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
              {Math.abs(trend)}%
            </span>
            <span className="text-xs text-white/40 ml-2">vs. last month</span>
          </div>
        )}
      </div>
      
      {!onClick && (
        <KPIDetailsModal 
          open={showModal} 
          onOpenChange={setShowModal} 
          title={title}
          value={value}
          trend={trend}
        />
      )}
    </>
  );
}
