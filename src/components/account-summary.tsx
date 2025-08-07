import type { AccountSummary as AccountSummaryType } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { DollarSign, TrendingUp, Scale, Wallet, CreditCard, Gauge } from 'lucide-react';

interface AccountSummaryProps {
  data: AccountSummaryType;
}

const summaryItems = [
    { key: 'balance' as keyof AccountSummaryType, label: 'Balance', icon: Wallet },
    { key: 'credit' as keyof AccountSummaryType, label: 'Credit', icon: CreditCard },
    { key: 'equity' as keyof AccountSummaryType, label: 'Equity', icon: TrendingUp },
    { key: 'freeFunds' as keyof AccountSummaryType, label: 'Free Funds', icon: DollarSign },
    { key: 'margin' as keyof AccountSummaryType, label: 'Margin', icon: Scale },
    { key: 'marginLevel' as keyof AccountSummaryType, label: 'Margin Level', icon: Gauge, suffix: '%' },
];

export function AccountSummary({ data }: AccountSummaryProps) {
  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

  return (
    <Card className="bg-transparent border-0 shadow-none">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Account Details</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {summaryItems.map((item, index) => (
            <li key={item.key}>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </div>
                <span className="font-medium text-foreground">
                    {item.key === 'marginLevel' ? data[item.key].toFixed(2) + item.suffix : formatCurrency(data[item.key])}
                </span>
              </div>
              {index < summaryItems.length - 1 && <Separator className="mt-4 bg-border/50"/>}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
