export type Status = "active" | "placed" | "sold";

export interface Lot {
    id: number;
    name: string;
    initial_price: number;
    current_price: number;
    image: string;
    auctioneer_id: number;
    status: Status;
    bidding_start_time: string;
    bidding_end_time: string;
    description: string;
  };