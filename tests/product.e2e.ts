import { createId } from '@paralleldrive/cuid2';
import test, { expect } from '@playwright/test';

test.describe('product e2e', () => {
	const email = 'bb@gmail.com';
	const password = 'admin123';
	const storeTestID = 'bottom-navigation:store';
	const addProductTestID = 'navigate:add-product';
	const product = {
		name: createId(),
		amount: '100',
		unit: 'bungkus',
		price: '21500',
		description: 'rokok kuli bertenaga'
	};

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

	test('create new product', async ({ page }) => {
		const storeIcon = page.getByTestId(storeTestID);
		await storeIcon.click();

		const searchField = page.getByPlaceholder('Pencarian');
		await expect(searchField).toBeVisible();

		const addButton = page.getByTestId(addProductTestID);
		await addButton.click();
		await expect(page).toHaveURL('/add-product');

		await page.getByLabel(/Nama Barang/).fill(product.name);
		await page.getByLabel(/Jumlah Barang/).fill(product.amount);
		await page.getByLabel(/Satuan Barang/).fill(product.unit);
		await page.getByLabel(/Harga Barang/).fill(product.price);
		await page.getByLabel(/Deskripsi Barang/).fill(product.description);

		const buttonSubmit = page.getByRole('button', { name: 'Simpan' });
		await buttonSubmit.click();

		await expect(page.getByText(product.name)).toBeVisible();
	});

	test('edit first product', async ({ page }) => {
		const newName = createId();
		const newAmount = '1000';

		const storeIcon = page.getByTestId(storeTestID);
		await storeIcon.click();

		const product = page.getByTestId('product:1');
		await expect(product).toBeVisible();

		await product.getByRole('link').click();

		await expect(page).toHaveURL(/edit-product/);

		await page.getByLabel(/Nama Barang/).clear();
		await page.getByLabel(/Nama Barang/).fill(newName);
		await page.getByLabel(/Jumlah Barang/).clear();
		await page.getByLabel(/Jumlah Barang/).fill(newAmount);

		const buttonSubmit = page.getByRole('button', { name: 'Simpan' });
		await buttonSubmit.click();

		await expect(page).toHaveURL(/store/);
		await expect(page.getByText(newName)).toBeVisible();
	});

	test('delete first product', async ({ page }) => {
		const actions = ['cancel', 'confirm'];

		const hamburger = page.getByTestId('header:hamburger');
		await hamburger.click();

		const daftarBarang = page.getByText(/Gudang/);
		await daftarBarang.click();

		await expect(page).toHaveURL('/warehouse');

		for (const action of actions) {
			const deleteProduct = page.getByTestId('table:product:delete:1');
			await expect(deleteProduct).toBeVisible();
			await deleteProduct.click();

			const modal = page.getByTestId('modal-delete-product');
			await expect(modal).toBeVisible();

			if (action === 'cancel') {
				const modalCancel = page.getByTestId('modal-delete-product:cancel');
				await modalCancel.click();
				continue;
			}

			const modalConfirm = page.getByTestId('modal-delete-product:confirm');
			await modalConfirm.click();
		}

		const toast = page.getByText(/Produk berhasil dihapus/);
		await expect(toast).toBeVisible();
	});
});
