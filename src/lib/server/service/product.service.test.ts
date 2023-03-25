import { productMock, productMock2 } from '$lib/__mocks__/dummy/product.dummy';
import { userMock } from '$lib/__mocks__/dummy/user.dummy';
import prismaMock from '$lib/__mocks__/prisma';
import { errorMessages } from '$lib/client/constants/error.constant';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ProductService } from './product.service';

afterEach(() => {
	vi.clearAllMocks();
});

describe('ProductService', () => {
	const productService = new ProductService();

	describe('createProduct', () => {
		it('should be able to create product', async () => {
			prismaMock.user.findUnique.mockResolvedValueOnce(userMock);
			prismaMock.product.create.mockResolvedValueOnce(productMock);

			const { product, error } = await productService.createProduct({ ...productMock });

			expect(error).toBeNull();
			expect(product).toEqual(productMock);
		});

		it('user not found', async () => {
			prismaMock.user.findUnique.mockResolvedValueOnce(null);

			const { product, error } = await productService.createProduct(productMock);

			expect(error).toBe(errorMessages['user-not-found']);
			expect(product).toEqual(null);
		});
	});

	describe('validatePermission', () => {
		it('should be able to validate permission action on product', async () => {
			prismaMock.product.findUnique.mockResolvedValueOnce(productMock);

			const { product, error } = await productService.validatePermission({
				id: productMock.id,
				userId: productMock.userId
			});

			expect(error).toBeNull();
			expect(product).toEqual(productMock);
		});

		it('cannot failed product', async () => {
			prismaMock.product.findUnique.mockResolvedValueOnce(null);
			const { product, error } = await productService.validatePermission({
				id: productMock.id,
				userId: productMock.userId
			});

			expect(error).toBe(errorMessages['product-not-found']);
			expect(product).toBeNull();
		});

		it('cannot failed product', async () => {
			prismaMock.product.findUnique.mockResolvedValueOnce({ ...productMock, userId: 'wrong-id' });
			const { product, error } = await productService.validatePermission({
				id: productMock.id,
				userId: productMock.userId
			});

			expect(error).toBe(errorMessages['forbidden']);
			expect(product).toBeNull();
		});
	});

	describe('findProductById', () => {
		it('should be able to find product by id', async () => {
			prismaMock.product.findUnique.mockResolvedValueOnce(productMock);

			const { product, error } = await productService.findProductById(productMock);

			expect(error).toBeNull();
			expect(product).toEqual(productMock);
		});
	});

	describe('updateProduct', () => {
		it('should be able to update product', async () => {
			const spyProduct = vi.spyOn(productService, 'validatePermission');
			spyProduct.mockResolvedValueOnce({ product: { ...productMock }, error: null });

			prismaMock.product.update.mockResolvedValueOnce(productMock2);

			const { product, error } = await productService.updateProduct(productMock2);

			expect(error).toBeNull();
			expect(product).toEqual(productMock2);
		});

		it('should failed to validate permission', async () => {
			const spyProduct = vi.spyOn(productService, 'validatePermission');
			spyProduct.mockResolvedValueOnce({
				product: null,
				error: errorMessages['product-not-found']
			});

			const result = await productService.updateProduct(productMock);

			expect(result).toEqual({ product: null, error: errorMessages['product-not-found'] });
		});
	});

	describe('deleteProduct', () => {
		it('should be able to delete product', async () => {
			const spyProduct = vi.spyOn(productService, 'validatePermission');
			spyProduct.mockResolvedValueOnce({ product: { ...productMock }, error: null });

			prismaMock.product.delete.mockResolvedValueOnce(productMock2);

			const result = await productService.deleteProduct(productMock);

			expect(result).toEqual({ ok: true, error: null });
		});

		it('should failed to validate permission', async () => {
			const spyProduct = vi.spyOn(productService, 'validatePermission');
			spyProduct.mockResolvedValueOnce({
				product: null,
				error: errorMessages['product-not-found']
			});

			const result = await productService.deleteProduct(productMock);

			expect(result).toEqual({ ok: false, error: errorMessages['product-not-found'] });
		});
	});

	describe('findListProductByUserId', () => {
		it('should be able to find list product by user id', async () => {
			prismaMock.user.findUnique.mockResolvedValueOnce(userMock);
			prismaMock.product.findMany.mockResolvedValueOnce([productMock, productMock2]);

			const { products, error } = await productService.findListProductByUserId(productMock.userId);

			expect(error).toBeNull();
			expect(products).toEqual([productMock, productMock2]);
		});

		it('user not found', async () => {
			prismaMock.user.findUnique.mockResolvedValueOnce(null);

			const { products, error } = await productService.findListProductByUserId(productMock.userId);

			expect(error).toBe(errorMessages['user-not-found']);
			expect(products).toEqual(null);
		});
	});
});
