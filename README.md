# 📌 City Management Dashboard

## 🚀 Overview
The **City Management Dashboard** is a **modern, interactive, and fully responsive** web application designed to manage different city sections like Finance, Health, Education, Technology, Security...etc . It features **3D effects, magic animations, charts, maps**, and a powerful user authentication system with JWT-based role management.

## 🌟 Features
- **🔐 Secure Authentication**: JWT-based authentication with role-based access control.
- **🏙️ 3D City Visualization**: Interactive skyscrapers representing different city sections.
- **📊 Dynamic Reports**: Visualize city growth, job market trends, investments, and more.
- **🗺️ Interactive Map**: Search for locations with a magic marker on Vienna's map.
- **📆 Magic Calendar**: Animated calendar with daily highlights.
- **📌 User Management**: Add, ban, delete, and grant privileges to users.
- **📱 Fully Responsive**: Works seamlessly on all devices.
- **🚀 Deployed with Docker**: Easily deployable with Docker and Docker Compose.

---

## 🏗️ Project Structure
```
📂 city-admin-dashboard
├── 📂 src               # Angular Frontend
│   ├── 📂 app                # Source code
│       ├── 📂 assets             # Images, styles, icons
│       ├── 📂 components         # Reusable UI Components
│       ├── 📂 services           # API service files
│       ├── 📂 guards             #Guards files
├── 📜 angular.json       # Angular Config
├── 📜 Dockerfile         # Docker Config
└── 📜 package.json       # Node Dependencies
├── 📜 docker-compose.yml     # Docker Compose Config
└── 📜 README.md              # Documentation (This File)
```

---

## 🛠️ Installation Guide

### ** Prerequisites**
Ensure you have the following installed:
- **Node.js** (v18+ recommended)
- **Angular CLI** (v15+ recommended)
- **Docker & Docker Compose**

### **Clone the Repository**
```sh
git clone https://github.com/your-repo/city-admin-dashboard.git
cd city-admin-dashboard/frontend
```

### ** Install Dependencies**
```sh
npm install
```

### **4️⃣ Start Development Server**
```
ng serve
```
🌍 **Open:** `http://localhost:4200`

---

## 🐳 Running with Docker
### ** Build and Run Containers**
```
docker-compose up --build -d
```
🌍 **Frontend:** `http://localhost:4200`

### ** Stop Containers**
```sh
docker-compose down
```

### ** View Logs**
```
docker logs <container_id>
```
Find your container ID using:
```
docker ps
```

---

## 🔐 Authentication & Role Management
- **Login API**: `POST /api/auth/login`
- **JWT Storage**: Tokens are stored in cookies.
- **Role-Based Access**:
  - `FullAdmin`: Has access to the entire dashboard.
  - `User`: Limited access.

---

## 📊 Reports & Charts (Using Chart.js)
- **City Growth Over 5 Years** 📈
- **Job Market Analysis** 📉
- **Investment Trends** 💰
- **Birth & Death Rates** 📊

---

## 🗺️ Map Component (Using OpenLayers)
- **Address Search Bar** 🔍
- **Magic Marker Animation** ✨
- **Fully Responsive Design** 📱

---

## 📆 Magic Calendar
- **Today's Date is Highlighted** 🟢
- **Animated Transitions** ✨
- **Supports All Devices** 📱💻

---


## 🎯 To-Do (Future Enhancements)
- [ ] **🌙 Dark Mode UI**
- [ ] **📍 Real-time Location Tracking**
- [ ] **📢 Live Notifications System**
- [ ] **📜 Audit Logs for Admin Actions**

---



---

## 👨‍💻 Contributing
🚀 **We welcome contributions!** If you find a bug or have a great idea, open an **issue** or submit a **pull request**.

### ** Fork the Repository**
```
git clone https://github.com/GHAZI-ALANZI/city-mangement-dashboard-with-auth-web-frontend.git
```
### **2️⃣ Create a New Branch**
```
git checkout -b feature-new-feature
```
### **3️⃣ Commit Changes**
```
git commit -m "Add new feature"
```
### ** Push Changes**
```sh
git push origin feature-new-feature
```
### **5️⃣ Open a Pull Request**
Submit a **Pull Request** on GitHub! 🎉

---

## ✨ Credits
**Developed by:** Ghazi 🌍 🚀

🌟 **Happy Coding!** 🌟

