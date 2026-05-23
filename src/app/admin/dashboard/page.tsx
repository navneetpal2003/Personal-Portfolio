import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';
import { readData } from '@/lib/db';
import DashboardClient from './DashboardClient';

export default async function AdminDashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;

  // Perform server-side JWT verification
  if (!token) {
    redirect('/admin/login');
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    redirect('/admin/login');
  }

  // Load current database details on the server
  const data = readData();

  return <DashboardClient initialData={data} />;
}
export const dynamic = 'force-dynamic'; // Prevent static building for admin pages to ensure dynamic checks
