'use client';

import { AuthLayout } from '../src/components/auth/AuthLayout';
import { LoginForm } from '../src/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to your account"
    >
      <LoginForm />
    </AuthLayout>
  );
} 