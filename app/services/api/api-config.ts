// Use this import if you want to use "env.js" file
const { API_URL, API_KEY } = require("../../config/env")

/**
 * The options used to configure the API.
 */
export interface ApiConfig {
  /**
   * The URL of the api.
   */
  url: string

  /**
   * Milliseconds before we timeout the request.
   */
  timeout: number

  /**
   * Api key
   */
  apiKey: string
}

/**
 * The default configuration for the app.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: API_URL || "https://jsonplaceholder.typicode.com",
  apiKey: API_KEY || '',
  timeout: 10000,
}
