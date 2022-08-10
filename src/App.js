
import { Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import Home from './Home';
import Modal from './Modal'

function App() {
  return (
   <Container maxWidth='sm'>
    <Box textAlign='center' mt={5}>
      <Typography variant='h2' fontWeight='bold'>
        Quiz App
      </Typography>
      <Modal />
      <Home />
    </Box>
   </Container>
  );
}

export default App;
