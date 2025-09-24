import { db } from 'api/src/lib/db'

// Manually apply seeds via the `yarn rw prisma db seed` command.
//
// Seeds automatically run the first time you run the `yarn rw prisma migrate dev`
// command and every time you run the `yarn rw prisma migrate reset` command.
//
// See https://redwoodjs.com/docs/database-seeds for more info

export default async () => {
  try {
    // Clean up existing data (respect FK constraints: delete children first)
    await db.orderItem.deleteMany()
    await db.order.deleteMany()
    await db.inventory.deleteMany()
    await db.product.deleteMany()
    await db.category.deleteMany()
    await db.user.deleteMany()

    // Users
    const seller = await db.user.create({
      data: {
        email: 'seller@luxelens.test',
        name: 'Sophia Seller',
        role: 'SELLER',
        phone: '+1-555-0101',
      },
    })

    const customer = await db.user.create({
      data: {
        email: 'customer@luxelens.test',
        name: 'Connor Customer',
        role: 'CUSTOMER',
        phone: '+1-555-0202',
      },
    })

    await db.user.create({
      data: {
        email: 'admin@luxelens.test',
        name: 'Ava Admin',
        role: 'ADMIN',
        phone: '+1-555-0303',
      },
    })

    // Categories (simple hierarchy)
    const rootCat = await db.category.create({
      data: { name: 'Sunglasses', slug: 'sunglasses' },
    })
    const sportCat = await db.category.create({
      data: { name: 'Sport', slug: 'sport', parentId: rootCat.id },
    })
    const fashionCat = await db.category.create({
      data: { name: 'Fashion', slug: 'fashion', parentId: rootCat.id },
    })

    // Products with Inventory
    const products = await Promise.all([
      db.product.create({
        data: {
          name: 'AeroSport Aviator',
          description:
            'Lightweight aviator frames for high-performance activities.',
          sku: 'LL-AERO-AVIATOR-001',
          priceCents: 12900,
          onSale: true,
          salePriceCents: 9900,
          saleStartsAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
          saleEndsAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
          limitedEdition: false,
          gender: 'UNISEX',
          material: 'TITANIUM',
          style: 'AVIATOR',
          color: 'Matte Black',
          frameWidthMm: 140,
          lensWidthMm: 58,
          bridgeWidthMm: 14,
          templeLengthMm: 145,
          uvProtection: 'UV400',
          images: JSON.stringify([
            'https://picsum.photos/seed/aviator-1/1200/800',
            'https://picsum.photos/seed/aviator-2/1200/800',
          ]),
          sellerId: seller.id,
          categoryId: sportCat.id,
          inventory: {
            create: { quantity: 50, reserved: 5, lowStockThreshold: 10 },
          },
        },
      }),
      db.product.create({
        data: {
          name: 'Velour Cat Eye',
          description: 'Chic cat-eye frames with acetate finish.',
          sku: 'LL-VELOUR-CAT-002',
          priceCents: 15900,
          onSale: false,
          limitedEdition: true,
          limitedQuantity: 25,
          gender: 'WOMEN',
          material: 'ACETATE',
          style: 'CAT_EYE',
          color: 'Tortoise',
          frameWidthMm: 138,
          lensWidthMm: 55,
          bridgeWidthMm: 16,
          templeLengthMm: 140,
          uvProtection: 'UV400',
          images: JSON.stringify([
            'https://picsum.photos/seed/cateye-1/1200/800',
            'https://picsum.photos/seed/cateye-2/1200/800',
          ]),
          sellerId: seller.id,
          categoryId: fashionCat.id,
          inventory: {
            create: { quantity: 25, reserved: 2, lowStockThreshold: 5 },
          },
        },
      }),
      db.product.create({
        data: {
          name: 'Classic Wayfarer',
          description: 'Timeless wayfarer style with polarized lenses.',
          sku: 'LL-CLASSIC-WAY-003',
          priceCents: 10900,
          onSale: false,
          gender: 'MEN',
          material: 'PLASTIC',
          style: 'WAYFARER',
          color: 'Gloss Black',
          frameWidthMm: 142,
          lensWidthMm: 57,
          bridgeWidthMm: 16,
          templeLengthMm: 147,
          uvProtection: 'Polarized UV400',
          images: JSON.stringify([
            'https://picsum.photos/seed/wayfarer-1/1200/800',
            'https://picsum.photos/seed/wayfarer-2/1200/800',
          ]),
          sellerId: seller.id,
          categoryId: rootCat.id,
          inventory: {
            create: { quantity: 100, reserved: 0, lowStockThreshold: 15 },
          },
        },
      }),
    ])

    // Example order for the customer
    const item1Unit = products[0].salePriceCents ?? products[0].priceCents
    const item2Unit = products[2].priceCents
    const quantity1 = 1
    const quantity2 = 2

    const line1 = item1Unit * quantity1
    const line2 = item2Unit * quantity2
    const subtotal = line1 + line2
    const discount = 0
    const shipping = 1200
    const tax = Math.round(subtotal * 0.08)
    const total = subtotal - discount + shipping + tax

    const order = await db.order.create({
      data: {
        orderNumber: `LL-${Date.now()}`,
        customerId: customer.id,
        status: 'PAID',
        subtotalCents: subtotal,
        discountCents: discount,
        shippingCents: shipping,
        taxCents: tax,
        totalCents: total,
        shippingAddress: JSON.stringify({
          name: customer.name,
          line1: '123 Redwood Way',
          city: 'Redwood City',
          state: 'CA',
          postalCode: '94063',
          country: 'US',
        }),
        notes: 'Leave at the front desk.',
      },
    })

    await db.orderItem.createMany({
      data: [
        {
          orderId: order.id,
          productId: products[0].id,
          sellerId: seller.id,
          quantity: quantity1,
          unitPriceCents: item1Unit,
          lineTotalCents: line1,
        },
        {
          orderId: order.id,
          productId: products[2].id,
          sellerId: seller.id,
          quantity: quantity2,
          unitPriceCents: item2Unit,
          lineTotalCents: line2,
        },
      ],
    })

    // Adjust inventory reservations to reflect the order
    await db.inventory.update({
      where: { productId: products[0].id },
      data: { reserved: { increment: quantity1 } },
    })
    await db.inventory.update({
      where: { productId: products[2].id },
      data: { reserved: { increment: quantity2 } },
    })

    console.info(
      '\n  ✅ Seeded users, categories, products, inventory, and an example order!\n'
    )
  } catch (error) {
    console.error('Error seeding database:', error)
  }
}
