import { render } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import ChevronDown from './ChevronDown.svelte';

describe('ChevronDown', () => {
	it('should render correctly', () => {
		const { component } = render(ChevronDown);

		expect(component).toBeDefined();
	});
});
