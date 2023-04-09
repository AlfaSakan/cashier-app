import { render } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import Trash from './Trash.svelte';

describe('Close', () => {
	it('should render correctly', () => {
		const { component } = render(Trash);

		expect(component).toBeDefined();
	});
});
