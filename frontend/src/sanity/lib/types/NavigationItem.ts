import { SanityImageAssetDocument } from "next-sanity";

export interface NavigationItem {
  _key: string;
  label: string;
  link: string;
}

export interface HeaderData {
  _id: string;
  label: string;
  logoName: string;
  image: {
    asset: SanityImageAssetDocument;
  };
  navigationItems: NavigationItem[];
}
