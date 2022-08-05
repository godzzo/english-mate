import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { AppContext, useAppStore } from '../utils/AppStore';

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css'; // Import the CSS
config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

import { ChakraProvider } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';

const colors = {
	brand: {
		900: '#1a365d',
		800: '#153e75',
		700: '#2a69ac',
	},
};

const theme = extendTheme({ colors });

function MyApp({ Component, pageProps }: AppProps) {
	const appHandler = useAppStore();

	return (
		<AppContext.Provider value={appHandler}>
			<ChakraProvider theme={theme}>
				<Component {...pageProps} />
			</ChakraProvider>
		</AppContext.Provider>
	);
}

export default MyApp;
