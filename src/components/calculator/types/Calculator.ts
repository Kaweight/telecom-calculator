export interface Price {
  year: number;
  internet: number;
  tv: number;
  internetAndTv: number;
  phoneSubscription: number;
  decoder4K: number;
}

export interface PricingData {
  prices: Price[];
}
