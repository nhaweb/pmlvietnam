import { defineQuery } from "next-sanity";

const newsCardFields = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  category,
  mainImage {
    alt,
    hotspot,
    crop,
    asset
  }
`;

export const newsListQuery = defineQuery(/* groq */ `
  *[_type == "newsArticle" && defined(slug.current)] | order(publishedAt desc) {
    ${newsCardFields}
  }
`);

export const newsArticleQuery = defineQuery(/* groq */ `
  *[_type == "newsArticle" && slug.current == $slug][0] {
    ${newsCardFields},
    _updatedAt,
    seo,
    body
  }
`);

export const newsSlugsQuery = defineQuery(/* groq */ `
  *[_type == "newsArticle" && defined(slug.current) && seo.noIndex != true]{
    "slug": slug.current,
    publishedAt,
    "updatedAt": _updatedAt
  }
`);
