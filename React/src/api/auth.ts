import type { UserData } from '../types';
import defaultUser from '../utils/default-user';

export interface AuthResponse {
  isOk: boolean;
  data?: UserData;
  message?: string;
}

const requestDelay = 300;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function signIn(_email: string, _password: string): Promise<AuthResponse> {
  try {
    const request = new Promise<AuthResponse>((resolve) => {
      setTimeout(() => {
        resolve({
          isOk: true,
          data: defaultUser,
        });
      }, requestDelay);
    });
    return await request;
  } catch {
    return {
      isOk: false,
      message: 'Authentication failed',
    };
  }
}

export async function getUser(): Promise<AuthResponse> {
  try {
    const request = new Promise<AuthResponse>((resolve) => {
      setTimeout(() => {
        resolve({
          isOk: true,
          data: defaultUser,
        });
      }, requestDelay);
    });
    return await request;
  } catch {
    return { isOk: false };
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function createAccount(_email: string, _password: string): Promise<AuthResponse> {
  try {
    const request = new Promise<AuthResponse>((resolve) => {
      setTimeout(() => {
        resolve({ isOk: true });
      }, requestDelay);
    });
    return await request;
  } catch {
    return {
      isOk: false,
      message: 'Failed to create account',
    };
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function changePassword(_email: string, _recoveryCode: string): Promise<AuthResponse> {
  try {
    const request = new Promise<AuthResponse>((resolve) => {
      setTimeout(() => {
        resolve({ isOk: true });
      }, requestDelay);
    });
    return await request;
  } catch {
    return {
      isOk: false,
      message: 'Failed to change password',
    };
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function resetPassword(_email: string): Promise<AuthResponse> {
  try {
    const request = new Promise<AuthResponse>((resolve) => {
      setTimeout(() => {
        resolve({ isOk: true });
      }, requestDelay);
    });
    return await request;
  } catch {
    return {
      isOk: false,
      message: 'Failed to reset password',
    };
  }
}
