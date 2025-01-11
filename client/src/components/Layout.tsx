import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'
import { Navbar } from './Navbar'

export function Layout() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <Box component="main" sx={{ flex: 1 }}>
        <Outlet />
      </Box>
    </Box>
  )
} 