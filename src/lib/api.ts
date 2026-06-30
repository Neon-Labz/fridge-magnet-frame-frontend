/**
 * BUG FIX — Login "Failed to fetch" / ERR_CONNECTION_REFUSED
 *
 * ROOT CAUSE:
 *   The original code used NEXT_PUBLIC_API_URL ("http://localhost:5000/api/v1")
 *   as the base for ALL fetch calls, including client-side (browser) requests.
 *
 *   Browser fetches to "http://localhost:5000" bypass the Next.js dev server
 *   entirely — they hit the NestJS backend on port 5000 DIRECTLY.
 *   This causes two problems:
 *     1. ERR_CONNECTION_REFUSED: If the backend is slow to start (e.g. MongoDB
 *        reconnect loop), port 5000 refuses connections and the browser shows
 *        "Failed to fetch".
 *     2. CORS: Direct port-5000 requests must pass the NestJS CORS check;
 *        any misconfiguration blocks them silently.
 *
 *   The Next.js rewrites in next.config.ts (/api/v1/:path* → backend) only
 *   apply to requests that arrive at the Next.js server (port 3000). They
 *   are completely skipped when the browser calls port 5000 directly.
 *
 * FIX:
 *   Use a relative base URL ("/api/v1") for all client-side fetches.
 *   The browser sends requests to "http://localhost:3000/api/v1/..." which
 *   the Next.js dev server transparently proxies to the backend via rewrites.
 *   This eliminates both the CORS concern and the direct-port-5000 issue.
 *
 *   For Server Components / SSR (which run in Node.js, not the browser),
 *   relative URLs don't work — they need an absolute URL. Those calls use
 *   NEXT_BACKEND_URL (set in .env.local) which is a server-only variable.
 *   api.ts is only used from Client Components so the relative URL is correct.
 */
const API_BASE_URL = '/api/v1';

interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

interface LoginData {
  email: string
  password: string
}

interface RegisterData {
  fullName: string
  email: string
  password: string
}

interface ForgotPasswordData {
  email: string
}

type AuthResponseData = {
  token?: string
  user?: {
    id?: string
    fullName?: string
    email?: string
    role?: string
  }
}

class ApiClient {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${API_BASE_URL}${endpoint}`
      
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      })

      const contentType = response.headers.get('content-type') || ''
      const rawBody = contentType.includes('application/json')
        ? await response.json()
        : await response.text()

      const data =
        typeof rawBody === 'string'
          ? { message: rawBody.slice(0, 200) }
          : rawBody

      if (!response.ok) {
        return {
          success: false,
          error:
            data?.message ||
            data?.error ||
            `Request failed with status ${response.status}`,
        }
      }

      return {
        success: true,
        data,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error',
      }
    }
  }

  async login(credentials: LoginData): Promise<ApiResponse<AuthResponseData>> {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    })
  }

  async register(userData: RegisterData): Promise<ApiResponse<unknown>> {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    })
  }

  async forgotPassword(emailData: ForgotPasswordData): Promise<ApiResponse<unknown>> {
    return this.request('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify(emailData),
    })
  }

  async resetPassword(token: string, password: string): Promise<ApiResponse<unknown>> {
    return this.request('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, newPassword: password }),
    })
  }

  async logout(): Promise<ApiResponse<unknown>> {
    return this.request('/auth/logout', {
      method: 'POST',
    })
  }

  async getProfile(): Promise<ApiResponse<unknown>> {
    return this.request('/auth/profile', {
      method: 'GET',
    })
  }

  async getProducts(): Promise<ApiResponse<unknown>> {
    return this.request('/api/products?page=1&limit=1000', {
      method: 'GET',
    })
  }
}

export const apiClient = new ApiClient()
export type { ApiResponse, LoginData, RegisterData, ForgotPasswordData }
