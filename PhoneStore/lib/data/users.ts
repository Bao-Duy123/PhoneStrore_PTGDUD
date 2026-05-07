import { User } from '@/types';

let users: User[] = [
  {
    id: 1,
    name: 'Admin',
    email: 'admin@phonestore.vn',
    phone: '0909123456',
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
    role: 'user',
    avatar: undefined,
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
];

export const usersWithPasswords: Array<User & { password: string }> = [
  {
    ...users[0],
    password: '$2b$10$dEMREfMqQTTcihz.DUqhfeAGpjqOtMTRKXftl2HO2ITC5.k3wpqS.',
  },
  {
    ...users[1],
    password: '$2b$10$0KFpYT5Hrh9Pt1uTzj87guF7sT5l2ajbDZZdpBR.5ORe89l33vNti',
  },
];

export function findUserById(id: number) {
  return users.find((u) => u.id === id);
}

export function findUserByPhone(phone: string) {
  return usersWithPasswords.find((u) => u.phone === phone);
}

export function findUserByEmail(email: string) {
  return users.find((u) => u.email === email);
}

export function createUser(data: Omit<User, 'id' | 'createdAt' | 'updatedAt'> & { password: string }): User & { password: string } {
  const newUser = {
    ...data,
    id: users.length + 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  usersWithPasswords.push(newUser);
  return newUser;
}
