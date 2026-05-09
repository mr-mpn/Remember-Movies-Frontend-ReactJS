# Cinema List — Frontend

A React-based movie discovery and list management app where users can search for movies, create curated lists, and share them with others.

## Features

- Search any movie and view full details (ratings, cast, plot, awards)
- Trending movies carousel on the homepage
- Google OAuth sign-in
- Create, edit, and delete movie lists
- Add/remove movies from lists
- Share public lists via URL
- Responsive design (mobile + desktop)
- Recently searched movies history

## Tech Stack

- React 19 + Vite 7
- Tailwind CSS 4
- React Router 7
- Axios
- Google OAuth (@react-oauth/google)

## Getting Started

```bash
npm install
npm run dev
```

## Environment Variables

Create a `.env` file:

```
VITE_API_BASE_URL=your_backend_api_url
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

## Live Demo

[cinema-list-frontend-react-js.vercel.app](https://cinema-list-frontend-react-js.vercel.app)
