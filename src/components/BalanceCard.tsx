import { motion } from "framer-motion";
import { Wallet } from "@/shared/schema";
import { CreditCard, Plus } from "lucide-react";

interface BalanceCardProps {
  wallet: Wallet;
}

const BalanceCard = ({ wallet }: BalanceCardProps) => {
  const formattedBalance = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: wallet.currency,
  }).format(wallet.balance);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-[2.5rem] p-7 text-white shadow-2xl"
      style={{
        background: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
      }}
    >
      {/* Efek Kaca Dekoratif */}
      <div className="absolute top-[-20%] right-[-10%] w-40 h-40 bg-white/10 rounded-full blur-3xl" />

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-10">
          <div>
            <p className="text-white/70 text-xs font-medium uppercase tracking-widest mb-1">
              Total Balance
            </p>
            <h2 className="text-4xl font-extrabold tracking-tight">
              {formattedBalance}
            </h2>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20">
            <CreditCard className="w-6 h-6 text-white" />
          </div>
        </div>

        <div className="flex justify-between items-end">
          <div>
            <p className="text-white/60 text-[10px] font-medium uppercase tracking-widest mb-1">
              Card Number
            </p>
            <p className="text-sm font-mono font-medium tracking-wider">
              {wallet.cardNumber}
            </p>
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 rounded-full bg-white text-indigo-600 flex items-center justify-center shadow-lg"
          >
            <Plus className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default BalanceCard;

