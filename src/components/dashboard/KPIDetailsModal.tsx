
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface KPIDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  value: string;
  trend?: number;
}

export function KPIDetailsModal({ open, onOpenChange, title, value, trend }: KPIDetailsModalProps) {
  // Sample historical data for the selected KPI
  const getHistoricalData = () => {
    // This would typically come from an API call or props
    const baseValue = title.includes("Revenue") ? 450000 : 
                      title.includes("Growth") ? 10 :
                      title.includes("Sales") ? 2500 :
                      title.includes("Order") ? 150 : 100;
    
    return Array.from({ length: 12 }, (_, i) => ({
      month: new Date(2023, i, 1).toLocaleString('default', { month: 'short' }),
      value: baseValue + Math.random() * baseValue * 0.2 - baseValue * 0.1
    }));
  };

  const historicalData = getHistoricalData();

  const formatYAxis = (value: number) => {
    if (title.includes("Revenue") || title.includes("Order")) {
      return `$${(value / 1000).toFixed(0)}k`;
    }
    if (title.includes("Growth")) {
      return `${value.toFixed(1)}%`;
    }
    return value.toLocaleString();
  };

  const getBarColor = () => {
    if (title.includes("Revenue")) return "#2DEEF2";
    if (title.includes("Growth")) return "#59ABFF";
    if (title.includes("Sales")) return "#FF5C8F";
    return "#7B61FF";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-dashboard-navy border-white/10 text-white sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">{title} Details</DialogTitle>
          <DialogDescription className="text-white/70">
            Historical data and insights for {title.toLowerCase()}
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4">
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-sm text-white/60">Current Value</p>
              <p className="text-2xl font-bold text-white">{value}</p>
            </div>
            {trend !== undefined && (
              <div className={`px-3 py-1.5 rounded-full ${trend >= 0 ? 'bg-green-500/20 text-green-400' : 'bg-dashboard-pink/20 text-dashboard-pink'}`}>
                <span className="text-sm font-medium">
                  {trend >= 0 ? '+' : ''}{trend}% vs. last period
                </span>
              </div>
            )}
          </div>
          
          <div className="h-64 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={historicalData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                <XAxis 
                  dataKey="month" 
                  stroke="rgba(255,255,255,0.3)"
                  tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
                />
                <YAxis 
                  stroke="rgba(255,255,255,0.3)"
                  tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
                  tickFormatter={formatYAxis}
                />
                <Tooltip 
                  formatter={(value) => [formatYAxis(Number(value)), "Value"]}
                  contentStyle={{ backgroundColor: "#1E213A", borderColor: "rgba(255,255,255,0.1)" }}
                  labelStyle={{ color: "rgba(255,255,255,0.8)" }}
                />
                <Bar 
                  dataKey="value" 
                  fill={getBarColor()}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-white/5 p-3 rounded-lg">
              <p className="text-xs text-white/60">Highest</p>
              <p className="text-sm font-medium text-white">
                {formatYAxis(Math.max(...historicalData.map(item => item.value)))}
              </p>
            </div>
            <div className="bg-white/5 p-3 rounded-lg">
              <p className="text-xs text-white/60">Lowest</p>
              <p className="text-sm font-medium text-white">
                {formatYAxis(Math.min(...historicalData.map(item => item.value)))}
              </p>
            </div>
            <div className="bg-white/5 p-3 rounded-lg">
              <p className="text-xs text-white/60">Average</p>
              <p className="text-sm font-medium text-white">
                {formatYAxis(historicalData.reduce((acc, curr) => acc + curr.value, 0) / historicalData.length)}
              </p>
            </div>
            <div className="bg-white/5 p-3 rounded-lg">
              <p className="text-xs text-white/60">Trend</p>
              <p className={`text-sm font-medium ${trend && trend >= 0 ? 'text-green-400' : 'text-dashboard-pink'}`}>
                {trend && trend >= 0 ? 'Positive' : 'Negative'}
              </p>
            </div>
          </div>
          
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" className="border-white/10 text-white hover:bg-white/10" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            <Button className="bg-dashboard-blue hover:bg-dashboard-blue/80">
              Export Data
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
