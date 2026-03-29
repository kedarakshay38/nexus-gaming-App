import { CartItem } from './cart-item';

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  date: string;
  status: 'Completed' | 'Pending' | 'Failed';
}
