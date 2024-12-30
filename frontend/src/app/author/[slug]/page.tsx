import { PortableText } from "@portabletext/react";
import Image from "next/image";
import client from "@/src/sanity/lib/client";
import { AUTHOR_QUERY } from "@/src/sanity/lib/queries ";
import { urlFor } from "@/src/sanity/lib/imageUrlBuilder";
import { customComponents } from "@/src/components/SerializerComponent";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = await client.fetch(`*[_type == "post"]{"slug": slug.current}`);
  return posts.map((post: { slug: string }) => ({
    slug: post.slug,
  }));
}

// Type definition for dynamic route props
interface PageProps {
  params: {
    slug: string;
  };
}

// Component for the dynamic route
const Author = async ({ params }: PageProps) => {
  const { slug } = params;

  const author = await client.fetch(AUTHOR_QUERY, { slug });
  if (!author) {
    return <p>Author not found</p>;
  }

  return (
    <div className="flex flex-col items-center gap-5 h-screen bg-[#edede9]">
      <h1 className="text-3xl font-semibold font-serif mt-4">{author.name}</h1>
      <Image
        src={urlFor(author.image?.asset).url() || ""}
        alt={author.name}
        width={200}
        height={200}
      />
      <div className="w-1/2">
        <PortableText value={author.bio} components={customComponents} />
      </div>
    </div>
  );
};

export default Author;
