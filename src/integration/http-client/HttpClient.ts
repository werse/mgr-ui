import type { PathVariable, QueryParams, RequestOptions } from '@/types/api';

// const GATEWAY_URL = 'http://localhost:8000';
const GATEWAY_URL = 'https://folio-etesting-snapshot-kong.ci.folio.org';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

class HttpClient {

  /**
   * GET request
   */
  async get<T = unknown>(endpoint: string, requestOptions: RequestOptions = {}): Promise<T> {
    return this.request<T>(GATEWAY_URL, 'GET', endpoint, requestOptions);
  }

  /**
   * GET request
   */
  async getAbs<T = unknown>(baseUrl: string, endpoint: string, requestOptions: RequestOptions = {}): Promise<T> {
    return this.request<T>(baseUrl, 'GET', endpoint, requestOptions);
  }

  /**
   * POST request
   */
  async post<T = unknown>(endpoint: string, requestOptions: RequestOptions = {}): Promise<T> {
    return this.request<T>(GATEWAY_URL, 'POST', endpoint, requestOptions);
  }

  /**
   * DELETE request
   */
  async delete<T = unknown>(endpoint: string, requestOptions: RequestOptions = {}): Promise<T> {
    return this.request<T>(GATEWAY_URL, 'DELETE', endpoint, requestOptions);
  }

  /**
   * PUT request
   */
  async put<T = unknown>(endpoint: string, requestOptions: RequestOptions): Promise<T> {
    return this.request<T>(GATEWAY_URL, 'PUT', endpoint, requestOptions);
  }

  /**
   * PATCH request
   */
  async patch<T = unknown>(endpoint: string, requestOptions: RequestOptions = {}): Promise<T> {
    return this.request<T>(GATEWAY_URL, 'PATCH', endpoint, requestOptions);
  }

  /**
   * Generic request method
   */
  private async request<T = unknown>(
    baseUrl: string,
    method: HttpMethod,
    endpoint: string,
    options: RequestOptions = {},
  ): Promise<T> {
    const { pathVariables = [], queryParams = {}, body = null, headers = {} } = options;

    try {
      const url = this.buildURL(baseUrl, endpoint, pathVariables, queryParams);

      const requestOptions: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        signal: AbortSignal.timeout(60000)
      };

      if (body) {
        requestOptions.body = JSON.stringify(body);
      }

      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        return Promise.reject(response);
      }

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
    baseUrl: string,
    endpoint: string,
    pathVariables: PathVariable[] = [],
    queryParams: QueryParams = {},
  ): string {
    let url = `${baseUrl}${endpoint}`;

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

export const httpClient = new HttpClient();
