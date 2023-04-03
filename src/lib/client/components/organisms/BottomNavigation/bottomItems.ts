import BagShopping from '../../Icons/BagShopping.svelte';
import Chart from '../../Icons/Chart.svelte';
import Home from '../../Icons/Home.svelte';
import Person from '../../Icons/Person.svelte';

export const bottomItems = [
	{ icon: Home, route: '/', testid: 'bottom-navigation:home' },
	{ icon: BagShopping, route: '/store', testid: 'bottom-navigation:store' },
	{ icon: Chart, route: '/history-transaction', testid: 'bottom-navigation:history-transaction' },
	{ icon: Person, route: '/profile', testid: 'bottom-navigation:profile' }
];
