# Soccer Jersey Store

A simple web store for soccer jerseys built with Node.js, Express.js, MongoDB Atlas, and Handlebars.

## Features

- 🏠 Homepage listing all soccer jerseys
- 👕 Detailed view for each jersey
- ➕ Form to add new jerseys
- 📱 Responsive design

## Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB Atlas** - Cloud database
- **Mongoose** - MongoDB object modeling
- **Handlebars** - Template engine

## Project Structure

```
/project
├── app.js                 # Main server file
├── /models
│   └── Jersey.js         # Jersey data model
├── /routes
│   └── jerseys.js        # Routes and controllers
├── /views
│   ├── layouts
│   │   └── main.hbs      # Base layout template
│   ├── home.hbs          # Homepage template
│   ├── jersey.hbs        # Jersey detail template
│   └── add.hbs           # Add jersey form template
├── /public
│   └── css/style.css     # Stylesheet
└── package.json          # Dependencies
```

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set Up MongoDB Atlas**
   - Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a new cluster
   - Get your connection string
   - Replace `<password>` with your database password

3. **Configure Environment Variables**
   - Copy `.env.example` to `.env`
   - Update `MONGODB_URI` with your MongoDB Atlas connection string
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database-name
   ```

4. **Run the Application**
   ```bash
   npm start
   ```
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

5. **Access the Application**
   - Open your browser and go to `http://localhost:3000`

## Usage

- **View Jerseys**: Visit the homepage to see all available jerseys
- **View Details**: Click "View Details" on any jersey card
- **Add Jersey**: Click "Add Jersey" in the navigation or homepage
- **Fill Form**: Enter jersey name, team, price, and image URL
- **Submit**: Click "Add Jersey" to save to the database

## Routes

- `GET /` - Homepage (list all jerseys)
- `GET /jersey/:id` - View single jersey details
- `GET /add` - Show add jersey form
- `POST /add` - Process form and create new jersey

## Notes

- All code includes extensive comments explaining functionality
- Follows MVC architecture pattern
- No authentication required (as per requirements)
- Perfect for hackathon demos

## License

ISC

