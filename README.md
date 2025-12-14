# 📝 Docs

A modern, real-time collaborative document editor with Google Docs-like functionality supporting multiple simultaneous collaborators.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

## ✨ Features

- **Real-time collaboration** - Multiple users can edit simultaneously with live cursors and presence indicators
- **Rich text editing** - Full-featured editor with formatting, tables, images, links, and more
- **Document management** - Create, search, organize with personal and team workspaces
- **Threaded comments** - Add discussions to specific document sections
- **Template gallery** - Quick start with pre-designed templates
- **Dark mode** - Built-in theme switching
- **Responsive design** - Works on desktop and mobile

## 🛠️ Tech Stack

**Frontend**

- [Next.js 16](https://nextjs.org/) - React framework with App Router
- [React 19](https://react.dev/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [shadcn/ui](https://ui.shadcn.com/) - UI components

**Real-Time & Editor**

- [Liveblocks](https://liveblocks.io/) - Real-time collaboration infrastructure
- [Tiptap](https://tiptap.dev/) - Headless rich text editor

**Backend & Auth**

- [Convex](https://www.convex.dev/) - Backend-as-a-Service with real-time database
- [Clerk](https://clerk.com/) - Authentication and user management

**State & Forms**

- [Zustand](https://zustand-demo.pmnd.rs/) - State management
- [React Hook Form](https://react-hook-form.com/) - Form handling
- [Zod](https://zod.dev/) - Schema validation

## 🚀 Getting Started

### Prerequisites

- Node.js 20+ or Bun

### Installation

1. Clone and install dependencies:

   ```bash
   git clone <repository-url>
   cd docs
   npm install
   ```

2. Create `.env.local` with your API keys:

   ```env
   # Convex
   CONVEX_DEPLOYMENT=
   NEXT_PUBLIC_CONVEX_URL=

   # Clerk
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
   CLERK_SECRET_KEY=
   CLERK_JWT_ISSUER_DOMAIN=

   # Liveblocks
   LIVEBLOCKS_SECRET_KEY=
   NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY=
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000)

## 📂 Project Structure

```
docs/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (home)/            # Document list
│   │   └── documents/         # Document editor
│   ├── components/            # React components
│   ├── hooks/                 # Custom hooks
│   └── extensions/            # Tiptap extensions
├── convex/                    # Backend (queries, mutations, schema)
└── liveblocks.config.ts       # Liveblocks types
```

## 🔑 How It Works

- **Permissions**: Documents can be personal or organizational with role-based access control
- **Real-time sync**: Liveblocks + Tiptap collaboration for conflict-free editing with CRDTs
- **Search**: Full-text search powered by Convex indexes
- **Templates**: Pre-designed starting points with customizable content

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🙏 Acknowledgments

Built with [Next.js](https://nextjs.org/), [Liveblocks](https://liveblocks.io/), [Tiptap](https://tiptap.dev/), [Convex](https://www.convex.dev/), [Clerk](https://clerk.com/), and [shadcn/ui](https://ui.shadcn.com/).
