import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Transaction } from "@/shared/schema";
import { format, parseISO } from "date-fns";
import {
  Wallet,
  ShoppingCart,
  Utensils,
  Gamepad2,
  Banknote,
  RefreshCw,
  ExternalLink,
  CheckCircle2,
  Clock,
  XCircle,
  Fuel,
  Hash,
  X,
} from "lucide-react";

const categoryIcons: Record<Transaction["category"], React.ReactNode> = {
  transfer: <Wallet className="w-5 h-5 text-primary" />,
  shopping: <ShoppingCart className="w-5 h-5 text-accent" />,
  food: <Utensils className="w-5 h-5 text-orange-400" />,
  entertainment: <Gamepad2 className="w-5 h-5 text-pink-400" />,
  salary: <Banknote className="w-5 h-5 text-success" />,
  subscription: <RefreshCw className="w-5 h-5 text-sky-400" />,
};

const statusConfig = {
  success: { icon: CheckCircle2, label: "Confirmed", color: "text-success" },
  pending: { icon: Clock, label: "Pending", color: "text-yellow-400" },
  failed: { icon: XCircle, label: "Failed", color: "text-destructive" },
};

interface TransactionListProps {
  transactions: Transaction[];
}

const TransactionSheet = ({
  tx,
  onClose,
}: {
  tx: Transaction;
  onClose: () => void;
}) => {
  const status = tx.status || "success";
  const StatusIcon = statusConfig[status].icon;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-background/60 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Sheet */}
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="relative z-10 w-full max-w-md glass-card rounded-t-[2rem] p-6 pb-10"
      >
        {/* Handle */}
        <div className="w-10 h-1 rounded-full bg-muted-foreground/30 mx-auto mb-5" />

        {/* Close */}
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full glass-surface flex items-center justify-center"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </motion.button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-14 h-14 rounded-2xl glass-surface flex items-center justify-center">
            {categoryIcons[tx.category]}
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground">{tx.title}</h3>
            <p className="text-xs text-muted-foreground">{tx.description}</p>
          </div>
        </div>

        {/* Amount */}
        <div className="glass-surface rounded-xl p-4 mb-4 text-center">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Amount</p>
          <p className={`text-2xl font-extrabold ${tx.type === "credit" ? "text-success" : "text-foreground"}`}>
            {tx.type === "credit" ? "+" : "−"}
            {new Intl.NumberFormat("en-US", { style: "currency", currency: tx.currency }).format(tx.amount)}
          </p>
        </div>

        {/* Details grid */}
        <div className="space-y-3">
          <DetailRow
            icon={<Hash className="w-3.5 h-3.5" />}
            label="TxHash"
            value={tx.txHash || "N/A"}
            mono
          />
          <DetailRow
            icon={<StatusIcon className={`w-3.5 h-3.5 ${statusConfig[status].color}`} />}
            label="Status"
            value={statusConfig[status].label}
            valueClass={statusConfig[status].color}
          />
          <DetailRow
            icon={<Fuel className="w-3.5 h-3.5" />}
            label="Gas Fee"
            value={tx.gasFee ? `${tx.gasFee} ETH` : "N/A"}
            mono
          />
          <DetailRow
            icon={<Clock className="w-3.5 h-3.5" />}
            label="Timestamp"
            value={format(parseISO(tx.date), "MMM d, yyyy · h:mm:ss a")}
          />
          {tx.from && (
            <DetailRow
              icon={<Wallet className="w-3.5 h-3.5" />}
              label="From"
              value={tx.from}
              mono
            />
          )}
          {tx.to && (
            <DetailRow
              icon={<Wallet className="w-3.5 h-3.5" />}
              label="To"
              value={tx.to}
              mono
            />
          )}
        </div>

        {/* Explorer link */}
        <motion.a
          whileTap={{ scale: 0.95 }}
          href={`https://etherscan.io/tx/${tx.txHash}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 w-full h-11 rounded-2xl glass-surface flex items-center justify-center gap-2 text-sm font-semibold text-primary"
        >
          <ExternalLink className="w-4 h-4" />
          View on Web Explorer
        </motion.a>
      </motion.div>
    </motion.div>
  );
};

const DetailRow = ({
  icon,
  label,
  value,
  mono,
  valueClass,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  mono?: boolean;
  valueClass?: string;
}) => (
  <div className="flex items-center justify-between py-2 px-1">
    <div className="flex items-center gap-2 text-muted-foreground">
      {icon}
      <span className="text-xs font-medium">{label}</span>
    </div>
    <span
      className={`text-xs font-semibold truncate max-w-[55%] text-right ${
        valueClass || "text-foreground"
      } ${mono ? "font-mono" : ""}`}
    >
      {value}
    </span>
  </div>
);

const TransactionItem = ({
  tx,
  index,
  onSelect,
}: {
  tx: Transaction;
  index: number;
  onSelect: () => void;
}) => {
  const isCredit = tx.type === "credit";
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: tx.currency,
    minimumFractionDigits: 2,
  }).format(tx.amount);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileTap={{ scale: 0.97 }}
      transition={{
        delay: index * 0.06,
        duration: 0.35,
        ease: [0.22, 1, 0.36, 1],
      }}
      onClick={onSelect}
      className="flex items-center gap-4 py-4 px-1 cursor-pointer active:bg-muted/20 rounded-xl transition-colors"
    >
      <div className="w-12 h-12 rounded-2xl glass-surface flex items-center justify-center shrink-0">
        {categoryIcons[tx.category]}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-foreground truncate">{tx.title}</p>
        <p className="text-xs text-muted-foreground mt-0.5">
          {format(parseISO(tx.date), "MMM d, h:mm a")}
        </p>
      </div>

      <div className="text-right shrink-0">
        <p className={`text-sm font-bold ${isCredit ? "text-success" : "text-foreground"}`}>
          {isCredit ? "+" : "−"}{formattedAmount}
        </p>
        <p className="text-[10px] text-muted-foreground mt-0.5 capitalize">{tx.category}</p>
      </div>
    </motion.div>
  );
};

const TransactionList = ({ transactions }: TransactionListProps) => {
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center justify-between mb-4 px-1">
          <h2 className="text-base font-bold text-foreground">Recent Transactions</h2>
          <motion.button whileTap={{ scale: 0.9 }} className="text-xs font-semibold text-primary">
            See All
          </motion.button>
        </div>

        <div className="glass-card rounded-[1.5rem] px-5 divide-y divide-border/30">
          {transactions.map((tx, i) => (
            <TransactionItem
              key={tx.id}
              tx={tx}
              index={i}
              onSelect={() => setSelectedTx(tx)}
            />
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedTx && (
          <TransactionSheet tx={selectedTx} onClose={() => setSelectedTx(null)} />
        )}
      </AnimatePresence>
    </>
  );
};

export default TransactionList;

