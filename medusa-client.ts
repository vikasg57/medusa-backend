import Medusa from "@medusajs/medusa-js";
import { loadEnv, defineConfig } from "@medusajs/framework/utils";

// Load environment variables
loadEnv(process.env.NODE_ENV || "development", process.cwd());

// Environment variables
const MEDUSA_BACKEND_URL = process.env.MEDUSA_BACKEND_URL || "http://localhost:9000";
const publishableApiKey = process.env.PUBLISHABLE_API_KEY;
const apiKey = process.env.MEDUSA_API_KEY

// Initialize Medusa client
const medusa_client = new Medusa({
  baseUrl: MEDUSA_BACKEND_URL,
  publishableApiKey : publishableApiKey,
  maxRetries: 3,
  apiKey:apiKey
});

// Export the initialized client
export default medusa_client;
