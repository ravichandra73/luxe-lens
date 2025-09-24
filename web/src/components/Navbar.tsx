import { useEffect, useState } from 'react'

import { AppBar, Toolbar, Typography, Box, Stack } from '@mui/material'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              bgcolor: 'grey.900',
            }}
            aria-hidden
          />
          <Typography variant="subtitle1" fontWeight={500} letterSpacing={2}>
            LUXE LENS
          </Typography>
        </Box>

        {/* Navigation Links */}
        <Stack
          direction="row"
          spacing={4}
          sx={{ display: { xs: 'none', md: 'flex' } }}
        >
          {['Sunglasses', 'Eyewear', 'New', 'Stories'].map((item) => (
            <Typography
              key={item}
              variant="body2"
              sx={{
                color: 'text.secondary',
                cursor: 'pointer',
                transition: 'color 0.3s',
                '&:hover': { color: 'text.primary' },
              }}
            >
              {item}
            </Typography>
          ))}
        </Stack>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
