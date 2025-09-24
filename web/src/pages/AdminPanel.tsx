// src/pages/AdminPanel.tsx
import { useState } from 'react'

import {
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  AppBar,
  Toolbar,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  Card,
  CardContent,
  Stack,
} from '@mui/material'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts'

import { Link } from '@redwoodjs/router'

const drawerWidth = 240

// Mock Orders
const orders = [
  {
    id: 1,
    product: 'Sunglasses A',
    user: 'John Doe',
    status: 'Delivered',
    amount: 120,
  },
  {
    id: 2,
    product: 'Sunglasses B',
    user: 'Jane Smith',
    status: 'Pending',
    amount: 80,
  },
  {
    id: 3,
    product: 'Sunglasses C',
    user: 'Mark Lee',
    status: 'Shipped',
    amount: 150,
  },
]

// Mock Analytics Data
const salesData = [
  { category: 'Aviator', sales: 400 },
  { category: 'Wayfarer', sales: 300 },
  { category: 'Round', sales: 200 },
  { category: 'Sport', sales: 150 },
]

const revenueTrend = [
  { month: 'Jan', revenue: 2000 },
  { month: 'Feb', revenue: 2500 },
  { month: 'Mar', revenue: 1800 },
  { month: 'Apr', revenue: 3200 },
  { month: 'May', revenue: 4000 },
]

export default function AdminPanel() {
  const [activePage, setActivePage] = useState('Orders')

  const renderContent = () => {
    switch (activePage) {
      case 'Orders':
        return (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Product</TableCell>
                  <TableCell>User</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Amount ($)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.product}</TableCell>
                    <TableCell>{order.user}</TableCell>
                    <TableCell>{order.status}</TableCell>
                    <TableCell>{order.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )
      case 'Analytics':
        return (
          <Stack direction={'row'} gap={5}>
            <Paper sx={{ p: 5, height: 350, width: '100%' }}>
              <Typography variant="h6">Sales by Category</Typography>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesData}>
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sales" fill="#1976d2" />
                </BarChart>
              </ResponsiveContainer>
            </Paper>

            <Paper sx={{ p: 5, height: 350, width: '100%' }}>
              <Typography variant="h6">Revenue Trend</Typography>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueTrend}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="revenue" stroke="#d32f2f" />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Stack>
        )
      case 'Revenue':
        return (
          <Grid container spacing={2}>
            <Grid>
              <Card>
                <CardContent>
                  <Typography variant="h6">Total Revenue</Typography>
                  <Typography variant="h4">$13,500</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid>
              <Card>
                <CardContent>
                  <Typography variant="h6">Total Orders</Typography>
                  <Typography variant="h4">1,240</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid>
              <Card>
                <CardContent>
                  <Typography variant="h6">Active Customers</Typography>
                  <Typography variant="h4">320</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )
      default:
        return null
    }
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" color="transparent" sx={{ zIndex: 1201 }}>
        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Stack direction={'row'} alignItems={'center'} gap={3}>
            <Link to="/">
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
            </Link>
            <h2>Luxe Lens</h2>
          </Stack>
          <Toolbar>
            <Typography variant="h6" noWrap>
              Admin Panel
            </Typography>
          </Toolbar>
        </Stack>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {['Orders', 'Analytics', 'Revenue'].map((text) => (
              <ListItem key={text} onClick={() => setActivePage(text)}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        <Container>{renderContent()}</Container>
      </Box>
    </Box>
  )
}
