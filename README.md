# Startup Junction

Startup Junction helps students and aspiring founders turn ideas into real products, teams, and startups through mentorship, guidance, team building, and practical support.

## Features

- **Application Portal**: Apply with startup ideas for mentorship and support.
- **Admin Management**: Admin portal for reviewing, managing, and updating startup applications.
- **Interactive Components**: Visual components including regional map features and interactive landing pages.
- **Firebase Integration**: Authentication and Firestore data persistence.

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS, Motion, Lucide React
- **Backend & Services**: Firebase (Auth & Firestore), Express
- **AI Integration**: Google Gemini API (`@google/genai`)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or bun

### Installation

1. Clone the repository and navigate to the project directory.

2. Install dependencies:
   ```bash
   npm install
   ```

3. Environment Setup:
   Create a `.env` file based on `.env.example`:
   ```env
   GEMINI_API_KEY=your_gemini_api_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Available Scripts

- `npm run dev`: Start the Vite development server
- `npm run build`: Build the app for production
- `npm run preview`: Preview the production build locally
- `npm run lint`: Run TypeScript type checking

## License

MIT
