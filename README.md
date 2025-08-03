# City Pulse – Local Events Explorer

**City Pulse** is a responsive event discovery web app built with **React.js**, **TypeScript**, **Firebase**, and **Clerk Authentication**. It allows users to search for events, view event details, mark favorites, and preview event locations on a map – all with a clean, mobile-friendly UI and support for RTL support.

## Live Demo

[Live Site](https://city-pulse-flax.vercel.app/)

## Features

- Search events by keyword and city using the Ticketmaster Discovery API  
- View full event details including date, time, image, and location preview  
- Add events to favorites, stored in Firestore for authenticated users  
- Toggle language between English and Arabic  
- Mobile-first responsive design  
- Venue location map preview  
- User authentication using Clerk (email, social logins)  
- Firebase Firestore integration for storing user data  
- UI built with MUI and Framer Motion  
- Global state management with Zustand  

## Getting Started

### Prerequisites

- Node.js v18 or above  
- Firebase Project with Firestore enabled  
- Clerk Project ([https://clerk.dev](https://clerk.dev))  
- Ticketmaster Developer Account ([https://developer.ticketmaster.com](https://developer.ticketmaster.com))  

### Clone the Project

```bash
git clone https://github.com/your-username/city-pulse.git
cd city-pulse
npm install

### Environment Variables

Create a `.env` file in the root directory of your project and add the following variables:

REACT_APP_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
REACT_APP_CLERK_SIGN_IN_URL=/sign-in
REACT_APP_CLERK_SIGN_UP_URL=/sign-up
REACT_APP_FIREBASE_API_KEY=your_firebase_key
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_TICKETMASTER_API_KEY=your_ticketmaster_api_key


### Run the App

To start the development server:

```bash
npm start

### Assumptions

- Only authenticated users can manage favorites  
- Language toggle affects both UI text and layout direction (LTR/RTL)  
- Favorite events are stored per user in Firestore  
- Ticketmaster Discovery API powers all event data  
- Location preview uses a mapping service (Leaflet)  

### Tech Stack

- React.js with TypeScript  
- Clerk for authentication  
- Firebase Firestore  
- Zustand for state management  
- MUI for UI components  
- Framer Motion for animations  
- Ticketmaster Discovery API  
- React Router DOM  

### Authentication

Authentication is powered by Clerk and supports:

- Email/password login  
- OAuth providers (Google)  



## Author

**Abirami R**  
Senior Software Engineer (UI)  
[LinkedIn](https://www.linkedin.com/in/abiramiravikumar)  
[GitHub](https://github.com/abyy14)
