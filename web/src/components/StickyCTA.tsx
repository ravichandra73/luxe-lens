import { Box, Button, Paper, Stack, Typography } from '@mui/material'

type Props = {
  priceLabel: string
}

const StickyCTA = ({ priceLabel }: Props) => {
  return (
    <Box
      sx={{
        display: { lg: 'none' },
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1300,
        px: { xs: 2, sm: 3, lg: 4 },
        pb: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider',
          p: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="subtitle1" fontWeight={600} color="text.primary">
          {priceLabel}
        </Typography>

        <Stack direction="row" spacing={1}>
          <Button variant="outlined" size="small">
            Support
          </Button>
          <Button variant="contained" color="primary" size="small">
            Add to Cart
          </Button>
        </Stack>
      </Paper>
    </Box>
  )
}

export default StickyCTA
