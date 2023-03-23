import { render } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import Close from './Close.svelte';

describe('Close', () => {
	it('should render correctly', () => {
		const { component } = render(Close);

		expect(component).toBeDefined();
	});
});
