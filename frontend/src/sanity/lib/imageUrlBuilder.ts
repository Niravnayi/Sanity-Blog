import imageUrlBuilder from "@sanity/image-url";
import { SanityImageAssetDocument } from "@sanity/client";
import client from "./client";
const builder = imageUrlBuilder(client);
export const urlFor = (source: SanityImageAssetDocument) =>
  builder.image(source);
