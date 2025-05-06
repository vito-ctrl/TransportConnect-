import React from "react";
import * as Components from "./Components";
import "./styling.css";

export default function Login() {
  return (
    <Components.Form>
      <Components.Title>Sign in</Components.Title>
      <Components.Input type="email" placeholder="Email" />
      <Components.Input type="password" placeholder="Password" />
      {/* <Components.Anchor href="#">Forgot your password?</Components.Anchor> */}
      <Components.Button className="mt-2">Sign In</Components.Button>
    </Components.Form>
  );
}