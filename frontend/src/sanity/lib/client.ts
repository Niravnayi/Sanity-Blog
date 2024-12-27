import { createClient } from "next-sanity";

const client = createClient({
    projectId: "lnrdfqv0",
    dataset: "production",
    useCdn: true,
  });

  export default client