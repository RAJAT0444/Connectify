// import { Resend } from 'resend';

// export const resend = new Resend(process.env.RESEND_API_KEY);


import { Resend } from 'resend';

const apiKey = process.env.RESEND_API_KEY;

if (!apiKey) {
  throw new Error("❌ RESEND_API_KEY is missing in environment variables");
}

export const resend = new Resend(apiKey);
