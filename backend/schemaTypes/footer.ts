import {defineField, defineType} from 'sanity'


export default defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'title',
      type: 'string',
    }),
    defineField({
        name: 'description',
        title: 'description',
        type: 'string',
      }),
    
  ],
})
