import { randomWord, WordBuffer } from '../utils/common';

const data = [
	['lenni', 'be'],
	['vmivé válni', 'become'],
	['elkezdeni', 'begin'],
	['harapni', 'bite'],
	['vérezni', 'bleed'],
];

const words = data.map((e) => ({ hu: e[0], en: e[1] }));

describe('Calculator', () => {
	it('testing forbidden list', () => {
		const buffer = new WordBuffer();

		const allowedPos = 3;

		const forbidden = words
			.map((e, i) => ({ ...e, pos: i }))
			.filter((e) => e.pos !== allowedPos);

		const found = randomWord(forbidden, buffer, words);

		console.log('forbidden', forbidden);
		console.log('found', found);

		expect(found.pos).toBe(allowedPos);
	});
});
