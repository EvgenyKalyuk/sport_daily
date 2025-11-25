# Актуальный стек для Node.js приложения

## Обзор

Данный документ описывает современный технологический стек для разработки Node.js backend приложений в 2024-2025 году.

## Ядро

### Runtime и язык

- **Node.js** (v20.x LTS или v22.x) - современный JavaScript runtime
  - Рекомендуется использовать LTS версию для стабильности
  - Поддержка ES модулей (ESM) из коробки
  - Встроенные тестовые утилиты (test runner)

- **TypeScript** (v5.x) - типизированный JavaScript
  - Строгая типизация для надежности кода
  - Улучшенная поддержка IDE
  - Компиляция в современный JavaScript

### Менеджер пакетов

- **pnpm** (рекомендуется) или **npm** / **yarn**
  - `pnpm` - быстрый, эффективное использование дискового пространства
  - Строгий контроль зависимостей
  - Workspace support для монорепозиториев

## Веб-фреймворки

### Express.js (минималистичный подход)

**Плюсы:**
- Простота и гибкость
- Огромная экосистема middleware
- Легковесный
- Быстрый старт

**Минусы:**
- Нужно самостоятельно структурировать проект
- Нет встроенной архитектуры

**Когда использовать:**
- Небольшие и средние проекты
- Когда нужна максимальная гибкость
- Микросервисы

### NestJS (enterprise подход)

**Плюсы:**
- Архитектура из коробки (модули, контроллеры, сервисы)
- Встроенная поддержка TypeScript
- Dependency Injection
- Интеграция с множеством библиотек
- Отличная документация

**Минусы:**
- Больше boilerplate кода
- Кривая обучения выше

**Когда использовать:**
- Крупные проекты
- Команды, которым нужна структурированная архитектура
- Долгосрочная поддержка

### Fastify (высокая производительность)

**Плюсы:**
- Очень быстрый (быстрее Express)
- Встроенная валидация схем
- TypeScript support
- Плагинная архитектура

**Минусы:**
- Меньше middleware в экосистеме
- Меньше сообщество чем у Express

**Когда использовать:**
- Высоконагруженные приложения
- API-first приложения
- Когда производительность критична

## База данных

### ORM / Query Builders

#### Prisma (рекомендуется для новых проектов)

**Плюсы:**
- Отличная TypeScript поддержка
- Миграции из коробки
- Prisma Studio (GUI для БД)
- Type-safe запросы
- Простая схема данных

**Минусы:**
- Меньше гибкости для сложных запросов
- Требует генерации клиента

**Поддерживаемые БД:**
- PostgreSQL (рекомендуется)
- MySQL
- SQLite
- MongoDB
- SQL Server

#### TypeORM (традиционный подход)

**Плюсы:**
- Декораторы для моделей
- Активный Record паттерн
- Поддержка множества БД
- Зрелая экосистема

**Минусы:**
- Менее типобезопасен чем Prisma
- Более сложные миграции

#### Drizzle ORM (современная альтернатива)

**Плюсы:**
- Легковесный
- Отличная TypeScript поддержка
- SQL-like синтаксис
- Быстрый

**Минусы:**
- Меньше документации
- Меньше сообщество

### Базы данных

- **PostgreSQL** (рекомендуется)
  - Надежная реляционная БД
  - JSON поддержка
  - Расширения (PostGIS, pgvector)
  - Отличная производительность

- **MongoDB** (для документно-ориентированных данных)
  - Гибкая схема
  - Горизонтальное масштабирование
  - Mongoose ODM

## Валидация данных

- **Zod** (рекомендуется)
  - TypeScript-first валидация
  - Type inference
  - Простой синтаксис
  - Runtime валидация

- **Joi** (альтернатива)
  - Зрелая библиотека
  - Богатый набор валидаторов
  - Хорошая документация

- **class-validator** (для NestJS)
  - Декораторы для валидации
  - Интеграция с TypeORM
  - DTO валидация

## Аутентификация и авторизация

- **JWT (jsonwebtoken)** - токены для stateless аутентификации
- **bcrypt** или **argon2** - хеширование паролей
- **Passport.js** - стратегии аутентификации (локальная, OAuth, JWT)
- **@nestjs/passport** - для NestJS проектов

## API документация

- **Swagger/OpenAPI** (Swagger UI)
  - `swagger-jsdoc` + `swagger-ui-express` (для Express)
  - `@nestjs/swagger` (для NestJS)
  - Автоматическая генерация из декораторов/комментариев

## Тестирование

- **Vitest** (рекомендуется) или **Jest**
  - Быстрый test runner
  - ESM поддержка
  - TypeScript из коробки
  - Совместим с Jest API

- **Supertest** - HTTP assertions для тестирования API
- **Playwright** или **Puppeteer** - E2E тестирование

## Логирование

- **Winston** или **Pino** (рекомендуется)
  - Структурированное логирование
  - Разные уровни логов
  - Транспорты (файлы, консоль, внешние сервисы)
  - Pino - очень быстрый

## Окружение и конфигурация

- **dotenv** - переменные окружения
- **config** или **@nestjs/config** - управление конфигурацией
- **zod** для валидации переменных окружения

## Миграции БД

- **Prisma Migrate** (для Prisma)
- **TypeORM Migrations** (для TypeORM)
- **Alembic** (если используется Python в части проекта)

## Валидация HTTP запросов

- **express-validator** (для Express)
- **class-validator** + **class-transformer** (для NestJS)
- **Zod** с middleware

## Обработка ошибок

- **Custom error classes** - структурированная обработка ошибок
- **express-async-errors** (для Express) - автоматическая обработка async ошибок
- **NestJS Exception Filters** (для NestJS)

## Безопасность

- **helmet** - HTTP заголовки безопасности
- **express-rate-limit** - ограничение частоты запросов
- **cors** - настройка CORS
- **express-validator** - защита от injection атак
- **bcrypt** / **argon2** - безопасное хеширование паролей

## Мониторинг и отладка

- **Sentry** - отслеживание ошибок
- **Prometheus** + **Grafana** - метрики
- **Winston** / **Pino** - логирование

## Разработка

- **ESLint** - линтинг кода
- **Prettier** - форматирование кода
- **Husky** + **lint-staged** - pre-commit hooks
- **Commitlint** - валидация commit сообщений
- **TypeScript** - статическая типизация

## CI/CD

- **GitHub Actions** / **GitLab CI** / **CircleCI**
- **Docker** - контейнеризация
- **Docker Compose** - локальная разработка

## Рекомендуемый стек для проекта Sport Daily

### Вариант 1: Express + TypeScript + Prisma (минималистичный)

```json
{
  "runtime": "Node.js 20.x LTS",
  "language": "TypeScript 5.x",
  "framework": "Express.js",
  "orm": "Prisma",
  "database": "PostgreSQL",
  "validation": "Zod",
  "auth": "JWT + bcrypt",
  "testing": "Vitest + Supertest",
  "logging": "Pino",
  "docs": "Swagger"
}
```

### Вариант 2: NestJS + TypeScript + Prisma (enterprise)

```json
{
  "runtime": "Node.js 20.x LTS",
  "language": "TypeScript 5.x",
  "framework": "NestJS",
  "orm": "Prisma",
  "database": "PostgreSQL",
  "validation": "class-validator + class-transformer",
  "auth": "@nestjs/passport + JWT",
  "testing": "Vitest + @nestjs/testing",
  "logging": "NestJS Logger + Pino",
  "docs": "@nestjs/swagger"
}
```

## Сравнение производительности

| Framework | Requests/sec | Latency |
|-----------|--------------|---------|
| Fastify   | ~76,000      | ~1.3ms  |
| Express   | ~15,000      | ~6.7ms  |
| NestJS    | ~12,000      | ~8.3ms  |

*Примечание: Производительность зависит от множества факторов. Для большинства приложений разница не критична.*

## Рекомендации

1. **Для новых проектов**: Используйте **NestJS + Prisma + TypeScript**
   - Структурированная архитектура
   - Отличная TypeScript поддержка
   - Легко масштабировать

2. **Для небольших проектов**: Используйте **Express + Prisma + TypeScript**
   - Быстрый старт
   - Меньше boilerplate
   - Гибкость

3. **Для высоконагруженных API**: Используйте **Fastify + Prisma + TypeScript**
   - Максимальная производительность
   - Type-safe валидация

4. **Всегда используйте TypeScript** - это значительно улучшает качество кода

5. **Prisma рекомендуется** для новых проектов из-за отличной TypeScript поддержки

6. **PostgreSQL** - лучший выбор для большинства случаев

## Полезные ресурсы

- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NestJS Documentation](https://docs.nestjs.com)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
