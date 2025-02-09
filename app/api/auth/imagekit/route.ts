import ImageKit from 'imagekit';
import config from '@/lib/config';
import { NextResponse } from 'next/server';

const {
  env: {
    imagekit: { publicKey, privateKey, urlEndpoint },
  },
} = config;

console.log(publicKey);
console.log(privateKey);
console.log(urlEndpoint);

const imagekit = new ImageKit({ publicKey, privateKey, urlEndpoint });

export async function GET() {
  const testVar = NextResponse.json(imagekit.getAuthenticationParameters());
  console.log(`testVar`);
  console.log(testVar);
  return testVar;
}
