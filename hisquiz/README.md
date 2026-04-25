# HisQuiz: Interactive History Game Platform

A React+Vite-powered history learning game platform featuring real-time multiplayer, trivia challenges, and artifact recognition across different human eras.

Hosted on `Firebase` at **https://quizhis.web.app**

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.2.0-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-10.10.0-FFCA28?style=flat-square&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](https://opensource.org/licenses/MIT)

## 📋 Table of Contents
- [HisQuiz: Interactive History Game Platform](#hisquiz-interactive-history-game-platform)
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

* **Human History Eras:** Quizzes categorized by specific ages of history (Ancient, Medieval, etc.) or a combined "All" mode.
* **Trivia Challenges:** Questions tailored to the historical context of each selected era.
* **Artifact Recognition:** Identifying famous historical artifacts from photos and assigning them to their correct time period.
* **Modern History Expansion:** Includes specialized modes for identifying national flags and capitals within the "Modern History" era.

### 👥 Real-time Multiplayer

* **Lobby System:** Create private or public lobbies with custom names and optional passwords.
* **Dynamic Customization:** Randomly generated usernames and pixel-art avatars via the **DiceBear API**.
* **Competitive Scoring:** Real-time score synchronization across all participants using `Firebase Realtime Database`.
* **Anonymous Authentication:** Seamless entry via Firebase Anonymous login.

### 🌐 User Experience
* **Dynamic Theme Switching:** Support for **Dark and Light modes**, persisted via `Web Storage API`.
* **Multilingual Support:** Integrated i18n for accessibility in English and Bulgariann.
* **Audio Feedback:** Interactive sound effects for correct/incorrect answers via `use-sound`.
* **Visual Flair:** Celebration animations using `react-canvas-confetti` upon winning.

---

## 🎮 Game Modes

| Mode | Description | Availability |
| :--- | :--- | :--- |
| **Trivia** | Answer history questions specific to the chosen human age. | All Eras |
| **Artifacts** | Identify a recognizable artifact and point to the era it belongs to. | "All" (Global) Mode |
| **Flags** | Identify countries based on their flags. | Modern History |
| **Capitals** | Match countries to their capital cities. | Modern History |

---

## 🛠 Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend Framework** | React 18.2 (Vite) |
| **Routing** | React Router Dom v6.22 |
| **Build Tool** | Vite |
| **Real-time Database** | Firebase 10.10 (Realtime DB) |
| **Deployment** | Firebase Hosting |
| **State Management** | React Context & Hooks & `use-local-storage` |
| **Styling** | CSS Modules |
| **Internationalization** | i18n |
| **Icons** | FontAwesome 6 |

---

## 🧠 Multiplayer Logic

* **Lobby Lifecycle:** Lobbies are creator-dependent; the session is decommissioned if the host exits.
* **Distributed Computation:** To ensure performance, quiz questions are computed locally on each client.
* **Real-time Sync:** Only player scores and lobby statuses are synced via Firebase to maintain a live leaderboard.
* **Persistence:** Uses the `Web Storage API` via the `use-local-storage` hook to keep user identities, themes, and session preferences intact during refreshes.

---

## 🚀 Application Usage

### Accessing the App
The application is hosted via [**Firebase Hosting**](https://quizhis.web.app/).

### Multiplayer Setup
1.  Navigate to the **Multiplayer** tab.
2.  **Create a Lobby** or join an existing one using a password if required.
3.  Set a **Username** (or keep the randomized one).
4.  Choose an **Avatar** (Pixel-art style generated on the fly).
5.  The host selects the historical era and game mode, and starts the session.