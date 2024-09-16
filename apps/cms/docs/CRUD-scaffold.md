# CURD scaffold 

---

```sh
prisma/
┣ schema.prisma          # Model schemas
 ```

```sh
src/app/api
┣ orders/                # Routes present for Views layer
┃ ┗ route.ts
┣ _controllers/          # Controllers
┃ ┗ order.controller.ts
┣ _repos/                # Repositories (Associate to Models layer)
┃ ┗ order.repo.ts
┣ _services/             # Services
┃ ┗ order.service.ts
 ```

## Backend Architecture: MVCS Architecture

## This document using for help creating CRUD route for NextJS app with built-in API

### Assume that you're creating new CRUD action for Order table.

### Follow the steps bellow and rely on existing files to create you own.

# 1. Create Model

### Note: Because Prisma do not provide original tool to separate scheme to smaller file. So you should create Model in only one file

### File path: `prisma/schema.prisma`

# 2. Create repository to interactive with Database. This is thin layer between Service and Model

### Folder path: `src/api/_repos/`

### Example: Create `order.repo.ts` file

# 3. Create Service. This provide business logic for input data

### Folder path: `src/api/_services/`

### Example: Create `order.service.ts` file

# 4. Create Controller. This handle receiving and returning data

### Folder path: `src/api/_controlers`

### Example: Create `order.controller.ts`

# 5. Create Route. This navigate request to the resource needed

### Folder path: `src/api/`

### Example: Create `src/api/orders/route.ts`

### For more details: [https://nextjs.org/docs/app/building-your-application/routing/route-handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
