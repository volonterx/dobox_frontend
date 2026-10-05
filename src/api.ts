const API_URL = import.meta.env.VITE_API_URL

export interface Item {
  id: number
  title: string
  completed: boolean
  created_at: string
  updated_at: string
}

export interface User {
  id: string,
  email: string
  name: string | null
  is_active: boolean
  is_superuser: boolean
  is_verified: boolean
}

export interface GoogleAuth {
  authorization_url: string
}

export class ApiError extends Error {
  constructor(public status: number, message:string) { super(message) }
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    credentials: 'include',
    ...init,
    headers: {
      ...(init.body ? { 'Content-Type': 'application/json' } : {}),
      ...init.headers,
    },
  })
  if (!res.ok) throw new ApiError(res.status, res.statusText)
  return (res.status === 204 ? undefined : await res.json()) as T
}

export async function fetchMe(): Promise<User | null> {
  try {
    return await request<User>('/users/me')
  } catch (e) {
    if (e instanceof ApiError && e.status === 401) return null
    throw e
  }
}

export async function getGoogleAuthUrl(): Promise<string> {
  const { authorization_url } = await request<GoogleAuth>('/auth/google/authorize')
  return authorization_url
}

export const logOut = () => request<void>('/auth/logout/', {method: 'POST'})

export const fetchItems = () => request<Item[]>('/items/')

export const createItem = (title: string) =>
  request<Item>('/items/', { method: 'POST', body: JSON.stringify({ title, completed: false }) })

export const handleItemCompleted = (item: Item) =>
  request<Item>(`/items/${item.id}`, { method: 'PUT', body: JSON.stringify({ completed: !item.completed }) })
