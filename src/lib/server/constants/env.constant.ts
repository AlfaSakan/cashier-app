export const env = {
	jwtKey: import.meta.env.VITE_JWT_KEY || '',
	salt: import.meta.env.VITE_SALT || '',
	domain: import.meta.env.VITE_DOMAIN || 'localhost'
} as const;
