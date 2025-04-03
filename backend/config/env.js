// config/env.js
module.exports = {
    PORT: process.env.PORT || 5000,  // default to 5000 if not provided in environment variables
    MONGO_URI: process.env.MONGO_URI || 'mongodb+srv://haya123:<password>@cluster0.7xh7t0b.mongodb.net/test'  , // replace with your actual URI
    JWT_SECRET: process.env.JWT_SECRET || 'your_secret_key' // replace with your own secret key
  };
  