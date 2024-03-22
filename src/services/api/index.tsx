import { create, ApiResponse } from 'apisauce';
import Cookies from 'js-cookie';

const api = create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  headers: {
    Accept: 'application/json',
    'Accept-Language': 'en',
  },
});

const authString = Cookies.get("auth");
if (authString) {
  const auth = JSON.parse(authString);
  api.setHeader('Authorization', `Bearer ${auth.accessToken}`);
}

export default api;

type TUserRole = 'admin' | 'user';
type TUser = {
  deviceId: string | null,
  email: string,
  firstName: string,
  lang: string,
  lastName: string,
  phone: string,
  role: TUserRole,
  serId: string,
}
type TSignInResponse = {
  data: {
    user: TUser,
    onboarding: boolean;
    accessToken: string;
  }
};
// Admin phone number: +380661630553
export const signIn = ({ phone }: { phone: string }): Promise<ApiResponse<TSignInResponse, {}>> =>
  api.post('/api/auth/login-confirm-otp', {
    phone,
    skip: true,
    code: '0000',
  });

export const getUsers = (): Promise<ApiResponse<TUser[]>> =>
  api.get('/api/user/list');
