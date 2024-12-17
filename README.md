# Medusa E-commerce Application

This README provides detailed instructions for setting up and running your Medusa e-commerce application locally.

## Prerequisites

Ensure you have the following installed on your system:

- **Node.js** (version 16 or higher): [Download and install Node.js](https://nodejs.org/)
- **Yarn** (preferred package manager): Install using `npm install -g yarn`
- **PostgreSQL**: [Install PostgreSQL](https://www.postgresql.org/)

## Steps to Get Started

### 1. Clone the Repository
```bash
git clone https://github.com/vikasg57/medusa-backend.git
cd medusa-app
```

### 2. Install Dependencies
```bash
yarn install
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory and configure the following environment variables:

```env
MEDUSA_ADMIN_ONBOARDING_TYPE=default
STORE_CORS=http://localhost:8000,https://docs.medusajs.com
ADMIN_CORS=http://localhost:5173,http://localhost:9000,https://docs.medusajs.com
AUTH_CORS=http://localhost:5173,http://localhost:9000,https://docs.medusajs.com
REDIS_URL=redis://localhost:6379
JWT_SECRET=supersecret
COOKIE_SECRET=supersecret
DATABASE_URL=DATABASE_URL
SUPABASE_KEY=SUPABASE_KEY
SUPABASE_URL=SUPABASE_URL
PUBLISHABLE_API_KEY=PUBLISHABLE_API_KEY
MEDUSA_API_KEY=MEDUSA_API_KEY
MEDUSA_BACKEND_URL=http://localhost:9000
```

### 4. Run Migrations

Initialize the database by running migrations:
```bash
yarn medusa migrations run
```

### 5. Create Medusa Admin User

```bash
npx medusa user -e admin@medusajs.com -p supersecret
```


### 6. Seed the Database (Optional)

You can seed the database with demo data for testing:
```bash
yarn medusa seed -f ./data/seed.json
```

### 7. Start the Medusa Server
```bash
yarn start
```
The server should now be running at `http://localhost:9000`.

### 7. Testing the Application

#### Verify Backend
- Open your browser and navigate to `http://localhost:9000/store/products` to confirm the backend is running correctly.

#### Create a Customer Using Curl
```bash
curl -X POST 'http://localhost:9000/store/customers' \  
-H 'Content-Type: application/json' \  
-H 'x-publishable-api-key: your-publishable-api-key' \  
--data-raw '{  
    "first_name": "John",  
    "last_name": "Doe",  
    "email": "johndoe@example.com",  
    "password": "yourpassword"  
}'
```
## Troubleshooting

### Common Issues

1. **401 Unauthorized**:
   - Ensure the `x-publishable-api-key` header is correctly set.
   - Verify the API key in the Medusa Admin dashboard.

2. **Database Connection Errors**:
   - Confirm your `DATABASE_URL` is correctly configured.
   - Check that PostgreSQL is running.

3. **Redis Errors**:
   - If Redis is not used, ensure to remove or comment out the `REDIS_URL` variable in your `.env` file.

### Logs and Debugging

Run the server in debug mode for detailed logs:
```bash
DEBUG=medusa:* yarn start
```

## Additional Resources

- [Medusa Documentation](https://docs.medusajs.com/)
- [GitHub Repository](https://github.com/medusajs/medusa)
- [Medusa Discord Community](https://discord.com/invite/medusajs)

Happy coding with Medusa! 🚀
