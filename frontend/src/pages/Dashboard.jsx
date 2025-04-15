import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Container,
  Card,
  CardContent,
  TextField,
  Alert
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handlePayment = async () => {
    try {
      setError('');
      setSuccess('');
      
      const response = await fetch('http://localhost:3000/api/payments/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ amount: parseFloat(amount) * 100 }) // Convertendo para centavos
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao processar pagamento');
      }

      setSuccess('Pagamento processado com sucesso!');
      setAmount('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <Typography variant="body1" sx={{ mr: 2 }}>
            Olá, {user?.name}!
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Sair
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              Sistema de Pagamentos
            </Typography>
            
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            
            {success && (
              <Alert severity="success" sx={{ mb: 2 }}>
                {success}
              </Alert>
            )}

            <TextField
              fullWidth
              label="Valor (R$)"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              margin="normal"
              InputProps={{
                inputProps: { min: 0, step: 0.01 }
              }}
            />

            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handlePayment}
              sx={{ mt: 2 }}
            >
              Realizar Pagamento
            </Button>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Dashboard; 