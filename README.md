# ContactOS — Contact Intelligence Dashboard

> A minimal, production-ready contact management app built with the MERN stack.  
> Designed to feel like Notion and Linear had a baby — dark, fast, and keyboard-first.

**Live Demo →** https://contact-os-five.vercel.app  
**Demo login →** `demo@contactos.app` / `demo1234`

---

## What is this?

ContactOS is a full-stack Contact Management Web App that goes beyond basic CRUD.
It's built to demonstrate real-world MERN patterns — JWT authentication, MongoDB text 
search with indexes, soft delete with a recoverable trash bin, and a command palette 
that lets you search or create contacts without touching the mouse.

The UI is dark-mode only, uses a glassmorphism sidebar, and animates contact cards 
in with a staggered Framer Motion entrance — because first impressions matter.

---

## Core features

| Feature | Details |
|---|---|
| JWT Authentication | Register, login, protected routes — token stored in localStorage, injected on every request via Axios interceptors |
| Full CRUD | Create, read, update, delete contacts with validation on both client (react-hook-form) and server (express-validator) |
| Soft Delete + Trash | Contacts are never permanently deleted — `isDeleted: true` flag moves them to `/trash` where they can be restored |
| Live Search | MongoDB `$text` index on name, email, and phone — 400ms debounced input, results update as you type |
| Tag Filtering | Filter by work / personal / family / other — compound index ensures fast queries |
| Command Palette | Press `⌘K` (or `Ctrl+K`) to open a spotlight-style search — find any contact or add a new one without a mouse |
| Pin Contacts | Pin important contacts — they always sort to the top of the list |
| Stats Bar | Shows total contacts, tag breakdown, and how many were added this week |
| Skeleton Loaders | Cards show animated skeleton placeholders while data loads — no spinner |
| Color-coded Avatars | Each contact gets a unique avatar color deterministically generated from their name |

---

## Technical decisions worth noting

**Soft delete over hard delete**  
Every delete sets `isDeleted: true` instead of removing the document. This mirrors 
production behaviour — data is recoverable, audit trails are preserved, and it costs 
nothing in MongoDB storage.

**MongoDB `$text` index for search**  
`{ name: 'text', email: 'text', phone: 'text' }` — uses an inverted index instead 
of a regex scan. Regex with the `/i` flag performs a full collection scan and 
doesn't scale. Text indexes do.

**Compound indexes**  
`{ user: 1, isDeleted: 1 }` and `{ user: 1, tag: 1 }` cover the two most common 
query shapes. Every contact query filters by the logged-in user first — without 
this index, MongoDB scans the entire collection per request.

**Axios interceptors instead of per-component auth logic**  
One request interceptor reads the JWT and sets the Authorization header for every 
API call automatically. One response interceptor catches 401s and redirects to 
`/login` — no component handles token expiry manually.

**`useContacts` custom hook**  
All contact state, fetching, creating, updating, and deleting is encapsulated in 
one hook. Components call `createContact(data)` — they don't know what axios is 
or what the API URL looks like. Clean separation of concerns.

**Cursor-style pagination**  
Uses MongoDB `.skip().limit()` with a page parameter — contacts load in pages of 
20, keeping the initial payload small regardless of how many contacts exist.

---

## Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, Tailwind CSS, Framer Motion, React Router v6 |
| State & Forms | React Hook Form, custom hooks (useContacts, useDebounce) |
| HTTP | Axios with request + response interceptors |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas, Mongoose ODM |
| Auth | JSON Web Tokens (jsonwebtoken + bcryptjs) |
| Validation | express-validator (server), react-hook-form (client) |
| Notifications | react-hot-toast |
| Icons | lucide-react |
| Testing | Jest + Supertest (3 API integration tests) |
| Deploy | Vercel (client) + Render (server) + MongoDB Atlas |
<img width="1919" height="860" alt="image" src="https://github.com/user-attachments/assets/3784c59b-71bb-43c5-adef-8bd8400b3277" />
<img width="1917" height="860" alt="image" src="https://github.com/user-attachments/assets/f5697976-8005-4a54-bcd3-bd23198a3a9c" />
<img width="1914" height="869" alt="image" src="https://github.com/user-attachments/assets/5bff8357-5b6c-48b6-86d9-ee358dc3b4c5" />
<img width="1919" height="852" alt="image" src="https://github.com/user-attachments/assets/b8e94e70-7fba-44b2-aa91-d19623a812fa" />
<img width="1914" height="847" alt="image" src="https://github.com/user-attachments/assets/341aedd5-a624-4a47-917c-a9b69e8166fd" />
