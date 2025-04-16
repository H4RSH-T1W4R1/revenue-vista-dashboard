
import { useState, useEffect } from "react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps, Legend } from "recharts";
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format, subDays, subMonths } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FilterState } from "./FilterBar";

// Generate data based on filters
const generateData = (timeRange: string, filters: FilterState) => {
  const today = new Date();
  let data = [];
  let days = 0;
  
  switch(timeRange) {
    case "week":
      days = 7;
      break;
    case "month":
      days = 30;
      break;
    case "quarter":
      days = 90;
      break;
    case "year":
      days = 365;
      break;
    default:
      days = 30;
  }
  
  // Generate base data
  for (let i = days - 1; i >= 0; i--) {
    const date = subDays(today, i);
    
    // Base multiplier for different regions
    let regionMultiplier = 1;
    if (filters.region === "north-america") regionMultiplier = 1.2;
    if (filters.region === "europe") regionMultiplier = 0.9;
    if (filters.region === "asia") regionMultiplier = 0.8;
    if (filters.region === "australia") regionMultiplier = 0.7;
    if (filters.region === "africa") regionMultiplier = 0.5;
    
    // Base multiplier for different categories
    let categoryMultiplier = 1;
    if (filters.category === "electronics") categoryMultiplier = 1.3;
    if (filters.category === "clothing") categoryMultiplier = 0.95;
    if (filters.category === "home") categoryMultiplier = 0.85;
    if (filters.category === "sports") categoryMultiplier = 0.75;
    
    // Combine multipliers if specific filters are applied
    let multiplier = 1;
    if (filters.region !== "all") multiplier *= regionMultiplier;
    if (filters.category !== "all") multiplier *= categoryMultiplier;
    
    // Base values with some randomness
    const baseRevenue = 4000 + Math.random() * 3000;
    const baseOrders = 100 + Math.random() * 50;
    
    // Apply multiplier
    data.push({
      date: format(date, "yyyy-MM-dd"),
      revenue: Math.round(baseRevenue * multiplier),
      orders: Math.round(baseOrders * multiplier)
    });
  }
  
  // If we're looking at a longer timeframe, aggregate by week or month
  if (days > 60) {
    // Group by month for year view
    const monthlyData: {[key: string]: {revenue: number, orders: number, count: number}} = {};
    
    data.forEach(item => {
      const month = item.date.substring(0, 7); // YYYY-MM
      if (!monthlyData[month]) {
        monthlyData[month] = {revenue: 0, orders: 0, count: 0};
      }
      monthlyData[month].revenue += item.revenue;
      monthlyData[month].orders += item.orders;
      monthlyData[month].count += 1;
    });
    
    data = Object.keys(monthlyData).map(month => ({
      date: month + "-01", // First day of month
      revenue: Math.round(monthlyData[month].revenue),
      orders: Math.round(monthlyData[month].orders)
    }));
  } else if (days > 14) {
    // Group by week for month/quarter view
    const weeklyData: {[key: string]: {revenue: number, orders: number, count: number}} = {};
    
    data.forEach((item, index) => {
      const weekNum = Math.floor(index / 7);
      const weekKey = `week-${weekNum}`;
      
      if (!weeklyData[weekKey]) {
        weeklyData[weekKey] = {revenue: 0, orders: 0, count: 0};
      }
      weeklyData[weekKey].revenue += item.revenue;
      weeklyData[weekKey].orders += item.orders;
      weeklyData[weekKey].count += 1;
    });
    
    let weekIndex = 0;
    data = Object.values(weeklyData).map(week => ({
      date: `Week ${++weekIndex}`,
      revenue: Math.round(week.revenue),
      orders: Math.round(week.orders)
    }));
  }
  
  return data;
};

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip bg-dashboard-navy p-4 rounded-lg border border-white/10 shadow-lg">
        <p className="text-sm font-medium text-white/80">
          {label.includes("Week") ? label : label.includes("-") ? format(new Date(label), 'MMM dd, yyyy') : label}
        </p>
        <p className="text-sm text-dashboard-cyan font-bold">
          Revenue: ${payload[0].value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </p>
        <p className="text-sm text-dashboard-pink font-bold">
          Orders: {payload[1].value}
        </p>
      </div>
    );
  }
  return null;
};

interface RevenueChartProps {
  filters: FilterState;
}

export function RevenueChart({ filters }: RevenueChartProps) {
  const [timeRange, setTimeRange] = useState("month");
  const [chartType, setChartType] = useState("line");
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API load time
    setTimeout(() => {
      const newData = generateData(timeRange, filters);
      setData(newData);
      setIsLoading(false);
    }, 800);
  }, [timeRange, filters]);
  
  const formatXAxis = (tick: string) => {
    if (tick.includes("Week")) return tick;
    const date = new Date(tick);
    return timeRange === "year" ? format(date, "MMM") : format(date, "MMM dd");
  };
  
  return (
    <div className="glass-card rounded-xl p-6 hoverable-card">
      <div className="flex flex-wrap items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-medium text-white mb-1">Revenue Overview</h3>
          <p className="text-sm text-white/60">Monthly revenue and orders</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-dashboard-cyan"></div>
              <span className="text-xs text-white/70">Revenue</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-dashboard-pink"></div>
              <span className="text-xs text-white/70">Orders</span>
            </div>
          </div>
          
          <Tabs defaultValue="line" onValueChange={(value) => setChartType(value)} className="w-[200px]">
            <TabsList className="grid w-full grid-cols-2 bg-dashboard-navy/40">
              <TabsTrigger value="line" className="text-xs">Line Chart</TabsTrigger>
              <TabsTrigger value="bar" className="text-xs">Bar Chart</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Select defaultValue={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[120px] border-white/10 bg-dashboard-navy">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent className="bg-dashboard-navy border-white/10">
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="month">Month</SelectItem>
              <SelectItem value="quarter">Quarter</SelectItem>
              <SelectItem value="year">Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="h-80 chart-container relative">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-dashboard-navy/30 backdrop-blur-sm rounded-lg">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 border-4 border-dashboard-blue/30 border-t-dashboard-blue rounded-full animate-spin"></div>
              <p className="mt-2 text-sm text-white/70">Loading chart data...</p>
            </div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "line" ? (
              <LineChart
                data={data}
                margin={{
                  top: 10,
                  right: 10,
                  left: 0,
                  bottom: 10,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={formatXAxis}
                  stroke="rgba(255,255,255,0.3)"
                  tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
                />
                <YAxis 
                  yAxisId="left"
                  stroke="rgba(255,255,255,0.3)"
                  tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
                  tickFormatter={(tick) => `$${tick/1000}k`}
                  domain={['dataMin - 1000', 'dataMax + 1000']}
                />
                <YAxis 
                  yAxisId="right" 
                  orientation="right" 
                  stroke="rgba(255,255,255,0.3)"
                  tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
                  domain={['dataMin - 10', 'dataMax + 10']}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="revenue"
                  stroke="#2DEEF2"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#2DEEF2", strokeWidth: 0 }}
                  activeDot={{ r: 6, fill: "#2DEEF2", stroke: "rgba(45, 238, 242, 0.2)", strokeWidth: 4 }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="orders"
                  stroke="#FF5C8F"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#FF5C8F", strokeWidth: 0 }}
                  activeDot={{ r: 6, fill: "#FF5C8F", stroke: "rgba(255, 92, 143, 0.2)", strokeWidth: 4 }}
                />
              </LineChart>
            ) : (
              <BarChart
                data={data}
                margin={{
                  top: 10,
                  right: 10,
                  left: 0,
                  bottom: 10,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={formatXAxis}
                  stroke="rgba(255,255,255,0.3)"
                  tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
                />
                <YAxis 
                  yAxisId="left"
                  stroke="rgba(255,255,255,0.3)"
                  tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
                  tickFormatter={(tick) => `$${tick/1000}k`}
                />
                <YAxis 
                  yAxisId="right" 
                  orientation="right" 
                  stroke="rgba(255,255,255,0.3)"
                  tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  yAxisId="left"
                  dataKey="revenue"
                  fill="#2DEEF2"
                  radius={[4, 4, 0, 0]}
                  barSize={timeRange === "week" ? 20 : 10}
                />
                <Bar
                  yAxisId="right"
                  dataKey="orders"
                  fill="#FF5C8F"
                  radius={[4, 4, 0, 0]}
                  barSize={timeRange === "week" ? 20 : 10}
                />
              </BarChart>
            )}
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
