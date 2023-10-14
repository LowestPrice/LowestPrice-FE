export type MagazineProps = {
  data: MagazineData;
};

type MagazineData = {
  title: string;
  content: string;
  editor: string;
  likes: boolean;
};
