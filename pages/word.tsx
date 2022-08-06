import { Box, Button, HStack, VStack } from '@chakra-ui/react';
import { NextPage } from 'next';
import { useState } from 'react';
import { randomWord, randomWords, shuffle, speech } from '../utils/common';

function prepare(length: number) {
	const word = randomWord();
	const words = randomWords(length);

	const list = shuffle([word, ...words].map((w, i) => ({ ...w, pos: i })));

	return { word, list };
}

const Quiz = () => {
	return <div></div>;
};

const WordView: NextPage = () => {
	const [begin, setBegin] = useState(false);
	const [points, setPoints] = useState(0);

	return (
		<VStack justify="center" gap="1">
			<HStack>
				<Box>Pontok: {points}</Box>
				<Button
					colorScheme="purple"
					onClick={() => {
						// shuffle();

						if (!begin) {
							speech("Common. Let's go!");
						}

						setBegin(!begin);
					}}
				>
					Keverés
				</Button>
			</HStack>
			{begin && <Quiz />}
		</VStack>
	);
};

export default WordView;
