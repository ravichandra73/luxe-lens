import { useCallback, useMemo, useRef, useState } from 'react'

import { Box, Button, Stack } from '@mui/material'

type Props = {
  images: string[]
  activeIndex: number
  onChange: (index: number) => void
  alt: string
}

const ImageGallery = ({ images, activeIndex, onChange, alt }: Props) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [isMagnifying, setIsMagnifying] = useState(false)
  const [bgPosition, setBgPosition] = useState('center')

  const activeSrc =
    images[activeIndex] ?? 'https://picsum.photos/seed/p/1200/800'

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect()
    const x = Math.min(Math.max(0, e.clientX - left), width)
    const y = Math.min(Math.max(0, e.clientY - top), height)
    const xPercent = (x / width) * 100
    const yPercent = (y / height) * 100
    setBgPosition(`${xPercent}% ${yPercent}%`)
  }, [])

  const srcSet = useMemo(() => {
    if (!activeSrc.includes('picsum.photos')) return undefined
    const base = activeSrc.replace(/\/(\d+)\/(\d+)$/, '')
    return `${base}/1200/800 1x, ${base}/2400/1600 2x`
  }, [activeSrc])

  return (
    <Box>
      {/* Main Image */}
      <Box
        ref={containerRef}
        sx={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 3,
          bgColor: 'grey.100',
          height: { xs: 360, sm: 480 },
        }}
        onMouseEnter={() => setIsMagnifying(true)}
        onMouseLeave={() => setIsMagnifying(false)}
        onMouseMove={handleMouseMove}
      >
        <Box
          sx={{
            width: '100%',
            height: '100%',
            backgroundImage: `url(${activeSrc})`,
            backgroundPosition: isMagnifying ? bgPosition : 'center',
            backgroundSize: isMagnifying ? '200%' : 'cover',
            backgroundRepeat: 'no-repeat',
            transition: 'background-size 0.15s ease',
          }}
          role="img"
          aria-label={alt}
        />

        {/* Hidden img for accessibility & srcSet */}
        <Box
          component="img"
          src={activeSrc}
          srcSet={srcSet}
          alt={alt}
          sx={{ display: 'none' }}
          loading="eager"
        />
      </Box>

      {/* Thumbnails */}
      <Stack direction="row" spacing={1.5} mt={2} flexWrap="wrap">
        {images.map((src, i) => (
          <Button
            key={i}
            onClick={() => onChange(i)}
            sx={{
              p: 0,
              borderRadius: 2,
              border:
                i === activeIndex ? '2px solid #111' : '2px solid transparent',
              minWidth: 0,
              overflow: 'hidden',
            }}
            aria-label={`View image ${i + 1}`}
          >
            <Box
              component="img"
              src={src}
              alt={`${alt} ${i + 1}`}
              sx={{
                width: 80,
                height: 80,
                objectFit: 'cover',
                display: 'block',
              }}
              loading="lazy"
            />
          </Button>
        ))}
      </Stack>
    </Box>
  )
}

export default ImageGallery
