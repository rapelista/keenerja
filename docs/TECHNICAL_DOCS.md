# FLOWN Technical Documentation

## Tech Stack Overview

FLOWN is built as a full-stack application using modern web technologies to support user management, workflows, and approvals.

### Chosen Technologies

- **Frontend/Backend**: Next.js – Provides server-side rendering, API routes, and a flexible framework for building dynamic UIs and handling business logic.
- **Database**: PostgreSQL – Relational database for storing users, organizations, workflows, and audit data with strong consistency.
- **Authentication**: Better Auth – Customizable auth library for role-based access (Owner, Operator, Member), multi-org support, and secure sessions without vendor lock-in.
- **Data Management**: TanStack DB – Unified database abstraction for queries, caching, and real-time updates, connecting directly to PostgreSQL for efficient data handling.
- **ORM**: Prisma – Type-safe database interactions with PostgreSQL, simplifying queries and migrations.
- **Build System**: Turborepo – Manages monorepo tasks, caching, and dependencies for scalable development (optional, add if splitting into multiple packages).

### Reasons for Stack

- **Next.js**: Ideal for full-stack development, enabling fast UI rendering and API integration for workflows.
- **PostgreSQL**: Reliable for complex relations (e.g., users-orgs-roles) and audit trails in approval systems.
- **Better Auth**: Chosen for flexibility in custom auth flows, better control over roles, and integration with Prisma.
- **TanStack DB**: Replaces Convex and TanStack Query for a streamlined approach—handles data fetching, caching, and real-time syncs on the edge, reducing server load and improving performance for dynamic forms and dashboards.
- **Prisma**: Ensures type safety and ease of use for database operations, reducing errors in development.
- **Turborepo**: Enhances efficiency in a monorepo setup by optimizing builds and task execution, ideal for future scaling.

This updated stack emphasizes simplicity and edge computing for FLOWN's user-centric features.
