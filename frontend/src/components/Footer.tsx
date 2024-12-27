import client from "../sanity/lib/client";
import { FOOTER_QUERY } from "../sanity/lib/queries ";
import { FooterItem } from "../sanity/lib/types/Footer";


export default async function Footer() {
  const footerData: FooterItem[] = await client.fetch(FOOTER_QUERY);

  return (
    <div>
      <footer>
        <div className="bg-gray-800 text-white p-5">
          {footerData.map((footer) => (
            <p key={footer._key} className=" text-center">
              {footer.title} {footer.description}
            </p>
          ))}
        </div>
      </footer>
    </div>
  );
}
