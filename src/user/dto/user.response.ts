import { User } from '../user.schema';

export type UserResponse = Omit<User, 'password'> & { token: string };
