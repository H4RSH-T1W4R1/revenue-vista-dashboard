
import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";
import { FilterBar, FilterState } from "@/components/dashboard/FilterBar";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { BarChart, LineChart, PieChart, ActivitySquare, Download, Share2, RefreshCw } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Performance chart data
const performanceData = [
  { date: "Jan 01", overview: 4000, target: 3500 },
  { date: "Jan 15", overview: 3100, target: 3500 },
  { date: "Feb 01", overview: 4600, target: 3700 },
  { date: "Feb 15", overview: 3800, target: 3700 },
  { date: "Mar 01", overview: 5200, target: 3900 },
  { date: "Mar 15", overview: 4900, target: 3900 },
  { date: "Apr 01", overview: 6300, target: 4100 },
  { date: "Apr 15", overview: 5800, target: 4100 },
];

const Analytics = () => {
  const [filters, setFilters] = useState<FilterState>({
    date: undefined,
    region: "all",
    category: "all"
  });
  
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [showInsightModal, setShowInsightModal] = useState(false);
  const [selectedInsight, setSelectedInsight] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [insightData, setInsightData] = useState<{title: string, description: string, metrics: {label: string, value: string, change: string}[]}>({
    title: "",
    description: "",
    metrics: []
  });
  
  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    setIsRefreshing(true);
    
    // Simulate data refresh based on filters
    setTimeout(() => {
      setIsRefreshing(false);
      toast({
        title: "Analytics Updated",
        description: "Data has been filtered according to your selection.",
      });
    }, 800);
  };

  const handleRefreshData = () => {
    setIsRefreshing(true);
    toast({
      title: "Refreshing Data",
      description: "Fetching the latest analytics data...",
    });
    
    // Simulate data refresh
    setTimeout(() => {
      setIsRefreshing(false);
      toast({
        title: "Data Refreshed",
        description: "Analytics data is now up-to-date.",
      });
    }, 1500);
  };

  const handleShowInsight = (insight: string) => {
    // Different insight data based on selection
    let data = {
      title: insight,
      description: `Detailed analysis of ${insight} showing key metrics and trends over time.`,
      metrics: [
        { label: "Growth Rate", value: "12.5%", change: "+2.3%" },
        { label: "Engagement", value: "68%", change: "+5.2%" },
        { label: "Retention", value: "85.3%", change: "-1.7%" },
      ]
    };
    
    // Customize data based on insight type
    if (insight.includes("Conversion")) {
      data.metrics = [
        { label: "Overall Rate", value: "23.8%", change: "+2.1%" },
        { label: "First Visit", value: "16.2%", change: "+3.5%" },
        { label: "Repeat Visit", value: "42.7%", change: "+0.8%" },
      ];
    } else if (insight.includes("Session")) {
      data.metrics = [
        { label: "Avg. Duration", value: "2m 42s", change: "+18s" },
        { label: "Pages/Session", value: "3.4", change: "-0.2" },
        { label: "Bounce Rate", value: "42.3%", change: "-3.8%" },
      ];
    }
    
    setInsightData(data);
    setSelectedInsight(insight);
    setShowInsightModal(true);
  };

  const handleExportData = (format: string) => {
    toast({
      title: `Analytics ${format} Export`,
      description: `Your ${activeTab} analytics data has been exported as ${format}.`,
    });
  };

  const metricsData = {
    overview: [
      { label: "Conversion Rate", value: "23.8%", change: "+2.1%", isPositive: true },
      { label: "Avg. Session Duration", value: "2m 42s", change: "+18s", isPositive: true },
      { label: "Bounce Rate", value: "42.3%", change: "-3.8%", isPositive: true },
      { label: "Pages per Session", value: "3.4", change: "-0.2", isPositive: false }
    ],
    sales: [
      { label: "Revenue Growth", value: "18.2%", change: "+3.5%", isPositive: true },
      { label: "Avg. Order Value", value: "$158.42", change: "+$12.30", isPositive: true },
      { label: "Order Frequency", value: "1.8/mo", change: "+0.3", isPositive: true },
      { label: "Refund Rate", value: "2.1%", change: "-0.5%", isPositive: true }
    ],
    customers: [
      { label: "New Customers", value: "845", change: "+12%", isPositive: true },
      { label: "Retention Rate", value: "68.3%", change: "+2.4%", isPositive: true },
      { label: "Churn Rate", value: "5.2%", change: "-0.8%", isPositive: true },
      { label: "Lifetime Value", value: "$840", change: "+$45", isPositive: true }
    ],
    products: [
      { label: "Top Product", value: "SmartWatch", change: "↑2", isPositive: true },
      { label: "Product Views", value: "28.4K", change: "+15%", isPositive: true },
      { label: "Add to Cart Rate", value: "12.3%", change: "+0.7%", isPositive: true },
      { label: "Inventory Turnover", value: "4.8x", change: "+0.2x", isPositive: true }
    ]
  };

  return (
    <div className="flex h-screen bg-dashboard-deepblue text-white overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        
        <div className="flex-1 overflow-y-auto p-6 pb-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
              <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
              
              <div className="flex gap-3">
                <div className="dropdown">
                  <Button 
                    variant="outline"
                    size="sm"
                    className="border-white/10 hover:bg-white/5 flex gap-2 items-center"
                    onClick={() => {
                      const dropdown = document.getElementById("exportDropdown");
                      if (dropdown) {
                        dropdown.classList.toggle("hidden");
                      }
                    }}
                  >
                    <Download size={16} />
                    Export
                  </Button>
                  <div id="exportDropdown" className="hidden absolute mt-2 bg-dashboard-navy border border-white/10 rounded-md shadow-lg z-10 overflow-hidden">
                    <div className="py-1">
                      <button
                        className="block px-4 py-2 text-sm text-white hover:bg-white/5 w-full text-left"
                        onClick={() => handleExportData("PDF")}
                      >
                        PDF
                      </button>
                      <button
                        className="block px-4 py-2 text-sm text-white hover:bg-white/5 w-full text-left"
                        onClick={() => handleExportData("CSV")}
                      >
                        CSV
                      </button>
                      <button
                        className="block px-4 py-2 text-sm text-white hover:bg-white/5 w-full text-left"
                        onClick={() => handleExportData("Excel")}
                      >
                        Excel
                      </button>
                    </div>
                  </div>
                </div>
                
                <Button 
                  variant="outline"
                  size="sm"
                  className="border-white/10 hover:bg-white/5 flex gap-2 items-center"
                  onClick={() => {
                    toast({
                      title: "Share Link Generated",
                      description: "Dashboard link has been copied to clipboard.",
                    });
                  }}
                >
                  <Share2 size={16} />
                  Share
                </Button>
                <Button 
                  variant="outline"
                  size="sm"
                  className="border-white/10 hover:bg-white/5 flex gap-2 items-center"
                  onClick={handleRefreshData}
                  disabled={isRefreshing}
                >
                  <RefreshCw size={16} className={isRefreshing ? "animate-spin" : ""} />
                  Refresh
                </Button>
              </div>
            </div>
            
            {/* Analytics Navigation Tabs */}
            <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="flex flex-wrap gap-2 mb-6 border-b border-white/10 bg-transparent w-full justify-start">
                {[
                  { id: "overview", label: "Overview", icon: <ActivitySquare size={16} /> },
                  { id: "sales", label: "Sales Analytics", icon: <BarChart size={16} /> },
                  { id: "customers", label: "Customer Analytics", icon: <PieChart size={16} /> },
                  { id: "products", label: "Product Analytics", icon: <LineChart size={16} /> }
                ].map(tab => (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className={`px-4 py-2.5 flex items-center gap-2 text-sm font-medium transition-all rounded-t-lg ${
                      activeTab === tab.id 
                        ? "text-white border-b-2 border-dashboard-blue -mb-px" 
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            
              {/* Filters */}
              <FilterBar onFiltersChange={handleFiltersChange} />
              
              {/* Tab Contents */}
              {Object.keys(metricsData).map((tabId) => (
                <TabsContent key={tabId} value={tabId} className="mt-0">
                  {/* Analytics Content */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                    {/* Main Chart */}
                    <div className="lg:col-span-2 glass-card rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold">
                          {tabId === "overview" && "Performance Overview"}
                          {tabId === "sales" && "Sales Trends"}
                          {tabId === "customers" && "Customer Acquisition"}
                          {tabId === "products" && "Product Performance"}
                        </h2>
                        
                        <div className="flex items-center gap-3">
                          <select 
                            className="bg-dashboard-navy text-sm border border-white/10 rounded py-1 px-2"
                            onChange={(e) => {
                              toast({
                                title: "Chart Type Changed",
                                description: `Chart view changed to ${e.target.value}`,
                              });
                            }}
                          >
                            <option value="7days">Last 7 days</option>
                            <option value="30days">Last 30 days</option>
                            <option value="90days">Last Quarter</option>
                            <option value="1year">Last Year</option>
                          </select>
                          
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="border-white/10 hover:bg-white/5 h-7 px-3"
                          >
                            <LineChart size={14} />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="border-white/10 hover:bg-white/5 h-7 px-3"
                          >
                            <BarChart size={14} />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="h-64 w-full rounded-lg">
                        {tabId === "overview" && (
                          <ResponsiveContainer width="100%" height="100%">
                            <RechartsLineChart data={performanceData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                              <XAxis 
                                dataKey="date" 
                                stroke="#ffffff60" 
                                tick={{ fontSize: 12, fill: '#ffffff80' }} 
                              />
                              <YAxis 
                                stroke="#ffffff60" 
                                tick={{ fontSize: 12, fill: '#ffffff80' }}
                                tickFormatter={(value) => `$${value}`} 
                              />
                              <Tooltip 
                                contentStyle={{ backgroundColor: '#1A1F2C', border: '1px solid #ffffff30', borderRadius: '8px' }}
                                itemStyle={{ color: '#fff' }}
                                labelStyle={{ color: '#fff', fontWeight: 'bold' }}
                              />
                              <Legend />
                              <Line 
                                type="monotone" 
                                dataKey="overview" 
                                stroke="#9b87f5" 
                                strokeWidth={3}
                                dot={{ r: 4, stroke: '#9b87f5', fill: '#1A1F2C' }}
                                activeDot={{ r: 6, stroke: '#fff', strokeWidth: 1, fill: '#9b87f5' }}
                                name="Performance"
                              />
                              <Line 
                                type="monotone" 
                                dataKey="target" 
                                stroke="#33C3F0" 
                                strokeWidth={2}
                                strokeDasharray="5 5"
                                dot={{ r: 4, stroke: '#33C3F0', fill: '#1A1F2C' }}
                                name="Target"
                              />
                            </RechartsLineChart>
                          </ResponsiveContainer>
                        )}
                        
                        {tabId !== "overview" && (
                          <div className="h-full w-full bg-dashboard-navy flex items-center justify-center">
                            <div className="text-center">
                              <div className="inline-flex items-center justify-center mb-3">
                                {tabId === "sales" && <BarChart size={40} className="text-dashboard-blue opacity-70" />}
                                {tabId === "customers" && <PieChart size={40} className="text-dashboard-blue opacity-70" />}
                                {tabId === "products" && <LineChart size={40} className="text-dashboard-blue opacity-70" />}
                              </div>
                              <p className="text-white/60 mb-2">Interactive {tabId} chart would appear here</p>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="border-white/10"
                                onClick={() => handleShowInsight(`${tabId} trends`)}
                              >
                                View Insights
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="mt-4 flex justify-end">
                        <Button 
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            toast({
                              title: "Detailed Analytics",
                              description: `Opening detailed ${tabId} analytics view.`,
                            });
                          }}
                        >
                          View Full Report
                        </Button>
                      </div>
                    </div>
                    
                    {/* Key Metrics */}
                    <div className="glass-card rounded-xl p-6">
                      <h2 className="text-lg font-semibold mb-4">Key Metrics</h2>
                      <div className="space-y-4">
                        {metricsData[tabId as keyof typeof metricsData].map((metric, index) => (
                          <div 
                            key={index} 
                            className="p-3 rounded-lg bg-dashboard-navy hover:bg-dashboard-navy/80 transition-all cursor-pointer"
                            onClick={() => handleShowInsight(metric.label)}
                          >
                            <div className="flex justify-between items-center">
                              <p className="text-sm text-white/70">{metric.label}</p>
                              <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                                metric.isPositive ? "bg-green-900/30 text-green-400" : "bg-dashboard-pink/30 text-dashboard-pink"
                              }`}>
                                {metric.change}
                              </span>
                            </div>
                            <p className="text-xl font-semibold mt-1">{metric.value}</p>
                          </div>
                        ))}
                      </div>
                      
                      <Button 
                        className="w-full mt-4 bg-dashboard-blue hover:bg-dashboard-blue/80"
                        onClick={() => {
                          toast({
                            title: "Analytics Report",
                            description: `Detailed ${tabId} metrics report is being generated.`,
                          });
                        }}
                      >
                        Generate Full Report
                      </Button>
                    </div>
                  </div>
                  
                  {/* Analytics Segments */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <div className="glass-card rounded-xl p-6">
                      <h2 className="text-lg font-semibold mb-4">Top Segments</h2>
                      <div className="space-y-2">
                        {[
                          { label: "North America", value: "38.2%", color: "bg-dashboard-blue" },
                          { label: "Europe", value: "28.7%", color: "bg-dashboard-cyan" },
                          { label: "Asia Pacific", value: "22.4%", color: "bg-dashboard-pink" },
                          { label: "Other Regions", value: "10.7%", color: "bg-dashboard-purple" },
                        ].map((segment, index) => (
                          <div 
                            key={index} 
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-all cursor-pointer"
                            onClick={() => handleShowInsight(segment.label)}
                          >
                            <div className={`w-3 h-3 rounded-full ${segment.color}`}></div>
                            <span className="flex-1">{segment.label}</span>
                            <span className="font-medium">{segment.value}</span>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-7 w-7 p-0"
                              onClick={(e) => {
                                e.stopPropagation();
                                toast({
                                  title: `${segment.label} Details`,
                                  description: `Detailed analytics for ${segment.label} region.`
                                });
                              }}
                            >
                              →
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="glass-card rounded-xl p-6">
                      <h2 className="text-lg font-semibold mb-4">Insights</h2>
                      <div className="space-y-3">
                        {[
                          { title: "Sales Spike Detected", desc: "Unusual activity on weekends", isAlert: true },
                          { title: "New Customer Trend", desc: "25-34 age group growing fast", isAlert: false },
                          { title: "Inventory Alert", desc: "Product XYZ running low", isAlert: true },
                          { title: "Returning Customers", desc: "Loyalty increasing by 12%", isAlert: false },
                        ].map((insight, index) => (
                          <div 
                            key={index} 
                            className="p-3 rounded-lg bg-dashboard-navy hover:bg-dashboard-navy/80 transition-all cursor-pointer"
                            onClick={() => handleShowInsight(insight.title)}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`p-1.5 rounded-md mt-0.5 ${insight.isAlert ? "bg-dashboard-pink/20" : "bg-dashboard-blue/20"}`}>
                                <ActivitySquare size={16} className={insight.isAlert ? "text-dashboard-pink" : "text-dashboard-blue"} />
                              </div>
                              <div className="flex-1">
                                <p className="font-medium text-sm">{insight.title}</p>
                                <p className="text-xs text-white/60 mt-0.5">{insight.desc}</p>
                              </div>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-7 w-7 p-0 ml-2"
                              >
                                →
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </div>
      
      <Dialog open={showInsightModal} onOpenChange={setShowInsightModal}>
        <DialogContent className="bg-dashboard-navy border-white/10 text-white">
          <DialogHeader>
            <DialogTitle>{insightData.title} Insights</DialogTitle>
            <DialogDescription className="text-white/70">
              {insightData.description}
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4 space-y-4">
            <div className="h-48 w-full bg-dashboard-deepblue rounded-lg flex items-center justify-center">
              <div className="text-center text-white/60">
                <ActivitySquare size={32} className="mx-auto mb-2 text-dashboard-blue opacity-70" />
                <p>Detailed {selectedInsight} chart visualization</p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-3 mb-4">
              {insightData.metrics.map((metric, idx) => (
                <div key={idx} className="p-3 bg-dashboard-deepblue rounded-lg">
                  <p className="text-xs text-white/60">{metric.label}</p>
                  <p className="text-lg font-semibold">{metric.value}</p>
                  <p className="text-xs text-green-400">{metric.change}</p>
                </div>
              ))}
            </div>
            
            <div className="bg-dashboard-deepblue rounded-lg p-4">
              <h3 className="font-medium mb-2">Key Observations</h3>
              <ul className="space-y-1 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="bg-dashboard-blue rounded-full w-1.5 h-1.5 mt-1.5"></span>
                  <span>Significant upward trend observed over the past 30 days</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-dashboard-blue rounded-full w-1.5 h-1.5 mt-1.5"></span>
                  <span>Performance peaks on weekdays between 2-4PM EST</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-dashboard-blue rounded-full w-1.5 h-1.5 mt-1.5"></span>
                  <span>Correlation with marketing campaign launches detected</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-dashboard-blue rounded-full w-1.5 h-1.5 mt-1.5"></span>
                  <span>Regional variations suggest localizing strategies would be beneficial</span>
                </li>
              </ul>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" className="border-white/10 hover:bg-white/5" onClick={() => setShowInsightModal(false)}>
              Close
            </Button>
            <Button 
              className="bg-dashboard-blue hover:bg-dashboard-blue/80" 
              onClick={() => {
                toast({
                  title: "Insight Exported",
                  description: `${selectedInsight} insights have been exported to PDF.`,
                });
                setShowInsightModal(false);
              }}
            >
              Export Insights
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Analytics;
