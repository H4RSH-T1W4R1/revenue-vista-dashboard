
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Transaction {
  id: string;
  date: string;
  customer: string;
  amount: number;
  status: "completed" | "pending" | "failed";
}

const transactions: Transaction[] = [
  {
    id: "TX-1234",
    date: "Apr 14, 2024",
    customer: "John Smith",
    amount: 345.99,
    status: "completed",
  },
  {
    id: "TX-1235",
    date: "Apr 13, 2024",
    customer: "Sarah Johnson",
    amount: 1250.00,
    status: "completed",
  },
  {
    id: "TX-1236",
    date: "Apr 13, 2024",
    customer: "Alex Williams",
    amount: 890.50,
    status: "pending",
  },
  {
    id: "TX-1237",
    date: "Apr 12, 2024",
    customer: "Michael Brown",
    amount: 2340.75,
    status: "completed",
  },
  {
    id: "TX-1238",
    date: "Apr 11, 2024",
    customer: "Lisa Davis",
    amount: 125.29,
    status: "failed",
  },
];

export function TransactionsTable() {
  return (
    <div className="glass-card rounded-xl p-6 hoverable-card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-medium text-white mb-1">Recent Transactions</h3>
          <p className="text-sm text-white/60">Latest sales activity</p>
        </div>
        <button className="text-dashboard-cyan text-sm hover:text-dashboard-cyan/80 transition-colors">
          View All
        </button>
      </div>
      
      <div className="rounded-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-white/5">
            <TableRow className="border-b border-white/10 hover:bg-transparent">
              <TableHead className="text-white/60 font-medium">Transaction ID</TableHead>
              <TableHead className="text-white/60 font-medium">Date</TableHead>
              <TableHead className="text-white/60 font-medium">Customer</TableHead>
              <TableHead className="text-white/60 font-medium text-right">Amount</TableHead>
              <TableHead className="text-white/60 font-medium">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow 
                key={transaction.id} 
                className="border-b border-white/10 hover:bg-white/5"
              >
                <TableCell className="font-medium text-white/80">{transaction.id}</TableCell>
                <TableCell className="text-white/70">{transaction.date}</TableCell>
                <TableCell className="text-white">{transaction.customer}</TableCell>
                <TableCell className="text-right font-medium text-white">
                  ${transaction.amount.toFixed(2)}
                </TableCell>
                <TableCell>
                  <Badge 
                    className={cn(
                      "text-xs font-medium border-none",
                      transaction.status === "completed" && "bg-green-500/20 text-green-400",
                      transaction.status === "pending" && "bg-yellow-500/20 text-yellow-400",
                      transaction.status === "failed" && "bg-dashboard-pink/20 text-dashboard-pink"
                    )}
                  >
                    {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
