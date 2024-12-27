"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import "../globals.css";
import { Post } from "@/src/sanity/lib/types/post";
import client from "@/src/sanity/lib/client";
import { POSTS_QUERY } from "@/src/sanity/lib/queries ";
import { CardBody, CardContainer, CardItem } from "@/src/components/ui/3d-card";
import { urlFor } from "@/src/sanity/lib/imageUrlBuilder";



export default function Blogs() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(2);
  const postsPerPage = 3;

  useEffect(() => {
    const fetchInitialPosts = async () => {
      const allPosts: Post[] = await client.fetch(POSTS_QUERY);
      const initialPosts = allPosts.slice(0, postsPerPage);
      setPosts(initialPosts);
    };

    fetchInitialPosts();
  }, []);

  const fetchPosts = async () => {
    const allPosts: Post[] = await client.fetch(POSTS_QUERY);
    const newPosts = allPosts.slice(
      (page - 1) * postsPerPage,
      page * postsPerPage
    );

    if (newPosts.length === 0) {
      setHasMore(false);
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 2000));

    setPosts((prevPosts) => [...prevPosts, ...newPosts]);
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="min-h-screen bg-[#edede9] p-5">
      <h1 className="text-6xl font-semibold font-mono text-center underline italic mt-5">
        Blogs
      </h1>
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchPosts}
        hasMore={hasMore}
        loader={
          <h4 className="flex justify-center mt-4">
            <div className="loader"></div>
          </h4>
        }
        endMessage={
          <p className="text-center mt-4">You have seen all the posts!</p>
        }
      >
        <div className="flex flex-wrap gap-6 justify-center p-8">
          {posts.map((post) => (
            <Link
              key={`${post._id}-${post.slug?.current}`}
              href={`/blog/${post.slug?.current}`}
            >
              <CardContainer>
                <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
                  <CardItem
                    translateZ="50"
                    className="text-xl font-bold text-neutral-600 dark:text-white"
                  >
                    {post?.title}
                  </CardItem>
                  <CardItem
                    translateZ="50"
                    className="text-neutral-600 dark:text-white"
                  >
                    {new Date(post?.publishedAt).toLocaleDateString()}
                  </CardItem>
                  <CardItem
                    as="p"
                    translateZ="60"
                    className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                  >
                    {post.body
                      ? typeof post.body === "string"
                        ? post.body.slice(0, 100)
                        : Array.isArray(post.body)
                          ? (post.body as { children?: { text: string }[] }[])
                              .map((block: { children?: { text: string }[] }) =>
                                block.children
                                  ? block.children
                                      .map((child: { text: string }) => child.text)
                                      .join("")
                                  : ""
                              )
                              .join("")
                              .slice(0, 100)
                          : ""
                      : "No content available"}
                  </CardItem>
                  <CardItem translateZ="100" className="w-full mt-4">
                    <Image
                      src={urlFor(post.mainImage?.asset).url() || ""}
                      height={1000}
                      width={1000}
                      className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                      alt={post?.title}
                    />
                  </CardItem>
                  <div className="flex justify-between items-center mt-4">
                    <Link
                      href={`/blog/${post.slug?.current}`}
                      className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
                    >
                      <CardItem translateZ={20}>
                        Read More →
                      </CardItem>
                    </Link>
                  </div>
                </CardBody>
              </CardContainer>
            </Link>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}
