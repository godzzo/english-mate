import { words, randomWords, WordBuffer } from '../utils/common';

describe('Calculator', () => {
	it('testing all words found in result', () => {
		const buffer = new WordBuffer();

		const first = randomWords(25, buffer);
		const second = randomWords(25, buffer);
		const third = randomWords(25, buffer);
		const fourth = randomWords(25, buffer);

		const all = [...first, ...second, ...third, ...fourth];

		all.sort(compare('en'));

		const duplications = all.filter(
			(e) => !all.find((i) => i.pos === e.pos)
		);

		console.log('ALL', [...all.map((e) => e.en)]);
		console.log('Duplications', duplications);
		console.log('Buffer', buffer);

		expect(duplications.length).toBe(0);
		expect(all.length).toBe(words.length);
	});
});

function compare(name: string) {
	return (a: any, b: any) => {
		if (a[name] < b[name]) {
			return -1;
		}

		if (a[name] > b[name]) {
			return 1;
		}

		return 0;
	};
}
