export type Status = "active" | "placed" | "sold";

export interface Lot {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
    isFavourite: boolean;
    userId: number;
    status: Status;
  };