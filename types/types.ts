export type CompanyProfile = {
  country: string;
  currency: string;
  estimateCurrency: string;
  exchange: string;
  finnhubIndustry: string;
  ipo: string;
  logo: string;
  marketCapitalization: number;
  name: string;
  phone: string;
  shareOutstanding: number;
  ticker: string;
  weburl: string;
};

export type StockPriceData = {
  c: number; // Current price
  d: number; // Change
  dp: number; // Percent change
  h: number; // High price of the day
  l: number; // Low price of the day
  o: number; // Open price of the day
  pc: number; // Previous close price
  t: number; // Timestamp
};

export type CompanyPeers = string[];

export interface HistoricPriceData {
  adjusted: boolean;
  next_url: string;
  queryCount: number;
  request_id: string;
  results: HistoricPriceResult[];
  resultsCount: number;
  status: string;
  ticker: string;
}

export interface HistoricPriceResult {
  c: number; // Close price
  h: number; // Highest price
  l: number; // Lowest price
  n: number; // Number of transactions
  o: number; // Open price
  t: number; // Unix Msec timestamp
  v: number; // Trading volume
  vw: number; // Volume weighted average price
}
