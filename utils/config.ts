const dev = process.env.NODE_ENV !== 'production';

export const serverUrl = dev
	? 'http://localhost:3006'
	: 'https://english-mate-three.vercel.app';
