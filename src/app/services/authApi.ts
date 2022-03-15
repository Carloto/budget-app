import { baseUrl } from '.';

export interface User {
  name: string;
  email: string;
}

export async function signInUser(
  email: string,
  password: string
): Promise<User> {
  const res = await fetch(`${baseUrl}/sessao/criar`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, senha: password }),
  });
  return handleResponse(res);
}

export async function logoutUser(): Promise<User> {
  const res = await fetch(`${baseUrl}/sessao/finalizar`, {
    method: 'POST',
    credentials: 'include',
  });
  return handleResponse(res);
}

export async function getUser(): Promise<User> {
  const res = await fetch(`${baseUrl}/sessao/usuario`, {
    credentials: 'include',
  });
  return handleResponse(res);
}

async function handleResponse<Type>(res: Response): Promise<Type> {
  if (res.ok) {
    return await res.json();
  } else {
    throw new Error(res.statusText);
  }
}
