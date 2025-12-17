# Quick Setup Guide

## Step-by-Step Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Create .env File
Create a `.env` file in the root directory with:
```env
MONGODB_URI=your-mongodb-atlas-connection-string
PORT=3000
```

### 3. Add Logo (Optional)
- Place your logo at: `public/images/logo-placeholder.png`
- Or keep the SVG placeholder at: `public/images/logo-placeholder.svg`
- The app will use the SVG by default

### 4. Seed Database (Optional)
```bash
npm run seed
```

### 5. Start Server
```bash
npm start
```

### 6. Open Browser
Navigate to: `http://localhost:3000`

## MongoDB Atlas Setup

1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a free cluster (M0)
3. Create database user (save username/password)
4. Whitelist IP address (or allow from anywhere for development)
5. Get connection string from "Connect" → "Connect your application"
6. Replace `<password>` in connection string with your actual password

## Troubleshooting

- **Can't connect to MongoDB?** Check your `.env` file and MongoDB Atlas settings
- **Port in use?** Change PORT in `.env` to another number (e.g., 3001)
- **Logo not showing?** Ensure file exists at `public/images/logo-placeholder.svg` or `.png`

