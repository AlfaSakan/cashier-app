import { errorMessages } from '$lib/client/constants/error.constant';
import { generateUnixSecond } from '$lib/client/utils/date.util';
import type {
	CreateProductDto,
	GeneralProductDto,
	UpdateProductDto
} from '$lib/schema/product.schema';
import prisma from '../utils/prisma';

export class ProductService {
	async createProduct(dto: CreateProductDto & { userId: string }) {
		const user = await prisma.user.findUnique({ where: { id: dto.userId } });
		if (user === null) return { product: null, error: errorMessages['user-not-found'] };

		const product = await prisma.product.create({
			data: { ...dto, createdAt: generateUnixSecond(), updatedAt: generateUnixSecond() }
		});
		return { product, error: null };
	}

	async updateProduct(dto: UpdateProductDto & { userId: string }) {
		const { product } = await this.validatePermission(dto);
		if (product === null) return { product: null, error: errorMessages['product-not-found'] };

		const updatedProduct = await prisma.product.update({
			where: { id: dto.id },
			data: { ...dto, updatedAt: generateUnixSecond() }
		});

		return { product: updatedProduct, error: null };
	}

	async deleteProduct(dto: GeneralProductDto) {
		const { product } = await this.validatePermission(dto);
		if (product === null) return { ok: false, error: errorMessages['product-not-found'] };

		await prisma.product.delete({ where: { id: dto.id } });
		return { ok: true, error: null };
	}

	async findListProductByUserId(userId: string) {
		const user = await prisma.user.findUnique({ where: { id: userId } });
		if (user === null) return { products: null, error: errorMessages['user-not-found'] };

		const products = await prisma.product.findMany({ where: { userId } });
		return { products, error: null };
	}

	findProductById(dto: GeneralProductDto) {
		return this.validatePermission(dto);
	}

	async validatePermission(dto: GeneralProductDto) {
		const product = await prisma.product.findUnique({ where: { id: dto.id } });
		if (product === null) return { product: null, error: errorMessages['product-not-found'] };

		if (product.userId !== dto.userId) return { product: null, error: errorMessages.forbidden };

		return { product, error: null };
	}

	async calculateAmountProduct(dto: GeneralProductDto & { subtract: number }) {
		const { error, product } = await this.validatePermission(dto);
		if (error) return { error, product };

		const result = product.amount - dto.subtract;
		if (result < 0) return { product: null, error: errorMessages['product-not-enough'] };

		const pro = await prisma.product.update({ where: { id: dto.id }, data: { amount: result } });
		return { product: pro, error: null };
	}
}
