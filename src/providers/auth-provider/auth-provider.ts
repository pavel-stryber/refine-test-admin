"use client";

import { AuthBindings } from "@refinedev/core";
import Cookies from "js-cookie";
import * as apiRequests from '../../services/api';

export const authProvider: AuthBindings = {
  login: async ({ email }) => {
    const res = await apiRequests.signIn({
      phone: email,
    });
    if (res.ok) {
      Cookies.set("auth", JSON.stringify(res.data?.data), {
        expires: 30, // 30 days
        path: "/",
      });
      return {
        success: true,
        redirectTo: "/",
      };
    }

    return {
      success: false,
      error: {
        name: "LoginError",
        message: "Invalid username or password",
      },
    };
  },
  logout: async () => {
    Cookies.remove("auth", { path: "/" });
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  check: async () => {
    const authString = Cookies.get("auth");
    if (authString) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      logout: true,
      redirectTo: "/login",
    };
  },
  getPermissions: async () => {
    const authString = Cookies.get("auth");
    if (authString) {
      const auth = JSON.parse(authString);
      return auth.user.role;
    }
    return null;
  },
  getIdentity: async () => {
    const authString = Cookies.get("auth");
    if (authString) {
      const auth = JSON.parse(authString);
      return auth.user;
    }
    return null;
  },
  onError: async (error) => {
    if (error.response?.status === 401) {
      return {
        logout: true,
      };
    }

    return { error };
  },
};
