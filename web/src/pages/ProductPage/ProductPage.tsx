import { useMemo, useState } from 'react'

import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  Typography,
} from '@mui/material'
import gql from 'graphql-tag'

import { useParams } from '@redwoodjs/router'
import { Metadata, useQuery } from '@redwoodjs/web'

import EditorialNarrative from 'src/components/EditorialNarrative'
import EngagementBar from 'src/components/EngagementBar'
import ImageGallery from 'src/components/ImageGallery'
import LifestyleSlideshow from 'src/components/LifestyleSlideshow'
import Navbar from 'src/components/Navbar'
import StickyCTA from 'src/components/StickyCTA'

const PRODUCT_QUERY = gql`
  query ProductBySku($sku: String!) {
    productBySku(sku: $sku) {
      id
      name
      description
      priceCents
      salePriceCents
      onSale
      saleStartsAt
      saleEndsAt
      images
      material
      style
      color
      limitedEdition
    }
  }
`

const formatPrice = (cents: number) => `$${(cents / 100).toFixed(2)}`

const ProductPage = () => {
  const { sku } = useParams()
  const { data } = useQuery(PRODUCT_QUERY, { variables: { sku } })
  const product = data?.productBySku

  const images: string[] = useMemo(
    () => (product?.images ? JSON.parse(product.images) : []),
    [product?.images]
  )
  const [active, setActive] = useState(0)
  const now = new Date()

  const inSaleWindow = useMemo(() => {
    const starts = product?.saleStartsAt
      ? new Date(product.saleStartsAt)
      : undefined
    const ends = product?.saleEndsAt ? new Date(product.saleEndsAt) : undefined
    if (!starts && !ends) return true
    if (starts && now < starts) return false
    if (ends && now > ends) return false
    return true
  }, [product?.saleStartsAt, product?.saleEndsAt])

  if (!product) return null

  const currentPrice =
    product.onSale && inSaleWindow && product.salePriceCents
      ? product.salePriceCents
      : product.priceCents

  return (
    <>
      <Metadata title={product.name} />
      <Navbar />

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={6}>
          {/* Left: Image Gallery */}
          <Grid>
            <ImageGallery
              images={images}
              activeIndex={active}
              onChange={setActive}
              alt={product.name}
            />
          </Grid>

          {/* Right: Product Info */}
          <Grid>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Typography variant="h4" fontWeight={600}>
                {product.name}
              </Typography>

              {/* Price */}
              <Box display="flex" alignItems="center" gap={1}>
                <Typography
                  variant="h5"
                  fontWeight={600}
                  color={product.onSale ? 'error' : 'text.primary'}
                >
                  {formatPrice(currentPrice)}
                </Typography>
                {product.onSale && inSaleWindow && product.salePriceCents && (
                  <>
                    <Typography
                      variant="body1"
                      sx={{
                        textDecoration: 'line-through',
                        color: 'text.secondary',
                      }}
                    >
                      {formatPrice(product.priceCents)}
                    </Typography>
                    <Chip label="On Sale" color="error" size="small" />
                  </>
                )}
              </Box>

              {/* Description */}
              <Typography variant="body1" color="text.secondary">
                {product.description}
              </Typography>

              {/* Details */}
              <Grid container spacing={2}>
                <Grid>
                  <Typography variant="caption" color="text.secondary">
                    Material
                  </Typography>
                  <Typography variant="body2">
                    {product.material ?? '-'}
                  </Typography>
                </Grid>
                <Grid>
                  <Typography variant="caption" color="text.secondary">
                    Style
                  </Typography>
                  <Typography variant="body2">
                    {product.style ?? '-'}
                  </Typography>
                </Grid>
                <Grid>
                  <Typography variant="caption" color="text.secondary">
                    Color
                  </Typography>
                  <Typography variant="body2">
                    {product.color ?? '-'}
                  </Typography>
                </Grid>
                <Grid>
                  <Typography variant="caption" color="text.secondary">
                    Limited
                  </Typography>
                  <Typography variant="body2">
                    {product.limitedEdition ? 'Yes' : 'No'}
                  </Typography>
                </Grid>
              </Grid>

              {/* Engagement */}
              <EngagementBar productName={product.name} />

              {/* CTA */}
              <Box display="flex" gap={2} mt={2}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ borderRadius: 2 }}
                >
                  Add to Cart
                </Button>
                <Button
                  variant="outlined"
                  color="inherit"
                  sx={{ borderRadius: 2 }}
                >
                  Customer Service
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Divider */}
        <Divider sx={{ my: 6 }} />

        {/* Editorial Story */}
        <EditorialNarrative
          title="Design Story"
          paragraphs={[
            'Inspired by heritage silhouettes and informed by modern performance materials.',
            'Each pair is hand-finished, balancing lightweight comfort and enduring durability.',
            'Our brand story traces decades of optical craftsmanship refined for today.',
          ]}
        />

        {/* Lifestyle Slideshow */}
        <Box mt={6}>
          <LifestyleSlideshow
            images={
              images.length
                ? images
                : [
                    'https://picsum.photos/seed/lifestyle-1/1600/900',
                    'https://picsum.photos/seed/lifestyle-2/1600/900',
                    'https://picsum.photos/seed/lifestyle-3/1600/900',
                  ]
            }
          />
        </Box>
      </Container>

      {/* Sticky CTA */}
      <StickyCTA priceLabel={formatPrice(currentPrice)} />
    </>
  )
}

export default ProductPage
