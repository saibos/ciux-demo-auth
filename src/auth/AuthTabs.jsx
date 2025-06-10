
import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';

/*
  This is a simple login/register/recovery form in one file.
  We're using tabs to switch between modes.
  The code is commented as if written by a beginner developer for learning/demo purposes.
*/

function AuthTabs() {
  const auth = getAuth(); // get firebase auth instance

  // This state controls which tab is currently active
  const [mode, setMode] = useState("login"); // "login", "register", or "recover"

  // State to store the email and password entered by the user
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // This is used to show success or error messages to the user
  const [message, setMessage] = useState("");

  // This function handles what happens when the user clicks the main button
  const handleAction = async () => {
    setMessage(""); // clear previous messages

    try {
      if (mode === "login") {
        // Try to sign in with email and password
        await signInWithEmailAndPassword(auth, email, password);
        setMessage("Login successful!");
      } else if (mode === "register") {
        // Try to create a new user
        await createUserWithEmailAndPassword(auth, email, password);
        setMessage("Registration successful! Please check your email to verify your account.");
      } else if (mode === "recover") {
        // Send password reset email
        await sendPasswordResetEmail(auth, email);
        setMessage("Password recovery email sent!");
      }
    } catch (error) {
      // If something goes wrong, show the error message
      console.error(error);
      setMessage(error.message || "Something went wrong.");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", padding: 20 }}>
      <h2 style={{ textAlign: "center" }}>Secure Access Demo</h2>

      {/* Tabs to switch between login/register/recover */}
      <div style={{ display: "flex", justifyContent: "space-around", marginBottom: 20 }}>
        {["login", "register", "recover"].map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            style={{
              padding: "10px 20px",
              border: mode === m ? "2px solid blue" : "1px solid gray",
              backgroundColor: mode === m ? "#e0f0ff" : "#f9f9f9",
              cursor: "pointer"
            }}
          >
            {m.charAt(0).toUpperCase() + m.slice(1)}
          </button>
        ))}
      </div>

      {/* Email input (used in all modes) */}
      <div style={{ marginBottom: 10 }}>
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: 8 }}
        />
      </div>

      {/* Password input (used only for login and register) */}
      {mode !== "recover" && (
        <div style={{ marginBottom: 10 }}>
          <input
            type="password"
            placeholder="Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: 8 }}
          />
        </div>
      )}

      {/* Main button */}
      <button onClick={handleAction} style={{ width: "100%", padding: 10, marginBottom: 10 }}>
        {mode === "login" ? "Login" : mode === "register" ? "Register" : "Send Reset Link"}
      </button>

      {/* Message display */}
      {message && (
        <div style={{ marginTop: 10, textAlign: "center", color: "green" }}>
          {message}
        </div>
      )}
    </div>
  );
}

export default AuthTabs;
