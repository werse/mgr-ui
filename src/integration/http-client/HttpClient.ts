import type { PathVariable, QueryParams, RequestOptions } from '@/types/api';

const GATEWAY_URL = 'http://localhost:8000';
// const GATEWAY_URL = 'https://folio-etesting-snapshot-kong.ci.folio.org';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

class HttpClient {
  private readonly baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  /**
   * GET request
   */
  async get<T = unknown>(endpoint: string, requestOptions: RequestOptions = {}): Promise<T> {
    return this.request<T>('GET', endpoint, requestOptions);
  }

  /**
   * POST request
   */
  async post<T = unknown>(endpoint: string, requestOptions: RequestOptions = {}): Promise<T> {
    return this.request<T>('POST', endpoint, requestOptions);
  }

  /**
   * DELETE request
   */
  async delete<T = unknown>(endpoint: string, requestOptions: RequestOptions = {}): Promise<T> {
    return this.request<T>('DELETE', endpoint, requestOptions);
  }

  /**
   * PUT request
   */
  async put<T = unknown>(endpoint: string, requestOptions: RequestOptions): Promise<T> {
    return this.request<T>('PUT', endpoint, requestOptions);
  }

  /**
   * PATCH request
   */
  async patch<T = unknown>(endpoint: string, requestOptions: RequestOptions = {}): Promise<T> {
    return this.request<T>('PATCH', endpoint, requestOptions);
  }

  /**
   * Generic request method
   */
  private async request<T = unknown>(
    method: HttpMethod,
    endpoint: string,
    options: RequestOptions = {},
  ): Promise<T> {
    const { pathVariables = [], queryParams = {}, body = null, headers = {} } = options;

    try {
      const url = this.buildURL(endpoint, pathVariables, queryParams);

      const requestOptions: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
      };

      if (body) {
        requestOptions.body = JSON.stringify(body);
      }

      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        return Promise.reject(response);
      }

      // Handle empty responses
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      }

      return Promise.reject(response);
    } catch (error) {
      console.error(`Error in ${method} ${endpoint}:`, error);
      throw error;
    }
  }

  /**
   * Build URL with path variables and query parameters
   */
  private buildURL(
    endpoint: string,
    pathVariables: PathVariable[] = [],
    queryParams: QueryParams = {},
  ): string {
    let url = `${this.baseURL}${endpoint}`;

    pathVariables.forEach((variable) => {
      url = url.replace(/\{[^}]+}/, String(variable));
    });

    const params = new URLSearchParams();
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        params.append(key, String(value));
      }
    });

    const queryString = params.toString();
    if (queryString) {
      url += `?${queryString}`;
    }

    return url;
  }
}

export const httpClient = new HttpClient(GATEWAY_URL);
