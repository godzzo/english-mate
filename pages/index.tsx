import { Button, VStack } from '@chakra-ui/react';
import type { NextPage } from 'next';

const Menu = () => {
	return (
		<VStack spacing={4} direction="row" align="center">
			<Button colorScheme="blue" size="md">
				Button
			</Button>
			<Button colorScheme="teal" size="lg">
				Button
			</Button>
		</VStack>
	);
};

const Translate = () => {
	const url =
		'https://translate.google.com/?sl=en&tl=hu&text=something&op=translate';
	return <iframe src={url}></iframe>;
};

const Home: NextPage = () => {
	return (
		<div>
			Hello <Menu />
			<Translate />
		</div>
	);
};

export default Home;
