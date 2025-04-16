
import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ChartData {
  name: string;
  value: number;
  color: string;
}

const CATEGORY_DATA: ChartData[] = [
  { name: "Electronics", value: 35, color: "#2DEEF2" },
  { name: "Clothing", value: 25, color: "#FF5C8F" },
  { name: "Home Goods", value: 20, color: "#7B61FF" },
  { name: "Sports", value: 15, color: "#FFC632" },
  { name: "Other", value: 5, color: "#59ABFF" },
];

const REGION_DATA: ChartData[] = [
  { name: "North America", value: 45, color: "#2DEEF2" },
  { name: "Europe", value: 30, color: "#FF5C8F" },
  { name: "Asia", value: 15, color: "#7B61FF" },
  { name: "Australia", value: 7, color: "#FFC632" },
  { name: "Africa", value: 3, color: "#59ABFF" },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip bg-dashboard-navy p-4 rounded-lg border border-white/10 shadow-lg">
        <p className="text-sm font-medium text-white/80">{payload[0].name}</p>
        <p className="text-sm text-dashboard-cyan font-bold">
          ${payload[0].value.toLocaleString()}k
        </p>
        <p className="text-xs text-white/60">
          {Math.round(payload[0].payload.percent)}% of total
        </p>
      </div>
    );
  }
  return null;
};

export function DonutChart() {
  const [chartType, setChartType] = useState<"category" | "region">("category");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const data = chartType === "category" ? CATEGORY_DATA : REGION_DATA;

  const calculatePercent = (data: ChartData[]) => {
    const total = data.reduce((sum, entry) => sum + entry.value, 0);
    return data.map(item => ({
      ...item,
      percent: (item.value / total) * 100
    }));
  };

  const processedData = calculatePercent(data);

  const handleMouseEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  return (
    <div className="glass-card rounded-xl p-6 hoverable-card">
      <div className="flex flex-wrap items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-medium text-white mb-1">Revenue Distribution</h3>
          <p className="text-sm text-white/60">
            {chartType === "category" ? "By product category" : "By region"}
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <Select defaultValue={chartType} onValueChange={(value: "category" | "region") => setChartType(value)}>
            <SelectTrigger className="w-[160px] border-white/10 bg-dashboard-navy">
              <SelectValue placeholder="Select view" />
            </SelectTrigger>
            <SelectContent className="bg-dashboard-navy border-white/10">
              <SelectItem value="category">By Category</SelectItem>
              <SelectItem value="region">By Region</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex flex-wrap lg:flex-nowrap items-center">
        <div className="w-full lg:w-2/3 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={processedData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {processedData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color} 
                    stroke="transparent"
                    style={{
                      filter: activeIndex === index ? "drop-shadow(0 0 8px rgba(255,255,255,0.5))" : "none",
                      transform: activeIndex === index ? "scale(1.05)" : "scale(1)",
                      transition: "transform 0.2s, filter 0.2s"
                    }}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="w-full lg:w-1/3">
          <div className="flex flex-col space-y-3">
            {processedData.map((entry, index) => (
              <div 
                key={`legend-${index}`} 
                className="flex items-center justify-between"
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                <div className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="text-sm text-white/80">{entry.name}</span>
                </div>
                <span className="text-sm font-medium text-white">
                  {Math.round(entry.percent)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
