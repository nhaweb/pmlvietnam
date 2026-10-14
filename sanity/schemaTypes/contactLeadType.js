import {UserIcon} from '@sanity/icons/User'
import {defineField, defineType} from 'sanity'

const VARIANT_OPTIONS = [
  {title: 'Đăng ký tư vấn', value: 'consult'},
  {title: 'Đăng ký ngay', value: 'register'},
]

const STATUS_OPTIONS = [
  {title: 'Mới', value: 'new'},
  {title: 'Đã liên hệ', value: 'contacted'},
  {title: 'Đã chốt', value: 'won'},
  {title: 'Không phù hợp', value: 'lost'},
]

const EMAIL_STATUS_OPTIONS = [
  {title: 'Đang gửi', value: 'pending'},
  {title: 'Đã gửi', value: 'sent'},
  {title: 'Gửi lỗi', value: 'failed'},
]

function labelOf(options, value) {
  return options.find((option) => option.value === value)?.title ?? value
}

/** Leads are written by `/api/contact` with `_id` = `contactLead.<uuid>` so a public dataset never exposes them. */
export const contactLeadType = defineType({
  name: 'contactLead',
  title: 'Đăng ký tư vấn',
  type: 'document',
  icon: UserIcon,
  groups: [
    {name: 'lead', title: 'Khách hàng', default: true},
    {name: 'handling', title: 'Xử lý'},
    {name: 'system', title: 'Hệ thống'},
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Họ tên',
      type: 'string',
      group: 'lead',
      readOnly: true,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'phone',
      title: 'Số điện thoại',
      type: 'string',
      group: 'lead',
      readOnly: true,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      group: 'lead',
      readOnly: true,
    }),
    defineField({
      name: 'variant',
      title: 'Nguồn form',
      type: 'string',
      group: 'lead',
      readOnly: true,
      options: {list: VARIANT_OPTIONS},
    }),
    defineField({
      name: 'selectedSample',
      title: 'Mẫu website quan tâm',
      type: 'string',
      group: 'lead',
      readOnly: true,
    }),
    defineField({
      name: 'message',
      title: 'Nội dung',
      type: 'text',
      rows: 4,
      group: 'lead',
      readOnly: true,
    }),
    defineField({
      name: 'submittedAt',
      title: 'Thời gian đăng ký',
      type: 'datetime',
      group: 'lead',
      readOnly: true,
    }),
    defineField({
      name: 'status',
      title: 'Trạng thái xử lý',
      type: 'string',
      group: 'handling',
      options: {list: STATUS_OPTIONS, layout: 'radio', direction: 'horizontal'},
      initialValue: 'new',
    }),
    defineField({
      name: 'note',
      title: 'Ghi chú nội bộ',
      type: 'text',
      rows: 4,
      group: 'handling',
    }),
    defineField({
      name: 'emailStatus',
      title: 'Trạng thái email thông báo',
      type: 'string',
      group: 'system',
      readOnly: true,
      options: {list: EMAIL_STATUS_OPTIONS},
    }),
    defineField({
      name: 'emailError',
      title: 'Lỗi gửi email',
      type: 'text',
      rows: 2,
      group: 'system',
      readOnly: true,
      hidden: ({document}) => document?.emailStatus !== 'failed',
    }),
    defineField({
      name: 'sourcePath',
      title: 'Trang gửi form',
      type: 'string',
      group: 'system',
      readOnly: true,
    }),
  ],
  orderings: [
    {
      title: 'Mới nhất',
      name: 'submittedAtDesc',
      by: [{field: 'submittedAt', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      name: 'name',
      phone: 'phone',
      variant: 'variant',
      status: 'status',
      emailStatus: 'emailStatus',
      submittedAt: 'submittedAt',
    },
    prepare({name, phone, variant, status, emailStatus, submittedAt}) {
      const time = submittedAt ? new Date(submittedAt).toLocaleString('vi-VN') : ''
      const mailFlag = emailStatus === 'failed' ? ' · ⚠ mail lỗi' : ''
      return {
        title: `${name ?? '(không tên)'} — ${phone ?? ''}`,
        subtitle: [labelOf(VARIANT_OPTIONS, variant), labelOf(STATUS_OPTIONS, status ?? 'new'), time]
          .filter(Boolean)
          .join(' · ')
          .concat(mailFlag),
      }
    },
  },
})
