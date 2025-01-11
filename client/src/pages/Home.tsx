import { Typography, Button, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export function Home() {
  const navigate = useNavigate()

  return (
    <Box sx={{ textAlign: 'center', mt: 8 }}>
      <Typography variant="h2" component="h1" gutterBottom>
        Welcome to AlpineAir
      </Typography>
      <Typography variant="h5" component="h2" color="text.secondary" gutterBottom>
        Your gateway to shared private jet travel
      </Typography>
      <Button
        variant="contained"
        size="large"
        onClick={() => navigate('/search')}
        sx={{ mt: 4 }}
      >
        Start Your Journey
      </Button>
    </Box>
  )
} 