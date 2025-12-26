import { useAuth } from '../contexts/AuthContext';
import AdminDashboard from './admin/AdminDashboard';
import CustomerDashboard from './customer/CustomerDashboard';

export default function Dashboard() {
  const { user } = useAuth();

  if (user?.role === 'admin') {
    return <AdminDashboard />;
  }

  return <CustomerDashboard />;
}
