import { User } from '@/interfaces/user.interface';

export type ActionUserType = { type: 'SET'; payload: User } | { type: 'RESET' };
