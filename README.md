<div align="center">

# 💜 AuraSync

### The all-in-one salon management platform, built for salons — by people who get it.

<p>
  <img alt="status" src="https://img.shields.io/badge/status-in%20development-C9992E">
  <img alt="platform" src="https://img.shields.io/badge/platform-Web%20%7C%20Android-B3123E">
  <img alt="tech" src="https://img.shields.io/badge/stack-HTML%20%7C%20CSS%20%7C%20JS%20%7C%20Capacitor-1F2937">
  <img alt="license" src="https://img.shields.io/badge/license-Academic%20Use%20Only-6B7280">
</p>

</div>

> ⚠️ **This project is a class assignment for NIT3274 – Small IT Business at Victoria University, Melbourne, and is not for commercial purpose.**

---

## 📖 About

AuraSync is a booking and business-management platform designed for solo stylists, nail artists, and multi-location salon groups alike. It replaces the spreadsheets, phone tag, and paper appointment books that eat into a salon owner's day with one clean dashboard for bookings, staff, payments, and growth.

Built as an **e-business** from the ground up, AuraSync brings together online booking, SMS reminders, analytics, multi-location support, and loyalty programs into a single accessible tool — priced so a solo artist and a 15-location group can both find a plan that fits.

## ✨ Features

- 📅 **Online Booking** — real-time appointment scheduling for clients and staff
- 💳 **Integrated Payments** — cart, checkout, and bill generation (PayPal-ready)
- 📊 **Analytics Dashboard** — bookings, revenue, and growth at a glance
- 🏢 **Multi-Location Support** — built to scale from one chair to twenty
- 🎁 **Loyalty Program** — keep clients coming back
- 🌗 **Light / Dark Mode** — a polished UI in either theme
- 🗺️ **Contact & Location** — maps, socials, and enquiry form built in
- 📱 **Installable App** — runs as a native Android app (via Capacitor) and as an installable PWA

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Backend / Auth | Supabase |
| Mobile Wrapper | Capacitor (Android) |
| Offline Support | Service Worker + Web App Manifest (PWA) |

## 📂 Project Structure

```
AuraSyncApp/
├── www/                  → Website source (HTML, CSS, JS, images)
│   ├── index.html         (splash screen)
│   ├── home.html
│   ├── about.html
│   ├── services.html
│   ├── pricing_page.html
│   ├── cantact_page.html
│   ├── payment.html
│   ├── login.html / signup.html
│   ├── book_a_demo_page.html
│   ├── style.css
│   ├── script.js
│   ├── manifest.json      (PWA manifest)
│   └── service-worker.js  (offline caching)
├── android/               → Native Android project (Capacitor)
├── capacitor.config.ts    → App name, ID, splash screen config
└── README.md
```

## 🚀 Getting Started

### Run the website
Just open any `.html` file in `www/` in a browser, or serve the folder locally:
```bash
cd www
npx serve .
```

### Run the mobile app
```bash
npm install
npx cap sync android
npx cap open android
```
Then hit **Run ▶** in Android Studio to launch on an emulator or a connected device.

## 👥 Team

| Name | Role |
|---|---|
| Zameena Sydeen | Co-Founder & CEO |
| Nimsara Fernando | Co-Founder & CTO |
| Nethmini Umendra | Lead UI/UX Designer |
| Asanthi | Head of Operations |

## 🎓 Academic Context

This project was developed for **NIT3274 – Small IT Business**, Victoria University Melbourne, as a group assignment demonstrating the planning, design, and implementation of an e-business (Business Idea: *Innovative IT Solutions*). It showcases both a fully responsive business website and a companion mobile application built from the same codebase.

## 📄 License

This repository is provided for academic evaluation purposes only and is not intended for commercial use or distribution.
