# RevoShop

RevoShop is a comprehensive industrial safety equipment e-commerce platform built with Next.js. The application provides a complete solution for purchasing certified PPE and industrial safety products, featuring both customer-facing shopping capabilities and administrative management tools.

## Features

- Product catalog with category filtering and search
- Product details with specifications and features
- Shopping cart functionality
- User authentication and authorization (Admin/User roles)
- Admin dashboard for managing products, orders, users, and settings
- Promotional campaigns and discount management
- Customer testimonials section
- Responsive design for mobile and desktop

## Technology Stack

- **Framework**: Next.js 15.3.3 with App Router
- **Language**: TypeScript 5.8.3
- **Styling**: Tailwind CSS 4.1.8
- **Authentication**: NextAuth.js 5.0.0-beta.28 with JWT strategy
- **UI Components**: Custom components with Lucide React icons
- **Backend Data**: JSON-based data store
- **Package Manager**: Bun

## Live Demo

Access the live application at: https://revoshop.naz-ahtamir.site/

## Demo Credentials

**Admin Login:**
- Email: admin@revoshop.com
- Password: admin123

**User Login:**
- Email: user@revoshop.com
- Password: user123

## Project Structure

```
app/
├── admin/              # Admin dashboard pages
├── api/               # API routes (Auth, Products, Settings)
├── cart/              # Shopping cart page
├── products/          # Product catalog and details
├── login/             # User login
├── register/          # User registration
├── faq/               # Frequently asked questions
├── promo/             # Promotional offers
├── layout.tsx         # Root layout
└── page.tsx           # Homepage

components/            # React components
├── admin/            # Admin-specific components
├── Navbar.tsx        # Navigation header
├── Footer.tsx        # Footer component
└── ProductCard.tsx   # Product display component

lib/                   # Utility functions
├── cart.ts           # Cart state management
├── data.ts           # Data fetching functions
├── format.ts         # Formatting utilities (currency, etc.)
└── types.ts          # TypeScript type definitions

data/                  # Static data files
├── products.json     # Product catalog
├── orders.json       # Order data
├── users.json        # User data
└── settings.json     # Store settings
```

## Available Scripts

- `bun dev` - Start development server
- `bun build` - Build for production
- `bun start` - Start production server
- `bun lint` - Run ESLint
- `bun seed:passwords` - Hash user passwords

## Authentication

The application implements role-based access control:

- **Customers**: Can browse products, add to cart, and place orders
- **Admins**: Can access `/admin/*` routes to manage the store

Admin access is restricted to users with the "ADMIN" role via JWT tokens.