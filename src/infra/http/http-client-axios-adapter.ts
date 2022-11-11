import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

import { HttpResponse, HttpClient, HttpMethods } from "@/data/contracts";

export class HttpClientAxiosAdapter implements HttpClient {
  private httpClient: AxiosInstance;
  constructor (private readonly baseURL?: string, private readonly params?: Record<string, unknown>) {
    this.httpClient = axios.create({
      baseURL: this.baseURL ?? "https://gateway.marvel.com:443/v1/public",
      params: this.params ?? {
        apikey: process.env.VITE_APP_MARVEL_PUBLIC_KEY,
        hash: process.env.VITE_APP_MARVEL_MD5_HASH
      }
    });
  }

  async request<T = any>(url: string, method: HttpMethods, options?: AxiosRequestConfig): Promise<HttpResponse> {
    const result = await this.httpClient.request<T>({
      url,
      method,
      ...options,
    });

    return {
      statusCode: result.status,
      data: result.data,
    };
  }
}