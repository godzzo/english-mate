import { wordsData } from './words';

export type Langs = 'hu' | 'en';
export type Word = { hu: string; en: string };

export function translateUrl(expr: string, lng: Langs) {
	const url = 'https://translate.google.com/';

	if (lng == 'en') {
		return `${url}?sl=en&tl=hu&text=${expr}&op=translate`;
	} else {
		return `${url}?sl=hu&tl=en&text=${expr}&op=translate`;
	}
}

export const words: Word[] = wordsData.map((e) => ({ hu: e[0], en: e[1] }));
