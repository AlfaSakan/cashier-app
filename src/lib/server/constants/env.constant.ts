export const env = {
	jwtKey: import.meta.env.VITE_JWT_KEY || '',
	salt: import.meta.env.VITE_SALT || ''
} as const;
