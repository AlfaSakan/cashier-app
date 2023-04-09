export interface ListTileDispatch {
	add: {
		selectedAmount: number;
		productId: string;
	};
	subtract: {
		selectedAmount: number;
		productId: string;
	};
	select: {
		selectedAmount: number;
		productId: string;
	};
	input: {
		productId: string;
		inputAmount: number;
	};
	blur: {
		productId: string;
	};
}

export interface ListTileEvent {
	selectedAmount: number;
	productId: string;
}

export interface ListTileInputEvent {
	productId: string;
	inputAmount: number;
}
