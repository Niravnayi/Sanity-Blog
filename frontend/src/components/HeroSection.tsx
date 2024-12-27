
import Image from "next/image";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import { Button } from "./ui/button";
import Link from "next/link";
import client from "../sanity/lib/client";
import { SECTION_QUERY } from "../sanity/lib/queries ";
import { urlFor } from "../sanity/lib/imageUrlBuilder";

export default async function HeroSection() {
  const heroSection = await client.fetch(SECTION_QUERY);

  return (
    <div className="flex justify-center items-center max-[990px]:flex-col gap-10  p-10 bg-[#f5ebe0] ">
      <div className="flex flex-col gap-5">
        <h1 className="text-6xl font-semibold font-mono  ">
          {heroSection[1].content[0].heading}
        </h1>
        <p className="text-lg  w-1/2">
          {heroSection[1]?.content[0]?.subheading}
        </p>
        <div>
          <Link href="/blog">
            <Button className="font-mono text-xl mt-5 p-5">Explore 🚀</Button>
          </Link>
        </div>
      </div>
      <div>
        <CardContainer className="inter-var">
          <CardBody className=" relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black   w-auto sm:w-[30rem] h-auto rounded-xl p-6   ">
            <CardItem translateZ="100" className="w-full mt-4">
              <Image
                src={
                  urlFor(
                    heroSection[1]?.content[0].backgroundImage?.asset
                  ).url() || ""
                }
                alt={heroSection[1].content[0].heading}
                width={400}
                height={400}
              />
            </CardItem>
          </CardBody>
        </CardContainer>
      </div>
    </div>
  );
}
