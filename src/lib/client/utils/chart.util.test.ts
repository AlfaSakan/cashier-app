import {
	transactionHistoryMock,
	transactionProductMock
} from '$lib/__mocks__/dummy/transaction.dummy';
import { describe, expect, it } from 'vitest';
import { convertTransactionToChart } from './chart.util';

describe('convertTransactionToChart', () => {
	const dataMock = { ...transactionHistoryMock, TransactionProduct: [transactionProductMock] };
	it('should be able convert data to data chart', () => {
		expect(convertTransactionToChart([dataMock, dataMock])).toEqual([{ x: 0, y: 200 }]);
	});
});
