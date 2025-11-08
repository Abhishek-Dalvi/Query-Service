# Query Service

This component serves as the **read-side** of the CQRS architecture.  
It provides real-time access to device data stored in **MongoDB**, returning the **latest readings** for a given `deviceId`.

## 🚀 Overview
The Query Service exposes REST APIs (and optionally a simple `index.html` frontend) to query IoT device data written by the Ingestion Service.

## 🧩 Features
- Fetch latest telemetry data by `deviceId`.
- Simple static UI (`index.html`) to visualize device readings.
- Implements **CQRS** design pattern (read side).
- Ensures **eventual consistency** between Postgres (write side) and MongoDB (read side).

## ⚙️ Tech Stack
- **Node.js / Express**
- **MongoDB**
- **Docker** (for local infra)
- **HTML / JavaScript (for UI)**

## 🧰 Setup Instructions
1. Install dependencies:
   ```bash
   npm install