export type Treatment = {
  focal: {
    larvicide1: {
      type: string;
      quantity: number;
      depositedQuantity: number;
    };
    larvicide2: {
      type: string;
      quantity: number;
      depositedQuantity: number;
    };
  };
  perifocal: {
    type: string;
    quantity: number;
    depositedQuantity: number;
  };
}