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
      name: 'category',
      title: 'Chuyên mục',
      description: 'Nhãn trên card và badge đầu bài, ví dụ SEO, Hướng dẫn.',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required().max(40),
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
          description:
            'Bỏ trống sẽ dùng Tiêu đề bài viết. Site tự thêm " | PML Vietnam" (15 ký tự) phía sau.',
          type: 'string',
          validation: (rule) =>
            rule.max(50).warning('Nên dưới 50 ký tự để cả hậu tố thương hiệu không bị Google cắt'),
        }),
        defineField({
          name: 'description',
          title: 'Meta description',
          description: 'Bỏ trống sẽ dùng Mô tả ngắn. Nên 140–160 ký tự.',
          type: 'text',
          rows: 3,
          validation: (rule) => [
            rule.max(160).warning('Nên dưới 160 ký tự để Google không cắt'),
            rule.min(70).warning('Quá ngắn, Google có thể tự lấy đoạn khác trong bài'),
          ],
        }),
        defineField({
          name: 'ogImage',
          title: 'Ảnh chia sẻ (Facebook, Zalo)',
          description:
            'Bỏ trống sẽ dùng Ảnh đại diện. Site tự cắt về 1200×630 theo điểm nhấn (hotspot), nên upload ảnh rộng từ 1200px.',
          type: 'image',
          options: {hotspot: true},
        }),
        defineField({
          name: 'noIndex',
          title: 'Ẩn khỏi Google',
          description:
            'Bật để Google không lập chỉ mục bài này và bỏ khỏi sitemap. Bài vẫn xem được qua link.',
          type: 'boolean',
          initialValue: false,
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
