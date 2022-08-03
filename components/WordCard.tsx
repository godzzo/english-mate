import { Button, HStack, VStack } from '@chakra-ui/react';
import { clipartUrl, translateUrl, Word, Langs } from '../utils/common';

export type WordMode = 'BASE' | 'CHOOSEN' | 'GOOD';

export const QuizButton = ({
	word,
	mode,
	onSelect,
	lang = 'en',
}: {
	word: Word & { pos: number };
	mode: WordMode;
	onSelect: (pos: number) => void;
	lang?: Langs;
}) => {
	let color =
		mode === 'BASE' ? 'blue' : mode === 'CHOOSEN' ? 'yellow' : 'green';

	return (
		<VStack>
			<Button
				colorScheme={color}
				size="md"
				onClick={() => {
					if (mode !== 'GOOD') {
						onSelect(word.pos);
					}
				}}
			>
				{word[lang]}
			</Button>
			<HStack>
				<a
					href={translateUrl(word.en, 'en')}
					target="_blank"
					rel="noreferrer"
				>
					Translate
				</a>
				<a href={clipartUrl(word.en)} target="_blank" rel="noreferrer">
					Clipart
				</a>
			</HStack>
		</VStack>
	);
};

export const WordButton = ({
	word,
	lang = 'en',
}: {
	word: Word;
	lang?: Langs;
}) => {
	return (
		<VStack>
			<Button colorScheme="blue" size="md">
				{word[lang]}
			</Button>
			<HStack>
				<a
					href={translateUrl(word.en, 'en')}
					target="_blank"
					rel="noreferrer"
				>
					Translate
				</a>
				<a href={clipartUrl(word.en)} target="_blank" rel="noreferrer">
					Clipart
				</a>
			</HStack>
		</VStack>
	);
};
