export interface User {
  userId: string;
  name: string;
  image: Image;
}

export interface Image {
  src: string;
}

export interface Product {
  Category: Category[];
  cardDiscount: number;
  coupangItemId: string;
  coupangVendorId: string;
  createdAt: string;
  deletedAt: null;
  currentPrice: number;
  discountRate: number;
  isOutOfStock: boolean;
  originalPrice: number;
  productId: number;
  productImage: string;
  productName: string;
  productUrl: string;
  isAlertOn: boolean;
  realId: string;
}

export interface Category {
  categoryId: number;
  categoryName: string;
}

export interface Filter {
  content: string;
  value: string;
}

export interface Params {
  readonly id?: number;
  readonly searchWord?: string;
}

export interface AccessToken {
  headers: string;
}
