export interface Token {
  symbol: string;
  amount: string;
  contract: string;
}

export interface UserTokens {
  account: string;
  tokens: Token[];
} 