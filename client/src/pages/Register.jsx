import React, { useState } from "react";
import * as Components from "./Components";
import "./styling.css";

export default function Register() {
  const [sighnup, setSighnup] = useState({});

  const handleInput = (e) => {
    setSighnup({
      ...sighnup,
      [e.target.name]: e.target.value
    })
  };

  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sighnup)
      });

      const data = await res.json();
      console.log(data);
      if(!res.ok){
        console.error('requist error');
      }
    } catch (error) {
      console.log(error);
    }
  }
  console.log(sighnup)

  return (
    <Components.Form onSubmit={handleSubmit}>
      <Components.Title>Create Account</Components.Title>
      <Components.Input name="user" type="text" placeholder="Name" onChange={handleInput} />
      <Components.Input name="email" type="email" placeholder="Email" onChange={handleInput}/>
      <Components.Input name="password" type="password" placeholder="Password" onChange={handleInput}/>
      {/* <Components.Input name="Cpassword" type="password" placeholder="Password" onChange={handleInput}/> */}
      <Components.Button>Sign Up</Components.Button>
    </Components.Form>
  );
}