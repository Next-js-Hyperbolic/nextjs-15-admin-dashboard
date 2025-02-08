'use client';

import React from 'react';
import AuthForm from '@/components/AuthForm';
import { signInSchema } from '@/lib/formValidations';
import { SIGN_IN_FIELD_DEFAULT } from '@/constants';

const Page = () => {
  return (
    <AuthForm
      type='SIGN_IN'
      schema={signInSchema}
      defaultFieldValues={SIGN_IN_FIELD_DEFAULT}
      onSubmit={async data => {
        return { success: true };
      }}
    />
  );
};

export default Page;
