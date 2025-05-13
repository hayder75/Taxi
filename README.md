 🚖 Route Taxi Finder App

A smart route taxi finder built for urban commuters. Designed to help users find the most efficient  direct or transfer-based taxi routes  between two points in a city (e.g.,  Addis Ababa ), with detailed  map coordinates ,  distance estimation , and  real-time navigation  support.

---

  ✨ Features

   🚀 Core Functionality

* 🔁 Calculates  direct  and  multi-transfer  taxi routes
* 📍 Geocodes place names into coordinates using  Nominatim (OpenStreetMap) 
* 🗺 Renders  real-time taxi routes  on an interactive map
* 🔐 Secured with  JWT authentication 
* 📏 Uses  Haversine Formula  for accurate distance calculations
* 📡 Supports  real-time routing  using  GraphHopper API 

 🛠 Technologies Used

 Backend: 

* Node.js, Express.js
* MongoDB + Mongoose
* GraphHopper API
* Nominatim API
* JWT for authentication
* node-fetch, dotenv

 Frontend: 

* React Native
* JavaScript (ES6+)
* React Native Maps (or similar)
* Fetch API for backend communication

---

  📱 Frontend Overview

   🧩 Key Features

* ✏️ Input origin and destination
* 🗺 View route on map
* 🚫 Handles API and validation errors gracefully

   🎨 Tools

* React Native UI components
* Fetch for backend requests
* Location-based map rendering

---

  🔧 Backend Overview

   🧠 Logic

* BFS algorithm for shortest route with minimal transfers
* JWT-protected endpoints
* Mongoose schemas for taxi routes and station data

   🌍 APIs Used

*  GraphHopper API : Real-time route calculation
*  Nominatim API : Location geocoding (place → coordinates)

---

  📦 Installation & Setup Guide

   🔙 Backend Setup

1.  Clone the Repository 

   ```bash
   git clone https://github.com/your-username/taxi-routing-app.git
   cd taxi-routing-app/backend
   ```

2.  Install Dependencies 

   ```bash
   npm install
   ```

3.  Configure Environment 
   Create a `.env` file with the following:

   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   GRAPH_HOPPER_KEY=your_graphhopper_api_key
   ```

4.  Start the Server 

   ```bash
   npm start
   ```

> The server runs at `http://localhost:5000`

---

   📱 Frontend Setup

1.  Navigate to the frontend folder 

   ```bash
   cd ../frontend
   ```

2.  Install React Native Dependencies 

   ```bash
   npm install
   ```

3.  Run the Application 

   ```bash
   npx expo start
   ```

   > Requires [Expo CLI](https://docs.expo.dev/get-started/installation/) for running React Native apps.

4.  Enter Locations and Get Routes 

   * Input "Start" and "Destination" points
   * Tap  Find Route  to get the optimal taxi directions

---

  🔐 Authentication

* Register/Login to get a  JWT token 
* Use the token to access protected endpoints:

  * `/api/routes`
  * `/api/user/routes`

Example header:

```http
Authorization: Bearer your_token_here
```

---

  📊 Example JSON Output (from Backend)

```json
{
  "route": [
    {
      "from": "Megenagna",
      "to": "Arat Kilo",
      "vehicle": "Taxi Line A",
      "coordinates": [
        [9.038, 38.761],
        [9.041, 38.759]
      ]
    },
    {
      "from": "Arat Kilo",
      "to": "Piassa",
      "vehicle": "Taxi Line B",
      "coordinates": [
        [9.041, 38.759],
        [9.045, 38.754]
      ]
    }
  ],
  "totalDistance": "4.2 km"
}
```

---

  📌 Future Improvements

* 📍 Real-time taxi location tracking
* 📲 Offline routing support
* 🧭 Multi-language support (Amharic, Afaan Oromo, etc.)
* 🚕 Dynamic pricing estimation
* ⭐ Favorite route saving

---

  🤝 Contributing

Feel free to fork the repo, submit issues, or open pull requests!
We welcome collaboration to make this tool even better for African cities. 🌍

---

  📜 License

[MIT License](LICENSE)

---

  🧠 Credits

