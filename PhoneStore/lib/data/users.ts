import { User } from '@/types';

// In-memory user store (in production, use a database)
let users: User[] = [
  {
    id: 1,
    name: 'Admin',
    email: 'admin@phonestore.vn',
    phone: '0909123456',
    password: '$2b$10$dEMREfMqQTTcihz.DUqhfeAGpjqOtMTRKXftl2HO2ITC5.k3wpqS.', // admin123
    role: 'admin',
    avatar: undefined,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 2,
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@email.com',
    phone: '0909123457',
    password: '$2b$10$0KFpYT5Hrh9Pt1uTzj87guF7sT5l2ajbDZZdpBR.5ORe89l33vNti', // password123
    role: 'user',
    avatar: undefined,
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
];

let nextId = 3;

export function getAllUsers(): User[] {
  return users.map(({ password, ...user }) => user);
}

export function findUserById(id: number): User | undefined {
  return users.find((u) => u.id === id);
}

export function findUserByPhone(phone: string): User | undefined {
  return users.find((u) => u.phone === phone);
}

export function findUserByEmail(email: string): User | undefined {
  return users.find((u) => u.email === email);
}

export function createUser(data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): User {
  const user: User = {
    ...data,
    id: nextId++,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  users.push(user);
  return user;
}

export function updateUser(id: number, data: Partial<User>): User | undefined {
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return undefined;
  
  users[index] = {
    ...users[index],
    ...data,
    updatedAt: new Date().toISOString(),
  };
  return users[index];
}

export function deleteUser(id: number): boolean {
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return false;
  
  users.splice(index, 1);
  return true;
}
