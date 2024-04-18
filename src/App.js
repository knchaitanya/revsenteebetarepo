// src/App.js
import React, { useState } from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { AppBar, Button, Container, Toolbar, Typography } from '@mui/material';
import Login from './components/Login';
import FileUpload from './components/FileUpload';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const handleLogin = (username) => {
    setUsername(username);
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUsername('');
  };

  return (
    <HelmetProvider>
      <div>
        <Helmet>
          <title>{loggedIn ? `Welcome, ${username}!` : 'RevSentee'}</title>
        </Helmet>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              RevSentee(Beta)
            </Typography>
            {loggedIn && (
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            )}
          </Toolbar>
        </AppBar>
        <Container maxWidth="sm" sx={{ mt: 2 }}>
          {loggedIn ? (
            <div>
              <Typography variant="h4" gutterBottom>
                Welcome, {username}!
              </Typography>
              <FileUpload />
            </div>
          ) : (
            <Login onLogin={handleLogin} />
          )}
        </Container>
      </div>
    </HelmetProvider>
  );
}

export default App;
