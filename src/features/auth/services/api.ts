// services/api.ts
import { httpClient } from "../../../lib/axios"; // تأكد أن baseURL = https://api.escuelajs.co/api/v1
import { userStorage } from "./../storage";

// ===== Types =====
export type LoginFormInput = { email: string; password: string };
export type SignUpFormInput = {
  name: string;
  email: string;
  password: string;
  avatar?: string;
};

type LoginResponse = { access_token: string; refresh_token: string };

export type Profile = {
  id: number;
  name: string;
  email: string;
  avatar: string;
  role: string;
  creationAt?: string;
  updatedAt?: string;
};

export type AuthResult = { user: Profile; token: string };

class AuthServices {
  private static readonly USERS = "/users";
  private static readonly LOGIN = "/auth/login";
  private static readonly PROFILE = "/auth/profile";

  private static normalizeEmail(v: string) {
    return v.trim().toLowerCase();
  }

  /** Create user (Platzi requires avatar), then auto-login */
  static async signUp(input: SignUpFormInput): Promise<AuthResult> {
    const payload = {
      ...input,
      email: this.normalizeEmail(input.email),
      avatar: input.avatar ?? "https://picsum.photos/800", // API requires avatar
    };

    // 1) create user
    await httpClient.post(this.USERS, payload);

    // 2) login
    const { access_token } = await this.loginViaAuth({
      email: payload.email,
      password: payload.password,
    });

    userStorage.set(access_token);

    // 3) fetch profile with the fresh token
    const me = await this.fetchProfile(access_token);
    return { user: me, token: access_token };
  }

  /** Login -> store token -> fetch /auth/profile */
  static async login(input: LoginFormInput): Promise<AuthResult> {
    const { access_token } = await this.loginViaAuth({
      email: this.normalizeEmail(input.email),
      password: input.password,
    });

    userStorage.set(access_token);

    const me = await this.fetchProfile(access_token);
    return { user: me, token: access_token };
  }

  /** Get me using token in storage (if any) */
  static async getMe(): Promise<Profile | null> {
    const token = userStorage.get();
    if (!token) return null;

    try {
      return await this.fetchProfile(token);
    } catch {
      userStorage.remove();
      return null;
    }
  }

  static async logout() {
    userStorage.remove();
  }

  // ===== Helpers =====
  private static async loginViaAuth(
    creds: LoginFormInput
  ): Promise<LoginResponse> {
    const { data } = await httpClient.post<LoginResponse>(this.LOGIN, creds);
    return data;
  }

  private static async fetchProfile(token: string): Promise<Profile> {
    const { data } = await httpClient.get<Profile>(this.PROFILE, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  }
}

export default AuthServices;
