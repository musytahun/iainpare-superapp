## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.




STRUKTUR FOLDER FRONTEND
superapps/
│── backend-django/                 # Django + Strawberry GraphQL
│   ├── apps/                       # Django apps per domain (auth, users, etc.)
│   ├── backend/                    # Core project
│   ├── schema/                     # Strawberry schemas per app
│   └── manage.py
│
│── frontend-next/                  # Next.js
│   ├── src/                        
│   │   ├── app/                        # Next.js App Router
│   │   │   ├── (auth)/                 # Public auth pages
│   │   │   │   ├── login/              # /login
│   │   │   │   └── register/           # /register
│   │   │   │
│   │   │   ├── (dashboard)/            # Protected routes
│   │   │   │   ├── dashboard/          # /dashboard
│   │   │   │   └── users/              # /users
│   │   |   |        ├── page.tsx           # list all users (READ)
│   │   |   |        ├── create/
│   │   |   |        │   └── page.tsx       # create new user (CREATE)
│   │   |   |        ├── [id]/
│   │   |   |        │   ├── page.tsx       # detail user by id (READ detail)
│   │   |   |        │   └── edit/
│   │   |   |        │       └── page.tsx   # edit user (UPDATE)
│   │   |   |        └── layout.tsx         # layout khusus untuk modul users (optional)
│   │   │   │
│   │   │   └── layout.tsx              # Root layout
│   │   │
│   │   ├── components/                 # Shared UI components
│   |   |    ├── ErrorMessage.tsx  
│   |   |    ├── LoadingSpinner.tsx     
│   |   |    ├── QueryHandler.tsx
│   |   |    └── skeletons/    
│   |   |        └── TableSkeleton.tsx  # Skeleton Loader (otomatis muncul saat loading)  
│   |   |
│   │   ├── graphql/                    # Apollo queries, mutations, fragments
│   |   |    ├── auth.graphql.ts  
│   |   |    ├── users.graphql.ts       # Isinya query/mutation per domain
│   |   |    └── fragments/
│   │   │        ├── auth.fragment.ts   # potongan reusable field selection      
│   |   |        └── user.fragment.ts   
│   |   |
│   │   ├── lib/                        # Utilities, helpers (auth, fetcher, etc.)
│   |   |    ├── auth.ts                # Menyimpan & membaca token login dari localStorage (di client) atau cookies (di server)
│   |   |    └── apollo-client.ts 
│   |   |
│   │   ├── hooks/                      # Custom React hooks (useAuth, useUser, etc.)
│   │   ├── middleware.ts               # Proteksi semua route dalam (dashboard) agar tidak bisa diakses tanpa login
│   │   └── styles/                     # Global styles
│   │
│   │── infrastructure/                 # Docker, CI/CD, configs
│   └── README.md