import { Box, Button, Container, Typography, Stack } from '@mui/material'

type HeroProps = {
  videoSrc?: string
  imageSrc?: string
}

const Hero = ({ videoSrc, imageSrc }: HeroProps) => {
  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        width: '100%',
        height: { xs: '70vh', md: '90vh' },
        minHeight: 560,
        overflow: 'hidden',
      }}
    >
      {/* Video or Image Background */}
      {videoSrc ? (
        <Box
          component="video"
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={imageSrc}
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      ) : (
        imageSrc && (
          <Box
            component="img"
            src={imageSrc}
            alt="Hero background"
            loading="eager"
            sx={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        )
      )}

      {/* Overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.2)',
        }}
      />

      {/* Content */}
      <Container
        maxWidth="lg"
        sx={{
          position: 'relative',
          zIndex: 10,
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          px: { xs: 2, sm: 3, lg: 4 },
        }}
      >
        <Box color="common.white">
          {/* Brand */}
          <Stack direction="row" alignItems="center" spacing={2} mb={4}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                bgcolor: 'common.white',
              }}
            />
            <Typography variant="caption" letterSpacing={3}>
              LUXE LENS
            </Typography>
          </Stack>

          {/* Headline */}
          <Typography
            variant="h3"
            component="h1"
            fontWeight={600}
            sx={{
              fontSize: { xs: '2.5rem', sm: '3rem', md: '4rem' },
              lineHeight: 1.1,
            }}
          >
            See Luxury In A New Light
          </Typography>

          {/* Subheading */}
          <Typography
            variant="body1"
            sx={{ mt: 2, maxWidth: 480, opacity: 0.9 }}
          >
            Ultra-crafted eyewear with precision optics and timeless design.
          </Typography>

          {/* Buttons */}
          <Stack direction="row" spacing={2} mt={4} flexWrap="wrap">
            <Button
              href="#shop"
              variant="contained"
              sx={{
                color: 'grey.900',
                bgcolor: 'common.white',
                '&:hover': { bgcolor: 'grey.100' },
              }}
            >
              Shop Now
            </Button>
            <Button
              href="#stories"
              variant="outlined"
              sx={{
                borderColor: 'rgba(255,255,255,0.7)',
                color: 'common.white',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
              }}
            >
              Discover Stories
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  )
}

export default Hero
