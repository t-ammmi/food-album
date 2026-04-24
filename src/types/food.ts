// microCMSの画像型
export type MicroCMSImage = {
  url: string;
  height: number;
  width: number;
};

// 種別
export type FoodType = "外食" | "自炊";

// タグ
export type Tag = {
    fieldId: string;
    tag: string;
}

// microCMSのfood APIの型
export type Food = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  photo: MicroCMSImage;
  type: FoodType;
  date: string;
  location?: string;
  rating: number;
  review?: string;
  recipe?: string;
  tags?: Tag[];
};
