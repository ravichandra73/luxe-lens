import { useState } from 'react'

import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ShareIcon from '@mui/icons-material/Share'
import { Button, Stack } from '@mui/material'

type Props = {
  productName: string
}

const EngagementBar = ({ productName }: Props) => {
  const [wishlisted, setWishlisted] = useState(false)

  const share = async () => {
    const shareData: ShareData = {
      title: productName,
      text: `Check out ${productName} at Luxe Lens`,
      url: typeof window !== 'undefined' ? window.location.href : undefined,
    }
    try {
      if (navigator.share) {
        await navigator.share(shareData)
      }
    } catch {
      // fallback could go here (e.g., copy to clipboard)
    }
  }

  return (
    <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
      <Button
        variant={wishlisted ? 'contained' : 'outlined'}
        color={wishlisted ? 'primary' : 'inherit'}
        startIcon={wishlisted ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        onClick={() => setWishlisted((w) => !w)}
        aria-pressed={wishlisted}
      >
        {wishlisted ? 'Saved to Wishlist' : 'Save to Wishlist'}
      </Button>

      <Button variant="outlined" startIcon={<ShareIcon />} onClick={share}>
        Share
      </Button>
    </Stack>
  )
}

export default EngagementBar
