export interface Transaction {
  id: string;
  type: "credit" | "debit";
  title: string;
  description: string;
  amount: number;
  currency: string;
  date: string;
  icon: string;
  category: "transfer" | "shopping" | "food" | "entertainment" | "salary" | "subscription";
  txHash?: string;
  status?: "success" | "pending" | "failed";
  gasFee?: number;
  from?: string;
  to?: string;
  blockNumber?: number;
}

export interface Wallet {
  id: string;
  name: string;
  balance: number;
  currency: string;
  cardNumber: string;
  transactions: Transaction[];
}

export interface Block {
  height: number;
  hash: string;
  validator: string;
  timestamp: string;
  txCount: number;
  gasUsed: number;
  size: number;
}

export interface GlobalTransaction {
  txHash: string;
  from: string;
  to: string;
  value: number;
  currency: string;
  status: "success" | "pending" | "failed";
  timestamp: string;
  gasFee: number;
  blockNumber: number;
}

