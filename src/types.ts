export interface Product {
  id: number;
  name: string;
  origin: string;
  category: string;
  roast: string;
  price: number;
  weight: string;
  description: string;
  flavorNotes: string[];
  image: string;
  rating: number;
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderInfo {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
}
