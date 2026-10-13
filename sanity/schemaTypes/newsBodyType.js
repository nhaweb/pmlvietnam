import {ImageIcon} from '@sanity/icons/Image'
import {LinkIcon} from '@sanity/icons/Link'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const newsBodyType = defineType({
  name: 'newsBody',
  title: 'Nội dung bài viết',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        {title: 'Đoạn văn', value: 'normal'},
        {title: 'Tiêu đề H2', value: 'h2'},
        {title: 'Tiêu đề H3', value: 'h3'},
        {title: 'Tagline (căn giữa, in đậm)', value: 'tagline'},
      ],
      lists: [
        {title: 'Gạch đầu dòng', value: 'bullet'},
        {title: 'Đánh số', value: 'number'},
      ],
      marks: {
        decorators: [
          {title: 'Đậm', value: 'strong'},
          {title: 'Nghiêng', value: 'em'},
          {title: 'Gạch chân', value: 'underline'},
        ],
        annotations: [
          defineArrayMember({
            name: 'link',
            title: 'Liên kết',
            type: 'object',
            icon: LinkIcon,
            fields: [
              defineField({
                name: 'href',
                title: 'URL',
                description: 'Link nội bộ dùng đường dẫn tương đối (vd. /lien-he), link ngoài dùng https://',
                type: 'url',
                validation: (rule) =>
                  rule.required().uri({
                    allowRelative: true,
                    scheme: ['http', 'https', 'mailto', 'tel'],
                  }),
              }),
            ],
          }),
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      icon: ImageIcon,
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          description: 'Mô tả ảnh cho SEO và trình đọc màn hình.',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
  ],
})
