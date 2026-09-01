import { useState } from "react";

import {
  useLogin,
} from "../../hooks";

import {
  UsernameField,
} from "../forms/UsernameField";

import {
  PasswordField,
} from "../forms/PasswordField";

import {
  AuthSubmitButton,
} from "../forms/AuthSubmitButton";


export function LoginForm() {
  const { login, loading } =
    useLogin();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    await login(
      username,
      password
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      
      <UsernameField
        value={username}
        onChange={setUsername}
      />

      <PasswordField
        value={password}
        onChange={setPassword}
      />

      <AuthSubmitButton
        loading={loading}
      >
        Login
      </AuthSubmitButton>
    </form>
  );
}