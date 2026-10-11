export type Platform = 'PS5' | 'PS4' | 'Xbox' | 'Switch' | 'Universal';

export type Category = 'consoles' | 'controllers' | 'preowned_games' | 'accessories';

export type Condition = 'Brand New Sealed' | 'Pre-Owned Grade A+' | 'Pre-Owned Grade A' | 'DJN Certified Refurbished';

export interface ProductReview {
  id: string;
  userName: string;
  userLocation: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedBuyer: boolean;
  platformPlayed?: string;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: Category;
  platform: Platform;
  condition: Condition;
  mrp: number; // Strikethrough price
  price: number; // Sale price
  discountPercent: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount: number;
  badge?: string;
  features: string[];
  description: string;
  inTheBox: string[];
  warranty: string;
  discCondition?: string;
  color?: string;
  themeColor: string; // Hex or tailwind for visual styling
  genre?: string;
  storage?: string;
  edition?: string;
  imageUrl?: string;
  reviews: ProductReview[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedCondition: Condition;
}

export interface OrderCustomerInfo {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  paymentMethod: 'cod' | 'upi' | 'card';
  notes?: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  customer: OrderCustomerInfo;
  status: 'Confirmed' | 'Dispatched' | 'Out for Delivery' | 'Delivered';
  estimatedDelivery: string;
}

export interface TradeInItem {
  type: 'game' | 'console' | 'controller';
  title: string;
  platform: Platform;
  condition: 'Mint (Complete in Box)' | 'Good (Disc/Console Only)' | 'Fair';
  estimatedCash: number;
  estimatedStoreCredit: number;
}
