const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

type RequestOptions = {
    method?: string;
    body?: unknown;
    headers?: Record<string, string>;
};

/**
 * Fetch wrapper that automatically attaches JWT and handles JSON.
 */
export async function apiClient<T = unknown>(
    endpoint: string,
    options: RequestOptions = {}
): Promise<T> {
    const { method = "GET", body, headers = {} } = options;

    const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;

    const config: RequestInit = {
        method,
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...headers,
        },
    };

    if (body) {
        config.body = JSON.stringify(body);
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
        if (response.status === 401 || (response.status === 404 && data.message === 'User not found')) {
            if (typeof window !== "undefined") {
                localStorage.removeItem("token");
                window.location.href = "/login";
            }
        }
        throw new Error(data.message || "API request failed");
    }

    return data;
}

export const api = {
    get: <T>(endpoint: string) => apiClient<T>(endpoint),
    post: <T>(endpoint: string, body: unknown) =>
        apiClient<T>(endpoint, { method: "POST", body }),
    put: <T>(endpoint: string, body: unknown) =>
        apiClient<T>(endpoint, { method: "PUT", body }),
    patch: <T>(endpoint: string, body?: unknown) =>
        apiClient<T>(endpoint, { method: "PATCH", body }),
    delete: <T>(endpoint: string) =>
        apiClient<T>(endpoint, { method: "DELETE" }),
};
