import { User } from '../models/user.model';

// Decoded tokens type
export interface DecodedToken {
    id: User;
    iat: number; // Issued at (timestamp)
    exp: number; // Expiration time (timestamp)
  }