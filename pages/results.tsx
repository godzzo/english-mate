import { NextPage } from 'next';
import { VStack, Box, HStack } from '@chakra-ui/react';
import { words } from '../utils/common';
import { useQuizHistory } from '../utils/QuizHistory';

const ResultsView: NextPage = () => {
	const { result } = useQuizHistory();

	return (
		<VStack>
			{result.length < 1 && <Box>Nincs adat - Be van jelentkezve?</Box>}

			{result.map((e, i) => (
				<VStack key={i}>
					<Box>
						Dátum:
						{new Date(parseInt(e.timestamp, 10)).toISOString()}
					</Box>
					<HStack>
						<VStack>
							{e.result.bads.map((b, bi) => {
								const word = words[b];

								return <Box key={bi}>{word.en}</Box>;
							})}
						</VStack>
						<VStack>
							{e.result.goods
								.filter((g) => !e.result.bads.includes(g))
								.map((g, gi) => {
									const word = words[g];

									return <Box key={gi}>{word.en}</Box>;
								})}
						</VStack>
					</HStack>
				</VStack>
			))}
		</VStack>
	);
};

export default ResultsView;
