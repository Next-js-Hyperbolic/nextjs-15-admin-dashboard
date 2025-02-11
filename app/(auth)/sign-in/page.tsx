'use client';

import React from 'react';
import AuthForm from '@/components/AuthForm';
import { SIGN_IN_FIELD_DEFAULT } from '@/constants';
import { signInSchema } from '@/lib/formValidations';
import { signInWithCredentials } from '@/lib/actions/auth';

const Page = () => {
  return (
    <AuthForm
      type='SIGN_IN'
      schema={signInSchema}
      defaultFieldValues={SIGN_IN_FIELD_DEFAULT}
      onSubmit={signInWithCredentials}
    />
  );
};

export default Page;
