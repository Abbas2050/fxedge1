export interface AccountSummary {
  balance: number;
  credit: number;
  equity: number;
  freeFunds: number;
  margin: number;
  marginLevel: number;
}

export interface OpenPosition {
  id: number;
  symbol: string;
  openTime: string;
  volume: number;
  side: 'BUY' | 'SELL';
  openPrice: number;
  currentPrice: number;
  stopLoss: number | null;
  takeProfit: number | null;
  swap: number;
  commission: number;
  profit: number;
}
