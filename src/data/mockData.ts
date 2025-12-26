export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  status: 'active' | 'inactive';
  stock: number;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive';
}

export interface Role {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive';
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  products: { id: string; name: string; quantity: number; price: number }[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
  paymentStatus: 'pending' | 'paid' | 'failed';
}

export interface Payment {
  id: string;
  orderId: string;
  amount: number;
  method: 'credit_card' | 'debit_card' | 'paypal' | 'cash';
  status: 'pending' | 'completed' | 'failed';
  date: string;
}

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Engine Oil 5W-30',
    description: 'High-performance synthetic engine oil for modern vehicles',
    price: 45.99,
    category: 'Engine Oil',
    image: 'https://images.pexels.com/photos/13065690/pexels-photo-13065690.jpeg?auto=compress&cs=tinysrgb&w=400',
    status: 'active',
    stock: 150,
  },
  {
    id: '2',
    name: 'Synthetic Motor Oil 10W-40',
    description: 'Advanced protection for high-mileage engines',
    price: 52.99,
    category: 'Engine Oil',
    image: 'https://images.pexels.com/photos/5766/car-industry-vehicle-interior.jpg?auto=compress&cs=tinysrgb&w=400',
    status: 'active',
    stock: 120,
  },
  {
    id: '3',
    name: 'Transmission Fluid ATF',
    description: 'Superior automatic transmission fluid for smooth shifting',
    price: 38.99,
    category: 'Transmission Fluid',
    image: 'https://images.pexels.com/photos/279949/pexels-photo-279949.jpeg?auto=compress&cs=tinysrgb&w=400',
    status: 'active',
    stock: 80,
  },
  {
    id: '4',
    name: 'Hydraulic Oil ISO 68',
    description: 'Industrial-grade hydraulic oil for heavy machinery',
    price: 65.99,
    category: 'Hydraulic Oil',
    image: 'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=400',
    status: 'active',
    stock: 95,
  },
  {
    id: '5',
    name: 'Brake Fluid DOT 4',
    description: 'High-temperature brake fluid for optimal braking performance',
    price: 28.99,
    category: 'Brake Fluid',
    image: 'https://images.pexels.com/photos/13065691/pexels-photo-13065691.jpeg?auto=compress&cs=tinysrgb&w=400',
    status: 'active',
    stock: 200,
  },
  {
    id: '6',
    name: 'Gear Oil 75W-90',
    description: 'Heavy-duty gear oil for manual transmissions and differentials',
    price: 42.99,
    category: 'Gear Oil',
    image: 'https://images.pexels.com/photos/190574/pexels-photo-190574.jpeg?auto=compress&cs=tinysrgb&w=400',
    status: 'active',
    stock: 110,
  },
];

export const mockCategories: Category[] = [
  { id: '1', name: 'Engine Oil', description: 'Motor oils for various engine types', status: 'active' },
  { id: '2', name: 'Transmission Fluid', description: 'Fluids for automatic and manual transmissions', status: 'active' },
  { id: '3', name: 'Hydraulic Oil', description: 'Industrial hydraulic oils', status: 'active' },
  { id: '4', name: 'Brake Fluid', description: 'Brake fluids for automotive applications', status: 'active' },
  { id: '5', name: 'Gear Oil', description: 'Lubricants for gears and differentials', status: 'active' },
  { id: '6', name: 'Coolant', description: 'Engine coolants and antifreeze', status: 'inactive' },
];

export const mockRoles: Role[] = [
  { id: '1', name: 'admin', description: 'Full system access and management', status: 'active' },
  { id: '2', name: 'customer', description: 'Can browse products and place orders', status: 'active' },
  { id: '3', name: 'manager', description: 'Can manage inventory and orders', status: 'inactive' },
];

export const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    customerId: '2',
    customerName: 'John Doe',
    products: [
      { id: '1', name: 'Premium Engine Oil 5W-30', quantity: 2, price: 45.99 },
      { id: '3', name: 'Transmission Fluid ATF', quantity: 1, price: 38.99 },
    ],
    total: 130.97,
    status: 'delivered',
    date: '2024-01-15',
    paymentStatus: 'paid',
  },
  {
    id: 'ORD-002',
    customerId: '2',
    customerName: 'John Doe',
    products: [
      { id: '5', name: 'Brake Fluid DOT 4', quantity: 3, price: 28.99 },
    ],
    total: 86.97,
    status: 'shipped',
    date: '2024-01-20',
    paymentStatus: 'paid',
  },
  {
    id: 'ORD-003',
    customerId: '3',
    customerName: 'Jane Smith',
    products: [
      { id: '2', name: 'Synthetic Motor Oil 10W-40', quantity: 1, price: 52.99 },
      { id: '4', name: 'Hydraulic Oil ISO 68', quantity: 2, price: 65.99 },
    ],
    total: 184.97,
    status: 'processing',
    date: '2024-01-22',
    paymentStatus: 'paid',
  },
];

export const mockPayments: Payment[] = [
  {
    id: 'PAY-001',
    orderId: 'ORD-001',
    amount: 130.97,
    method: 'credit_card',
    status: 'completed',
    date: '2024-01-15',
  },
  {
    id: 'PAY-002',
    orderId: 'ORD-002',
    amount: 86.97,
    method: 'paypal',
    status: 'completed',
    date: '2024-01-20',
  },
  {
    id: 'PAY-003',
    orderId: 'ORD-003',
    amount: 184.97,
    method: 'debit_card',
    status: 'completed',
    date: '2024-01-22',
  },
];
