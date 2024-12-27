import Blog from "@/src/components/Blog";
import client from "@/src/sanity/lib/client";
import { POSTS_QUERY } from "@/src/sanity/lib/queries ";

export async function generateStaticParams() {
  const posts = await client.fetch(`*[_type == "post"]{"slug": slug.current}`);
  return posts.map((post: { slug: string }) => ({
    slug: post.slug,
  }));
};

interface Post {
  _id: string;
  slug: {
    current: string;
  };
}
const Blogs = async ( { params,
}: {
  params: Promise<{ slug: string }>
})=> {
  const { slug } = await params;

  if (!slug) {
    return <div>Loading...</div>;
  }

  const posts = await client.fetch(POSTS_QUERY);

  if (!posts || !Array.isArray(posts) || posts.length === 0) {
    return <div>Post not found</div>;
  }

 

  const post = posts.find((post: Post) => post.slug.current === slug);

  if (!post) {
    return <div>Post not found</div>;
  }

  return <Blog key={post._id} post={post} />;
}

export default Blogs;