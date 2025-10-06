// httpClient.ts
import axios from "axios";
import type { AxiosError } from "axios";
import { toast } from "react-toastify";

// ===== Base URL (env + fallback) =====
const BASE_URL =
  import.meta.env.VITE_BASE_URL || "https://api.escuelajs.co/api/v1";

// ===== Axios instance =====
export const httpClient = axios.create({
  baseURL: BASE_URL,
});

// ===== رسائل للأكواد الشائعة =====
const STATUS_MESSAGE: Record<number, string> = {
  401: "You are not authorized to access this resource",
  403: "You do not have permission to access this resource",
  404: "The requested resource was not found",
  500: "An internal server error occurred",
};

// لمنع حلقات 401 المتتالية
let isHandling401 = false;

// هل نحن على المتصفح؟
const hasWindow = typeof window !== "undefined";

// جلب التوكن من التخزين بشكل آمن (يدعم SSR)
function getToken(): string | null {
  if (!hasWindow) return null;
  try {
    return localStorage.getItem("token");
  } catch {
    return null;
  }
}

// هل هو نداء تسجيل الدخول؟
function isLoginUrl(url?: string | null): boolean {
  return Boolean(url && url.includes("/auth/login"));
}

/* =============== Request Interceptor (Typed) =============== */
httpClient.interceptors.request.use(
  (config) => {
    const token = getToken();

    // لا تغيّر الـ Content-Type لو البيانات FormData
    const isFormData =
      hasWindow &&
      typeof FormData !== "undefined" &&
      config.data instanceof FormData;

    if (!isFormData && !config.headers["Content-Type"]) {
      config.headers["Content-Type"] = "application/json";
    }

    if (token && !config.headers["Authorization"]) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* =============== Response Interceptor (Typed) =============== */
httpClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // أخطاء شبكة / CORS
    if (!error.response) {
      toast.error("Network error. Please try again later.");
      return Promise.reject(error);
    }

    const { status } = error.response;
    const url = error.config?.url ?? "";
    const loginCall = isLoginUrl(url);

    if (status === 401) {
      // لو خطأ على /auth/login خلي الـUI يتصرف
      if (loginCall) return Promise.reject(error);

      if (!isHandling401) {
        isHandling401 = true;

        // امسح التوكن
        if (hasWindow) {
          try {
            localStorage.removeItem("token");
          } catch (e) {
            console.error("Failed to remove token from localStorage", e);
          }
        }

        toast.error(STATUS_MESSAGE[401] ?? "Unauthorized");

        // يفضّل التوجيه لصفحة الدخول بدل reload لتجنّب loop:
        // window.location.assign("/login");
        // أو reload مرة وحدة إن ما عندك راوتر:
        // window.location.reload();

        setTimeout(() => {
          isHandling401 = false;
        }, 0);
      }

      return Promise.reject(error);
    }

    const msg = STATUS_MESSAGE[status] ?? "An unexpected error occurred";
    if (!loginCall) toast.error(msg);

    return Promise.reject(error);
  }
);

/* =============== Optional: ضبط الهيدر يدويًا =============== */
export function setAuthHeader(token?: string) {
  if (token) {
    httpClient.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete httpClient.defaults.headers.common.Authorization;
  }
}
