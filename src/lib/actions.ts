'use server';

import { z } from 'zod';
import { redirect } from 'next/navigation';
import type { AccountSummary, OpenPosition } from './types';
import { cookies } from 'next/headers';

const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
  brokerId: z.string().min(1, { message: 'Broker ID is required.' }),
});

export async function login(prevState: any, formData: FormData) {
  const validatedFields = loginSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  
  // SECURE API INTEGRATION POINT
  // Here, you would make a call to your authentication service or the Match-Trade API
  // to verify the user's credentials.
  
  const { email, password, brokerId } = validatedFields.data;
  // Make sure to set TRADING_API_TOKEN in your environment variables
  const tradingApiToken = process.env.TRADING_API_TOKEN; 
  
  const response = await fetch('https://api.your-broker.com/auth', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Auth-trading-api': `${tradingApiToken}`,
    },
    body: JSON.stringify({ email, password, brokerId }),
  });
  
  if (response.ok) {
    const authData = await response.json();
    // Assuming the response contains a session token
    const token = authData.token;
  
    // Set the session token in a secure, HTTP-only cookie
    cookies().set('co-auth', token, { secure: true, httpOnly: true, sameSite: 'strict' });
    
    redirect('/dashboard');
  } else {
    return { message: 'Login failed. Please check your credentials.' };
  }
}

export async function getAccountSummary(): Promise<AccountSummary> {
  // SECURE API INTEGRATION POINT
  // This is where you would fetch account summary data from the Match-Trade API.
  // You would need the user's authentication token from their session to make this request.
  
  const token = cookies().get('co-auth')?.value;
  if (!token) { throw new Error('Not authenticated'); }
  
  const response = await fetch('https://api.your-broker.com/account/summary', {
    headers: {
      'Cookie': `co-auth=${token}`
    }
  });
  if (!response.ok) {
    throw new Error('Failed to fetch account summary');
  }
  const data = await response.json();
  return data;
}

export async function getOpenPositions(): Promise<OpenPosition[]> {
  // SECURE API INTEGRATION POINT
  // Here you would make the API call to the Match-Trade API endpoint to fetch open positions.
  
  const token = cookies().get('co-auth')?.value;
  if (!token) { throw new Error('Not authenticated'); }
  
  const response = await fetch('https://api.your-broker.com/positions/open', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': `co-auth=${token}`
    },
    body: JSON.stringify({ /* any required parameters */ })
  });

  if (!response.ok) {
    throw new Error('Failed to fetch open positions');
  }

  const data = await response.json();
  return data.positions;
}
