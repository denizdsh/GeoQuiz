# Quiz Games Monorepo

This repository is a monorepo containing two interactive, singleplayer & real-time multiplayer educational platforms: **GeoQuiz** (Geography) and **HisQuiz** (History). Both applications share a core architectural philosophy, utilizing `React` for the frontend and `Firebase` for real-time synchronization.

[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://reactjs.org/)
[![Firebase](https://img.shields.io/badge/firebase-ffca28?logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Leaflet](https://img.shields.io/badge/Leaflet-1.8.0-199900?style=flat-square&logo=leaflet&logoColor=white)](https://leafletjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.2.0-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![CRA](https://img.shields.io/badge/Create_React_App-%2309D3AC?logo=createreactapp&logoColor=white)](https://create-react-app.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](https://opensource.org/licenses/MIT)
---

## 📂 Project Structure

| Directory | Project | Focus | Build Tool |
| :--- | :--- | :--- | :--- |
| `/geoquiz` | **GeoQuiz** | Geography, Maps, and Flags | Create React App (CRA) |
| `/hisquiz` | **HisQuiz** | Historical Eras, Trivia, and Artifacts | Vite |

---

## 🚀 Shared Features

Despite their different subject matters, both projects share a robust feature set designed for interactive learning:

* **Real-time Multiplayer:** A lobby-based system utilizing Firebase Realtime Database for live score synchronization.
* **Dynamic Customization:** Support for randomized usernames and pixel-art avatars via the DiceBear API.
* **User Experience:**
    * **Theme Support:** Persistent Dark and Light modes managed via `use-local-storage`.
    * **Internationalization:** Full i18n support for multilingual accessibility.
    * **Audio/Visuals:** Interactive sound effects via `use-sound` and victory celebrations using `react-canvas-confetti`.
* **Persistence:** User identities and session preferences are maintained through the LocalStorage `Web Storage API`.

---

## 🛠 Technology Stack

### Core Dependencies
* **Framework:** React 18.
* **Routing:** React Router Dom v6.
* **Backend:** Firebase (Authentication & Realtime Database).

### Project-Specific Tools
* **GeoQuiz:** Utilizes **Leaflet** and **GeoJSON** for interactive map identification and border recognition.
* **HisQuiz:** Built with **Vite** for optimized development and utilizes **Firebase v10**.

---

## 🎮 Applications Overview

### GeoQuiz
A geography-focused platform where users can explore the world through:
* **Map Challenges:** Identify countries and Bulgarian provinces on interactive Leaflet maps.
* **Visual Quizzes:** Recognize national flags and capital cities.
* **Regional Focus:** Play by specific continents or global "All Regions" mode.

### HisQuiz
A historical derivative that adapts the quiz engine for human history:
* **Era-Based Trivia:** Questions categorized by Ancient, Medieval, and other historical ages.
* **Artifact Mode:** A "Global" mode where users identify historical artifacts and their corresponding eras.
* **Modern History:** Includes flag and capital recognition within the context of modern historical development.