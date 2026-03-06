import BalanceCard from "@/components/BalanceCard";
import TransactionList from "@/components/TransactionList";
import { mockWallet } from "@/data/wallet-data";
import { motion } from "framer-motion";
import { Blocks } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background gradient orbs */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-primary/8 blur-[100px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-accent/6 blur-[100px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-md mx-auto px-5 pt-14 pb-10">
        {/* Status bar spacer */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs text-muted-foreground font-medium">Good morning</p>
            <h1 className="text-lg font-bold text-foreground mt-0.5">XYRON Wallet</h1>
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate("/explorer")}
            className="w-10 h-10 rounded-full glass-surface flex items-center justify-center"
          >
            <Blocks className="w-5 h-5 text-primary" />
          </motion.button>
        </div>

        {/* Balance Card */}
        <div className="mb-8">
          <BalanceCard wallet={mockWallet} />
        </div>

        {/* Transactions */}
        <TransactionList transactions={mockWallet.transactions} />
      </div>
    </div>
  );
};

export default Index;

