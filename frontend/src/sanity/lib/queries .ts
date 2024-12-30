import { defineQuery } from "next-sanity";

export const POSTS_QUERY = defineQuery(`*[_type == "post" ]{
    _id,
    title,
    slug,
    mainImage,
    publishedAt,
    author->{
        name,
        image
    },
    body,
    publishedAt

}`);

export const POST_QUERY = defineQuery(` *[_type == "post" ]{
        _id,
        title,
        slug,
        mainImage,
        body,
        publishedAt
    }
`);

export const AUTHORS_QUERY =
  defineQuery(`*[_type == "author" && slug.current == $slug]{
  _id,
  name,
  image,
  slug,
  bio
}
`);

export const AUTHOR_QUERY =
defineQuery(`*[_type == "author" && slug.current == $slug]{
  _id,
  name,
  slug,
  bio
}
`);

export const HEADER_QUERY = defineQuery(`*[_type == "header"]{
    _id,
    label,
    image,
    navigationItems[] {
        label,
        link
    },

    
}`);

export const FOOTER_QUERY = defineQuery(`*[_type == "footer"]{
    _id,
    title,
    description,
     
}`);

export const FAQ_QUERY = defineQuery(`*[_type == "faqSection"]{
    _id,
    title,
    questions[]{
        question,
        answer
    }
}`);

export const TESTIMONIAL_QUERY = defineQuery(`*[_type == "testimonialSection"]{
    _id,
    title,
    testimonials[]{
        testimonial,
        author
    }
}`);

export const SECTION_QUERY = defineQuery(`*[_type == "section"]{
  content[] {
    _type == "heroSection" => {
      heading,
      subheading,
      backgroundImage
    },
     _type == "faqSection" => {
      title,
      faqs[] {
        question,
        answer
      }
    },
      _type == "testimonialSection" => {
      title,
      testimonials[] {
        name,
        role,
        message,
        photo
      }
    }
  }
}
`);
