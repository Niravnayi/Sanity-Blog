import {  SanityImageAssetDocument } from "next-sanity";

export interface Author {
    _id: string;
    name: string;
    slug: {
      current: string;
    };
    image: {
      asset: SanityImageAssetDocument;
    };
  }
  