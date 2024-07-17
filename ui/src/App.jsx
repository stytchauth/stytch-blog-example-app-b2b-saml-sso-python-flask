import { Button, Container } from '@mui/material';
import { useStytchB2BClient, useStytchMemberSession } from '@stytch/react/b2b';
import React, { useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Home';
import ProductsList from './ProductsList';
import SSOLogin from './SSOLogin';

function App() {
  const stytch = useStytchB2BClient();
  const { session, fromCache } = useStytchMemberSession();

  const logout = useCallback(() => {
    stytch.session.revoke();
  }, [stytch]);

  return (
    <Container>
      {session && (
        <>
        <Button
          variant="outlined"
          color="secondary"
          onClick={logout}
          sx={{ position: "absolute", top: 16, right: 16 }}
        >
          Sign Out
        </Button>
      </>
      )}

      <Routes>
        <Route path="/org/:orgId" element={<SSOLogin />} />
        <Route path="/" element={session || fromCache ? <ProductsList /> : <Home />} />
      </Routes>
    </Container>
  );
}

export default App;
