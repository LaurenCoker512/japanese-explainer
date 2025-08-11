# Japanese Explainer

A full-stack app for Japanese vocabulary practice and explanation, featuring furigana support and OpenAI-powered examples.

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm
- PostgreSQL
- Redis

---

## Installation

### 1. Clone the repository

```sh
git clone https://github.com/LaurenCoker512/japanese-explainer.git
cd japanese-explainer
```

### 2. Install dependencies

#### Backend

```sh
cd backend
npm install
```

#### Frontend

```sh
cd ../frontend
npm install
```

---

## Environment Variables

### Backend (`backend/.env`)

```
OPENAI_API_KEY=your_openai_api_key
POSTGRES_USER=your_postgres_user
POSTGRES_PASSWORD=your_postgres_password
POSTGRES_DB=japanese_explainer
POSTGRES_HOST=localhost
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_jwt_secret
```

### Frontend (`frontend/.env`)

```
VITE_API_BASE_URL=http://localhost:5001
VITE_USE_MOCK_API=false # Set to true to use mock API
```

---

## Scripts

### Backend

- `npm start` — Start the backend server (Express, port 5001)

### Frontend

- `npm run dev` — Start the frontend dev server (Vite, port 5173)

---

## Usage

1. Start PostgreSQL and Redis locally, creating a japanese_explainer database.
2. Set up your `.env` files as above.
3. Start the backend:
   ```sh
   cd backend
   npm start
   ```
4. Start the frontend:
   ```sh
   cd frontend
   npm run dev
   ```
5. Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Features

- Japanese word explanation and examples
- Furigana rendering for kanji
- PostgreSQL and Redis integration
- OpenAI-powered backend
- Modern React frontend with Tailwind CSS

---

## License

MIT

---

## Attribution

Favicon art by [Freepik](https://www.flaticon.com/authors/freepik) from [www.flaticon.com](https://www.flaticon.com/).
