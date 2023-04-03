import { devices, PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
	webServer: {
		command: 'pnpm run build && pnpm run preview',
		port: 4173
	},
	testDir: 'tests',
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Nexus 10'] }
		}
	],
	testMatch: 'tests/*.ts',
	reporter: 'html'
};

export default config;
