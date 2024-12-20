import { AuthResponse, Book, LoginResponse } from '@/types';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const API_URL = 'http://192.168.0.104:3000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const login = async (username: string, password: string) => {
  const response = await api.post<LoginResponse>('/users/login', { username, password });
  return response.data;
};

export const register = async (username: string, email: string, password: string) => {
  const response = await api.post('/users/register', { username, email, password });
  return response.data;
};

export const getBooks = async (searchQuery?: string) => {
  const response = await api.get<Book[]>('/books', {
    params: { search: searchQuery },
  });
  return response.data;
};

export const addBook = async (bookData: Omit<Book, 'id'>) => {
  const response = await api.post('/books', bookData);
  return response.data;
};

export const deleteBook = async (id: number) => {
  const response = await api.delete(`/books/${id}`);
  return response.data;
};

export const getBookById = async (id: number) => {
  const response = await api.get<Book>(`/books/${id}`);
  return response.data;
};

export const updateBook = async (id: number, bookData: Partial<Book>) => {
  const response = await api.put(`/books/${id}`, bookData);
  return response.data;
};