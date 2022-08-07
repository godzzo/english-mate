import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

// https://next-auth.js.org/getting-started/example
// All requests to /api/auth/* (signIn, callback, signOut, etc.) will automatically be handled by NextAuth.js.
export default NextAuth({
	// Configure one or more authentication providers
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID!!,
			clientSecret: process.env.GITHUB_SECRET!!,
		}),
		// ...add more providers here
	],
});
