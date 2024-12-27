
import Image from "next/image";
import Link from "next/link";
import { HeaderData, NavigationItem } from "../sanity/lib/types/NavigationItem";
import client from "../sanity/lib/client";
import { HEADER_QUERY } from "../sanity/lib/queries ";
import { urlFor } from "../sanity/lib/imageUrlBuilder";

export default async function Navbar() {
  const headerData: HeaderData[] = await client.fetch(HEADER_QUERY);

  return (
    <div className="sticky top-0 z-10">
      <header>
        <nav className="flex justify-between items-center px-[10%] bg-[#e3d5ca] ">
          <div>
            <h1 className="text-4xl font-serif italic">
              {
                <Image
                  src={urlFor(headerData[0]?.image.asset).url() || ""}
                  height="300"
                  width="300"
                  className="h-32 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                  alt={headerData[0]?.label}
                />
              }
            </h1>
          </div>

          <div className="flex gap-10">
            {headerData[0]?.navigationItems.map((navItem: NavigationItem) => (
              <ul key={navItem._key}>
                <li className="hover:text-[#99582a] duration-300 italic">
                  <Link href={`${navItem.link}`} className="text-lg">
                    {navItem.label}
                  </Link>
                </li>
              </ul>
            ))}
          </div>
        </nav>
      </header>
    </div>
  );
}
