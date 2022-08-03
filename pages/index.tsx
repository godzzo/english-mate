import { Button, VStack } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Link from 'next/link';

const Menu = () => {
	return (
		<VStack spacing={4} direction="row" align="center">
			<Link href="/question">
				<Button colorScheme="blue" size="md">
					Szó párosítás
				</Button>
			</Link>
		</VStack>
	);
};

const Home: NextPage = () => {
	return (
		<VStack p={4}>
			<Menu />
		</VStack>
	);
};

export default Home;
