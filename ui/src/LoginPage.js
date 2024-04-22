import React, { useEffect, useState } from "react";
import { Button, TextField, Typography, Box, Container } from "@mui/material";
import ProductsList from "./ProductsList";
import { CircularProgress } from "@mui/material";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("sessionToken"));

  // Effect hook to check for the token in URL on load
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const tokenType = urlParams.get("stytch_token_type");

    if (token) {
      if (tokenType === "sso") {
        authenticateSSO(token);
      } else {
        authenticateMagicLink(token);
      }
    }
  }, [window.location.href]);

  // Function to authenticate the user using Magic Link
  const authenticateMagicLink = async (token) => {
    try {
      setLoading(true);
      const response = await fetch("http://127.0.0.1:5000/authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: token, type: "magiclink" }),
      });

      if (response.ok) {
        const responseData = await response.json();
        localStorage.setItem("sessionToken", responseData.session_token);
        localStorage.setItem("sessionJWT", responseData.session_jwt);
        setToken(responseData.session_token);
        setLoading(false);
      } else {
        setLoading(false);
        console.error("Authentication failed");
      }
    } catch (error) {
      console.error("Error in authentication:", error);
    }
  };

  const authenticateSSO = async (token) => {
    try {
      setLoading(true);
      const response = await fetch("http://127.0.0.1:5000/authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: token, type: "sso" }),
      });

      if (response.ok) {
        const responseData = await response.json();
        localStorage.setItem("sessionToken", responseData.session_token);
        localStorage.setItem("sessionJWT", responseData.session_jwt);
        setToken(responseData.session_token);
        setLoading(false);
      } else {
        setLoading(false);
        console.error("Authentication failed");
      }
    } catch (error) {
      console.error("Error in authentication:", error);
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const sendMagicLink = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/send-magic-link", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email_address: email }),
      });

      if (response.ok) {
        setEmailSent(true);
        console.log("Magic link sent successfully");
      } else {
        console.error("Failed to send magic link");
      }
    } catch (error) {
      console.error("Error sending magic link:", error);
    }
  };

  const retryMagicLink = () => {
    setEmailSent(false);
    setEmail("");
  };

  const signOut = () => {
    localStorage.removeItem("sessionToken");
    localStorage.removeItem("sessionJWT");
    setToken(null);
  };

  return (
    <Container>
      {loading ? (
        <CircularProgress />
      ) : token ? (
        <>
          <Button
            variant="outlined"
            color="secondary"
            onClick={signOut}
            sx={{ position: "absolute", top: 16, right: 16 }}
          >
            Sign Out
          </Button>
          <ProductsList />
        </>
      ) : (
        <Box
          sx={{
            my: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" gutterBottom>
            Login with Email
          </Typography>
          {!emailSent ? (
            <>
              <TextField
                label="Email Address"
                variant="outlined"
                type="email"
                value={email}
                onChange={handleEmailChange}
                fullWidth
                margin="normal"
              />
              <Button
                variant="contained"
                color="primary"
                onClick={sendMagicLink}
              >
                Send Magic Link
              </Button>
            </>
          ) : (
            <>
              <Typography variant="body1" gutterBottom>
                An email has been sent to {email}. Please check your inbox to
                continue.
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                onClick={retryMagicLink}
              >
                Retry
              </Button>
            </>
          )}
        </Box>
      )}
    </Container>
  );
};

export default LoginPage;
