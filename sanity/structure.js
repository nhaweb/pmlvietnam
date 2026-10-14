// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure = (S) =>
  S.list()
    .title('Nội dung')
    .items([
      S.documentTypeListItem('newsArticle').title('Tin tức'),
      S.divider(),
      S.documentTypeListItem('contactLead').title('Đăng ký tư vấn'),
    ])
