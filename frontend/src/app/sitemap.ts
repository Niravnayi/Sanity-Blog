import { MetadataRoute } from "next";
import { POST_QUERY } from "../sanity/lib/queries ";
import client from "../sanity/lib/client";
import { url } from "./Authorization";

interface PostReference {
  slug: { current: string };
  publishedAt: string;
}

interface AuthorReference {
  slug: { current: string };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    // Fetch all posts
    const posts: PostReference[] = await client.fetch(POST_QUERY);

    // Fetch all authors without $slug
    const authors: AuthorReference[] = await client.fetch(`*[_type == "author"]{
        _id,
        name,
        slug,
        bio
     }`);
   


    // Generate URLs for blog posts
    const postUrls = posts.map((post) => ({
      url: `${url}blogs/${post.slug.current}`,
      lastModified: new Date(post.publishedAt || Date.now()),
      changeFrequency: "daily" as const,
      priority: 0.5,
    }));

    // Generate URLs for authors
    const authorUrls = authors.map((author) => ({
      url: `${url}author/${author.slug.current}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    }));

    // Combine all routes
    return [
      {
        url: `${url}`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 1.0,
      },
      {
        url: `${url}blogs`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.8,
      },
      {
        url: `${url}author`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.7,
      },
      ...postUrls,
      ...authorUrls,
    ];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return [];
  }
}
