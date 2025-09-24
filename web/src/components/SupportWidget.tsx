import { useState } from 'react'

import { Box, Fab, Paper, Typography, Button, Stack } from '@mui/material'

const SupportWidget = () => {
  const [open, setOpen] = useState(false)

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 1300,
      }}
    >
      {open && (
        <Paper
          elevation={6}
          sx={{
            mb: 2,
            width: 280,
            borderRadius: 3,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box
            sx={{
              px: 2,
              py: 1.5,
              borderBottom: 1,
              borderColor: 'divider',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  bgcolor: 'text.primary',
                }}
              />
              <Typography variant="body2" fontWeight={500}>
                Luxe Support
              </Typography>
            </Stack>

            <Button size="small" onClick={() => setOpen(false)}>
              Close
            </Button>
          </Box>

          <Box sx={{ p: 2 }}>
            <Typography variant="body2" color="text.secondary">
              {"Hi! Need help finding the perfect pair? We're here to help."}
            </Typography>
          </Box>

          <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
            <Button
              variant="contained"
              fullWidth
              color="primary"
              onClick={() => (window.location.href = '#')}
            >
              Start Chat
            </Button>
          </Box>
        </Paper>
      )}

      <Fab
        color="primary"
        size="medium"
        onClick={() => setOpen((v) => !v)}
        aria-label="Support"
      >
        Help
      </Fab>
    </Box>
  )
}

export default SupportWidget
