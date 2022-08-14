import { citiesData } from './cities';
import { serverUrl } from './config';
import { wordsData } from './words';

export type Langs = 'hu' | 'en';
export type Word = { hu: string; en: string };
export type WordPos = Word & { pos: number };

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

export const words: WordPos[] = wordsData.map((e, pos) => ({
	hu: e[0],
	en: e[1],
	pos,
}));
export const cities: WordPos[] = citiesData.map((e, pos) => ({
	hu: e[0],
	en: e[1],
	pos,
}));

// console.log('words', words);

export class WordBuffer {
	data: number[] = [];

	constructor(public size = 100, private popSize = 50) {}

	add(pos: number) {
		this.data.push(pos);

		if (this.data.length > this.size) {
			this.data = this.data.slice(this.popSize);
		}
	}

	includes(pos: number) {
		return this.data.includes(pos);
	}
}

const randomBuffer = new WordBuffer();
const MAX_TRY = 2048;

export function randomWord(
	list: WordPos[] = [],
	buffer = randomBuffer,
	data = words
) {
	let pos = 0;
	let i = 0;

	const listIncludes = (p: number) => list.find((e) => e.pos === p);

	do {
		pos = Math.floor(Math.random() * data.length);

		// console.log('TRY', {
		// 	pos,
		// 	bufferIncludes: buffer.includes(pos),
		// 	listIncludes: listIncludes(pos),
		// 	i,
		// });

		i++;
	} while ((buffer.includes(pos) || listIncludes(pos)) && i < MAX_TRY);

	buffer.add(pos);

	// console.log(`random word ${pos}`, data[pos]);

	return { ...data[pos], pos };
}

export function randomWords(
	length: number,
	buffer = randomBuffer,
	list: WordPos[] = [],
	data = words
) {
	const out: WordPos[] = [];

	for (let i = 0; i < length; i++) {
		out.push(randomWord([...out, ...list], buffer, data));
	}

	console.log(`random words`, out);

	return out;
}

export type QuizData = { left: WordPos[]; right: WordPos[] };

export function quizWords(
	length: number,
	buffer = randomBuffer,
	list: WordPos[] = [],
	data = words
): QuizData {
	const result = randomWords(length, buffer, list, data);

	const left = shuffle(result.map((w) => ({ ...w })));
	const right = shuffle(result.map((w) => ({ ...w })));

	return { left, right };
}

export function quizFillWords(
	previous: QuizData,
	goods: number[],
	buffer = randomBuffer,
	data = words
): QuizData {
	const forbidden = previous.left.filter((e) => goods.includes(e.pos));

	const result = randomWords(
		previous.left.length - goods.length,
		buffer,
		forbidden,
		data
	);

	const prevLeft = previous.left.filter((e) => !goods.includes(e.pos));
	const prevRight = previous.right.filter((e) => !goods.includes(e.pos));

	const left = shuffle([...prevLeft, ...result].map((w) => ({ ...w })));
	const right = shuffle([...prevRight, ...result].map((w) => ({ ...w })));

	return {
		left,
		right,
	};
}

export function shuffle<T>(array: T[]): T[] {
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

export function speech(text: string) {
	const speech = new SpeechSynthesisUtterance();

	speech.lang = 'en';
	speech.text = text;

	window.speechSynthesis.speak(speech);
}

export async function getResult(data: any, name = 'question') {
	const headers = {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	};

	const resp = await fetch(`${serverUrl}/api/${name}`, {
		method: 'POST',
		headers,
		body: JSON.stringify(data),
	});

	return resp.json();
}

export async function sendQuestionState(data: any) {
	const headers = {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	};

	const resp = await fetch('/api/question', {
		method: 'POST',
		headers,
		body: JSON.stringify(data),
	});

	const content = await resp.json();

	console.log(content);
}
