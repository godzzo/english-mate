import { Button } from '@chakra-ui/react';
import { translateUrl, Word } from '../utils/common';

export const WordButton = ({ word }: { word: Word }) => {
	return (
		<Button colorScheme="blue" size="md">
			<a
				href={translateUrl(word.en, 'en')}
				target="_blank"
				rel="noreferrer"
			>
				{word.en}
			</a>
		</Button>
	);
};
