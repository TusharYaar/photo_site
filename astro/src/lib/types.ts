export interface SanityImageAsset {
  _ref?: string;
  _type?: string;
  asset?: {
    _ref?: string;
    _type?: string;
  };
  alt?: string;
}

export interface PhotoPost {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  publishedAt: string;
  image?: SanityImageAsset;
  body?: Array<{
    _type: string;
    children?: Array<{
      _type: string;
      text?: string;
    }>;
  }>;
}
