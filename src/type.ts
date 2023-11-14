import { MouseEventHandler, ButtonHTMLAttributes } from 'react';
// 상품 --------------------------------------------------------
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

// 마이페이지/로그인 --------------------------------------------------------

export interface User {
  userId: string;
  name: string;
  image: Image;
}

export interface AccessToken {
  headers: string;
}

export type MagazineProps = {
  data?: magazine[];
};

// 매거진 --------------------------------------------------------
export interface magazine {
  magazineId: number;
  title: string;
  content: string;
  mainImage: undefined;
  createAt: undefined;
  editor: string;
  likes: undefined;
}

export interface DropDownProps {
  onEditClick?: () => void;
  onDeleteClick?: () => void;
}

// 드롭다운 수정/삭제 부분 스타일 props로 적용하기 위한 type
export interface DropDownListProps {
  $top: string;
  color: string;
  $borderradius: string;
}

// 차트 --------------------------------------------------------
export interface PriceData {
  maxPrice: number;
  minPrice: number;
  priceHistoryForWeek: any;
}

export interface PriceData {
  priceHistoryForWeek: any;
  maxPrice: number;
  minPrice: number;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    borderWidth: number;
    fill: boolean;
    backgroundColor?: any;
  }[];
}

export interface ParamsProps {
  id: string | number;
  setMinPrice?: Function;
  setMaxPrice?: Function;
}

export interface PriceChartProps extends ParamsProps {
  setMinPrice: React.Dispatch<React.SetStateAction<number | undefined>>;
  setMaxPrice: React.Dispatch<React.SetStateAction<number | undefined>>;
}

export interface PriceWrapProps {
  minPrice: number | undefined;
  maxPrice: number | undefined;
}

export interface FormattedDataProps {
  [key: string]: number;
}

// 좋아요 --------------------------------------------------------
export interface HeartProps {
  like: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
  isMounted?: boolean;
}

export interface HeartButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  $like: boolean;
  isMounted?: boolean;
}

export interface LikeProps {
  isLiked: boolean;
  magazineId: number;
  likeCount: number;
  index?: number;
  style?: React.CSSProperties;
  isMounted?: boolean;
}

// 푸터 (PageFooter)--------------------------------------------------------
export interface ButtonStyleProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  $active?: boolean;
}

// 푸터 (ShareFooter)--------------------------------------------------------
export interface ShareFooterProps {
  share: boolean;
  handleShareButton: () => void;
  title: string | undefined;
  mainImage: string | undefined;
  id: number | undefined;
  realId?: string | undefined;
  price?: string | number;
}

// 모달 (WindowModal)--------------------------------------------------------
export interface WindowModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

// 공유하기 (hooks - useShare)
export interface useShareParams {
  objectType: string;
  content: {
    title?: string;
    imageUrl?: string;
    price?: string | number;
  };
  url?: string;
}

declare global {
  export interface Window {
    Kakao: any;
  }
}
