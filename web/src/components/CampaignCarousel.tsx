import { useEffect, useRef, useState } from 'react'

import { Box, Button, Container, Typography, useTheme } from '@mui/material'

type Campaign = {
  id: string
  title: string
  subtitle?: string
  image: string
  ctaLabel?: string
  ctaHref?: string
}

type Props = {
  items: Campaign[]
  intervalMs?: number
}

const CampaignCarousel = ({ items, intervalMs = 5000 }: Props) => {
  const [index, setIndex] = useState(0)
  const timerRef = useRef<number | null>(null)
  const theme = useTheme()

  // Autoplay effect
  useEffect(() => {
    if (items.length <= 1) return
    timerRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % items.length)
    }, intervalMs)
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current)
    }
  }, [items.length, intervalMs])

  if (items.length === 0) return null

  return (
    <Box component="section" sx={{ py: { xs: 4, md: 8 } }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            position: 'relative',
            borderRadius: 3,
            overflow: 'hidden',
            height: { xs: 300, sm: 450 },
          }}
        >
          {items.map((item, i) => (
            <Box
              key={item.id}
              sx={{
                position: 'absolute',
                inset: 0,
                opacity: i === index ? 1 : 0,
                transition: 'opacity 0.7s ease-in-out',
              }}
              aria-hidden={i !== index}
            >
              {/* Background Image */}
              <Box
                component="img"
                src={item.image}
                alt={item.title}
                loading={i === 0 ? 'eager' : 'lazy'}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
              {/* Overlay */}
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(to top, rgba(0,0,0,0.6), transparent)',
                }}
              />
              {/* Content */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  p: { xs: 2, sm: 4 },
                  color: 'common.white',
                  maxWidth: '80%',
                }}
              >
                <Typography variant="h5" fontWeight={600}>
                  {item.title}
                </Typography>
                {item.subtitle && (
                  <Typography variant="body1" sx={{ mt: 1, opacity: 0.9 }}>
                    {item.subtitle}
                  </Typography>
                )}
                {item.ctaHref && (
                  <Button
                    href={item.ctaHref}
                    variant="contained"
                    sx={{
                      mt: 2,
                      bgcolor: 'common.white',
                      color: 'grey.900',
                      fontWeight: 500,
                      '&:hover': { bgcolor: theme.palette.grey[200] },
                    }}
                  >
                    {item.ctaLabel ?? 'Explore'}
                  </Button>
                )}
              </Box>
            </Box>
          ))}
        </Box>

        {/* Indicators */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 1,
            mt: 2,
          }}
        >
          {items.map((_, i) => (
            <Box
              key={i}
              component="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              sx={{
                width: 24,
                height: 8,
                borderRadius: 4,
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.3s',
                bgcolor: i === index ? 'grey.900' : 'grey.400',
                '&:hover': { bgcolor: i === index ? 'grey.900' : 'grey.500' },
              }}
            />
          ))}
        </Box>
      </Container>
    </Box>
  )
}

export default CampaignCarousel
