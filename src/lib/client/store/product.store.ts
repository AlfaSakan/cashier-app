import type { Product } from '@prisma/client';
import { writable } from 'svelte/store';

export const selectedProduct = writable<Product[]>([]);
