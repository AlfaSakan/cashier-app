import Textinput from '$lib/__mocks__/component/textinput.svelte';
import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import TextInput from './TextInput.atom.svelte';

describe('TextInput', () => {
	it('should rencer correctly', () => {
		render(TextInput, { name: 'name', label: 'label', value: 'value', error: 'error' });

		expect(screen.getByRole('textbox')).toBeDefined();
	});

	it('should rencer correctly 2', () => {
		render(TextInput, { name: 'name', label: 'label', value: 'value' });

		expect(screen.getByRole('textbox')).toBeDefined();
	});

	it('should rencer correctly 3', () => {
		render(Textinput);

		expect(screen.getByRole('textbox')).toBeDefined();
	});
});
