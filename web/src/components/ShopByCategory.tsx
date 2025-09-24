import {
  Box,
  Typography,
  Grid,
  CardActionArea,
  CardMedia,
  Card,
  Stack,
} from '@mui/material'

type Category = { id: number; name: string; slug: string }

type Props = { categories: Category[] }

const ShopByCategory = ({ categories }: Props) => {
  return (
    <Box
      component="section"
      id="shop"
      sx={{ maxWidth: 1400, mx: 'auto', px: { xs: 2, sm: 3, lg: 4 }, py: 12 }}
    >
      <Typography variant="h5" fontWeight={600} gutterBottom>
        Shop by Category
      </Typography>

      <Grid container spacing={2}>
        {categories.map((c) => (
          <Grid key={c.id}>
            <Card
              sx={{
                borderRadius: 2,
                overflow: 'hidden',
                transition: 'transform 0.3s',
                '&:hover': { transform: 'scale(1.05)' },
              }}
            >
              <CardActionArea href={`/c/${c.slug}`}>
                <CardMedia
                  component="img"
                  image={`https://picsum.photos/seed/${c.slug}/400/300`}
                  alt={c.name}
                  sx={{ height: 120, objectFit: 'cover' }}
                />
                <Stack alignItems="center" sx={{ py: 1 }}>
                  <Typography
                    variant="body2"
                    fontWeight={500}
                    color="text.primary"
                  >
                    {c.name}
                  </Typography>
                </Stack>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default ShopByCategory
