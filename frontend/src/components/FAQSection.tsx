
import client from "../sanity/lib/client";
import { SECTION_QUERY } from "../sanity/lib/queries ";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

export default async function FAQSection() {
  const FAQSection = await client.fetch(SECTION_QUERY);

  return (
    <div className="flex justify-center items-center max-[990px]:flex-col gap-10  p-10 ">
      <div className="flex flex-col gap-5 w-full">
        <h1 className="text-4xl font-bold text-center underline font-serif italic ">
          {FAQSection[2].content[0].title}
        </h1>

        <div className="space-y-4     ">
          {FAQSection[2].content[0].faqs.map((faq: { question: string; answer: string }, index: number) => (
            <Accordion key={index} type="single" collapsible>
              <AccordionItem value={index.toString()}>
                <AccordionTrigger className="text-lg font-semibold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </div>
    </div>
  );
}
