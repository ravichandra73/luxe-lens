# 🚀 Quick Start Guide - Luxe Lens

## Prerequisites

- Node.js 20.x (recommended)
- Yarn 4.6.0+

## Installation & Setup

```bash
# Install dependencies
yarn install

# Set up the database
yarn db:generate
yarn db:push
yarn db:seed
```

## Starting the Application

### Option 1: Interactive Start (Recommended)

```bash
yarn start
```

This will show you a menu to choose how to start the application.

### Option 2: Direct Commands

#### Start Both Frontend and Backend Together

```bash
yarn dev
```

#### Start Frontend Only (React App)

```bash
yarn dev:frontend
```

#### Start Backend Only (GraphQL API)

```bash
yarn dev:backend
```

## Access Points

- **Frontend**: http://localhost:8910
- **Backend API**: http://localhost:8911
- **GraphQL Playground**: http://localhost:8911/graphql

## What You'll See

1. **Beautiful Homepage**: A modern, responsive design showcasing the application
2. **Sample Data**: 4 sample posts loaded from the GraphQL API
3. **Real-time Updates**: Hot reloading for both frontend and backend
4. **Type Safety**: Full TypeScript support throughout the stack

## Available Scripts

| Command             | Description                     |
| ------------------- | ------------------------------- |
| `yarn start`        | Interactive start menu          |
| `yarn dev`          | Start both frontend and backend |
| `yarn dev:frontend` | Start only frontend             |
| `yarn dev:backend`  | Start only backend              |
| `yarn build`        | Build for production            |
| `yarn test`         | Run tests                       |
| `yarn lint`         | Run linting                     |
| `yarn db:seed`      | Seed database with sample data  |

## Technology Stack

- **Framework**: Redwood.js 8.8.1
- **Frontend**: React 18, TypeScript, Vite
- **Backend**: GraphQL, Prisma ORM
- **Database**: SQLite (dev), PostgreSQL (prod)
- **Package Manager**: Yarn 4.6.0
- **Styling**: Tailwind CSS (via CDN)

## Next Steps

1. Explore the GraphQL playground at http://localhost:8911/graphql
2. Check out the generated files in `api/src/services/posts/`
3. Modify the homepage in `web/src/pages/HomePage/HomePage.tsx`
4. Add new models to `api/db/schema.prisma`
5. Create new pages with `yarn rw generate page <name>`

## Troubleshooting

- If you get Node.js version warnings, consider using Node.js 20.x
- If the database isn't working, run `yarn db:push` and `yarn db:seed`
- If ports are busy, check what's running on 8910 and 8911

Happy coding! 🎉
