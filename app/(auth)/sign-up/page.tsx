'use client';

import React from 'react';
import AuthForm from '@/components/AuthForm';
import { signUpSchema } from '@/lib/formValidations';
import { SIGN_UP_FIELD_DEFAULT } from '@/constants';
import { signUp } from '@/lib/actions/auth';

const Page = () => {
  return (
    <AuthForm
      type='SIGN_UP'
      schema={signUpSchema}
      defaultFieldValues={SIGN_UP_FIELD_DEFAULT}
      onSubmit={signUp}
    />
  );
};

export default Page;
