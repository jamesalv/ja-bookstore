export interface User {
  id: number;
  username: string;
  email: string;
}

export interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  price: number;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginResponse {
  result: AuthResponse;
}