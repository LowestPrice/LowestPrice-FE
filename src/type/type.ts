export type MagazineProps = {
  data?: magazine[];
};

export interface magazine {
  magazineId: number;
  title: string;
  content: string;
  mainImage: undefined;
  createAt: undefined;
  editor: string;
  likes: undefined;
}

export interface PriceData {
  maxPrice: number;
  minPrice: number;
  priceHistoryForWeek: any;
}

export interface DropDownProps {
  onEditClick?: () => void;
  onDeleteClick?: () => void;
}
