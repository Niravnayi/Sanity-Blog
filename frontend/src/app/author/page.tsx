import { CardBody, CardContainer, CardItem } from "@/src/components/ui/3d-card";
import client from "@/src/sanity/lib/client";
import { urlFor } from "@/src/sanity/lib/imageUrlBuilder";
import { AUTHORS_QUERY } from "@/src/sanity/lib/queries ";
import { Author } from "@/src/sanity/lib/types/author";
import Image from "next/image";
import Link from "next/link";

export default async function AuthorComponent() {
  const authors = await client.fetch(AUTHORS_QUERY);

  return (
    <div className="bg-gray-100 min-h-screen">
      <h1 className="text-5xl text-center font-semibold font-serif underline italic pt-3 ">
        Authors
      </h1>
      <div className="flex flex-wrap gap-6 justify-center p-8 bg-gray-100 min-h-screen">
        {authors.map((author: Author) => (
          <Link key={author._id} href={`/author/${author.slug?.current}`}>
            <CardContainer className="inter-var">
              <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[20rem] h-auto rounded-xl p-6 border">
                <CardItem
                  translateZ="50"
                  className="text-xl font-bold text-neutral-600 dark:text-white"
                >
                  {author?.name}
                </CardItem>
                <CardItem translateZ="100" className="w-full mt-4">
                  <Image
                    src={urlFor(author?.image?.asset).url() || ""}
                    height="300"
                    width="300"
                    className="h-48 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                    alt={author?.name}
                  />
                </CardItem>
              </CardBody>
            </CardContainer>
          </Link>
        ))}
      </div>
    </div>
  );
}
