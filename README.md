# African Soccer Jersey Store

A full-stack web application for selling African soccer jerseys, built with Node.js, Express.js, Handlebars, and MongoDB Atlas.

## 🚀 Features

- **View All Jerseys**: Browse all available African soccer jerseys on the homepage
- **Jersey Details**: View detailed information about each jersey
- **Admin Panel**: Add, edit, and delete jerseys through an admin interface
- **Responsive Design**: Works on desktop and mobile devices

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MongoDB Atlas Account** - [Sign up here](https://www.mongodb.com/cloud/atlas) (free tier available)

## 🛠️ Installation

### Step 1: Clone or Download the Project

If you have the project files, navigate to the project directory:

```bash
cd new-bootcamp
```

### Step 2: Install Dependencies

Install all required npm packages:

```bash
npm install
```

This will install:
- `express` - Web framework for Node.js
- `mongoose` - MongoDB object modeling
- `express-handlebars` - Templating engine
- `dotenv` - Environment variable management
- `method-override` - HTTP method override for forms

### Step 3: Set Up MongoDB Atlas

1. **Create a MongoDB Atlas Account** (if you don't have one)
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for a free account

2. **Create a Cluster**
   - Click "Build a Database"
   - Choose the free tier (M0)
   - Select a cloud provider and region
   - Click "Create"

3. **Create a Database User**
   - Go to "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Enter a username and password (save these!)
   - Set user privileges to "Atlas admin" or "Read and write to any database"
   - Click "Add User"

4. **Whitelist Your IP Address**
   - Go to "Network Access" in the left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development) or add your specific IP
   - Click "Confirm"

5. **Get Your Connection String**
   - Go to "Database" in the left sidebar
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/...`)

### Step 4: Configure Environment Variables

1. **Create a `.env` file** in the root directory:

```bash
# On Windows (PowerShell)
New-Item .env

# On Mac/Linux
touch .env
```

2. **Add your MongoDB connection string** to the `.env` file:

```env
MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/jersey-store?retryWrites=true&w=majority
PORT=3000
```

**Important**: 
- Replace `your-username` with your MongoDB Atlas username
- Replace `your-password` with your MongoDB Atlas password
- Replace `cluster` with your actual cluster name
- The `.env` file is already in `.gitignore` to keep your credentials safe

### Step 5: Add Logo Placeholder

Create a logo placeholder image at `public/images/logo-placeholder.png`. You can:
- Use any image file and rename it to `logo-placeholder.png`
- Create a simple placeholder image
- The logo will be displayed at the top of every page

## 🎯 Running the Application

### Step 1: Seed the Database (Optional but Recommended)

Populate the database with sample jerseys:

```bash
npm run seed
```

This will add sample jerseys for:
- Nigeria (Super Eagles)
- Cameroon (Indomitable Lions)
- Ghana (Black Stars)
- South Africa (Bafana Bafana)
- Ivory Coast (Elephants)

### Step 2: Start the Server

```bash
npm start
```

Or for development with auto-reload (if you have nodemon installed):

```bash
npm run dev
```

### Step 3: View in Browser

Open your web browser and navigate to:

```
http://localhost:3000
```

You should see the homepage with all available jerseys!

## 📁 Project Structure

```
new-bootcamp/
├── models/
│   └── Jersey.js          # Mongoose model for jerseys
├── routes/
│   └── jerseys.js         # All CRUD routes for jerseys
├── views/
│   ├── layouts/
│   │   └── main.handlebars    # Main layout template
│   ├── home.handlebars        # Homepage view
│   ├── detail.handlebars      # Jersey detail view
│   ├── admin.handlebars       # Admin form view
│   └── 404.handlebars         # 404 error page
├── public/
│   ├── css/
│   │   └── style.css          # Main stylesheet
│   └── images/
│       └── logo-placeholder.png  # Logo image
├── scripts/
│   └── seed.js             # Database seeding script
├── server.js                # Main server file
├── package.json             # Project dependencies
├── .env                     # Environment variables (create this)
├── .env.example            # Example environment file
└── README.md               # This file
```

## 🎨 Routes

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/` | Homepage - displays all jerseys |
| GET | `/jersey/:id` | Jersey detail page |
| GET | `/admin` | Admin form (add new jersey) |
| GET | `/admin?id=:id` | Admin form (edit existing jersey) |
| POST | `/admin` | Create a new jersey |
| PUT | `/admin/:id` | Update an existing jersey |
| DELETE | `/admin/:id` | Delete a jersey |

## 🔧 Usage

### Adding a New Jersey

1. Navigate to `/admin` in your browser
2. Fill in the form:
   - **Team Name**: e.g., "Super Eagles"
   - **Country**: e.g., "Nigeria"
   - **Price**: e.g., "59.99"
   - **Image URL**: Full URL to the jersey image
3. Click "Add Jersey"
4. You'll be redirected to the homepage

### Editing a Jersey

1. Go to any jersey detail page (`/jersey/:id`)
2. Click "Edit Jersey"
3. Modify the form fields
4. Click "Update Jersey"

### Deleting a Jersey

1. Go to the jersey detail page
2. Click "Delete Jersey"
3. Confirm the deletion
4. You'll be redirected to the homepage

## 🐛 Troubleshooting

### "Cannot connect to MongoDB" Error

- Check that your `.env` file exists and has the correct `MONGODB_URI`
- Verify your MongoDB Atlas username and password are correct
- Ensure your IP address is whitelisted in MongoDB Atlas
- Check that your cluster is running

### "Port already in use" Error

- Change the `PORT` in your `.env` file to a different number (e.g., 3001)
- Or stop any other application using port 3000

### Images Not Displaying

- Ensure image URLs are valid and accessible
- Check that the image URL starts with `http://` or `https://`
- The app will show a placeholder if the image fails to load

## 📝 Notes

- This is an MVP (Minimum Viable Product) focused on functionality
- The design is minimal and hackathon-ready
- All code includes detailed comments for beginners
- The database connection uses MongoDB Atlas (cloud database)
- Static files (CSS, images) are served from the `/public` directory

## 🚀 Next Steps (Optional Enhancements)

- Add user authentication
- Implement shopping cart functionality
- Add payment processing
- Include more jersey details (size, color, etc.)
- Add search and filter functionality
- Implement image upload instead of URL input
- Add order management system

## 📄 License

This project is open source and available for educational purposes.

---

**Happy Coding! ⚽**

