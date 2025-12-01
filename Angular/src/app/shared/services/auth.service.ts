import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';

export interface UserData {
  email: string;
  avatarUrl?: string;
}

export interface AuthResponse {
  isOk: boolean;
  data?: UserData;
  message?: string;
}

const defaultUser: UserData = {
  email: 'sandra@example.com',
  avatarUrl: 'https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/employees/06.png',
};

const requestDelay = 300;

const defaultPath = '/';

@Injectable()
export class AuthService {
  private _user?: UserData = defaultUser;

  get loggedIn(): boolean {
    return !!this._user;
  }

  private _lastAuthenticatedPath: string = defaultPath;

  set lastAuthenticatedPath(value: string) {
    this._lastAuthenticatedPath = value;
  }

  constructor(private readonly router: Router) { }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async logIn(email: string, password: string): Promise<AuthResponse> {
    try {
      const request = new Promise<AuthResponse>((resolve) => {
        setTimeout(() => {
          this._user = { ...defaultUser, email };
          this.router.navigate([this._lastAuthenticatedPath]).catch(() => { });
          resolve({
            isOk: true,
            data: this._user,
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

  async getUser(): Promise<AuthResponse> {
    try {
      const request = new Promise<AuthResponse>((resolve) => {
        setTimeout(() => {
          resolve({
            isOk: true,
            data: this._user,
          });
          this.router.navigate([this._lastAuthenticatedPath]).catch(() => {});
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async createAccount(email: string, password: string): Promise<AuthResponse> {
    try {
      const request = new Promise<AuthResponse>((resolve) => {
        setTimeout(() => {
          resolve({ isOk: true });
          this.router.navigate(['/create-account']).catch(() => {});
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
  async changePassword(email: string, recoveryCode: string): Promise<AuthResponse> {
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
  async resetPassword(email: string): Promise<AuthResponse> {
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

  logOut(): void {
    this._user = undefined;
    this.router.navigate(['/login-form']).catch(() => {});
  }
}

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private readonly router: Router, private readonly authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isLoggedIn = this.authService.loggedIn;
    const isAuthForm = [
      'login-form',
      'reset-password',
      'create-account',
      'change-password/:recoveryCode',
    ].includes(route.routeConfig?.path ?? defaultPath);

    if (isLoggedIn && isAuthForm) {
      this.authService.lastAuthenticatedPath = defaultPath;
      this.router.navigate([defaultPath]).catch(() => {});
      return false;
    }

    if (!isLoggedIn && !isAuthForm) {
      this.router.navigate(['/login-form']).catch(() => {});
    }

    if (isLoggedIn) {
      this.authService.lastAuthenticatedPath = route.routeConfig?.path ?? defaultPath;
    }

    return isLoggedIn || isAuthForm;
  }
}
