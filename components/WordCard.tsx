import { Button, HStack, VStack } from '@chakra-ui/react';
import {
	clipartUrl,
	translateUrl,
	Langs,
	speech,
	WordPos,
	Word,
} from '../utils/common';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faImage } from '@fortawesome/free-solid-svg-icons';
import { CSSProperties } from 'react';

export type WordMode = 'BASE' | 'CHOOSEN' | 'GOOD';

const IconStyle: CSSProperties = {
	display: 'flex',
	padding: '0.4rem',
	backgroundColor: 'cornflowerblue',
	color: 'white',
	borderRadius: '5px',
};

export const QuizButton = ({
	word,
	mode,
	onSelect,
	lang = 'en',
}: {
	word: WordPos;
	mode: WordMode;
	onSelect: (pos: number) => void;
	lang?: Langs;
}) => {
	let color =
		mode === 'BASE' ? 'blue' : mode === 'CHOOSEN' ? 'yellow' : 'green';

	return (
		<HStack spacing={1}>
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
				style={IconStyle}
			>
				<FontAwesomeIcon icon={faGlobe} />
			</a>
			<a
				style={IconStyle}
				href={clipartUrl(word.en)}
				target="_blank"
				rel="noreferrer"
			>
				<FontAwesomeIcon icon={faImage} />
			</a>
		</HStack>
	);
};

export const CityButton = ({
	word,
	mode,
	onSelect,
	lang = 'en',
}: {
	word: WordPos;
	mode: WordMode;
	onSelect: (pos: number) => void;
	lang?: Langs;
}) => {
	let color =
		mode === 'BASE' ? 'blue' : mode === 'CHOOSEN' ? 'yellow' : 'green';

	return (
		<HStack spacing={1}>
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
				href={`https://www.google.com/maps/place/${word.en}%20capital%20city`}
				target="_blank"
				rel="noreferrer"
				style={IconStyle}
			>
				<FontAwesomeIcon icon={faGlobe} />
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
