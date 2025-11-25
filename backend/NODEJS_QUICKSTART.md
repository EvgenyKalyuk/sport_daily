# Node.js Backend - Быстрый старт

## Выбор стека и структуры

### Рекомендуемый стек для проекта Sport Daily

**Вариант 1: Express + TypeScript + Prisma (Рекомендуется для начала)**

```json
{
  "framework": "Express.js",
  "language": "TypeScript",
  "orm": "Prisma",
  "database": "PostgreSQL",
  "validation": "Zod",
  "auth": "JWT + bcrypt",
  "testing": "Vitest",
  "packageManager": "pnpm"
}
```

**Вариант 2: NestJS + TypeScript + Prisma (Для крупных проектов)**

```json
{
  "framework": "NestJS",
  "language": "TypeScript",
  "orm": "Prisma",
  "database": "PostgreSQL",
  "validation": "class-validator",
  "auth": "@nestjs/passport + JWT",
  "testing": "Vitest",
  "packageManager": "pnpm"
}
```

## Рекомендуемая структура проекта

### Express.js (Модульная структура)

```
backend/
├── src/
│   ├── config/              # Конфигурация
│   ├── modules/             # Бизнес-модули (auth, users, workouts)
│   ├── shared/              # Общие утилиты и middleware
│   ├── database/            # Prisma схема и миграции
│   ├── app.ts               # Настройка Express
│   └── server.ts            # Запуск сервера
├── tests/
├── .env.example
├── package.json
└── tsconfig.json
```

### NestJS (Официальная структура)

```
backend/
├── src/
│   ├── main.ts              # Точка входа
│   ├── app.module.ts        # Корневой модуль
│   ├── config/              # Конфигурация
│   ├── common/              # Общие модули (guards, filters, pipes)
│   ├── modules/             # Бизнес-модули (auth, users, workouts)
│   └── database/            # Prisma
├── tests/
├── .env.example
├── package.json
└── nest-cli.json
```

## Шаги для начала работы

### 1. Инициализация проекта

```bash
# Создать папку и перейти в неё
mkdir backend && cd backend

# Инициализировать package.json
pnpm init

# Или с npm
npm init -y
```

### 2. Установка зависимостей

#### Express вариант:
```bash
# Основные зависимости
pnpm add express
pnpm add -D typescript @types/node @types/express tsx

# Prisma
pnpm add -D prisma
pnpm add @prisma/client

# Валидация
pnpm add zod

# Аутентификация
pnpm add jsonwebtoken bcrypt
pnpm add -D @types/jsonwebtoken @types/bcrypt

# Переменные окружения
pnpm add dotenv

# Логирование
pnpm add pino pino-pretty

# Тестирование
pnpm add -D vitest @vitest/ui supertest
pnpm add -D @types/supertest

# Линтинг и форматирование
pnpm add -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
pnpm add -D prettier eslint-config-prettier
```

#### NestJS вариант:
```bash
# NestJS CLI
pnpm add -g @nestjs/cli

# Создать проект
nest new backend

# Или установить зависимости вручную
pnpm add @nestjs/core @nestjs/common @nestjs/platform-express
pnpm add reflect-metadata rxjs

# Prisma
pnpm add -D prisma
pnpm add @prisma/client
pnpm add nestjs-prisma

# Валидация
pnpm add class-validator class-transformer

# Аутентификация
pnpm add @nestjs/passport @nestjs/jwt passport passport-jwt
pnpm add bcrypt
pnpm add -D @types/passport-jwt @types/bcrypt

# Конфигурация
pnpm add @nestjs/config

# Swagger
pnpm add @nestjs/swagger swagger-ui-express

# Тестирование
pnpm add -D @nestjs/testing vitest
```

### 3. Настройка TypeScript

Создать `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "lib": ["ES2022"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "moduleResolution": "node",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "tests"]
}
```

### 4. Настройка Prisma

```bash
# Инициализировать Prisma
npx prisma init

# Создать схему в prisma/schema.prisma
```

Пример `schema.prisma`:
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  username  String   @unique
  password  String
  fullName  String?  @map("full_name")
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  workouts Workout[]

  @@map("users")
}

model Workout {
  id        String    @id @default(uuid())
  userId    String    @map("user_id")
  name      String
  date      DateTime
  duration  Int?
  type      String?
  notes     String?
  createdAt DateTime  @default(now()) @map("created_at")
  updatedAt DateTime  @updatedAt @map("updated_at")

  user     User       @relation(fields: [userId], references: [id])
  exercises Exercise[]

  @@map("workouts")
}

model Exercise {
  id        String   @id @default(uuid())
  workoutId String   @map("workout_id")
  name      String
  sets      Int?
  reps      Int?
  weight    Float?
  duration  Int?
  restTime  Int?     @map("rest_time")
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  workout Workout @relation(fields: [workoutId], references: [id])

  @@map("exercises")
}
```

### 5. Настройка переменных окружения

Создать `.env`:
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/sport_daily?schema=public"

# JWT
JWT_SECRET="your-secret-key-change-in-production"
JWT_EXPIRES_IN="15m"
JWT_REFRESH_SECRET="your-refresh-secret-key"
JWT_REFRESH_EXPIRES_IN="7d"

# Server
PORT=3000
NODE_ENV=development

# CORS
CORS_ORIGIN="http://localhost:5173"
```

### 6. Создать базовую структуру

#### Express пример (`src/server.ts`):
```typescript
import express from 'express';
import { config } from './config/env';
import { errorHandler } from './shared/middleware/errorHandler';

const app = express();

app.use(express.json());

// Routes
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Error handling
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
```

#### NestJS пример (`src/main.ts`):
```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe());
  
  await app.listen(3000);
}
bootstrap();
```

### 7. Скрипты в package.json

```json
{
  "scripts": {
    "dev": "tsx watch src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate dev",
    "prisma:studio": "prisma studio",
    "lint": "eslint src --ext .ts",
    "format": "prettier --write \"src/**/*.ts\""
  }
}
```

## Следующие шаги

1. **Настроить Prisma** - создать миграции и сгенерировать клиент
2. **Создать модуль аутентификации** - регистрация, вход, JWT токены
3. **Создать модули для бизнес-логики** - users, workouts, exercises
4. **Настроить валидацию** - Zod схемы или DTO
5. **Добавить тесты** - unit и integration тесты
6. **Настроить CI/CD** - GitHub Actions или другой
7. **Добавить документацию API** - Swagger/OpenAPI

## Полезные команды

```bash
# Разработка
pnpm dev

# Сборка
pnpm build

# Запуск production
pnpm start

# Тесты
pnpm test

# Prisma
pnpm prisma:generate    # Генерация клиента
pnpm prisma:migrate     # Создание миграций
pnpm prisma:studio      # Открыть Prisma Studio

# Линтинг
pnpm lint
pnpm format
```

## Дополнительная документация

- [NODEJS_STACK.md](./NODEJS_STACK.md) - Подробное описание стека
- [NODEJS_STRUCTURE.md](./NODEJS_STRUCTURE.md) - Детальное описание структур проектов
