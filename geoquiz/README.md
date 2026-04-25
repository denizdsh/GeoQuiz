# GeoQuiz: Interactive Geography Game Platform

A React-based geography learning game platform featuring real-time multiplayer, interactive maps, and quiz modes covering flags, capitals, and regional borders. 

Hosted on `Firebase` at **https://gamegeoquiz.web.app**

[![React](https://img.shields.io/badge/React-18.1.0-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org/)
[![Firebase](https://img.shields.io/badge/Firebase-9.8.1-FFCA28?style=flat-square&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Leaflet](https://img.shields.io/badge/Leaflet-1.8.0-199900?style=flat-square&logo=leaflet&logoColor=white)](https://leafletjs.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](https://opensource.org/licenses/MIT)

## 📋 Table of Contents
- [GeoQuiz: Interactive Geography Game Platform](#geoquiz-interactive-geography-game-platform)
  - [📋 Table of Contents](#-table-of-contents)
  - [✨ Features](#-features)
    - [🕹️ Singleplayer](#️-singleplayer)
    - [👥 Real-time Multiplayer](#-real-time-multiplayer)
    - [🌐 User Experience](#-user-experience)
  - [🎮 Game Modes](#-game-modes)
  - [🛠 Technology Stack](#-technology-stack)
  - [🧠 Multiplayer Logic](#-multiplayer-logic)
  - [🚀 Application Usage](#-application-usage)
    - [Accessing the App](#accessing-the-app)
    - [Multiplayer Setup](#multiplayer-setup)

---

## ✨ Features

### 🕹️ Singleplayer

* **Global Coverage:** Quizzes categorized by continent or a combined "All Regions" mode.
* **Flag Recognition:** Visual identification of national flags.
* **Capital Cities:** Testing knowledge of global administrative centers.
* **Interactive Map Challenges:** Utilizing Leaflet and GeoJSON to identify countries by their borders.
* **Specialized Content:** Dedicated mode for identifying the **Provinces of Bulgaria**.

### 👥 Real-time Multiplayer

* **Lobby System:** Create private or public lobbies with custom names and optional passwords.
* **Dynamic Customization:** Randomly generated usernames and pixel-art avatars via the **DiceBear API**.
* **Competitive Scoring:** Real-time score synchronization across all participants using `Firebase Realtime Database`.
* **Anonymous Authentication:** Seamless entry via Firebase Anonymous login.

### 🌐 User Experience

* **Multilingual Support:** Integrated i18n for accessibility in English and Bulgariann.
* **Dynamic Theme Switching:** Support for Dark and Light modes.
* **Audio Feedback:** Interactive sound effects for correct/incorrect answers.
* **Visual Flair:** Celebration animations using canvas confetti upon victory.

---

## 🎮 Game Modes

| Mode | Description | Technology |
| :--- | :--- | :--- |
| **Flags** | Identify the correct country based on its national flag. | JSON Dataset |
| **Capitals** | Match the country to its capital city. | JSON Dataset |
| **Countries** | Locate countries on a map as their names appear in the HUD. | Leaflet + GeoJSON |
| **Bulgarian Provinces** | Map-based identification of Bulgarian administrative regions. | Leaflet + GeoJSON |

---

## 🛠 Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend Framework** | React 18 (CRA) |
| **Routing** | React Router Dom v6 |
| **Mapping Engine** | Leaflet & React Leaflet |
| **Real-time Database** | Firebase Realtime DB |
| **Deployment** | Firebase Hosting |
| **State Management** | React Context & Hooks & `use-local-storage` |
| **Styling** | CSS Modules |
| **Internationalization** | i18n |
| **Icons** | FontAwesome 6 |

---

## 🧠 Multiplayer Logic

* **Lobby Lifecycle:** Lobbies are ephemeral; the session data is tied to the creator. If the creator leaves, the lobby is decommissioned.
* **Distributed Computation:** Only the resulting scores are synced via Firebase to keep the leaderboard updated. Currently, quiz questions are computed locally on each client. 
* **State Management:** Utilizes `Web Storage API` to ensure persisted user identity and session preferences.

---

## 🚀 Application Usage

### Accessing the App
The application is hosted via [**Firebase Hosting**](https://gamegeoquiz.web.app/).

### Multiplayer Setup
1.  Navigate to the **Multiplayer** tab.
2.  **Create a Lobby** or join an existing one using a password if required.
3.  Set a **Username** (or keep the randomized one).
4.  Choose an **Avatar** (Pixel-art style generated on the fly).
5.  The host selects the game mode (`Flags`, `Capitals`, or `Countries`) and starts the session.