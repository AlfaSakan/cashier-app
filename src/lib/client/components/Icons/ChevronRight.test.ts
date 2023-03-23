import { render } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import ChevronRight from './ChevronRight.svelte';

describe('ChevronRight', () => {
	it('should render correctly', () => {
		const { component } = render(ChevronRight);

		expect(component).toBeDefined();
	});
});
