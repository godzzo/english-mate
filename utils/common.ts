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

export function clipartUrl(expr: string) {
	const url = 'https://duckduckgo.com/';
	const parms =
		't=h_&iar=images&iaf=size:Small,type:clipart&iax=images&ia=images';

	return `${url}?q=${expr}&${parms}`;
}

export const words: Word[] = wordsData.map((e) => ({ hu: e[0], en: e[1] }));

const randomBuffer: number[] = [];
const randomBufferSize = 50;

export function randomWord() {
	let pos = 0;

	do {
		pos = Math.floor(Math.random() * words.length);
	} while (randomBuffer.includes(pos));

	randomBuffer.push(pos);

	if (randomBuffer.length > randomBufferSize) {
		randomBuffer.shift();
	}

	return words[pos];
}

export function randomWords(length: number) {
	const out = [];

	for (let i = 0; i < length; i++) {
		out.push(randomWord());
	}

	return out;
}

export function quizWords(length: number) {
	const words = randomWords(length);

	const left = shuffle(words.map((w, i) => ({ ...w, pos: i })));
	const right = shuffle(words.map((w, i) => ({ ...w, pos: i })));

	return { left, right };
}

export function shuffle(array: any[]) {
	let currentIndex = array.length,
		randomIndex;

	// While there remain elements to shuffle.
	while (currentIndex != 0) {
		// Pick a remaining element.
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// And swap it with the current element.
		[array[currentIndex], array[randomIndex]] = [
			array[randomIndex],
			array[currentIndex],
		];
	}

	return array;
}
