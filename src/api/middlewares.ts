import { defineMiddlewares, MedusaNextFunction, MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import axios from "axios";
import getUserFromJwt from 'src/api/validate-user'

export default defineMiddlewares({
  routes: [
    {
      // Apply this middleware to all routes starting with /protected
      matcher: "/v1*",
      middlewares: [
        async (req: MedusaRequest, res: MedusaResponse, next: MedusaNextFunction) => {
          try {
            const authHeader = req.headers.authorization

            // Check for the presence of the Authorization header
            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                return res.status(401).json({
                message: "Unauthorized: Missing or invalid token",
                });
            }

            if (!authHeader) {
                return res.status(401).json({ error: "Missing or invalid authorization header" });
              }

            const token = authHeader.split(" ")[1];

            // Verify the token with Supabase

            const isValid = await getUserFromJwt(token);

            if (!isValid) {
                return res.status(401).json({ message: "Invalid token" });
            }

            // Attach the user info to the request for further processing

            next(); // Token is valid, proceed to the next handler
          } catch (error) {
            console.error("Token verification failed:", error.message);
            return res.status(500).json({ error: "Internal server error during token verification" });
          }
        },
      ],
    },
  ],
});
