'use client';

import { AuthLayout } from '../src/components/auth/AuthLayout';
import { SignupForm } from '../src/components/auth/SignupForm';

export default function SignupPage() {
  return (
    <AuthLayout
      title="Create an account"
      subtitle="Start managing your tasks effectively"
    >
      <SignupForm />
    </AuthLayout>
  );
} 