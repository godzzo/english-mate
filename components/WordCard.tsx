import { Button, HStack, VStack } from '@chakra-ui/react';
import { clipartUrl, translateUrl, Word, Langs, speech } from '../utils/common';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faImage } from '@fortawesome/free-solid-svg-icons';

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
		<HStack>
			<Button
				colorScheme={color}
				size="md"
				onClick={() => {
					if (mode !== 'GOOD') {
						if (lang === 'en') {
							speech(word.en);
						}

						onSelect(word.pos);
					}
				}}
			>
				{word[lang]}
			</Button>
			<a
				href={translateUrl(word.en, 'en')}
				target="_blank"
				rel="noreferrer"
			>
				<FontAwesomeIcon icon={faGlobe} />
			</a>
			<a href={clipartUrl(word.en)} target="_blank" rel="noreferrer">
				<FontAwesomeIcon icon={faImage} />
			</a>
		</HStack>
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
