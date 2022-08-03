import { VStack } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { WordButton } from '../components/WordCard';
import { words } from '../utils/common';

const Words: NextPage = () => {
	return (
		<VStack spacing={4} direction="row" align="center">
			{words.map((w, i) => (
				<WordButton word={w} key={i} />
			))}
		</VStack>
	);
};

export default Words;
