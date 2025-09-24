# Luxe Lens - Redwood.js Full-Stack Application

A modern full-stack web application built with Redwood.js, TypeScript, and Yarn.

## 🚀 Quick Start

### Prerequisites

- Node.js 20.x (recommended)
- Yarn 4.6.0+

### Installation

```bash
# Install dependencies
yarn install

# Set up the database
yarn db:generate
yarn db:push
```

## 📜 Available Scripts

### Development Scripts

#### Start Both Frontend and Backend Together

```bash
# Start both frontend and backend simultaneously
yarn dev
```

#### Start Frontend and Backend Separately

```bash
# Start only the frontend (React app)
yarn dev:frontend

# Start only the backend (API server)
yarn dev:backend
```

### Build and Production Scripts

```bash
# Build the entire application
yarn build

# Start the production server
yarn start
```

### Testing Scripts

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test:watch
```

### Code Quality Scripts

```bash
# Run linting
yarn lint

# Fix linting issues automatically
yarn lint:fix

# Run TypeScript type checking
yarn type-check
```

### Database Scripts

```bash
# Generate Prisma client
yarn db:generate

# Push schema changes to database
yarn db:push

# Create and run database migrations
yarn db:migrate

# Seed the database with sample data
yarn db:seed

# Reset the database (⚠️ This will delete all data)
yarn db:reset
```

## 🏗️ Project Structure

```
├── api/                 # Backend API (GraphQL)
│   ├── db/             # Database schema and migrations
│   ├── src/
│   │   ├── functions/  # Serverless functions
│   │   ├── graphql/    # GraphQL schema and resolvers
│   │   ├── lib/        # Shared utilities
│   │   └── services/   # Business logic
├── web/                # Frontend (React)
│   ├── public/         # Static assets
│   └── src/
│       ├── components/ # React components
│       ├── layouts/    # Page layouts
│       ├── pages/      # Page components
│       └── Routes.tsx  # Routing configuration
├── scripts/            # Utility scripts
└── package.json        # Root package configuration
```

## 🛠️ Technology Stack

- **Framework**: Redwood.js
- **Frontend**: React 18, TypeScript
- **Backend**: GraphQL, Prisma ORM
- **Database**: SQLite (development), PostgreSQL (production)
- **Package Manager**: Yarn 4.6.0
- **Build Tool**: Vite

## 🌐 Development URLs

- **Frontend**: http://localhost:8910
- **Backend API**: http://localhost:8911
- **GraphQL Playground**: http://localhost:8911/graphql

## 📝 Getting Started

1. **Clone and install dependencies**:

   ```bash
   git clone <your-repo-url>
   cd luxe-lens
   yarn install
   ```

2. **Set up the database**:

   ```bash
   yarn db:generate
   yarn db:push
   ```

3. **Start development servers**:

   ```bash
   # Option 1: Start both together
   yarn dev

   # Option 2: Start separately
   yarn dev:frontend  # Terminal 1
   yarn dev:backend   # Terminal 2
   ```

4. **Open your browser**:
   - Frontend: http://localhost:8910
   - GraphQL Playground: http://localhost:8911/graphql

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="file:./dev.db"

# Authentication (if using)
REDWOOD_ENV_AUTH_PROVIDER="dbAuth"
```

### TypeScript Configuration

- Root: `tsconfig.json`
- API: `api/tsconfig.json`
- Web: `web/tsconfig.json`

## 🚀 Deployment

### Build for Production

```bash
yarn build
```

### Deploy

Redwood.js applications can be deployed to various platforms:

- Vercel
- Netlify
- AWS
- Railway
- And more...

## 📚 Learn More

- [Redwood.js Documentation](https://redwoodjs.com/docs)
- [Redwood.js Tutorial](https://redwoodjs.com/docs/tutorial/foreword)
- [GraphQL Documentation](https://graphql.org/learn/)
- [Prisma Documentation](https://www.prisma.io/docs)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests: `yarn test`
5. Run linting: `yarn lint`
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
