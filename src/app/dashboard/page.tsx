import { AccountSummary } from '@/components/account-summary';
import { OpenPositionsTable } from '@/components/open-positions-table';
import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
  SidebarTrigger,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { getAccountSummary, getOpenPositions } from '@/lib/actions';
import { BarChart3, LogOut, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function DashboardPage() {
  const accountSummaryData = await getAccountSummary();
  const openPositionsData = await getOpenPositions();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader className="p-4">
            <div className="flex items-center gap-3">
              <BarChart3 className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold">Sky Links Capital</h1>
            </div>
          </SidebarHeader>
          <SidebarContent className="p-2">
            <AccountSummary data={accountSummaryData} />
          </SidebarContent>
          <SidebarFooter className="p-4 flex flex-col gap-2">
            <Button variant="ghost" className="justify-start w-full">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/login">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Link>
            </Button>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <header className="flex items-center justify-end p-4 border-b md:hidden">
            <SidebarTrigger />
          </header>
          <main className="p-4 sm:p-6 lg:p-8">
            <h2 className="text-3xl font-bold mb-6">Open Positions</h2>
            <OpenPositionsTable data={openPositionsData} />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
