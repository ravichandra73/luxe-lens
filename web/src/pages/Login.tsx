import { useState } from 'react'

import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Grid,
  Link,
} from '@mui/material'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ email, password })
    // TODO: Integrate RedwoodJS Auth or API call here
  }

  return (
    <Container maxWidth="lg">
      <Grid container minHeight="100vh">
        {/* Left Section (Image / Branding) */}
        <Grid
          sx={{
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'grey.100',
          }}
        >
          <Box textAlign="center" p={4}>
            <img
              src="https://picsum.photos/600/800?random=sunglasses"
              alt="Sunglasses"
              style={{
                maxWidth: '100%',
                height: '75vh',
                borderRadius: 16,
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              }}
            />
          </Box>
        </Grid>

        {/* Right Section (Login Form) */}
        <Grid display="flex" alignItems="center" justifyContent="center" p={4}>
          <Paper
            elevation={3}
            sx={{
              p: 4,
              width: '100%',
              maxWidth: 400,
              borderRadius: 3,
            }}
          >
            <Typography variant="h5" fontWeight={600} gutterBottom>
              Welcome Back 👋
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={3}>
              Log in to continue shopping for the perfect sunglasses.
            </Typography>

            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                label="Email Address"
                type="email"
                fullWidth
                required
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <TextField
                label="Password"
                type="password"
                fullWidth
                required
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2, py: 1.3, borderRadius: 2, fontWeight: 600 }}
              >
                Log In
              </Button>
            </Box>

            <Box mt={3} textAlign="center">
              <Link href="#" underline="hover" variant="body2">
                Forgot your password?
              </Link>
            </Box>

            <Box mt={2} textAlign="center">
              <Typography variant="body2" color="text.secondary">
                Don’t have an account?{' '}
                <Link href="/signup" underline="hover">
                  Sign up
                </Link>
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default LoginPage
