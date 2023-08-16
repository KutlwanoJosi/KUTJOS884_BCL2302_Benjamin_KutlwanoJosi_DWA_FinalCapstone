import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://rexjubphkdvwnmtjcsyf.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJleGp1YnBoa2R2d25tdGpjc3lmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA5ODM1MDEsImV4cCI6MjAwNjU1OTUwMX0.3-Xari1iiX3eZqGJaqUhuZ0pbIAieq3iku_rPLh4tJ0'
);

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const { user, error } = await supabase.auth.signIn({
        email,
        password,
      });

      if (error) {
        console.error('Login error:', error.message);
      } else {
        console.log('Logged in:', user);
        // Redirect or navigate to another page
      }
    } catch (error) {
      console.error('Login error:', error.message);
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Log In</button>
    </div>
  );
};

export default LoginPage;
