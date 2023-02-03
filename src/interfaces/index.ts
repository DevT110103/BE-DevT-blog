export interface Response {
  status: number;
  error: boolean;
  message: string;
  data: any;
}

export interface Product {
  name: string;
}

export interface Category {
  name: string;
  thumbnail: bigint;
}
