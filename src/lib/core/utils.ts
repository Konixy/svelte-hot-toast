import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const genId = (() => {
	let count = 0;

	return () => {
		count += 1;
		return count.toString();
	};
})();

export const prefersReducedMotion = (() => {
	// Cache result
	let shouldReduceMotion: boolean | undefined;

	return () => {
		if (shouldReduceMotion === undefined && typeof window !== 'undefined') {
			const mediaQuery = matchMedia('(prefers-reduced-motion: reduce)');
			shouldReduceMotion = !mediaQuery || mediaQuery.matches;
		}
		return shouldReduceMotion;
	};
})();

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
