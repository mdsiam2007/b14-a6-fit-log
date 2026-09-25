<div align="center">

# 💪 FitLog — Workout Library & Daily Plan Tracker

[![Netlify Status](https://img.shields.io/badge/Deployed%20with-Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://b14-a6-fit-log.netlify.app/)
[![Next.js](https://img.shields.io/badge/Next.js%2016-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React%2019-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

<p align="center">
  <strong>A premium, modern gym companion web application engineered for fitness enthusiasts to discover exercises, design daily workout routines with intelligent caps, and track sets in real-time.</strong>
</p>

[🌐 **Live Demo (Netlify)**](https://b14-a6-fit-log.netlify.app/) • [📁 **Explore Repository**](https://github.com/mdsiam2007/b14-a6-fit-log) • [🐛 **Report Bug**](https://github.com/mdsiam2007/b14-a6-fit-log/issues)

</div>

---

## 📖 Project Overview

**FitLog** is a full-featured fitness management web application built with **Next.js 16 (App Router)**, **React 19**, and **Tailwind CSS v4**. It offers an intuitive platform for gym-goers and athletes to explore a curated database of exercises, review detailed execution specs and instructions, plan daily routines (with an automated 5-lift cap to prevent overtraining), save favorite movements for later, and check off completed sets with persistent local storage.

---

## ⚡ 5 Key Features

### 1. 🏋️ Dynamic Workout Library & Instant Filter/Sort
- **Comprehensive Catalog:** Browse an extensive collection of workouts categorized by target muscle group, difficulty level, and equipment.
- **Instant Search:** Client-side real-time query matching across workout titles, muscle groups, and equipment names.
- **Multi-Metric Sorting:** Sort workouts seamlessly by **Duration (min)**, **Calories Burned (kcal)**, and **User Rating (stars)**.

### 2. 📋 Deep-Dive Exercise Detail Guides
- **Dynamic Routing:** Individual detail pages (`/workout/[id]`) for every exercise in the catalog.
- **Key Specifications Table:** Quick-glance metrics including equipment needed, difficulty tier, target sets, reps, duration, burned calories, and user rating.
- **Step-by-Step Instructions:** Structured, numbered instructional walk-throughs to ensure safe and effective exercise execution.

### 3. 🎯 Daily Workout Planner with 5-Lift Cap
- **One-Click Routine Builder:** Effortlessly add exercises to **Today's Plan** with real-time toast feedback.
- **Smart 5-Lift Cap Protection:** Prevents overtraining by enforcing a maximum of 5 daily exercises with contextual warning notifications.
- **Live Summary Metrics:** Dynamic dashboard cards calculating total exercises planned, cumulative workout duration, and total estimated calories burned.

### 4. 🔖 "Save for Later" & Interactive Progress Tracking
- **Dedicated Saved Tab:** Bookmark potential workouts into a dedicated list for upcoming training sessions.
- **Interactive Check-Off ("Mark as Done"):** Real-time toggle on active routine cards to mark exercises as completed with strike-through styling.
- **Instant Item Management:** Remove unwanted exercises in a single click with instant toast confirmation.

### 5. 💾 Seamless LocalStorage Persistence & Dark-Mode Aesthetics
- **State Persistence:** Automatically syncs Today's Plan, Saved Items, and completed statuses to browser `localStorage` across page reloads.
- **Live Header Badges:** Synchronized notification badges in the navigation bar showing real-time plan and saved counts.
- **Modern Gym Dark UI:** High-contrast athletic dark aesthetic featuring neon accent highlights (`#ccff00`), responsive layout, custom loading skeletons, and a tailored 404 page.

---

## 🛠️ Technologies Used

| Category | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | [Next.js 16 (App Router)](https://nextjs.org/) | React framework with Server & Client components and dynamic file routing |
| **Core Library** | [React 19](https://react.dev/) | UI component library with Hooks & Context API for global state |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | Type-safe development with custom interfaces and strong typing |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | Modern utility-first CSS framework |
| **Component UI** | [DaisyUI v5](https://daisyui.com/) | Semantic UI components and responsive styling utilities |
| **Icons** | [Lucide React](https://lucide.dev/) | Clean, lightweight SVG icon package |
| **Notifications** | [React Hot Toast](https://react-hot-toast.zackify.com/) | Interactive, animated toast alert system |
| **Typography** | [Google Fonts](https://fonts.google.com/) | Custom Inter & Oswald athletic typography |
| **Hosting** | [Netlify](https://www.netlify.com/) | Edge deployment and continuous integration |

---

## 🌐 Live Link & Deployment

> [!NOTE]
> Update the links below with your actual deployed Netlify URL and GitHub username.

- **Live Application URL (Netlify):** [https://b14-a6-fit-log.netlify.app/](https://b14-a6-fit-log.netlify.app/)
- **GitHub Source Code:** [https://github.com/mdsiam2007/b14-a6-fit-log](https://github.com/mdsiam2007/b14-a6-fit-log)

---

## 📂 Project Architecture

```text
b14-a6-fit-log/
├── public/                     # Static assets & public media
├── src/
│   ├── app/
│   │   ├── component/          # Reusable UI & Feature components
│   │   │   ├── shared/         # Header, Navbar, Footer
│   │   │   ├── MyPlanSkeleton.tsx
│   │   │   ├── WorkoutActionButtons.tsx
│   │   │   ├── WorkoutCard.tsx
│   │   │   ├── WorkoutCardSkeleton.tsx
│   │   │   └── WorkoutLibrary.tsx
│   │   ├── context/            # React Context (PlanProvider & localStorage state)
│   │   │   └── PlanContext.tsx
│   │   ├── lib/                # Data fetching helpers & API services
│   │   │   └── api.ts
│   │   ├── my-plan/            # My Plan page route (/my-plan)
│   │   │   ├── loading.tsx
│   │   │   └── page.tsx
│   │   ├── types/              # TypeScript types & interface declarations
│   │   │   └── all_types.ts
│   │   ├── workout/            # Dynamic workout details route (/workout/[id])
│   │   │   └── [id]/page.tsx
│   │   ├── globals.css         # Global styling & Tailwind directives
│   │   ├── layout.tsx          # Root Layout wrapping providers & Toaster
│   │   ├── loading.tsx         # Root loading state
│   │   ├── not-found.tsx       # Custom 404 Error page
│   │   └── page.tsx            # Home / Workout Library page
│   └── assets/                 # App banners and brand media
├── next.config.ts              # Next.js configurations & image remote patterns
├── package.json                # Project dependencies & scripts
└── tsconfig.json               # TypeScript compiler options
```

---

## 🚀 Getting Started Locally

To run this project locally, follow these steps:

### 1. Prerequisites
- **Node.js** (v18.18.0 or later recommended)
- **npm** / **yarn** / **pnpm**

### 2. Clone the Repository
```bash
git clone https://github.com/mdsiam2007/b14-a6-fit-log.git
cd b14-a6-fit-log
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

### 5. Build for Production
```bash
npm run build
npm run start
```

---

## 📄 License

This project is open source and created for educational purposes.
