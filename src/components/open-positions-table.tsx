import type { OpenPosition } from '@/lib/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { Card, CardContent } from './ui/card';

interface OpenPositionsTableProps {
  data: OpenPosition[];
}

export function OpenPositionsTable({ data }: OpenPositionsTableProps) {
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      signDisplay: 'always',
    }).format(value);
  
  const formatDate = (dateString: string) => 
    new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  return (
    <Card className="border-border/50 shadow-lg">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Symbol</TableHead>
                <TableHead>Side</TableHead>
                <TableHead className="text-right">Volume</TableHead>
                <TableHead className="text-right">Open Price</TableHead>
                <TableHead className="text-right">Current Price</TableHead>
                <TableHead>Open Time</TableHead>
                <TableHead className="text-right">S/L</TableHead>
                <TableHead className="text-right">T/P</TableHead>
                <TableHead className="text-right">Profit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((position) => (
                <TableRow key={position.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{position.symbol}</TableCell>
                  <TableCell>
                    <Badge variant={position.side === 'BUY' ? 'default' : 'destructive'} className={cn(position.side === 'BUY' ? 'bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/30')}>
                      {position.side === 'BUY' ? <ArrowUp className="mr-1 h-3 w-3" /> : <ArrowDown className="mr-1 h-3 w-3" />}
                      {position.side}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{position.volume.toFixed(2)}</TableCell>
                  <TableCell className="text-right">{position.openPrice.toFixed(4)}</TableCell>
                  <TableCell className="text-right">{position.currentPrice.toFixed(4)}</TableCell>
                  <TableCell className="text-muted-foreground">{formatDate(position.openTime)}</TableCell>
                  <TableCell className="text-right text-muted-foreground">{position.stopLoss?.toFixed(4) ?? 'N/A'}</TableCell>
                  <TableCell className="text-right text-muted-foreground">{position.takeProfit?.toFixed(4) ?? 'N/A'}</TableCell>
                  <TableCell
                    className={cn(
                      'text-right font-semibold',
                      position.profit > 0 ? 'text-green-400' : 'text-red-400'
                    )}
                  >
                    {formatCurrency(position.profit)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
