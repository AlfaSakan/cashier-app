import type { TransactionHistory, TransactionProduct } from '@prisma/client';

export type EventChangeInput = Event & {
	currentTarget: EventTarget & HTMLInputElement;
};

export interface CarouselItem {
	imageUrl: string;
	title: string;
}

export interface ChartType {
	x: number;
	y: number;
}

export type Transaction = TransactionHistory & {
	TransactionProduct: TransactionProduct[];
};
