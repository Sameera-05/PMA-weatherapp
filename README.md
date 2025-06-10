# 🌦️ PMA Weather App

This is a full-stack weather web application built as part of the **Product Manager Accelerator (PMA)** program. The app allows users to search for real-time weather conditions by location, view 5-day forecasts, track air quality and UV index, and store recent searches in a database with full CRUD (Create, Read, Update, Delete) functionality. Users can also export their search data in CSV format.

---

## 🚀 Features

- 🌍 Search weather by city name or zip code
- 📍 Use current GPS location
- 🗓️ View 5-day weather forecast
- 🌫️ Display air quality index (AQI)
- 🔆 UV index reporting
- 🧾 Save and display recent searches in a table
- ✏️ Inline editing and 🗑️ delete functionality for searches
- 📤 Export data as CSV
- 📄 "About" section with project and PMA info

---

## 🏗️ Tech Stack

- **Frontend:** React, Bootstrap
- **Backend:** Node.js, Express
- **Database:** SQLite (via Sequelize ORM)
- **API:** OpenWeatherMap

---

## 📦 Project Structure

weather-app/
├── client/ # React frontend
├── server/ # Node.js backend
├── database.sqlite # SQLite database
└── README.md

---

## ▶️ How to Run the Project Locally

### 1. Clone the Repository

bash : 
git clone https://github.com/Sameera-05/PMA-weatherapp.git 
cd PMA-weatherapp

###2. Start the Backend Server
bash: 
cd server
npm install
node index.js
# OR (recommended)
npx nodemon index.js
Server will run at http://localhost:5000.

###3. Start the Frontend
cd ../client
npm install
npm run dev
Frontend will run at http://localhost:5173.

🔁 Export Feature
You can export your recent search data to CSV by clicking the Export CSV button in the UI.

📘 About PMA
Product Manager Accelerator (PMA) is a global community of aspiring and professional product managers. Through the PMA program, participants gain hands-on experience and mentorship in product design, development, and cross-functional teamwork.

🔗 [PM Accelerator](https://www.linkedin.com/school/pmaccelerator/)

“Our Product Manager Accelerator community are ambitious and committed. Through our program, they have learned, honed and developed new PM and leadership skills, giving them a strong foundation for their future endeavors.”


