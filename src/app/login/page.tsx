import { LoginForm } from '@/components/login-form';
import { BarChart3 } from 'lucide-react';

export default function LoginPage() {
  return (
    <main className="flex h-screen w-full flex-col items-center justify-center bg-background p-4">
      <div className="flex items-center gap-4 mb-8">
        <BarChart3 className="h-10 w-10 text-primary" />
        <h1 className="text-4xl font-bold text-foreground">Sky Links Capital</h1>
      </div>
      <LoginForm />
    </main>
  );
}
