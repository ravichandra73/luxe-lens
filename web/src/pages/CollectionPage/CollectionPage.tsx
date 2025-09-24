import { useState, useCallback } from 'react'

import { Box, Container, Grid, Typography, Paper } from '@mui/material'
import gql from 'graphql-tag'

import { useParams } from '@redwoodjs/router'
import { Metadata, useQuery } from '@redwoodjs/web'

import FilterSidebar, { type FilterValues } from 'src/components/FilterSidebar'
import Navbar from 'src/components/Navbar'
import ProductCard from 'src/components/ProductCard'

const FILTERED_QUERY = gql`
  query ProductsFiltered($slug: String!, $filters: ProductsFilterInput!) {
    productsFiltered(input: $filters) {
      id
      name
      priceCents
      salePriceCents
      onSale
      images
    }
  }
`

const CollectionPage = () => {
  const { slug } = useParams()
  const [filters, setFilters] = useState<FilterValues>({})

  const { data, refetch } = useQuery(FILTERED_QUERY, {
    variables: { slug, filters: { categorySlug: slug, take: 48 } },
  })

  const onChange = useCallback(
    (v: FilterValues) => {
      setFilters(v)
      refetch({ slug, filters: { categorySlug: slug, take: 48, ...v } })
    },
    [refetch, slug]
  )

  const products = data?.productsFiltered ?? []

  return (
    <>
      <Metadata title={`Collection - ${slug}`} />
      <Navbar />

      <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* Page Title */}
        <Typography
          variant="h4"
          fontWeight={600}
          textTransform="capitalize"
          gutterBottom
        >
          {slug}
        </Typography>

        <Grid container spacing={4} mt={1}>
          {/* Sidebar */}
          <Grid item xs={12} md={3}>
            <Paper elevation={1} sx={{ p: 2 }}>
              <FilterSidebar initial={filters} onChange={onChange} />
            </Paper>
          </Grid>

          {/* Product Grid */}
          <Grid item xs={12} md={9}>
            {products.length ? (
              <Grid container spacing={3}>
                {products.map((p: any) => (
                  <Grid item xs={12} sm={6} lg={4} key={p.id}>
                    <ProductCard product={p} />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="200px"
              >
                <Typography variant="body1" color="text.secondary">
                  No products found. Try adjusting your filters.
                </Typography>
              </Box>
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default CollectionPage
