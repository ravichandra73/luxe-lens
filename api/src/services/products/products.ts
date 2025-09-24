import type { QueryResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const productsFeatured: QueryResolvers['productsFeatured'] = async ({
  limit = 8,
}) => {
  const items = await db.product.findMany({
    where: { onSale: true },
    orderBy: [{ saleStartsAt: 'desc' }, { createdAt: 'desc' }],
    take: limit,
  })
  return items
}

export const productsNewArrivals: QueryResolvers['productsNewArrivals'] =
  async ({ limit = 8 }) => {
    return db.product.findMany({ orderBy: { createdAt: 'desc' }, take: limit })
  }

export const categoriesTop: QueryResolvers['categoriesTop'] = async ({
  limit = 6,
}) => {
  return db.category.findMany({ orderBy: { createdAt: 'desc' }, take: limit })
}

export const homeCollection: QueryResolvers['homeCollection'] = async () => {
  const [featured, newArrivals, categories] = await Promise.all([
    db.product.findMany({
      where: { onSale: true },
      orderBy: { createdAt: 'desc' },
      take: 8,
    }),
    db.product.findMany({ orderBy: { createdAt: 'desc' }, take: 8 }),
    db.category.findMany({ orderBy: { createdAt: 'desc' }, take: 6 }),
  ])

  return { featured, newArrivals, categories }
}

export const productsFiltered: QueryResolvers['productsFiltered'] = async ({
  input,
}) => {
  const where: any = {}
  if (input.search) {
    where.OR = [
      { name: { contains: input.search, mode: 'insensitive' } },
      { description: { contains: input.search, mode: 'insensitive' } },
      { sku: { contains: input.search, mode: 'insensitive' } },
    ]
  }
  if (input.categorySlug) {
    where.category = { slug: input.categorySlug }
  }
  if (input.gender) where.gender = input.gender
  if (input.material) where.material = input.material
  if (input.style) where.style = input.style
  if (input.color) where.color = input.color
  if (typeof input.limitedEdition === 'boolean')
    where.limitedEdition = input.limitedEdition
  if (typeof input.onSale === 'boolean') where.onSale = input.onSale
  if (input.minPriceCents || input.maxPriceCents) {
    where.priceCents = {}
    if (input.minPriceCents) where.priceCents.gte = input.minPriceCents
    if (input.maxPriceCents) where.priceCents.lte = input.maxPriceCents
  }

  let orderBy: any = { createdAt: 'desc' }
  if (input.orderBy === 'price_asc') orderBy = { priceCents: 'asc' }
  if (input.orderBy === 'price_desc') orderBy = { priceCents: 'desc' }

  return db.product.findMany({
    where,
    orderBy,
    take: input.take ?? 24,
    skip: input.skip ?? 0,
  })
}

export const productBySku: QueryResolvers['productBySku'] = async ({ sku }) => {
  return db.product.findUnique({ where: { sku } })
}

export const searchSuggest: QueryResolvers['searchSuggest'] = async ({
  term,
  limit = 6,
}) => {
  const [products, categories] = await Promise.all([
    db.product.findMany({
      where: {
        OR: [
          { name: { contains: term, mode: 'insensitive' } },
          { sku: { contains: term, mode: 'insensitive' } },
        ],
      },
      take: limit,
      orderBy: { createdAt: 'desc' },
      select: { id: true, name: true, sku: true },
    }),
    db.category.findMany({
      where: {
        OR: [
          { name: { contains: term, mode: 'insensitive' } },
          { slug: { contains: term, mode: 'insensitive' } },
        ],
      },
      take: limit,
      select: { id: true, name: true, slug: true },
    }),
  ])

  const suggestions = [
    ...products.map((p) => ({
      type: 'product',
      id: p.id,
      label: p.name,
      href: `/p/${p.sku}`,
    })),
    ...categories.map((c) => ({
      type: 'category',
      id: c.id,
      label: c.name,
      href: `/c/${c.slug}`,
    })),
  ]
  return suggestions.slice(0, limit)
}
