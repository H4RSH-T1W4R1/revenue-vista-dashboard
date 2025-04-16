
import React from 'react';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, BarChart2 } from 'lucide-react';

const salesData = [
  { month: 'Jan', revenue: 4000, profit: 2400 },
  { month: 'Feb', revenue: 3000, profit: 1398 },
  { month: 'Mar', revenue: 2000, profit: 9800 },
  { month: 'Apr', revenue: 2780, profit: 3908 },
  { month: 'May', revenue: 1890, profit: 4800 },
  { month: 'Jun', revenue: 2390, profit: 3800 },
];

const productPerformance = [
  { name: 'Electronics', sales: 1200, target: 1000 },
  { name: 'Furniture', sales: 800, target: 1200 },
  { name: 'Clothing', sales: 1500, target: 1400 },
  { name: 'Beauty', sales: 900, target: 800 },
  { name: 'Home', sales: 600, target: 750 },
];

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "#2563eb",
  },
  profit: {
    label: "Profit",
    color: "#16a34a",
  },
};

const productChartConfig = {
  sales: {
    label: "Sales",
    color: "#9b87f5",
  },
  target: {
    label: "Target",
    color: "#F97316",
  },
};

const SalesOverview = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div className="glass-card rounded-xl p-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Revenue & Profit</h2>
          <div className="flex items-center text-sm text-white/70">
            <TrendingUp size={14} className="mr-1" />
            Monthly Analysis
          </div>
        </div>
        
        <ChartContainer config={chartConfig} className="h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="month" 
                tickLine={false} 
                axisLine={false} 
                className="fill-muted-foreground"
                padding={{ left: 10, right: 10 }}
              />
              <YAxis 
                tickLine={false} 
                axisLine={false} 
                className="fill-muted-foreground"
                tickFormatter={(value) => `$${value / 1000}k`}
              />
              <Tooltip content={props => <ChartTooltipContent {...props} />} />
              <Bar dataKey="revenue" fill="var(--color-revenue)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="profit" fill="var(--color-profit)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <ChartLegend>
            {(props) => <ChartLegendContent {...props} />}
          </ChartLegend>
        </ChartContainer>
      </div>
      
      <div className="glass-card rounded-xl p-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Product Performance</h2>
          <div className="flex items-center text-sm text-white/70">
            <BarChart2 size={14} className="mr-1" />
            Sales vs Target
          </div>
        </div>
        
        <ChartContainer config={productChartConfig} className="h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={productPerformance} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="hsl(var(--border))" />
              <XAxis 
                type="number"
                tickLine={false} 
                axisLine={false} 
                className="fill-muted-foreground"
              />
              <YAxis 
                dataKey="name"
                type="category"
                tickLine={false} 
                axisLine={false} 
                className="fill-muted-foreground"
                width={80}
              />
              <Tooltip content={props => <ChartTooltipContent {...props} />} />
              <Bar dataKey="sales" fill="var(--color-sales)" radius={[0, 4, 4, 0]} />
              <Bar dataKey="target" fill="var(--color-target)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <ChartLegend>
            {(props) => <ChartLegendContent {...props} />}
          </ChartLegend>
        </ChartContainer>
      </div>
    </div>
  );
};

export default SalesOverview;
