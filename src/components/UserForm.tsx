import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const UserForm: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const [errors, setErrors] = useState<{ [key: string]: string }>({
    // Define error state for each field
    name: '',
    phone: '',
    email: '',
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Basic validation
    let formIsValid = true;
    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
      formIsValid = false;
    }

    // Basic phone number validation (allow only numeric characters)
    if (!/^\d+$/.test(phone)) {
      newErrors.phone = 'Phone number should contain only digits';
      formIsValid = false;
    }

    // Basic email validation
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Valid email is required';
      formIsValid = false;
    }

    // Update errors state
    setErrors(newErrors);

    if (formIsValid) {
      localStorage.setItem('user', JSON.stringify({ name, phone, email }));
      navigate('/second');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Your Information
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField
          fullWidth
          label="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          margin="normal"
          error={!!errors.phone}
          helperText={errors.phone}
        />
        <TextField
          fullWidth
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
          error={!!errors.email}
          helperText={errors.email}
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default UserForm;
