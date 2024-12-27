import { defineType, defineField } from "sanity";

export default defineType({
  name: "testimonialSection",
  title: "Testimonial Section",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "testimonials",
      title: "Testimonials",
      type: "array",
      of: [
        defineField({
          name: "testimonial",
          title: "Testimonial",
          type: "object",
          fields: [
            { name: "name", title: "Name", type: "string" },
            { name: "role", title: "Role", type: "string" },
            { name: "message", title: "Message", type: "text" },
            { name: "photo", title: "Photo", type: "image" },
          ],
        }),
      ],
    }),
  ],
});
