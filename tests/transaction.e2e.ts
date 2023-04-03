import test, { expect } from '@playwright/test';

test.describe('transaction', () => {
	const email = 'bb@gmail.com';
	const password = 'admin123';
	const storeTestID = 'bottom-navigation:store';

	// LOGIN
	test.beforeEach(async ({ page }) => {
		await page.goto('/login');

		const emailField = page.getByPlaceholder(/Email/);
		await emailField.type(email);
		expect(await emailField.inputValue()).toBe(email);

		const passwordField = page.getByPlaceholder(/Password/);
		await passwordField.type(password);
		expect(await passwordField.inputValue()).toBe(password);

		const loginButton = page.getByRole('button', { name: 'Masuk' });
		await loginButton.click();
		await expect(page).toHaveURL('http://localhost:4173/');
	});

	// LOGUOT
	test.afterEach(async ({ page }) => {
		const hamburger = page.getByTestId('header:hamburger');
		await hamburger.click();

		const buttonLogout = page.getByTestId('sidebar:button:logout');
		await buttonLogout.click();
		await expect(page).toHaveURL('http://localhost:4173/login');
	});

	test('create transaction', async ({ page }) => {
		const storeIcon = page.getByTestId(storeTestID);
		await storeIcon.click();

		const product = page.getByTestId('product:1');
		await expect(product).toBeVisible();
		await product.click();

		const amount = Number(
			(await product.getByTestId('list-tile-product:amount').textContent())?.replace(
				' bungkus',
				''
			) || 0
		);

		expect(amount).toBeTruthy();

		const bottomTransaction = page.getByTestId('bottom-transaction');
		await expect(bottomTransaction).toBeVisible();
		await expect(bottomTransaction.getByText(/Total produk 1/)).toBeVisible();

		const totalPrice = page.getByTestId('bottom-transaction:total-price');
		expect(await totalPrice.textContent()).toMatch(/21.500/);

		await bottomTransaction.click();
		await expect(page).toHaveURL('/transaction');

		await page.getByTestId('header:back').click();

		await bottomTransaction.click();
		await expect(page).toHaveURL('/transaction');

		const submitButton = page.getByRole('button', { name: /Bayar/ });
		await expect(submitButton).toBeDisabled();

		await page.getByRole('spinbutton').fill('25000');
		await submitButton.click();
		await expect(page).toHaveURL('/store');

		const newAmount = Number(
			(await product.getByTestId('list-tile-product:amount').textContent())?.replace(
				' bungkus',
				''
			) || 0
		);

		expect(newAmount).toBe(amount - 1);
	});
});
