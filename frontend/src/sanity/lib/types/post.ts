import { SanityImageAssetDocument } from "next-sanity";

// File: types/index.ts
export interface Post {
  _id: string;
  title: string;
  mainImage: {
    asset: SanityImageAssetDocument;
  };
  slug: {
    current: string;
  };
  body: string;
  author: {
    name: string;
  };
  publishedAt: string;
}
