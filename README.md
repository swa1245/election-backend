# Election Assistant Backend

A production-ready Node.js/Express backend for the Election Assistant application, integrated with Gemini AI.

## Features

- **Gemini AI Integration**: Intelligent chat for election-related queries.
- **Election Data API**: Fetch timelines and voting steps for supported countries.
- **TypeScript**: Type-safe development environment.
- **RESTful Endpoints**: Clean and structured API.
- **Error Handling**: Global middleware for consistent error responses.
- **CORS Support**: Configured for secure frontend communication.

## Tech Stack

- Node.js & Express
- TypeScript
- Google Generative AI (Gemini)
- Dotenv & CORS
- Axios

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables:
   Create a `.env` file based on `.env.example` and add your `GEMINI_API_KEY`.

3. Run in development mode:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## API Endpoints

- `GET /health`: Server health check.
- `POST /api/chat`: Chat with the Election Assistant.
- `GET /api/timeline/:country`: Get election timeline for a country.
- `GET /api/steps/:country`: Get voting steps for a country.

## Supported Countries

- India
- USA
- UK
- Canada
- Australia
- Germany
- France
- Japan
- Brazil
- South Africa
