'use server';

import { z } from 'zod';
import { redirect } from 'next/navigation';
import type { AccountSummary, OpenPosition } from './types';

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
  //
  // Example:
  // const { email, password, brokerId } = validatedFields.data;
  // const response = await fetch('https://api.match-trade.com/v2/auth', {
  //   method: 'POST',
  //   headers: { 
  //     'Content-Type': 'application/json',
  //     // Add any necessary API keys here, preferably from environment variables.
  //     'X-API-KEY': process.env.MATCH_TRADE_API_KEY
  //   },
  //   body: JSON.stringify({ email, password, brokerId }),
  // });
  //
  // if (response.ok) {
  //   const user = await response.json();
  //   // If authentication is successful, you would typically create a session
  //   // or set a secure, HTTP-only cookie to maintain the user's logged-in state.
  //   // cookies().set('session', user.token, { secure: true, httpOnly: true });
  //   redirect('/dashboard');
  // } else {
  //   return { message: 'Login failed. Please check your credentials.' };
  // }

  // For this demo, we'll simulate a successful login and redirect to the dashboard.
  redirect('/dashboard');
}

export async function getAccountSummary(): Promise<AccountSummary> {
  // SECURE API INTEGRATION POINT
  // This is where you would fetch account summary data from the Match-Trade API.
  // You would need the user's authentication token from their session to make this request.

  // For this demo, we return mock data.
  return {
    balance: 100000.0,
    credit: 5000.0,
    equity: 102500.0,
    freeFunds: 98000.0,
    margin: 4500.0,
    marginLevel: 2277.78,
  };
}

export async function getOpenPositions(): Promise<OpenPosition[]> {
  // SECURE API INTEGRATION POINT
  // Here you would make the API call to the Match-Trade API endpoint to fetch open positions.
  // The documentation suggests a POST request to `/position/open-position`.
  //
  // const response = await fetch('https://api.match-trade.com/v2/position/open-position', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${sessionToken}` // Use the token from the user's session
  //   },
  //   body: JSON.stringify({ /* any required parameters */ })
  // });
  // const data = await response.json();
  // return data.positions;
  
  // For this demo, we return mock data.
  return [
    {
      id: 1, symbol: 'EURUSD', openTime: '2023-10-27T10:00:00Z', volume: 0.1, side: 'BUY', openPrice: 1.05, currentPrice: 1.06, stopLoss: 1.04, takeProfit: 1.08, swap: -0.5, commission: -1.0, profit: 100.0,
    },
    {
      id: 2, symbol: 'GBPUSD', openTime: '2023-10-27T11:30:00Z', volume: 0.2, side: 'SELL', openPrice: 1.22, currentPrice: 1.21, stopLoss: 1.23, takeProfit: 1.20, swap: -1.0, commission: -2.0, profit: 200.0,
    },
    {
      id: 3, symbol: 'USDJPY', openTime: '2023-10-27T12:00:00Z', volume: 0.05, side: 'BUY', openPrice: 150.0, currentPrice: 149.5, stopLoss: 149.0, takeProfit: 151.0, swap: 0.2, commission: -0.5, profit: -25.0,
    },
    {
      id: 4, symbol: 'AUDCAD', openTime: '2023-10-26T08:00:00Z', volume: 1.0, side: 'SELL', openPrice: 0.8850, currentPrice: 0.8900, stopLoss: 0.8950, takeProfit: 0.8750, swap: -5.0, commission: -10.0, profit: -500.0,
    },
     {
      id: 5, symbol: 'USDCAD', openTime: '2023-10-27T14:00:00Z', volume: 0.5, side: 'BUY', openPrice: 1.3700, currentPrice: 1.3750, stopLoss: 1.3650, takeProfit: 1.3850, swap: -2.5, commission: -5.0, profit: 250.0,
    },
    {
      id: 6, symbol: 'XAUUSD', openTime: '2023-10-25T15:00:00Z', volume: 0.01, side: 'BUY', openPrice: 1980.0, currentPrice: 2010.0, stopLoss: 1960.0, takeProfit: 2050.0, swap: -0.1, commission: -0.2, profit: 300.0,
    },
  ];
}
