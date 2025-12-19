import { ClientJS } from 'clientjs';
import { getToken } from './getToken';
import { store } from '../store';
import { setError } from '../store/slices/requestsSlice';

// Get baseURL from environment variable
// Parcel replaces process.env variables at build time from .env file
// Must use direct static access for Parcel to replace it at build time
// @ts-ignore - process.env is replaced by Parcel at build time
const baseURL = process.env.REACT_APP_API_URL || process.env.API_URL || '';

const getBaseURL = (): string => {
  return baseURL;
};

interface RequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: any;
  headers?: Record<string, string>;
}

const getDefaultHeaders = (): Record<string, string> => {
  const pageId = `${window.location.hostname}${window.location.pathname}`;
  const client = new ClientJS();
  const fingerprint = client.getFingerprint().toString();
  const token = getToken();

  return {
    'Content-Type': 'application/json',
    fingerprint,
    ...(token ? { token } : {})
  };
};

const handleError = (response: Response): never => {
  let errorMessage = 'Something went wrong!';
  let errorCode: string | undefined;

  const status = response.status;
  errorCode = `HTTP_${status}`;

  // Handle specific status codes
  switch (status) {
    case 401:
      errorMessage = 'Unauthorized. Please check your credentials.';
      break;
    case 403:
      errorMessage = 'Access forbidden.';
      break;
    case 404:
      errorMessage = 'Resource not found.';
      break;
    case 500:
      errorMessage = 'Internal server error. Please try again later.';
      break;
    case 503:
      errorMessage = 'Service unavailable. Please try again later.';
      break;
    default:
      errorMessage = `Server error (${status})`;
  }

  store.dispatch(
    setError({
      message: errorMessage,
      code: errorCode
    })
  );

  throw new Error(errorMessage);
};

const handleNetworkError = (error: Error): never => {
  const errorCode = 'NETWORK_ERROR';
  const errorMessage = 'Network error. Please check your connection.';

  store.dispatch(
    setError({
      message: errorMessage,
      code: errorCode
    })
  );

  throw error;
};

export const apiRequest = async <T = any>(
  endpoint: string,
  config: RequestConfig = {}
): Promise<T> => {
  const { method = 'GET', body, headers = {} } = config;

  const apiBaseURL = getBaseURL();
  const url = `${apiBaseURL}${endpoint}`;
  const defaultHeaders = getDefaultHeaders();
  const mergedHeaders = { ...defaultHeaders, ...headers };

  // Add pageId to body for POST/PUT/PATCH requests (not for GET/DELETE)
  const pageId = `${window.location.hostname}${window.location.pathname}`;
  const requestBody = body && (method === 'POST' || method === 'PUT' || method === 'PATCH')
    ? JSON.stringify({ ...body, pageId })
    : undefined;

  try {
    const response = await fetch(url, {
      method,
      headers: mergedHeaders,
      body: requestBody,
    });

    if (!response.ok) {
      try {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          const errorMessage =
            errorData.message || errorData.error || errorData || `Server error (${response.status})`;
          store.dispatch(
            setError({
              message: errorMessage,
              code: `HTTP_${response.status}`
            })
          );
          throw new Error(errorMessage);
        } else {
          // If not JSON, use status-based error
          return handleError(response);
        }
      } catch (parseError) {
        // If JSON parsing fails, use status-based error
        return handleError(response);
      }
    }

    // Handle empty responses
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return {} as T;
    }

    const data = await response.json();
    return data as T;
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return handleNetworkError(error);
    }
    throw error;
  }
};

// Convenience methods
export const apiGet = <T = any>(endpoint: string, headers?: Record<string, string>) =>
  apiRequest<T>(endpoint, { method: 'GET', headers });

export const apiPost = <T = any>(endpoint: string, body?: any, headers?: Record<string, string>) =>
  apiRequest<T>(endpoint, { method: 'POST', body, headers });

export const apiPut = <T = any>(endpoint: string, body?: any, headers?: Record<string, string>) =>
  apiRequest<T>(endpoint, { method: 'PUT', body, headers });

export const apiDelete = <T = any>(endpoint: string, headers?: Record<string, string>) =>
  apiRequest<T>(endpoint, { method: 'DELETE', headers });
