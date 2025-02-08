'use client';

import React from 'react';
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from './ui/form';
import { Input } from './ui/input';
import { Button } from './ui/button';
import Link from 'next/link';
import { FIELD_LABELS, FIELD_TYPES } from '@/constants';
import ImageUpload from './ImageUpload';

interface Props<T extends FieldValues> {
  type: 'SIGN_IN' | 'SIGN_UP';
  schema: z.ZodObject<T>;
  defaultFieldValues: DefaultValues<T>;
  onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
}

const AuthForm = <T extends FieldValues>({
  type,
  schema,
  defaultFieldValues,
  onSubmit,
}: Props<T>) => {
  const isSignIn = type === 'SIGN_IN';

  const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultFieldValues,
  });

  const handleSubmit: SubmitHandler<T> = async data => {
    return onSubmit(data);
  };

  return (
    <div className='flex flex-col gap-4'>
      <h1 className='text-2xl font-semibold text-white'>
        {printHeader(isSignIn)}
      </h1>
      <p className='text-light-100'>{printDescription(isSignIn)}</p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className='space-y-6 w-full'
        >
          {Object.keys(defaultFieldValues).map(field => (
            <FormField
              key={field}
              control={form.control}
              name={field as Path<T>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='capitalize'>
                    {FIELD_LABELS[field.name as keyof typeof FIELD_LABELS]}
                  </FormLabel>
                  <FormControl>
                    {field.name === 'universityCard' ? (
                      <ImageUpload />
                    ) : (
                      <Input
                        required
                        type={
                          FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]
                        }
                        {...field}
                        className='form-input'
                      />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button type='submit' className='form-btn'>
            {isSignIn ? 'Sign in' : 'Sign up'}
          </Button>
        </form>
      </Form>
      <p className='text-center text-base font-medium'>
        {isSignIn ? 'New to BookWise?' : 'Already have an account?'}{' '}
        <Link
          className='font-bold text-primary'
          href={isSignIn ? '/sign-up' : '/sign-in'}
        >
          {isSignIn ? 'Create an account.' : 'Sign in.'}
        </Link>
      </p>
    </div>
  );
};

export default AuthForm;

const printHeader = (isSignIn: boolean) => {
  if (isSignIn) {
    return 'Welcome to BookWise';
  }
  return 'Create an account';
};

const printDescription = (isSignIn: boolean) => {
  if (isSignIn) {
    return 'Access the vast collection of resources, and stay updated.';
  }
  return 'Please fill in the form and provide a valid university ID to gain access.';
};
