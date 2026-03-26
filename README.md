# ContactOS — Your personal contact intelligence dashboard

![ContactOS Design Mockup Placeholder](https://via.placeholder.com/800x400/111214/7f77dd?text=ContactOS)

ContactOS is a production-quality Contact Management Web App using the MERN stack. Designed with a Notion + Linear inspired minimal glassmorphism UI, staggered card animations, and robust functionality including full CRUD operations, JWT authentication, soft delete, tag filtering, and a live command palette search.

[Live Demo](https://contactos.vercel.app)

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

## Getting Started

### Local Setup

To run this application locally, you will need Node.js and MongoDB.

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/contactos.git
   ```

2. Setup Backend:
   ```bash
   cd server
   npm install
   cp .env.example .env
   # Make sure your MONGO_URI string points to a MongoDB instance
   ```

3. Setup Frontend:
   ```bash
   cd ../client
   npm install
   cp .env.example .env
   ```

4. Seed the Database with dummy contacts:
   ```bash
   cd ../server
   npm run seed
   ```

5. Run the development servers:
   - Server: `npm run dev` in the `server` directory (Runs on: http://localhost:5000)
   - Client: `npm run dev` in the `client` directory (Runs on: http://localhost:5173)

### API Endpoints

| HTTP | Route                     | Protected | Description                     |
|------|---------------------------|-----------|---------------------------------|
| POST | `/api/auth/register`      | No        | Register a new user account     |
| POST | `/api/auth/login`         | No        | Authenticate user and get token |
| GET  | `/api/auth/me`            | Yes       | Get current user details        |
| GET  | `/api/contacts`           | Yes       | Get contacts with pagination    |
| POST | `/api/contacts`           | Yes       | Add a new contact               |
| GET  | `/api/contacts/:id`       | Yes       | Specific contact details        |
| PUT  | `/api/contacts/:id`       | Yes       | Update a contact                |
| DEL  | `/api/contacts/:id`       | Yes       | Soft-delete contact to trash    |
| GET  | `/api/contacts/trash`     | Yes       | Retrieve deleted contacts       |
| POST | `/api/contacts/:id/restore`| Yes     | Restore a soft-deleted contact  |
| GET  | `/api/contacts/stats`     | Yes       | Get statistics for user contacts|

## Deployment Instructions

### Render (Backend)
1. Push your code to GitHub.
2. Sign up on [Render.com](https://render.com) and create a New Web Service.
3. Select your repository, connect the `server` root directory.
4. Add environment variables (`MONGO_URI`, `JWT_SECRET`, `CLIENT_URL` point to your frontend).
5. Build CMD: `npm install`, Start CMD: `npm start`.
6. Deploy your application. Make sure MongoDB Atlas IP Whitelisting is configured to `0.0.0.0/0`.

### Vercel (Frontend)
1. Go to [Vercel](https://vercel.com/new).
2. Select your repository with the `client` directory as your root.
3. Configure Environment Variables (`VITE_API_URL` -> Your Render backend URL).
4. Deploy the application. The build sequence is `npm run build` implicitly.

## License

This project is MIT Licensed.
