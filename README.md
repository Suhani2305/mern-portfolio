# Full Stack Contact Form Application

A modern full-stack web application built with React, Express, and PostgreSQL, featuring a contact form with admin dashboard.

## 🚀 Features

- Beautiful and responsive contact form
- Secure admin dashboard to view messages
- PostgreSQL database integration with Neon
- Modern UI components using Radix UI
- TypeScript for type safety
- Tailwind CSS for styling

## 🛠️ Tech Stack

- **Frontend:**
  - React
  - TypeScript
  - Tailwind CSS
  - Radix UI Components
  - React Query
  - Framer Motion
  - React Hook Form

- **Backend:**
  - Node.js
  - Express
  - PostgreSQL (Neon)
  - Drizzle ORM
  - Zod for validation

## 📦 Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd <your-project-name>
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
DATABASE_URL="your_neon_database_url"
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="your_admin_password"
```

## 🚀 Development

To run the application in development mode:

```bash
npm run dev
```

This will start:
- Frontend development server
- Backend API server
- TypeScript compilation in watch mode

## 🏗️ Build

To build the application for production:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

## 📁 Project Structure

```
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── lib/
├── server/
│   ├── services/
│   ├── routes.ts
│   └── index.ts
├── shared/
│   └── schema.ts
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 🔐 Admin Access

Access the admin dashboard at `/admin/messages` with:
- Username: Set in ADMIN_USERNAME env variable
- Password: Set in ADMIN_PASSWORD env variable

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run check` - Run TypeScript checks
- `npm run db:push` - Update database schema

## 🔧 Environment Variables

Required environment variables:
- `DATABASE_URL`: Your Neon PostgreSQL connection string
- `ADMIN_USERNAME`: Username for admin dashboard
- `ADMIN_PASSWORD`: Password for admin dashboard

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## Additional Projects

- **SecureFile**: A highly secure and user-friendly file management system designed for privacy, accessibility, and seamless collaboration. Built using TypeScript, React, and Express. [GitHub Link](https://github.com/Suhani2305/SecureFile)

- **EchoRead**: A modern reading platform with features like user authentication, cloud sync, and AI-powered recommendations. [GitHub Link](https://github.com/Suhani2305/EchoRead)

- **AirIndexAnalysis**: A project focused on analyzing air quality indices. [GitHub Link](https://github.com/Suhani2305/AirIndexAnalysis)

- **Plate2Share**: A project connecting NGOs with hotels and restaurants to manage and share excess food, reducing waste. [GitHub Link](https://github.com/Suhani2305/Plate2Share) 