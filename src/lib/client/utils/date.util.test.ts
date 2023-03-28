import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
	DAYS_IN_SECOND,
	HOURS_IN_SECOND,
	MINUTES_IN_SECOND,
	SECOND_IN_MILLISECOND,
	generateUnixSecond,
	getLabelDate
} from './date.util';

beforeEach(() => {
	vi.useFakeTimers();
});

afterEach(() => {
	vi.useRealTimers();
});

describe('generateUnixSecond', () => {
	it('should be able to generate unix in second', () => {
		const date = new Date(2022, 1, 1, 13);
		vi.setSystemTime(date);

		expect(generateUnixSecond()).toBe(date.getTime() / 1000);
	});
});

describe('getLabelDate', () => {
	it('should return Hari ini', () => {
		vi.setSystemTime(new Date(2023, 2, 26));
		const date = new Date();

		expect(getLabelDate(date.getTime() / 1000)).toBe('00:00');
	});

	it('should return formated date', () => {
		vi.setSystemTime(new Date(2023, 2, 26));
		const date = new Date();
		date.setDate(20);

		expect(getLabelDate(date.getTime() / 1000)).toBe('20 Maret 2023');
	});
});

describe('constants', () => {
	it('SECOND_IN_MILLISECOND', () => {
		expect(SECOND_IN_MILLISECOND).toBe(1000);
	});

	it('MINUTES_IN_SECOND', () => {
		expect(MINUTES_IN_SECOND).toBe(60);
	});

	it('HOURS_IN_SECOND', () => {
		expect(HOURS_IN_SECOND).toBe(60 * MINUTES_IN_SECOND);
	});

	it('DAYS_IN_SECOND', () => {
		expect(DAYS_IN_SECOND).toBe(24 * HOURS_IN_SECOND);
	});
});
