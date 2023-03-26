import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
	DAYS_IN_SECOND,
	HOURS_IN_SECOND,
	MINUTES_IN_SECOND,
	MONTHS,
	SECOND_IN_MILLISECOND,
	formatUnixToDate,
	generateUnixSecond,
	getLabelDate,
	isToday,
	isYesterday
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

describe('formatUnixToDate', () => {
	it('should be able to format date to dd-mm-yyyy', () => {
		vi.setSystemTime(new Date(2023, 2, 26));

		expect(formatUnixToDate(new Date().getTime() / 1000)).toBe('26-3-2023');
	});
});

describe('isToday', () => {
	it('should be able check is date today', () => {
		vi.setSystemTime(new Date(2023, 2, 26));

		expect(isToday(new Date().getTime() / 1000)).toBe(true);
	});
});

describe('isYesterday', () => {
	it('should be able check is date yesterday', () => {
		vi.setSystemTime(new Date(2023, 2, 26));

		const date = new Date();
		date.setDate(25);

		expect(isYesterday(date.getTime() / 1000)).toBe(true);
	});
});

describe('getLabelDate', () => {
	it('should return Kemarin', () => {
		vi.setSystemTime(new Date(2023, 2, 26));

		const date = new Date();
		date.setDate(25);

		expect(getLabelDate(date.getTime() / 1000)).toBe('Kemarin');
	});

	it('should return Hari ini', () => {
		vi.setSystemTime(new Date(2023, 2, 26));
		const date = new Date();

		expect(getLabelDate(date.getTime() / 1000)).toBe('Hari ini');
	});

	it('should return Hari ini', () => {
		vi.setSystemTime(new Date(2023, 2, 26));
		const date = new Date();
		date.setDate(20);

		expect(getLabelDate(date.getTime() / 1000)).toBe('20-3-2023');
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

	it('first MONTHS should return Januari', () => {
		expect(MONTHS[0]).toBe('Januari');
	});
});
