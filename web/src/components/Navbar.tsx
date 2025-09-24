import { useEffect, useState } from 'react'

import { AppBar, Toolbar, Typography, Box, Stack, Button } from '@mui/material'

import { navigate, routes } from '@redwoodjs/router'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleEditorials = () => {
    navigate(routes.editorials())
  }

  const handleProduct = () => {
    navigate(routes.product({ sku: 'LL-AERO-AVIATOR-001' }))
  }

  const handleCollections = () => {
    navigate(routes.collection({ slug: 'fashion' }))
  }

  const handleStats = () => {
    navigate(routes.adminPanel())
  }

  const handleLogout = () => {
    navigate(routes.login())
  }

  const handleHome = () => {
    navigate(routes.home())
  }

  return (
    <AppBar
      position="fixed"
      elevation={isScrolled ? 4 : 0}
      sx={{
        bgcolor: isScrolled ? 'rgba(255,255,255,0.6)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(8px)' : 'none',
        transition: 'background-color 0.5s ease, box-shadow 0.5s ease',
      }}
    >
      <Toolbar
        sx={{
          maxWidth: 1400,
          mx: 'auto',
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          px: { xs: 2, sm: 3, lg: 4 },
          minHeight: 64,
        }}
      >
        {/* Logo */}
        <Box display="flex" alignItems="center" gap={1.5}>
          <img
            src="https://www.shutterstock.com/image-illustration/vector-ll-logo-clothing-fashion-260nw-2371407755.jpg"
            style={{
              width: 48,
              height: 48,
              objectFit: 'cover',
              border: '1px solid black',
              marginLeft: 5,
            }}
            alt="logo"
          />
          <Typography variant="subtitle1" fontWeight={500} letterSpacing={2}>
            LUXE LENS
          </Typography>
        </Box>

        {/* Navigation Links */}
        <Stack direction="row" gap={2}>
          <Button onClick={handleHome} color="primary" variant="outlined">
            Shop
          </Button>
          <Button onClick={handleProduct} color="primary" variant="outlined">
            Products
          </Button>
          <Button
            onClick={handleCollections}
            color="primary"
            variant="outlined"
          >
            Collections
          </Button>
          <Button onClick={handleStats} color="primary" variant="outlined">
            Stats
          </Button>
          <Button onClick={handleEditorials} color="primary" variant="outlined">
            Editorials
          </Button>
          <Button onClick={handleLogout} color="primary" variant="outlined">
            Logout
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
