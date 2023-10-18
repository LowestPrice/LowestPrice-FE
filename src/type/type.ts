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
