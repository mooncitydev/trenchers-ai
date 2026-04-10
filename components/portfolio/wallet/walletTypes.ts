export type PortfolioWalletRow = {
  publicKey: string;
  label: string;
  isMain: boolean;
  balance: number;
  tokenCount: number;
  change24h?: number;
};

export const SOL_PRICE_USD_MOCK = 140;

export const INITIAL_MOCK_WALLETS: PortfolioWalletRow[] = [
  {
    publicKey: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
    label: "Main",
    isMain: true,
    balance: 12.402,
    tokenCount: 14,
    change24h: 2.1,
  },
  {
    publicKey: "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM",
    label: "Vault",
    isMain: false,
    balance: 4.088,
    tokenCount: 6,
    change24h: -0.4,
  },
  {
    publicKey: "DYw8jCTfwHNRJhhmFcbqQV9Uum2ykVHMffcFn8XZMWb",
    label: "Sniper",
    isMain: false,
    balance: 1.25,
    tokenCount: 3,
    change24h: 0.8,
  },
];

export function truncatePk(address: string, start = 4, end = 4): string {
  if (address.length <= start + end) return address;
  return `${address.slice(0, start)}…${address.slice(-end)}`;
}
