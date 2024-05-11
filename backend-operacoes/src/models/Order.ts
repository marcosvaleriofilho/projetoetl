export interface Order {
  code?: number;
  date: string;
  quantity: number;
  total_value: number;
  stock_id: number;
  client_id: number;
}
