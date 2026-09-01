import { useState } from "react";

import {
  useRegister,
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

export function RegisterForm() {
  const {
    register,
    loading,
  } = useRegister();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    await register(
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
        Register
      </AuthSubmitButton>
    </form>
  );
}