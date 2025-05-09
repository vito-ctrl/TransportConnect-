import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Components from "./Components";
import "./styling.css";

export default function Register() {
  const [signup, setSignup] = useState({});
  const navigate = useNavigate();
  const signingIn = false;

  const handleInput = (e) => {
    setSignup({
      ...signup,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signup)
      });
      const data = await res.json();
      
      if (res.ok) {
        localStorage.setItem("SighnToken", data.token);
        navigate('/login'); 
      } else {
        // Handle error response
        setError(data.message || "Registration failed");
      }
      console.log(data);
      // localStorage.setItem("SighnToken", data.token)
      if (!res.ok) {
        console.error('request error');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Components.Container>
      <Components.SignUpContainer signingIn={signingIn}>
        <Components.Form onSubmit={handleSubmit}>
          <Components.Title>Create Account</Components.Title>
          <Components.Input name="user" type="text" placeholder="Name" onChange={handleInput} />
          <Components.Input name="email" type="email" placeholder="Email" onChange={handleInput} />
          <Components.Input name="password" type="password" placeholder="Password" onChange={handleInput} />
          {/* <Components.Input name="Cpassword" type="password" placeholder="Confirm Password" onChange={handleInput}/> */}
          <Components.Button>Sign Up</Components.Button>
        </Components.Form>
      </Components.SignUpContainer>
      <Components.SignInContainer signingIn={signingIn} />
      <Components.OverlayContainer signingIn={signingIn}>
        <Components.Overlay signingIn={signingIn}>
          <Components.LeftOverlayPanel signingIn={signingIn}>
            <Components.Title>Welcome Back!</Components.Title>
            <Components.Paragraph>
              To keep connected with us please login with your personal info
            </Components.Paragraph>
            <Components.GhostButton onClick={() => navigate("/login")}>
              Sign In
            </Components.GhostButton>
          </Components.LeftOverlayPanel>
          <Components.RightOverlayPanel signingIn={signingIn}>
            <Components.Title>Hello, Friend!</Components.Title>
            <Components.Paragraph>
              Enter your personal details and start journey with us
            </Components.Paragraph>
            <Components.GhostButton onClick={() => navigate("/login")}>
              Sign In
            </Components.GhostButton>
          </Components.RightOverlayPanel>
        </Components.Overlay>
      </Components.OverlayContainer>
    </Components.Container>
  );
}