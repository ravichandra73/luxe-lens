import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material'
import gql from 'graphql-tag'

import { Link } from '@redwoodjs/router'
import { Metadata, useQuery } from '@redwoodjs/web'

import CampaignCarousel from 'src/components/CampaignCarousel'
import ProductCard from 'src/components/ProductCard'
import ShopByCategory from 'src/components/ShopByCategory'
import SupportWidget from 'src/components/SupportWidget'

type ProductSummary = {
  id: number
  name: string
  priceCents: number
  salePriceCents?: number | null
  onSale: boolean
  images?: string | null
}

type CategorySummary = { id: number; name: string; slug: string }

const HOME_QUERY = gql`
  query HomeCollection {
    homeCollection {
      featured {
        id
        name
        priceCents
        salePriceCents
        onSale
        images
      }
      newArrivals {
        id
        name
        priceCents
        salePriceCents
        onSale
        images
      }
      categories {
        id
        name
        slug
      }
    }
  }
`

const HomePage = () => {
  const { data } = useQuery(HOME_QUERY)

  const campaigns = [
    {
      id: 'c1',
      title: 'Autumn Heritage Collection',
      subtitle: 'Celebrating timeless silhouettes with modern materials.',
      image: 'https://picsum.photos/seed/campaign-1/1600/900',
      ctaLabel: 'Explore Collection',
      ctaHref: '#shop',
    },
    {
      id: 'c2',
      title: 'New Arrivals: Precision Optics',
      subtitle: 'Engineered clarity meets luxury craftsmanship.',
      image: 'https://picsum.photos/seed/campaign-2/1600/900',
      ctaLabel: 'Shop New',
      ctaHref: '#shop',
    },
  ]

  const featured = data?.homeCollection?.featured as
    | ProductSummary[]
    | undefined
  const newArrivals = data?.homeCollection?.newArrivals as
    | ProductSummary[]
    | undefined
  const categories = data?.homeCollection?.categories as
    | CategorySummary[]
    | undefined

  return (
    <>
      <Metadata
        title="Luxe Lens - Home"
        description="Luxury eyewear and stories"
      />

      {/* Navbar */}
      <AppBar position="sticky" color={'transparent'} elevation={2}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            LuxeLens
          </Typography>
          <Stack direction="row" gap={2}>
            <Button color="inherit" variant="outlined">
              Shop
            </Button>
            <Link to="/editorialBlocks">
              <Button color="inherit" variant="outlined">
                Editorials
              </Button>
            </Link>
            <Button color="inherit" variant="outlined">
              Logout
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          height: { xs: 300, md: 500 },
          backgroundImage: `url(https://picsum.photos/seed/hero/1600/900)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            bgcolor: 'rgba(0,0,0,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant="h3"
            sx={{ color: 'white', fontWeight: 700, textAlign: 'center' }}
          >
            Discover Luxury Eyewear
          </Typography>
        </Box>
      </Box>

      {/* Campaign Carousel */}
      <Container sx={{ py: 6 }}>
        <CampaignCarousel items={campaigns} />
      </Container>

      {/* Featured Products */}
      <Container sx={{ py: 6 }}>
        <Typography variant="h5" gutterBottom>
          Featured
        </Typography>
        <Grid container spacing={3}>
          {featured?.map((p) => (
            <Grid key={p.id}>
              <ProductCard product={p} />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Categories */}
      <Container sx={{ py: 6 }}>
        <Typography variant="h5" gutterBottom>
          Shop by Category
        </Typography>
        <ShopByCategory categories={categories ?? []} />
      </Container>

      {/* New Arrivals */}
      <Container sx={{ py: 6 }}>
        <Typography variant="h5" gutterBottom>
          New Arrivals
        </Typography>
        <Grid container spacing={3}>
          {newArrivals?.map((p) => (
            <Grid key={p.id}>
              <ProductCard product={p} />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Support Widget */}
      <SupportWidget />
    </>
  )
}

export default HomePage
