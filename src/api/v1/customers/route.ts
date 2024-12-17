import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import getUserFromJwt from "src/api/validate-user";
const axios = require('axios');

const publishableApiKey = process.env.PUBLISHABLE_API_KEY
// Utility function for extracting token from headers
const extractToken = (authHeader: string | undefined): string | null => {
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.split(" ")[1];
  }
  return null;
};

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  try {
    const authHeader = req.headers.authorization;
    const token = extractToken(authHeader);

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized: Missing or invalid token",
      });
    }

    const isValid = await getUserFromJwt(token);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid token" });
    }

    return res.status(200).json({ message: "Token is valid" });
  } catch (error) {
    console.error("Error validating token:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  try {
    const authHeader = req.headers.authorization;
    const token = extractToken(authHeader);

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized: Missing or invalid token",
      });
    }

    const isValid = await getUserFromJwt(token);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // Validate and type `req.body`
    const body = req.body as Partial<{
      first_name: string;
      last_name: string;
      email: string;
      password: string;
    }>;

    const { first_name, last_name, email, password } = body;

    // Ensure required fields are present
    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Create customer in Medusa
    const customer = await createCustomer(first_name, last_name, email, password);

    console.log(customer)

    return res.status(201).json({
      message: "Customer created successfully",
      customer,
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Function to create a new customer in Medusa
const createCustomer = async (first_name, last_name, email, password) => {
  const backendUrl = "http://localhost:9000"; // Replace with your Medusa backend URL

  const customerData = {
    first_name,
    last_name,
    email,
    password,
  };

  try {
    const response = await axios.post(
      `${backendUrl}/store/customers`,
      customerData,
      {
        headers: {
          "Content-Type": "application/json",
          "x-publishable-api-key": publishableApiKey, // Include the publishable API key
        },
      }
    );

    console.log("Customer created successfully:", response.data);
  } catch (error) {
    if (error.response) {
      // The server responded with a status code outside the 2xx range
      console.error("Error creating customer:", error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received:", error.request);
    } else {
      // Something else went wrong during setup
      console.error("Error setting up request:", error.message);
    }
  }
};
