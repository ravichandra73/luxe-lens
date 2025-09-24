import { AppBar, Toolbar, Typography, Stack, Button } from '@mui/material'

import { Link } from '@redwoodjs/router'

type Editorial = {
  id: string
  title: string
  excerpt: string
  image: string
  href?: string
}

const items: Editorial[] = [
  {
    id: 'e1',
    title: 'Behind the Lens: The Craft of Titanium',
    excerpt: 'Discover why titanium elevates comfort and durability.',
    image: 'https://picsum.photos/seed/editorial-1/1200/800',
    href: '#',
  },
  {
    id: 'e2',
    title: 'Style Guide: Finding Your Frame',
    excerpt: 'How to choose frames that fit your features and lifestyle.',
    image: 'https://picsum.photos/seed/editorial-2/1200/800',
    href: '#',
  },
]

const EditorialBlocks = () => {
  if (items.length === 0) return null
  return (
    <section
      id="stories"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <AppBar position="sticky" color={'transparent'} elevation={2}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Link to="/">
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              LuxeLens
            </Typography>
          </Link>
          <Stack direction="row" gap={2}>
            <Button color="inherit" variant="outlined">
              Shop
            </Button>

            <Button color="inherit" variant="outlined">
              Logout
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
      <div className="grid gap-6 sm:grid-cols-2">
        {items.map((it) => (
          <a
            key={it.id}
            href={it.href ?? '#'}
            className="group relative overflow-hidden rounded-2xl"
          >
            <img
              src={it.image}
              alt={it.title}
              className="h-72 w-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 p-6 text-white">
              <h4 className="text-xl font-semibold">{it.title}</h4>
              <p className="mt-2 text-white/90 max-w-xl">{it.excerpt}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}

export default EditorialBlocks
