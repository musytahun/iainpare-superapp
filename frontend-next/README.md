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
│   │   │   ├── (admin)/                 
│   │   │   │   ├── permissions/          
│   │   |   |   |    ├── page.tsx           
│   │   |   |   |    ├── create/
│   │   |   |   |    │   └── page.tsx       
│   │   |   |   |    └── [id]/
│   │   |   |   |        └── page.tsx       
│   │   │   │   ├── roles/              
│   │   |   |   |    ├── page.tsx           
│   │   |   |   |    ├── create/
│   │   |   |   |    │   └── page.tsx       
│   │   |   |   |    └── [id]/
│   │   |   |   |        └── page.tsx       
│   │   │   │   └── users/              
│   │   |   |        ├── page.tsx       
│   │   |   |        ├── create/
│   │   |   |        │   └── page.tsx    
│   │   |   |        └── [id]/
│   │   |   |            └── page.tsx       
│   │   |   |        
│   │   │   ├── (auth)/                 # Public auth pages
│   │   │   │   ├── login/              
│   │   │   │   └── register/           
│   │   │   │
│   │   │   ├── (dashboard)/            # Protected routes
│   │   │   │   └── dashboard/          
│   │   │   │
│   │   │   └── layout.tsx              # Root layout
│   │   │
│   │   ├── components/                 # Shared UI components
│   |   |    ├── permissions/    
│   |   |    |   ├── PermissionForm.tsx 
│   |   |    |   └── PermissionList.tsx   
│   |   |    ├── roles/    
│   |   |    |   ├── RoleForm.tsx 
│   |   |    |   └── RoleList.tsx   
│   |   |    ├── users/    
│   |   |    |   ├── UserForm.tsx 
│   |   |    |   └── UserList.tsx   
│   |   |    |   
│   |   |    ├── ErrorMessage.tsx  
│   |   |    ├── LoadingSpinner.tsx     
│   |   |    ├── QueryHandler.tsx
│   |   |    └── skeletons/    
│   |   |        └── TableSkeleton.tsx  # Skeleton Loader (otomatis muncul saat loading)  
│   |   |
│   │   ├── graphql/                    # Apollo queries, mutations, fragments
│   |   |    ├── auth.graphql.ts  
│   |   |    ├── permissions.graphql.ts 
│   |   |    ├── roles.graphql.ts       
│   |   |    ├── users.graphql.ts       
│   |   |    └── fragments/
│   │   │        ├── auth.fragment.ts   # potongan reusable field selection      
│   |   |        └── user.fragment.ts   
│   |   |
│   │   ├── lib/                        # Utilities, helpers (auth, fetcher, etc.)
│   |   |    ├── auth.ts                # Menyimpan & membaca token login dari localStorage (di client) atau cookies (di server)
│   |   |    └── apollo-client.ts 
│   |   |
│   │   └── middleware.ts               # Proteksi semua route dalam (dashboard) agar tidak bisa diakses tanpa login
│   │
│   │── infrastructure/                 # Docker, CI/CD, configs
│   └── README.md