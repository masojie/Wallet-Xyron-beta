import { motion } from "framer-motion";
import { format, parseISO } from "date-fns";
import { Block, GlobalTransaction } from "@/shared/schema";
import { mockBlocks, mockGlobalTransactions } from "@/data/wallet-data";
import {
  Boxes,
  ArrowLeftRight,
  ExternalLink,
  CheckCircle2,
  Clock,
  XCircle,
  ChevronLeft,
  Fuel,
  Hash,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const statusConfig = {
  success: { icon: CheckCircle2, color: "text-success", bg: "bg-success/15" },
  pending: { icon: Clock, color: "text-yellow-400", bg: "bg-yellow-400/15" },
  failed: { icon: XCircle, color: "text-destructive", bg: "bg-destructive/15" },
};

const BlockCard = ({ block, index }: { block: Block; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    whileTap={{ scale: 0.97 }}
    transition={{ delay: index * 0.06, duration: 0.35 }}
    className="glass-surface rounded-2xl p-4 cursor-pointer"
  >
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center">
          <Boxes className="w-4 h-4 text-primary" />
        </div>
        <div>
          <p className="text-sm font-bold text-foreground">#{block.height.toLocaleString()}</p>
          <p className="text-[10px] text-muted-foreground">
            {format(parseISO(block.timestamp), "h:mm:ss a")}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-xs font-semibold text-foreground">{block.txCount} txns</p>
        <p className="text-[10px] text-muted-foreground">
          <Fuel className="w-3 h-3 inline mr-0.5" />
          {(block.gasUsed / 1e6).toFixed(1)}M
        </p>
      </div>
    </div>
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1.5">
        <Hash className="w-3 h-3 text-muted-foreground" />
        <span className="text-[11px] font-mono text-muted-foreground truncate max-w-[140px]">
          {block.hash}
        </span>
      </div>
      <span className="text-[10px] font-mono text-primary/70 truncate max-w-[90px]">
        {block.validator}
      </span>
    </div>
  </motion.div>
);

const GlobalTxRow = ({ tx, index }: { tx: GlobalTransaction; index: number }) => {
  const StatusIcon = statusConfig[tx.status].icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileTap={{ scale: 0.97 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="flex items-center gap-3 py-3.5 px-1 cursor-pointer"
    >
      <div className={`w-8 h-8 rounded-lg ${statusConfig[tx.status].bg} flex items-center justify-center shrink-0`}>
        <StatusIcon className={`w-4 h-4 ${statusConfig[tx.status].color}`} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-mono font-semibold text-foreground truncate max-w-[120px]">
            {tx.txHash}
          </span>
        </div>
        <p className="text-[10px] text-muted-foreground mt-0.5">
          <span className="font-mono">{tx.from}</span> → <span className="font-mono">{tx.to}</span>
        </p>
      </div>
      <div className="text-right shrink-0">
        <p className="text-xs font-bold text-foreground">{tx.value} {tx.currency}</p>
        <p className="text-[10px] text-muted-foreground">
          {format(parseISO(tx.timestamp), "h:mm:ss a")}
        </p>
      </div>
    </motion.div>
  );
};

const Explorer = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background orbs */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-primary/8 blur-[100px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-accent/6 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-md mx-auto px-5 pt-14 pb-10">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-6">
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => navigate("/")}
            className="w-10 h-10 rounded-xl glass-surface flex items-center justify-center"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </motion.button>
          <h1 className="text-lg font-bold text-foreground">Block Explorer</h1>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full glass-surface">
            <span className="live-dot w-2 h-2 rounded-full bg-success" />
            <span className="text-[10px] font-semibold text-success uppercase tracking-wider">
              Live
            </span>
          </div>
        </div>

        {/* Network stats */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            { label: "Block Height", value: "19.28M" },
            { label: "Gas Price", value: "12 Gwei" },
            { label: "TPS", value: "14.2" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileTap={{ scale: 0.95 }}
              transition={{ delay: i * 0.08 }}
              className="glass-surface rounded-2xl p-3 text-center"
            >
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">
                {stat.label}
              </p>
              <p className="text-sm font-bold text-foreground">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Latest Blocks */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4 px-1">
            <div className="flex items-center gap-2">
              <Boxes className="w-4 h-4 text-primary" />
              <h2 className="text-base font-bold text-foreground">Latest Blocks</h2>
            </div>
          </div>
          <div className="space-y-3">
            {mockBlocks.map((block, i) => (
              <BlockCard key={block.height} block={block} index={i} />
            ))}
          </div>
        </div>

        {/* Global Transactions */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4 px-1">
            <div className="flex items-center gap-2">
              <ArrowLeftRight className="w-4 h-4 text-accent" />
              <h2 className="text-base font-bold text-foreground">Global Transactions</h2>
            </div>
          </div>
          <div className="glass-card rounded-[1.5rem] px-5 divide-y divide-border/30">
            {mockGlobalTransactions.map((tx, i) => (
              <GlobalTxRow key={tx.txHash} tx={tx} index={i} />
            ))}
          </div>
        </div>

        {/* View on explorer */}
        <motion.a
          whileTap={{ scale: 0.95 }}
          href="https://etherscan.io"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full h-12 rounded-2xl flex items-center justify-center gap-2 text-sm font-semibold text-primary-foreground"
          style={{ background: "var(--gradient-primary)" }}
        >
          <ExternalLink className="w-4 h-4" />
          View on Web Explorer
        </motion.a>
      </div>
    </div>
  );
};

export default Explorer;
            
