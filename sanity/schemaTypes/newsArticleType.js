import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {defineField, defineType} from 'sanity'

export const newsArticleType = defineType({
  name: 'newsArticle',
  title: 'Tin tức',
  type: 'document',
  icon: DocumentTextIcon,
  groups: [
    {name: 'content', title: 'Nội dung', default: true},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Tiêu đề',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      description: 'Đường dẫn bài viết: /tin-tuc/<slug>',
      type: 'slug',
      group: 'content',
      options: {source: 'title', maxLength: 96},
      validation: (rule) =>
        rule.required().custom((slug) => {
          if (!slug?.current) return true
          return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug.current)
            ? true
            : 'Slug chỉ gồm chữ thường không dấu, số và dấu gạch ngang'
        }),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Ngày đăng',
      type: 'datetime',
      group: 'content',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Mô tả ngắn',
      description: 'Hiển thị trên card ở trang chủ và trang /tin-tuc.',
      type: 'text',
      rows: 3,
      group: 'content',
      validation: (rule) => [
        rule.required(),
        rule.max(220).warning('Nên giữ dưới 220 ký tự để card không bị cắt chữ'),
      ],
    }),
    defineField({
      name: 'mainImage',
      title: 'Ảnh đại diện',
      description: 'Dùng cho thumbnail card, banner bài viết và ảnh chia sẻ mạng xã hội.',
      type: 'image',
      group: 'content',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Nội dung',
      type: 'newsBody',
      group: 'content',
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      group: 'seo',
      options: {collapsible: false},
      fields: [
        defineField({
          name: 'title',
          title: 'Meta title',
          description: 'Bỏ trống sẽ dùng Tiêu đề bài viết.',
          type: 'string',
          validation: (rule) => rule.max(70).warning('Nên dưới 70 ký tự'),
        }),
        defineField({
          name: 'description',
          title: 'Meta description',
          description: 'Bỏ trống sẽ dùng Mô tả ngắn.',
          type: 'text',
          rows: 3,
          validation: (rule) => rule.max(170).warning('Nên dưới 170 ký tự'),
        }),
      ],
    }),
  ],
  orderings: [
    {
      title: 'Ngày đăng, mới nhất',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      publishedAt: 'publishedAt',
      media: 'mainImage',
    },
    prepare({title, publishedAt, media}) {
      return {
        title,
        subtitle: publishedAt ? new Date(publishedAt).toLocaleDateString('vi-VN') : 'Chưa có ngày',
        media,
      }
    },
  },
})
