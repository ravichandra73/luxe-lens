import gql from 'graphql-tag'

export const schema = gql`
  type Product {
    id: Int!
    name: String!
    description: String
    sku: String!
    priceCents: Int!
    salePriceCents: Int
    onSale: Boolean!
    saleStartsAt: DateTime
    saleEndsAt: DateTime
    limitedEdition: Boolean!
    limitedQuantity: Int
    gender: String!
    material: String
    style: String
    color: String
    frameWidthMm: Int
    lensWidthMm: Int
    bridgeWidthMm: Int
    templeLengthMm: Int
    uvProtection: String
    images: String
    sellerId: Int!
    categoryId: Int
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Category {
    id: Int!
    name: String!
    slug: String!
  }

  type ProductsHome {
    featured: [Product!]!
    newArrivals: [Product!]!
    categories: [Category!]!
  }

  input ProductsFilterInput {
    search: String
    categorySlug: String
    gender: String
    material: String
    style: String
    color: String
    limitedEdition: Boolean
    onSale: Boolean
    minPriceCents: Int
    maxPriceCents: Int
    take: Int = 24
    skip: Int = 0
    orderBy: String
  }

  type SearchSuggestion {
    type: String!
    id: Int
    label: String!
    href: String!
  }

  type Query {
    productsFeatured(limit: Int = 8): [Product!]! @skipAuth
    productsNewArrivals(limit: Int = 8): [Product!]! @skipAuth
    categoriesTop(limit: Int = 6): [Category!]! @skipAuth
    homeCollection: ProductsHome! @skipAuth
    productsFiltered(input: ProductsFilterInput!): [Product!]! @skipAuth
    productBySku(sku: String!): Product @skipAuth
    searchSuggest(term: String!, limit: Int = 6): [SearchSuggestion!]! @skipAuth
  }
`
