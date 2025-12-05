import { ProductUser } from "./user.interface";

export interface AuthResponse {
  token: string;
  user: ProductUser;
}

