# Структура проекта для Node.js приложения

## Обзор

Данный документ описывает рекомендуемые структуры проектов для Node.js backend приложений. Выбор структуры зависит от используемого фреймворка и размера проекта.

## Принципы организации кода

1. **Разделение ответственности** - каждый модуль отвечает за свою область
2. **Масштабируемость** - структура должна легко расширяться
3. **Тестируемость** - код должен быть легко тестируемым
4. **Читаемость** - понятная организация файлов и папок
5. **DRY (Don't Repeat Yourself)** - избегание дублирования кода

## Структура 1: Express.js (Модульная структура)

### Описание
Подходит для средних и крупных проектов на Express.js. Организация по доменам/модулям.

```
backend/
├── src/
│   ├── config/              # Конфигурация приложения
│   │   ├── database.ts      # Настройки БД
│   │   ├── env.ts           # Переменные окружения
│   │   └── constants.ts     # Константы
│   │
│   ├── modules/             # Бизнес-логика по модулям
│   │   ├── auth/
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.routes.ts
│   │   │   ├── auth.middleware.ts
│   │   │   ├── auth.schemas.ts      # Zod схемы
│   │   │   └── auth.types.ts
│   │   │
│   │   ├── users/
│   │   │   ├── users.controller.ts
│   │   │   ├── users.service.ts
│   │   │   ├── users.routes.ts
│   │   │   ├── users.schemas.ts
│   │   │   └── users.types.ts
│   │   │
│   │   ├── workouts/
│   │   │   ├── workouts.controller.ts
│   │   │   ├── workouts.service.ts
│   │   │   ├── workouts.routes.ts
│   │   │   ├── workouts.schemas.ts
│   │   │   └── workouts.types.ts
│   │   │
│   │   └── exercises/
│   │       ├── exercises.controller.ts
│   │       ├── exercises.service.ts
│   │       ├── exercises.routes.ts
│   │       ├── exercises.schemas.ts
│   │       └── exercises.types.ts
│   │
│   ├── shared/              # Общие утилиты и middleware
│   │   ├── middleware/
│   │   │   ├── errorHandler.ts
│   │   │   ├── auth.middleware.ts
│   │   │   ├── validation.middleware.ts
│   │   │   └── rateLimiter.ts
│   │   │
│   │   ├── utils/
│   │   │   ├── logger.ts
│   │   │   ├── errors.ts
│   │   │   ├── jwt.ts
│   │   │   └── hash.ts
│   │   │
│   │   └── types/
│   │       └── express.d.ts  # Расширение типов Express
│   │
│   ├── database/            # Работа с БД
│   │   ├── prisma/
│   │   │   ├── schema.prisma
│   │   │   └── migrations/
│   │   │
│   │   └── seed.ts          # Сидеры данных
│   │
│   ├── app.ts               # Настройка Express приложения
│   └── server.ts            # Точка входа (запуск сервера)
│
├── tests/                   # Тесты
│   ├── unit/
│   │   ├── modules/
│   │   └── shared/
│   │
│   ├── integration/
│   │   └── api/
│   │
│   └── fixtures/            # Тестовые данные
│
├── .env.example
├── .env
├── .gitignore
├── .eslintrc.js
├── .prettierrc
├── package.json
├── tsconfig.json
├── vitest.config.ts
└── README.md
```

### Преимущества
- Четкое разделение по модулям
- Легко найти код по функциональности
- Простое добавление новых модулей
- Хорошая масштабируемость

### Недостатки
- Может быть избыточно для маленьких проектов
- Требует дисциплины в организации

---

## Структура 2: NestJS (Рекомендуется для крупных проектов)

### Описание
Официальная структура NestJS с модулями, контроллерами, сервисами и DTO.

```
backend/
├── src/
│   ├── main.ts              # Точка входа
│   ├── app.module.ts        # Корневой модуль
│   │
│   ├── config/              # Конфигурация
│   │   ├── database.config.ts
│   │   ├── env.config.ts
│   │   └── swagger.config.ts
│   │
│   ├── common/              # Общие модули и утилиты
│   │   ├── decorators/
│   │   │   ├── roles.decorator.ts
│   │   │   └── current-user.decorator.ts
│   │   │
│   │   ├── filters/
│   │   │   └── http-exception.filter.ts
│   │   │
│   │   ├── guards/
│   │   │   ├── jwt-auth.guard.ts
│   │   │   └── roles.guard.ts
│   │   │
│   │   ├── interceptors/
│   │   │   ├── logging.interceptor.ts
│   │   │   └── transform.interceptor.ts
│   │   │
│   │   ├── pipes/
│   │   │   └── validation.pipe.ts
│   │   │
│   │   └── utils/
│   │       ├── logger.util.ts
│   │       └── hash.util.ts
│   │
│   ├── modules/             # Бизнес-модули
│   │   ├── auth/
│   │   │   ├── auth.module.ts
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── strategies/
│   │   │   │   ├── jwt.strategy.ts
│   │   │   │   └── local.strategy.ts
│   │   │   ├── dto/
│   │   │   │   ├── login.dto.ts
│   │   │   │   ├── register.dto.ts
│   │   │   │   └── refresh-token.dto.ts
│   │   │   └── interfaces/
│   │   │       └── jwt-payload.interface.ts
│   │   │
│   │   ├── users/
│   │   │   ├── users.module.ts
│   │   │   ├── users.controller.ts
│   │   │   ├── users.service.ts
│   │   │   ├── dto/
│   │   │   │   ├── create-user.dto.ts
│   │   │   │   ├── update-user.dto.ts
│   │   │   │   └── user-response.dto.ts
│   │   │   └── entities/
│   │   │       └── user.entity.ts
│   │   │
│   │   ├── workouts/
│   │   │   ├── workouts.module.ts
│   │   │   ├── workouts.controller.ts
│   │   │   ├── workouts.service.ts
│   │   │   ├── dto/
│   │   │   └── entities/
│   │   │
│   │   └── exercises/
│   │       ├── exercises.module.ts
│   │       ├── exercises.controller.ts
│   │       ├── exercises.service.ts
│   │       ├── dto/
│   │       └── entities/
│   │
│   └── database/            # Работа с БД
│       ├── prisma/
│       │   ├── schema.prisma
│       │   └── migrations/
│       │
│       ├── prisma.service.ts
│       └── seed.ts
│
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── .env.example
├── .env
├── .gitignore
├── nest-cli.json
├── package.json
├── tsconfig.json
├── tsconfig.build.json
└── README.md
```

### Преимущества
- Официальная структура NestJS
- Dependency Injection из коробки
- Четкое разделение слоев
- Отличная поддержка TypeScript
- Легко тестировать

### Недостатки
- Больше boilerplate кода
- Кривая обучения выше

---

## Структура 3: Feature-Sliced Design (FSD) для Backend

### Описание
Адаптация FSD архитектуры для backend. Организация по фичам и слоям.

```
backend/
├── src/
│   ├── app/                 # Инициализация приложения
│   │   ├── app.ts
│   │   ├── server.ts
│   │   └── bootstrap.ts
│   │
│   ├── shared/              # Общие ресурсы
│   │   ├── lib/            # Библиотеки и утилиты
│   │   │   ├── logger/
│   │   │   ├── errors/
│   │   │   ├── validation/
│   │   │   └── database/
│   │   │
│   │   ├── api/            # API клиенты
│   │   │   └── external/
│   │   │
│   │   ├── config/         # Конфигурация
│   │   │   ├── env.ts
│   │   │   └── database.ts
│   │   │
│   │   └── types/          # Общие типы
│   │       └── index.ts
│   │
│   ├── entities/           # Бизнес-сущности
│   │   ├── user/
│   │   │   ├── model/
│   │   │   │   └── user.entity.ts
│   │   │   ├── api/
│   │   │   │   └── user.repository.ts
│   │   │   └── lib/
│   │   │       └── user.utils.ts
│   │   │
│   │   └── workout/
│   │       ├── model/
│   │       ├── api/
│   │       └── lib/
│   │
│   ├── features/           # Фичи (use cases)
│   │   ├── auth/
│   │   │   ├── api/
│   │   │   │   ├── login.ts
│   │   │   │   ├── register.ts
│   │   │   │   └── refresh-token.ts
│   │   │   ├── model/
│   │   │   │   └── auth.types.ts
│   │   │   └── lib/
│   │   │       └── jwt.utils.ts
│   │   │
│   │   ├── create-workout/
│   │   │   ├── api/
│   │   │   ├── model/
│   │   │   └── ui/         # Если есть CLI команды
│   │   │
│   │   └── get-user-workouts/
│   │       ├── api/
│   │       └── model/
│   │
│   ├── widgets/           # Композитные блоки
│   │   ├── auth-form/
│   │   │   ├── api/
│   │   │   └── model/
│   │   │
│   │   └── workout-list/
│   │       ├── api/
│   │       └── model/
│   │
│   └── pages/             # Страницы/Эндпоинты
│       ├── auth/
│       │   ├── login/
│       │   │   └── route.ts
│       │   └── register/
│       │       └── route.ts
│       │
│       └── workouts/
│           ├── list/
│           │   └── route.ts
│           └── [id]/
│               └── route.ts
│
├── prisma/
│   ├── schema.prisma
│   └── migrations/
│
├── tests/
├── .env.example
├── package.json
└── tsconfig.json
```

### Преимущества
- Единообразие с frontend (если используется FSD)
- Четкое разделение по фичам
- Легко найти код по функциональности
- Хорошая изоляция модулей

### Недостатки
- Менее распространена для backend
- Требует понимания FSD концепций

---

## Структура 4: Clean Architecture / Hexagonal Architecture

### Описание
Организация по слоям с четким разделением бизнес-логики и инфраструктуры.

```
backend/
├── src/
│   ├── domain/             # Доменная логика (ядро)
│   │   ├── entities/       # Бизнес-сущности
│   │   │   ├── User.ts
│   │   │   ├── Workout.ts
│   │   │   └── Exercise.ts
│   │   │
│   │   ├── repositories/   # Интерфейсы репозиториев
│   │   │   ├── IUserRepository.ts
│   │   │   └── IWorkoutRepository.ts
│   │   │
│   │   └── services/       # Доменные сервисы
│   │       └── AuthService.ts
│   │
│   ├── application/        # Слой приложения (use cases)
│   │   ├── use-cases/
│   │   │   ├── auth/
│   │   │   │   ├── LoginUseCase.ts
│   │   │   │   ├── RegisterUseCase.ts
│   │   │   │   └── RefreshTokenUseCase.ts
│   │   │   │
│   │   │   └── workouts/
│   │   │       ├── CreateWorkoutUseCase.ts
│   │   │       └── GetUserWorkoutsUseCase.ts
│   │   │
│   │   └── dto/            # DTO для use cases
│   │       ├── LoginDTO.ts
│   │       └── CreateWorkoutDTO.ts
│   │
│   ├── infrastructure/      # Инфраструктурный слой
│   │   ├── database/
│   │   │   ├── prisma/
│   │   │   │   └── schema.prisma
│   │   │   │
│   │   │   └── repositories/
│   │   │       ├── UserRepository.ts
│   │   │       └── WorkoutRepository.ts
│   │   │
│   │   ├── http/           # HTTP слой
│   │   │   ├── controllers/
│   │   │   │   ├── AuthController.ts
│   │   │   │   └── WorkoutController.ts
│   │   │   │
│   │   │   ├── routes/
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   └── middleware/
│   │   │       ├── errorHandler.ts
│   │   │       └── auth.middleware.ts
│   │   │
│   │   └── config/
│   │       ├── database.config.ts
│   │       └── env.config.ts
│   │
│   └── main.ts             # Точка входа и DI контейнер
│
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── package.json
└── tsconfig.json
```

### Преимущества
- Четкое разделение слоев
- Независимость от фреймворков
- Легко тестировать
- Хорошая масштабируемость

### Недостатки
- Больше абстракций
- Может быть избыточно для простых проектов
- Требует понимания архитектурных паттернов

---

## Рекомендации по выбору структуры

### Маленький проект (< 10 эндпоинтов)
**Рекомендуется:** Простая модульная структура (Express)

```
src/
├── routes/
├── controllers/
├── services/
├── models/
└── utils/
```

### Средний проект (10-50 эндпоинтов)
**Рекомендуется:** Модульная структура Express или NestJS

- Express: Структура 1 (Модульная)
- NestJS: Структура 2 (Официальная NestJS)

### Крупный проект (> 50 эндпоинтов)
**Рекомендуется:** NestJS или Clean Architecture

- NestJS: Структура 2
- Clean Architecture: Структура 4

### Если frontend использует FSD
**Рекомендуется:** Структура 3 (FSD для Backend)

---

## Общие рекомендации

1. **Используйте TypeScript** - это значительно улучшает качество кода

2. **Разделяйте по модулям/фичам**, а не по типам файлов
   - ❌ Плохо: `controllers/`, `services/`, `models/`
   - ✅ Хорошо: `auth/`, `users/`, `workouts/`

3. **Используйте DTO/Schemas** для валидации входных данных
   - Zod для Express
   - class-validator для NestJS

4. **Выносите бизнес-логику в сервисы**, контроллеры только для HTTP

5. **Используйте репозитории** для работы с БД (абстракция над ORM)

6. **Тесты рядом с кодом** или в отдельной папке `tests/`

7. **Конфигурация в одном месте** - `config/` или `shared/config/`

8. **Общие утилиты в `shared/`** или `common/`

9. **Используйте barrel exports** (`index.ts`) для упрощения импортов

10. **Следуйте принципам SOLID**

---

## Примеры импортов

### Express (Модульная структура)
```typescript
// Хорошо
import { AuthService } from '@/modules/auth/auth.service';
import { validateRequest } from '@/shared/middleware/validation.middleware';

// Плохо
import { AuthService } from '../../../modules/auth/auth.service';
```

### NestJS
```typescript
// Хорошо
import { AuthService } from '../auth.service';
import { CreateUserDto } from '../dto/create-user.dto';

// Плохо
import { AuthService } from '../../auth/auth.service';
```

---

## Полезные ресурсы

- [NestJS Structure](https://docs.nestjs.com/first-steps)
- [Express Best Practices](https://expressjs.com/en/advanced/best-practice-structure.html)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Feature-Sliced Design](https://feature-sliced.design/)
