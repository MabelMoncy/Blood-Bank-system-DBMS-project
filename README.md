# Blood Bank Management System

A modern MERN-stack web application that digitizes donor registrations, acceptor requests, and compatibility matching for blood banks and NGOs. The UI reimagines the original mockups with a responsive, motion-ready console featuring dashboards, QR-ready donor profiles, and one-click matching.

## Tech Stack

- **Frontend:** React (Vite), React Router, TanStack Query, Zustand (optional later), Recharts, Framer Motion visuals, Lucide icons
- **Backend:** Node.js, Express, MongoDB with Mongoose ODM
- **Tooling:** Nodemon for dev server, ESLint, dotenv for configuration

## Getting Started

### 1. Clone & Install

```bash
# in repo root
cd server
npm install

cd ../client
npm install
```

### 2. Environment Variables

Copy `.env.example` to `.env` at the repo root and adjust:

```
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/bloodbank
CLIENT_URL=http://localhost:5173
VITE_API_BASE_URL=http://localhost:5000/api
```

### 3. Seed Sample Data (optional)

```bash
cd server
npm run seed
```

### 4. Run the stack

In two terminals:

```bash
# Terminal 1 - backend
cd server
npm run dev

# Terminal 2 - frontend
cd client
npm run dev
```

Frontend runs at `http://localhost:5173`, backend at `http://localhost:5000`.

## Key Features

- **Live dashboard:** Animated hero, donor mix charts, and recent activity panes
- **Donor operations:** Filterable tables, quick registration form, QR modal for fast sharing
- **Acceptor intake:** Capture urgency, hospital info, and track statuses
- **Matching center:** Toggle exact-match preference and fetch suggested donor→acceptor pairs instantly
- **API suite:** CRUD endpoints for donors/acceptors, statistics, and a compatibility matcher powered by the WHO matrix

## Testing Checklist

- [ ] `npm run dev` (server) connects to MongoDB without errors
- [ ] `npm run dev` (client) proxies to backend using `VITE_API_BASE_URL`
- [ ] `npm run seed` populates donors/acceptors for demo data
- [ ] Matching page lists compatible pairs after seeding

Feel free to extend the schema, add authentication, or plug into SMS/email gateways as next steps.
