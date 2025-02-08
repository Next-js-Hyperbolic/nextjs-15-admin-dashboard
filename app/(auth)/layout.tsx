import Image from 'next/image';
import React from 'react';
import Logo from '@/public/icons/logo.svg';
import AuthIllustration from '@/public/images/auth-illustration.png';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='auth-container'>
      <section className='auth-form'>
        <div className='auth-box'>
          <div className='flex flex-row gap-3'>
            <Image src={Logo} alt='logo' width={37} height={37} />
            <h1 className='text-2xl font-semibold text-white'>BookWise</h1>
          </div>
          <div>{children}</div>
        </div>
      </section>
      <section className='auth-illustration'>
        <Image
          src={AuthIllustration}
          alt='Auth illustration'
          width={1000}
          height={1000}
          className='size-full object-cover'
        />
      </section>
    </main>
  );
};

export default layout;
