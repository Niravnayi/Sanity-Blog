import React from "react";
import { PortableTextReactComponents } from "@portabletext/react";
import Link from "next/link";
import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";
export const customComponents: Partial<PortableTextReactComponents> = {
  block: {
    h1: ({ children }) => {
      return <h1 className="text-3xl font-bold my-4">{children}</h1>;
    },
    h2: ({ children }) => {
      return <h2 className="text-2xl font-bold my-4">{children}</h2>;
    },
    h3: ({ children }) => {
      return <h3 className="text-xl font-bold my-4">{children}</h3>;
    },
    h4: ({ children }) => {
      return <h4 className="text-lg font-bold my-4">{children}</h4>;
    },
    normal: ({ children }) => <p className=" text-base my-2">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-400 pl-4 italic my-4 text-gray-600">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({
      children,
      value,
    }: {
      children: React.ReactNode;
      value?: { href: string };
    }) => (
      <Link
        href={value?.href || "#"}
        className="text-blue-500 underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </Link>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc ml-5">{children}</ul>,
  },
  listItem: {
    bullet: ({ children }) => <li className="mb-1">{children}</li>,
  },
  types: {
    image: ({ value }) => {
      const dataset = "production"; 
      const projectId = "lnrdfqv0"; 
      const builder = imageUrlBuilder({ dataset, projectId });
      const urlFor = (source: string) => builder.image(source).url();
      return (
        <Image
          src={urlFor(value)}
          alt="Background"
          height={600}
          width={500}
          objectFit="cover"
          className="rounded-lg flex justify-center "
        />
      );
    },
  },
};
