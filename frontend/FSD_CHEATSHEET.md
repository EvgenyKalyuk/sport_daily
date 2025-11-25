# FSD - Краткая шпаргалка

> 📚 **Подробное руководство**: См. [FSD_GUIDE.md](./FSD_GUIDE.md)

## Слои (от верхнего к нижнему)

```
app → pages → widgets → features → entities → shared
```

## Правило импортов

**Импортируй только из слоёв ниже!**

```
app          ❌ не импортирует ниоткуда
  └── pages  ✅ из widgets, features, entities, shared
      └── widgets  ✅ из features, entities, shared
          └── features  ✅ из entities, shared
              └── entities  ✅ из shared
                  └── shared  ✅ только внешние библиотеки
```

## Что куда?

| Слой | Что содержит | Примеры |
|------|--------------|---------|
| **app** | Инициализация приложения | store, providers, router |
| **pages** | Страницы | HomePage, WorkoutsPage |
| **widgets** | Сложные составные блоки | StatsDashboard, WorkoutCalendar |
| **features** | Бизнес-функции | auth, createWorkout, shareResult |
| **entities** | Бизнес-сущности | Workout, User, Exercise |
| **shared** | Переиспользуемый код | Button, formatDate, useDebounce |

## Сегменты внутри слайса

```
[слой]/[слайс]/
  ├── ui/        # UI компоненты
  ├── api/       # API запросы
  ├── model/     # Store, типы, логика
  ├── lib/       # Утилиты
  └── config/    # Конфигурация
```

## Быстрые решения

### ❓ Где разместить компонент?

- **Простой UI** (Button, Input) → `shared/ui/`
- **Действие пользователя** (создать тренировку) → `features/workouts/ui/`
- **Отображение сущности** (WorkoutCard) → `entities/workout/ui/`
- **Сложный блок** (несколько features) → `widgets/`

### ❓ Где разместить API?

- **Base API** → `shared/api/baseApi.ts`
- **API сущности** → `entities/[name]/api/[name]Api.ts`
- **API feature** → `features/[name]/api/[name]Api.ts`

### ❓ Где разместить типы?

- **Типы сущности** → `entities/[name]/model/types.ts`
- **Типы feature** → `features/[name]/model/types.ts`
- **Общие типы** → `shared/types/`

### ❓ Можно ли импортировать из features в features?

**Нет!** Features изолированы. Общую логику вынесите в:
- `entities` (если это данные)
- `shared` (если это утилиты)

## Примеры импортов

```typescript
// ✅ pages/WorkoutsPage.tsx
import { WorkoutList } from '@/widgets/WorkoutList';
import { CreateWorkoutButton } from '@/features/workouts';
import { WorkoutCard } from '@/entities/workout';
import { Button } from '@/shared/ui/Button';

// ✅ features/workouts/ui/CreateWorkoutForm.tsx
import { Workout } from '@/entities/workout';
import { Button } from '@/shared/ui/Button';

// ✅ entities/workout/ui/WorkoutCard.tsx
import { Card } from '@/shared/ui/Card';

// ❌ features/workouts/ui/CreateWorkoutForm.tsx
import { WorkoutsPage } from '@/pages/WorkoutsPage'; // нельзя!
import { LoginForm } from '@/features/auth'; // нельзя!
```

## Структура feature

```
features/workouts/
  ├── api/
  │   └── workoutsApi.ts
  ├── ui/
  │   ├── CreateWorkoutForm/
  │   └── WorkoutList/
  ├── model/
  │   ├── workoutsSlice.ts
  │   └── types.ts
  └── lib/
      └── calculateTotalDuration.ts
```

## Публичный API слайса

```typescript
// features/workouts/index.ts
export { CreateWorkoutForm } from './ui/CreateWorkoutForm';
export { useGetWorkoutsQuery } from './api/workoutsApi';
export type { Workout } from './model/types';
```

## Алиасы путей

```typescript
'@/app'      → './src/app'
'@/pages'    → './src/pages'
'@/widgets'  → './src/widgets'
'@/features' → './src/features'
'@/entities'  → './src/entities'
'@/shared'   → './src/shared'
```
