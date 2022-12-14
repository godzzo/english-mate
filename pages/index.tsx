import { Button, VStack } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useContext } from 'react';
import LoginButton from '../components/LoginButton';
import { AppContext } from '../utils/AppStore';
import { useSession } from 'next-auth/react';

const Menu = () => {
	const { data: session } = useSession();

	return (
		<VStack spacing={4} direction="row" align="center">
			<Link href="/question">
				<Button colorScheme="blue" size="md">
					Szó párosítás
				</Button>
			</Link>
			<Link href="/cities">
				<Button colorScheme="blue" size="md">
					Fővárosok
				</Button>
			</Link>
			{session && (
				<>
					<Link href="/results">
						<Button colorScheme="blue" size="md">
							Eredmények
						</Button>
					</Link>
					<Link href="/relearn">
						<Button colorScheme="blue" size="md">
							Gyakorlás
						</Button>
					</Link>
				</>
			)}
		</VStack>
	);
};

const Home: NextPage = () => {
	const { name, change } = useContext(AppContext);

	return (
		<VStack p={4}>
			{name}
			<Menu />
			<LoginButton></LoginButton>
			<input
				onChange={(e) => change(e.target.value)}
				value={name}
			></input>
		</VStack>
	);
};

export default Home;
