export interface UserData {
  email: string;
  avatarUrl: string;
}

export interface AuthResponse {
  isOk: boolean;
  data?: UserData;
  message?: string;
}

const requestDelay = 300;

const defaultUser: UserData = {
  email: 'sandra@example.com',
  avatarUrl: 'https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/employees/06.png'
};

export type AuthModule = {
  _user?: UserData;
  loggedIn(): boolean;
  logIn(email: string, password: string): Promise<AuthResponse>;
  logOut(): Promise<void>;
  getUser(): Promise<AuthResponse>;
  resetPassword(email: string): Promise<AuthResponse>;
  changePassword(email: string, recoveryCode: string): Promise<AuthResponse>;
  createAccount(email: string, password: string): Promise<AuthResponse>;
};

const authModule: AuthModule = {
  _user: defaultUser,
  loggedIn(): boolean {
    return !!this._user;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async logIn(email: string, password: string): Promise<AuthResponse> {
    try {
      const request = new Promise<AuthResponse>((resolve) => {
        setTimeout(() => {
          this._user = { ...defaultUser, email };
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
  },

  async logOut() {
    this._user = undefined;
  },

  async getUser(): Promise<AuthResponse> {
    try {
      const request = new Promise<AuthResponse>((resolve) => {
        setTimeout(() => {
          resolve({
            isOk: true,
            data: this._user,
          });
        }, requestDelay);
      });
      return await request;
    } catch {
      return { isOk: false };
    }
  },

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
  },
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
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async createAccount(email: string, password: string): Promise<AuthResponse> {
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
  },
};

export default authModule;
