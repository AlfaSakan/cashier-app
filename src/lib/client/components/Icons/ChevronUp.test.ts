import { render } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import ChevronUp from './ChevronUp.svelte';

describe('ChevronUp', () => {
	it('should render correctly', () => {
		const { component } = render(ChevronUp);

		expect(component).toBeDefined();
	});
});
