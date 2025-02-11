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
import { z, ZodObject, ZodType } from 'zod';
import {
  FormControl,
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
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

interface Props<T extends FieldValues> {
  schema: ZodType<T>;
  defaultFieldValues: T;
  onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
  type: 'SIGN_IN' | 'SIGN_UP';
}

const AuthForm = <T extends FieldValues>({
  type,
  schema,
  defaultFieldValues,
  onSubmit,
}: Props<T>) => {
  const isSignIn = type === 'SIGN_IN';
  const router = useRouter();

  const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultFieldValues as DefaultValues<T>,
  });

  const handleSubmit: SubmitHandler<T> = async data => {
    try {
      const result = await onSubmit(data);

      if (result.success) {
        toast({
          title: 'Success',
          description: `Successfully ${isSignIn ? 'signed in' : 'signed up'}`,
        });

        router.push('/');
      } else {
        toast({
          title: `Something went wrong ${isSignIn ? 'signing in' : 'signing up'}`,
          description: result.error ?? 'Please try again.',
          variant: 'destructive',
        });
      }
      toast({
        title: `Something went wrong with ${isSignIn ? 'sign-in' : 'sign-up'}`,
        description: result.error ?? 'Please try again.',
        variant: 'destructive',
      });
    } catch (error: any) {
      toast({
        title: `Something went wrong with ${isSignIn ? 'sign-in' : 'sign-up'}`,
        description: error.message ?? 'Please try again.',
        variant: 'destructive',
      });
    }
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
                      <ImageUpload onFileChange={field.onChange} />
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
