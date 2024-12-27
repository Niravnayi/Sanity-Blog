"use client";

import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { useRef } from "react";
import { Separator } from "./ui/separator";
import { urlFor } from "../sanity/lib/imageUrlBuilder";
import { customComponents } from "./SerializerComponent";
import { SanityImageAssetDocument } from "next-sanity";

interface BlogProps {
  post: {
    title: string;
    body: { _key: string; _type: string; children: { text: string }[] }[];
    mainImage?: { asset: SanityImageAssetDocument };
    author?: { name: string };
  };
}

export default function Blog({ post }: BlogProps) {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const scrollToSection = (index: number) => {
    sectionRefs.current[index]?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-row min-h-screen">
      {/* Sidebar */}
      <aside className="w-1/3 p-6 bg-gray-100 sticky top-0 h-screen overflow-y-auto overflow-hidden">
        <h2 className="font-bold mb-4 text-center underline text-xl font-serif overflow-hidden ">
          {post.title}
        </h2>
        <ul className="space-y-2">
          {post.body.map(
            (
              section: {
                _key: string;
                _type: string;
                children: { text: string }[];
              },
              index: number
            ) => (
              <li key={`${section._key}-${index}`}>
                <button
                  onClick={() => scrollToSection(index)}
                  className="text-black hover:underline truncate block"
                  title={section.children?.[0]?.text || `Section ${index + 1}`}
                >
                  {section.children?.[0]?.text || `Section ${index + 1}`}
                </button>
                <Separator className="my-4" />
              </li>
            )
          )}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="p-6 flex flex-col justify-center items-center w-full">
        <h1 className="text-4xl font-bold font-mono mb-10">{post.title}</h1>
        {post.mainImage?.asset && (
          <Image
            src={urlFor(post?.mainImage?.asset).url() || ""}
            alt={post?.title}
            width={600}
            height={400}
          />
        )}
        {post?.author && (
          <p className="text-gray-400 mt-4 text-xl">
            Author:{" "}
            <span className="text-black text-xl font-serif font-semibold">
              {post.author.name}
            </span>
          </p>
        )}
        <div className="m-10">
          {post.body.map(
            (
              section: {
                _key: string;
                _type: string;
                children: { text: string }[];
              },
              index: number
            ) => (
              <div
                key={`${section._key}-${index}`}
                ref={(el) => {
                  sectionRefs.current[index] = el;
                }}
                className="mb-10 pt-32"
              >
                <h2 className="text-2xl font-bold mb-4">
                  {section.children?.[0]?.text || `Section ${index + 1}`}
                </h2>
                <PortableText value={section} components={customComponents} />
              </div>
            )
          )}
        </div>
      </main>
    </div>
  );
}
