import React, { useState } from "react";
import * as Components from "./pages/Components";
import Register from "./pages/Register";
import Login from "./pages/Login";
import "./pages/styling.css";

export default function App() {
  const [signIn, toggle] = React.useState(true);
  console.log("Sign in state:", signIn);
  
  return (
    <Components.Container>
      <Components.SignUpContainer signingIn={signIn}>
        <Register />
      </Components.SignUpContainer>
      
      <Components.SignInContainer signingIn={signIn}>
        <Login />
      </Components.SignInContainer>
      
      <Components.OverlayContainer signingIn={signIn}>
        <Components.Overlay signingIn={signIn}>
          <Components.LeftOverlayPanel signingIn={signIn}>
            <Components.Title>Welcome Back!</Components.Title>
            <Components.Paragraph>
              To keep connected with us please login with your personal info
            </Components.Paragraph>
            <Components.GhostButton onClick={() => toggle(true)}>
              Sign In
            </Components.GhostButton>
          </Components.LeftOverlayPanel>
          
          <Components.RightOverlayPanel signingIn={signIn}>
            <Components.Title>Hello, Friend!</Components.Title>
            <Components.Paragraph>
              Enter your personal details and start journey with us
            </Components.Paragraph>
            <Components.GhostButton onClick={() => toggle(false)}>
              Sign Up
            </Components.GhostButton>
          </Components.RightOverlayPanel>
        </Components.Overlay>
      </Components.OverlayContainer>
    </Components.Container>
  );
}