'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { login } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LogIn } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useEffect } from 'react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? 'Signing In...' : 'Sign In'}
      <LogIn className="ml-2 h-4 w-4" />
    </Button>
  );
}

export function LoginForm() {
  const [state, formAction] = useFormState(login, null);
  const { toast } = useToast();

  useEffect(() => {
    if (state?.message) {
      toast({
        title: 'Login Failed',
        description: state.message,
        variant: 'destructive',
      });
    }
  }, [state, toast]);

  return (
    <Card className="w-full max-w-sm relative overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent -z-10 opacity-50" />
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary/30 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob -z-10"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent/30 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob animation-delay-4000 -z-10"></div>

      <CardHeader>
        <CardTitle className="text-2xl">Secure Sign In</CardTitle>
        <CardDescription>Enter your credentials to access your dashboard.</CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="m@example.com" required />
            {state?.errors?.email && <p className="text-xs text-destructive">{state.errors.email[0]}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required />
            {state?.errors?.password && <p className="text-xs text-destructive">{state.errors.password[0]}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="brokerId">Broker ID</Label>
            <Input id="brokerId" name="brokerId" placeholder="YourBrokerID" required />
            {state?.errors?.brokerId && <p className="text-xs text-destructive">{state.errors.brokerId[0]}</p>}
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton />
        </CardFooter>
      </form>
    </Card>
  );
}
