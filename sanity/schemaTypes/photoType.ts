import {defineField, defineType} from 'sanity'

export const photoType = defineType({
  name: 'photo',
  title: 'Photo',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'orientation',
      title: 'Orientation',
      type: 'string',
      options: {
        layout: 'radio',
        list: ['portrait', 'landscape'],
      },
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tag',
      title: "Tags",
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {type: 'tag'},
          ]
        }
      ]
    }),
    defineField({
      name: 'collection',
      title: "Collection",
      type: 'reference',
      to: {type: 'collection'},

  
    }),
    defineField({
      name: "gridSize",
      title: "Grid Size",
      type: "array",
      of: [
        {
          type: "string",
        },
      ],
      options: {
        list: [
          { title: "Square", value: "square"},
          { title: "Portrait", value: "portrait" },
          { title: "Landscape", value: "landscape" },
          { title: "Big Square", value: "bigSquare" },
        ],
        layout: "grid",
      },
    }),
    defineField({
      name: 'body',
      type: 'array',
      of: [{type: 'block'}],
      readOnly: true,
    }),
  ],
})
