import React, { useState } from "react";
import * as Components from "./Components";
import "./styling.css";

export default function Register() {
  const [signIn, toggle] = React.useState(true);
  const [sighnup, setSighnup] = useState({
    name: '',
    email: '',
    password: '',
    Cpassword:''
    })

    const handleInput = (e) => {
        const { name, value } = e.target;
        setSighnup(prev => ({
          ...prev,
          [name]: value
        }));
      };

  console.log(sighnup)
  return (
    <Components.Container>
      <Components.SignUpContainer signingIn={signIn}>
        <Components.Form>
          <Components.Title>Create Account</Components.Title>
          <Components.Input name="name" type="text" placeholder="Name" onChange={handleInput} />
          <Components.Input name="email" type="email" placeholder="Email" onChange={handleInput}/>
          <Components.Input name="password" type="password" placeholder="Password" onChange={handleInput}/>
          <Components.Input name="Cpassword" type="password" placeholder="Password" onChange={handleInput}/>
          <Components.Button >Sign Up</Components.Button>
        </Components.Form>
      </Components.SignUpContainer>
      <Components.SignInContainer signingIn={signIn}>
        <Components.Form>
          <Components.Title>Sign in</Components.Title>
          <Components.Input type="email" placeholder="Email" />
          <Components.Input type="password" placeholder="Password" />
          {/* <Components.Anchor href="#">Forgot your password?</Components.Anchor> */}
          <Components.Button className="mt-2">Sign In</Components.Button>
        </Components.Form>
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