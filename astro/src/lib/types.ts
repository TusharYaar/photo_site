import { GRID_SIZE } from "./constants";

export interface SanityImageAsset {
  _ref?: string;
  _type?: string;
  asset?: {
    _ref?: string;
    _type?: string;
  };
  alt?: string;
}



export interface PhotoDocument {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  gridSize: GridSizeKey[];
  publishedAt: string;
  orientation: "portrait" | "landscape";
  image: SanityImageAsset;
  body?: Array<{
    _type: string;
    children?: Array<{
      _type: string;
      text?: string;
    }>;
  }>;
}
export interface Photo extends Omit<PhotoDocument, "image"> {
  image: string;
}

export interface PhotoInGrid extends Photo {
  className: string;

}

type GridSizeKey =keyof typeof GRID_SIZE;