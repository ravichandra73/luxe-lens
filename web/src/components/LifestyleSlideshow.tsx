import { useEffect, useRef, useState } from 'react'

import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import { Box, Stack, IconButton } from '@mui/material'

type Props = {
  images: string[]
}

const AUTO_INTERVAL_MS = 4500

const LifestyleSlideshow = ({ images }: Props) => {
  const [index, setIndex] = useState(0)
  const timerRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    if (images.length <= 1) return
    timerRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % images.length)
    }, AUTO_INTERVAL_MS)
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current)
    }
  }, [images.length])

  if (!images.length) return null

  return (
    <Box component="section" sx={{ mt: 8 }}>
      <Box sx={{ position: 'relative', overflow: 'hidden', borderRadius: 3 }}>
        {images.map((src, i) => (
          <Box
            key={i}
            component="img"
            src={src}
            alt={`Campaign ${i + 1}`}
            loading={i === 0 ? 'eager' : 'lazy'}
            sx={{
              width: '100%',
              height: { xs: 320, sm: 380, lg: 450 },
              objectFit: 'cover',
              position: i === index ? 'relative' : 'absolute',
              inset: 0,
              transition: 'opacity 0.7s ease',
              opacity: i === index ? 1 : 0,
            }}
          />
        ))}

        {/* Pagination Dots */}
        <Stack
          direction="row"
          spacing={1}
          sx={{
            position: 'absolute',
            bottom: 16,
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          {images.map((_, i) => (
            <IconButton
              key={i}
              onClick={() => setIndex(i)}
              sx={{ p: 0.5 }}
              aria-label={`Go to slide ${i + 1}`}
            >
              <FiberManualRecordIcon
                sx={{
                  fontSize: 12,
                  color: i === index ? 'common.white' : 'rgba(255,255,255,0.5)',
                }}
              />
            </IconButton>
          ))}
        </Stack>
      </Box>
    </Box>
  )
}

export default LifestyleSlideshow
