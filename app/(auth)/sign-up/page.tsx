'use client';

import React from 'react';
import AuthForm from '@/components/AuthForm';
import { signUpSchema } from '@/lib/formValidations';
import { SIGN_UP_FIELD_DEFAULT } from '@/constants';

interface SignUpFieldValues {
  // define the type for SIGN_UP_FIELD_DEFAULT
}

const Page = () => {
  return (
    <AuthForm
      type='SIGN_UP'
      schema={signUpSchema}
      defaultFieldValues={SIGN_UP_FIELD_DEFAULT as SignUpFieldValues}
      onSubmit={async data => {
        return { success: true };
      }}
    />
  );
};

export default Page;
