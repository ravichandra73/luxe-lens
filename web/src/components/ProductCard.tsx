import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Box,
} from '@mui/material'

type Product = {
  id: number
  name: string
  priceCents: number
  salePriceCents?: number | null
  onSale: boolean
  images?: string | null
}

const formatPrice = (cents: number) => `$${(cents / 100).toFixed(2)}`

type Props = {
  product: Product
}

const ProductCard = ({ product }: Props) => {
  const images: string[] = product.images ? JSON.parse(product.images) : []
  const src = images[0] ?? 'https://picsum.photos/seed/placeholder/800/600'
  const price =
    product.onSale && product.salePriceCents
      ? product.salePriceCents
      : product.priceCents

  return (
    <Card
      sx={{
        borderRadius: 2,
        overflow: 'hidden',
        boxShadow: 1,
        transition: 'transform 0.3s',
        '&:hover': { transform: 'scale(1.03)' },
      }}
    >
      <CardActionArea>
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            height="0"
            sx={{ paddingTop: '75%', objectFit: 'cover' }}
            image={src}
            alt={product.name}
          />
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              bgcolor: 'rgba(0,0,0,0.1)',
              opacity: 0,
              transition: 'opacity 0.3s',
              '&:hover': { opacity: 1 },
            }}
          />
        </Box>

        <CardContent>
          <Typography variant="subtitle1" fontWeight={500} color="text.primary">
            {product.name}
          </Typography>
          <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
            {product.onSale && product.salePriceCents ? (
              <>
                <Typography
                  variant="body1"
                  fontWeight={600}
                  color="text.primary"
                >
                  {formatPrice(price)}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ textDecoration: 'line-through' }}
                >
                  {formatPrice(product.priceCents)}
                </Typography>
              </>
            ) : (
              <Typography variant="body1" fontWeight={600} color="text.primary">
                {formatPrice(price)}
              </Typography>
            )}
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default ProductCard
