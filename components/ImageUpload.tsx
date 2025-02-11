'use client';

import React, { useRef, useState } from 'react';
import { IKImage, ImageKitProvider, IKUpload } from 'imagekitio-next';
import config from '@/lib/config';
import ImageKit from 'imagekit';
import Image from 'next/image';
import { Button } from './ui/button';
import { error } from 'console';
import { toast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const {
  env: {
    imagekit: { publicKey, urlEndpoint },
  },
} = config;

const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();
    const { signature, expire, token } = data;

    return { token, expire, signature };
  } catch (error: any) {
    throw new Error('Authentication request failed ', error.message);
  }
};

const ImageUpload = ({
  onFileChange,
}: {
  onFileChange: (filePath: string) => void;
}) => {
  const ikUploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const onError = (error: any) => {
    setLoading(false);
    toast({
      title: 'Image upload failed',
      description: error ?? 'Please try uploading again.',
      variant: 'destructive',
    });
  };
  const onSuccess = (res: any) => {
    setFile(res);
    onFileChange(res.filePath);
    setLoading(false);
    toast({
      title: 'Image uploaded successfully',
      description: `${res.filePath} uploaded!`,
    });
  };

  return (
    <div>
      <ImageKitProvider
        publicKey={publicKey}
        urlEndpoint={urlEndpoint}
        authenticator={authenticator}
      >
        <IKUpload
          className='hidden'
          ref={ikUploadRef}
          // onLoadStart={() => setLoading(true)}
          // onLoad={() => setLoading(true)}
          onUploadStart={() => setLoading(true)}
          onError={onError}
          onSuccess={onSuccess}
          fileName='test-upload.png'
        />

        <div className='flex gap-5 flex-col'>
          <Button
            className='upload-btn outline outline-light-100 opacity-75'
            variant='link'
            disabled={loading}
            onClick={e => {
              e.preventDefault();
              if (ikUploadRef.current) {
                // @ts-ignore
                ikUploadRef.current?.click();
              }
            }}
          >
            {loading ? (
              <Loader2 className='animate-spin' />
            ) : (
              <>
                <Image
                  src='/icons/upload.svg'
                  alt='upload'
                  width={20}
                  height={20}
                  className='object-contain'
                />
                <p className='text-base text-light-100'>Upload ID Image File</p>
                {file && <p className='upload-filename'>{file.filePath}</p>}
              </>
            )}
          </Button>

          {file && (
            <IKImage
              alt={file.filePath}
              path={file.filePath}
              lqip={{ active: true }}
              height={300}
              width={500}
            />
          )}
        </div>
      </ImageKitProvider>
    </div>
  );
};

export default ImageUpload;
