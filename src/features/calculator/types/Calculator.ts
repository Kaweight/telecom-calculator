export interface Price {
  year: number;
  data: {
    internet: number;
    tv: number;
    internetAndTv: number;
    phoneSubscription: number;
    decoder4K: number;
  };
}

export interface PricingData {
  prices: Price[];
}
