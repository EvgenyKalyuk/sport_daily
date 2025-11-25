# Примеры файлов для новой структуры

## Базовые файлы приложения

### `/src/app/store.ts`
```typescript
import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from '@/shared/api/baseApi';
// Импорты slices из features
// import { workoutsReducer } from '@/features/workouts/store/workoutsSlice';

export const store = configureStore({
	reducer: {
		[baseApi.reducerPath]: baseApi.reducer,
		// workouts: workoutsReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

### `/src/app/providers.tsx`
```typescript
import { type ReactNode } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './store';

interface ProvidersProps {
	children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
	return (
		<Provider store={store}>
			<BrowserRouter>
				{children}
			</BrowserRouter>
		</Provider>
	);
}
```

### `/src/app/router.tsx`
```typescript
import { Routes, Route } from 'react-router-dom';
// import { HomePage } from '@/pages/HomePage';
// import { WorkoutsPage } from '@/pages/WorkoutsPage';
// import { NotFoundPage } from '@/pages/NotFoundPage';

export function AppRouter() {
	return (
		<Routes>
			<Route path="/" element={<div>Home</div>} />
			{/* <Route path="/workouts" element={<WorkoutsPage />} /> */}
			{/* <Route path="*" element={<NotFoundPage />} /> */}
		</Routes>
	);
}
```

### `/src/App.tsx`
```typescript
import { Providers } from '@/app/providers';
import { AppRouter } from '@/app/router';
import '@/assets/styles/globals.css';

export function App() {
	return (
		<Providers>
			<AppRouter />
		</Providers>
	);
}
```

### `/src/main.tsx`
```typescript
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';

const root = createRoot(document.getElementById('root')!);

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
```

## Shared модули

### `/src/shared/api/baseApi.ts`
```typescript
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
	baseUrl: import.meta.env.VITE_API_URL || '/api',
	prepareHeaders: (headers) => {
		// Добавить токен авторизации, если есть
		const token = localStorage.getItem('token');
		if (token) {
			headers.set('authorization', `Bearer ${token}`);
		}
		return headers;
	},
});

export const baseApi = createApi({
	reducerPath: 'api',
	baseQuery,
	endpoints: () => ({}),
	tagTypes: ['Workout', 'User', 'Statistics'],
});
```

### `/src/shared/store/hooks.ts`
```typescript
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/app/store';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
```

### `/src/shared/components/ui/Button/Button.tsx`
```typescript
import { type ButtonHTMLAttributes, forwardRef } from 'react';
import './Button.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'primary' | 'secondary' | 'outline';
	size?: 'sm' | 'md' | 'lg';
	fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ variant = 'primary', size = 'md', fullWidth, className = '', ...props }, ref) => {
		const classes = [
			'button',
			`button--${variant}`,
			`button--${size}`,
			fullWidth && 'button--full-width',
			className,
		]
			.filter(Boolean)
			.join(' ');

		return <button ref={ref} className={classes} {...props} />;
	}
);

Button.displayName = 'Button';
```

### `/src/shared/components/ui/Button/Button.css`
```css
.button {
	@apply px-4 py-2 rounded-lg font-medium transition-colors;
}

.button--primary {
	@apply bg-blue-600 text-white hover:bg-blue-700;
}

.button--secondary {
	@apply bg-gray-200 text-gray-900 hover:bg-gray-300;
}

.button--outline {
	@apply border-2 border-gray-300 hover:bg-gray-50;
}

.button--sm {
	@apply px-3 py-1.5 text-sm;
}

.button--md {
	@apply px-4 py-2;
}

.button--lg {
	@apply px-6 py-3 text-lg;
}

.button--full-width {
	@apply w-full;
}
```

### `/src/shared/components/ui/Button/index.ts`
```typescript
export { Button } from './Button';
export type { ButtonProps } from './Button';
```

### `/src/shared/lib/utils.ts`
```typescript
/**
 * Объединяет классы CSS
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
	return classes.filter(Boolean).join(' ');
}

/**
 * Форматирует число с разделителями тысяч
 */
export function formatNumber(value: number): string {
	return new Intl.NumberFormat('ru-RU').format(value);
}
```

### `/src/shared/lib/format.ts`
```typescript
import { format, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';

/**
 * Форматирует дату в читаемый формат
 */
export function formatDate(date: string | Date, pattern = 'dd.MM.yyyy'): string {
	const dateObj = typeof date === 'string' ? parseISO(date) : date;
	return format(dateObj, pattern, { locale: ru });
}

/**
 * Форматирует время
 */
export function formatTime(date: string | Date): string {
	return formatDate(date, 'HH:mm');
}

/**
 * Форматирует дату и время
 */
export function formatDateTime(date: string | Date): string {
	return formatDate(date, 'dd.MM.yyyy HH:mm');
}
```

### `/src/shared/hooks/useDebounce.ts`
```typescript
import { useEffect, useState } from 'react';

/**
 * Хук для отложенного обновления значения
 */
export function useDebounce<T>(value: T, delay = 500): T {
	const [debouncedValue, setDebouncedValue] = useState<T>(value);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => {
			clearTimeout(handler);
		};
	}, [value, delay]);

	return debouncedValue;
}
```

### `/src/assets/styles/globals.css`
```css
@import 'tailwindcss';

:root {
	--color-primary: #3b82f6;
	--color-secondary: #6b7280;
}

body {
	@apply antialiased;
	font-family: system-ui, -apple-system, sans-serif;
}

* {
	box-sizing: border-box;
}
```

## Пример Feature модуля

### `/src/features/workouts/types.ts`
```typescript
export interface Workout {
	id: string;
	name: string;
	date: string;
	duration: number; // в минутах
	type: 'cardio' | 'strength' | 'flexibility';
	exercises: Exercise[];
}

export interface Exercise {
	id: string;
	name: string;
	sets?: number;
	reps?: number;
	weight?: number;
	duration?: number;
}
```

### `/src/features/workouts/api/workoutsApi.ts`
```typescript
import { baseApi } from '@/shared/api/baseApi';
import type { Workout } from '../types';

export const workoutsApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getWorkouts: builder.query<Workout[], void>({
			query: () => 'workouts',
			providesTags: ['Workout'],
		}),
		getWorkout: builder.query<Workout, string>({
			query: (id) => `workouts/${id}`,
			providesTags: (result, error, id) => [{ type: 'Workout', id }],
		}),
		createWorkout: builder.mutation<Workout, Omit<Workout, 'id'>>({
			query: (workout) => ({
				url: 'workouts',
				method: 'POST',
				body: workout,
			}),
			invalidatesTags: ['Workout'],
		}),
	}),
});

export const {
	useGetWorkoutsQuery,
	useGetWorkoutQuery,
	useCreateWorkoutMutation,
} = workoutsApi;
```

### `/src/features/workouts/components/WorkoutCard/WorkoutCard.tsx`
```typescript
import { type Workout } from '../../types';
import { formatDate } from '@/shared/lib/format';

interface WorkoutCardProps {
	workout: Workout;
	onClick?: (id: string) => void;
}

export function WorkoutCard({ workout, onClick }: WorkoutCardProps) {
	return (
		<div
			className="p-4 border rounded-lg cursor-pointer hover:shadow-md transition-shadow"
			onClick={() => onClick?.(workout.id)}
		>
			<h3 className="font-semibold text-lg">{workout.name}</h3>
			<p className="text-sm text-gray-600">{formatDate(workout.date)}</p>
			<p className="text-sm">Длительность: {workout.duration} мин</p>
		</div>
	);
}
```

### `/src/features/workouts/components/WorkoutCard/index.ts`
```typescript
export { WorkoutCard } from './WorkoutCard';
```

## Пример страницы

### `/src/pages/WorkoutsPage/WorkoutsPage.tsx`
```typescript
import { WorkoutList } from '@/features/workouts/components/WorkoutList';
import { useGetWorkoutsQuery } from '@/features/workouts/api/workoutsApi';

export function WorkoutsPage() {
	const { data: workouts, isLoading, error } = useGetWorkoutsQuery();

	if (isLoading) return <div>Загрузка...</div>;
	if (error) return <div>Ошибка загрузки</div>;

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">Тренировки</h1>
			<WorkoutList workouts={workouts || []} />
		</div>
	);
}
```

### `/src/pages/WorkoutsPage/index.ts`
```typescript
export { WorkoutsPage } from './WorkoutsPage';
```
