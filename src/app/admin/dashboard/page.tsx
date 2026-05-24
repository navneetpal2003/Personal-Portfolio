import { readData } from '@/lib/db';
import DashboardClient from './DashboardClient';

export default function AdminDashboardPage() {
  // Load current database details on the server
  const data = readData();

  return <DashboardClient initialData={data} />;
}
export const dynamic = 'force-dynamic'; // Prevent static building for admin pages to ensure dynamic checks
