
import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";
import { StatCard } from "@/components/dashboard/StatCard";
import { FilterBar, FilterState } from "@/components/dashboard/FilterBar";
import { FileText, TrendingUp, BarChart, Calendar, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const revenueData = [
  { category: 'Electronics', value: 42000, percentage: 35 },
  { category: 'Furniture', value: 28000, percentage: 23 },
  { category: 'Clothing', value: 21000, percentage: 18 },
  { category: 'Beauty', value: 15000, percentage: 12 },
  { category: 'Home', value: 14000, percentage: 12 },
];

const COLORS = ['#9b87f5', '#7E69AB', '#33C3F0', '#F97316', '#16a34a'];

const Reports = () => {
  const [filters, setFilters] = useState<FilterState>({
    date: undefined,
    region: "all",
    category: "all"
  });
  
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedReportType, setSelectedReportType] = useState("");
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  
  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const handleGenerateReport = (type: string) => {
    setSelectedReportType(type);
    setShowReportModal(true);
  };

  const handleDownloadReport = () => {
    setIsGenerating(true);
    
    // Simulate generation process
    setTimeout(() => {
      setIsGenerating(false);
      toast({
        title: "Report Downloaded",
        description: `Your ${selectedReportType} report has been downloaded successfully.`,
      });
      setShowReportModal(false);
    }, 1500);
  };

  const handlePreviewReport = () => {
    toast({
      title: "Report Preview",
      description: `Preview of ${selectedReportType} report opened in a new tab.`,
    });
  };

  return (
    <div className="flex h-screen bg-dashboard-deepblue text-white overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        
        <div className="flex-1 overflow-y-auto p-6 pb-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Reports</h1>
            
            {/* Report Types */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <StatCard 
                title="Sales Analytics" 
                value="$75,849" 
                icon={<FileText size={18} className="text-white" />} 
                iconColor="bg-dashboard-blue"
                onClick={() => handleGenerateReport("Sales Analytics")}
                caption="View Full Report"
              />
              <StatCard 
                title="Performance Metrics" 
                value="68.2%" 
                icon={<TrendingUp size={18} className="text-white" />} 
                iconColor="bg-dashboard-cyan"
                onClick={() => handleGenerateReport("Performance Metrics")}
                caption="View Full Report"
              />
              <StatCard 
                title="Product Insights" 
                value="154%" 
                icon={<BarChart size={18} className="text-white" />} 
                iconColor="bg-dashboard-pink"
                onClick={() => handleGenerateReport("Product Insights")}
                caption="View Full Report"
              />
              <StatCard 
                title="Growth Forecast" 
                value="$124K" 
                icon={<Calendar size={18} className="text-white" />} 
                iconColor="bg-dashboard-purple"
                onClick={() => handleGenerateReport("Growth Forecast")}
                caption="View Full Report"
              />
            </div>
            
            {/* Revenue Distribution Chart */}
            <div className="glass-card rounded-xl p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Revenue Distribution</h2>
                <Button 
                  variant="outline" 
                  className="border-white/10 hover:bg-white/5 flex items-center gap-2"
                >
                  <Download size={16} />
                  Export Report
                </Button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={revenueData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="category"
                        label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {revenueData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-4">Category Breakdown</h3>
                  <div className="space-y-3">
                    {revenueData.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                          />
                          <span>{item.category}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-white/70">${item.value.toLocaleString()}</span>
                          <div className="w-20 bg-white/10 h-2 rounded-full">
                            <div 
                              className="h-full rounded-full" 
                              style={{ 
                                width: `${item.percentage}%`, 
                                backgroundColor: COLORS[idx % COLORS.length] 
                              }}
                            />
                          </div>
                          <span className="w-8 text-end">{item.percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Filters and Recent Reports */}
            <FilterBar onFiltersChange={handleFiltersChange} />
            
            <div className="glass-card rounded-xl p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Recent Reports</h2>
              <div className="space-y-4">
                {[
                  { name: "Q1 Sales Analysis Report", date: "April 10, 2025", size: "2.4 MB", type: "PDF" },
                  { name: "Performance Metrics Dashboard", date: "April 5, 2025", size: "1.8 MB", type: "Excel" },
                  { name: "Product Line Growth Comparison", date: "March 28, 2025", size: "3.2 MB", type: "PDF" },
                  { name: "Regional Sales Performance", date: "March 15, 2025", size: "4.1 MB", type: "Excel" }
                ].map((report, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-dashboard-navy rounded-lg hover:bg-dashboard-navy/80 transition-all">
                    <div className="flex items-center gap-3">
                      <FileText size={18} className="text-dashboard-blue" />
                      <div>
                        <p className="font-medium">{report.name}</p>
                        <div className="flex items-center gap-2">
                          <p className="text-sm text-white/60">{report.date}</p>
                          <span className="px-2 py-0.5 text-xs bg-white/10 rounded-full">{report.type}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-white/60">{report.size}</span>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-white/10 hover:bg-dashboard-blue/20"
                          onClick={() => {
                            toast({
                              title: "Report Preview",
                              description: `${report.name} preview opened.`,
                            });
                          }}
                        >
                          View
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="border-white/10 hover:bg-white/5"
                          onClick={() => {
                            toast({
                              title: "Report Downloaded",
                              description: `${report.name} has been downloaded.`
                            });
                          }}
                        >
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Dialog open={showReportModal} onOpenChange={setShowReportModal}>
        <DialogContent className="bg-dashboard-navy border-white/10 text-white">
          <DialogHeader>
            <DialogTitle>Generate {selectedReportType} Report</DialogTitle>
            <DialogDescription className="text-white/70">
              Configure your report parameters below.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium">Format</label>
                <select className="w-full p-2 rounded bg-dashboard-deepblue border border-white/10 text-white">
                  <option>PDF</option>
                  <option>Excel</option>
                  <option>CSV</option>
                </select>
              </div>
              
              <div className="space-y-1">
                <label className="text-sm font-medium">Date Range</label>
                <select className="w-full p-2 rounded bg-dashboard-deepblue border border-white/10 text-white">
                  <option>Last 30 Days</option>
                  <option>Current Month</option>
                  <option>Last Quarter</option>
                  <option>Year to Date</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-1">
              <label className="text-sm font-medium">Include Sections</label>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input type="checkbox" id="summary" className="mr-2" defaultChecked />
                  <label htmlFor="summary" className="text-sm">Executive Summary</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="charts" className="mr-2" defaultChecked />
                  <label htmlFor="charts" className="text-sm">Charts & Graphs</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="tables" className="mr-2" defaultChecked />
                  <label htmlFor="tables" className="text-sm">Data Tables</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="forecast" className="mr-2" />
                  <label htmlFor="forecast" className="text-sm">Forecasting</label>
                </div>
              </div>
            </div>
            
            <div className="space-y-1">
              <label className="text-sm font-medium">Delivery Options</label>
              <div className="flex items-center mt-1">
                <input type="radio" id="download" name="delivery" className="mr-2" defaultChecked />
                <label htmlFor="download" className="text-sm">Download Now</label>
              </div>
              <div className="flex items-center">
                <input type="radio" id="email" name="delivery" className="mr-2" />
                <label htmlFor="email" className="text-sm">Send via Email</label>
              </div>
              <div className="flex items-center">
                <input type="radio" id="schedule" name="delivery" className="mr-2" />
                <label htmlFor="schedule" className="text-sm">Schedule Delivery</label>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              className="border-white/10 hover:bg-white/5" 
              onClick={() => setShowReportModal(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="outline" 
              className="border-white/10 hover:bg-white/5" 
              onClick={handlePreviewReport}
            >
              Preview
            </Button>
            <Button 
              className="bg-dashboard-blue hover:bg-dashboard-blue/80" 
              onClick={handleDownloadReport}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></span>
                  Processing...
                </>
              ) : (
                "Generate & Download"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Reports;
