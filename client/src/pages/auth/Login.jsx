import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Components from "./Components";
import "./styling.css";

export default function Login() {
  const [login, setLogin] = useState({});
  const navigate = useNavigate();
  // Set signingIn to true for Login page
  const signingIn = true;

  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('start posting');
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(login),
      });
      if(res.ok){
        navigate('/admin')
      }
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        console.error('request error');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Components.Container>
      <Components.SignUpContainer signingIn={signingIn} />
      <Components.SignInContainer signingIn={signingIn}>
        <Components.Form onSubmit={handleSubmit}>
          <Components.Title>Sign in</Components.Title>
          <Components.Input onChange={handleChange} name="email" type="email" placeholder="Email" />
          <Components.Input onChange={handleChange} name="password" type="password" placeholder="Password" />
          {/* <Components.Anchor href="#">Forgot your password?</Components.Anchor> */}
          <Components.Button className="mt-2">Sign In</Components.Button>
        </Components.Form>
      </Components.SignInContainer>
      <Components.OverlayContainer signingIn={signingIn}>
        <Components.Overlay signingIn={signingIn}>
          <Components.LeftOverlayPanel signingIn={signingIn}>
            <Components.Title>Welcome Back!</Components.Title>
            <Components.Paragraph>
              To keep connected with us please login with your personal info
            </Components.Paragraph>
            <Components.GhostButton onClick={() => navigate("/register")}>
              Sign Up
            </Components.GhostButton>
          </Components.LeftOverlayPanel>
          <Components.RightOverlayPanel signingIn={signingIn}>
            <Components.Title>Hello, Friend!</Components.Title>
            <Components.Paragraph>
              Enter your personal details and start journey with us
            </Components.Paragraph>
            <Components.GhostButton onClick={() => navigate("/register")}>
              Sign Up
            </Components.GhostButton>
          </Components.RightOverlayPanel>
        </Components.Overlay>
      </Components.OverlayContainer>
    </Components.Container>
  );
}