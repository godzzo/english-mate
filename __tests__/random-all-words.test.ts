import { words, randomWords, WordBuffer } from '../utils/common';

// .\node_modules\.bin\jest -- random-all-words.test.ts > random-all-words.test.log

describe('Random ALL words', () => {
	it('testing all words found in result', () => {
		const buffer = new WordBuffer(100, 50);
		const pageSize = 25;

		const first = randomWords(pageSize, buffer);
		const second = randomWords(pageSize, buffer);
		const third = randomWords(pageSize, buffer);
		const fourth = randomWords(pageSize, buffer);

		const all = [...first, ...second, ...third, ...fourth];

		all.sort(compare('en'));

		const duplications = all.filter(
			(e) => !all.find((i) => i.pos === e.pos)
		);

		// console.log('ALL', [...all.map((e) => e.en)]);
		// console.log('Duplications', duplications);
		// console.log('Buffer', buffer);

		expect(duplications.length).toBe(0);
		expect(all.length).toBe(words.length);

		// TODO Check fifth is very different then first!
		// It has a proper popSize so hould be different
		// random order of the first after overflow (=> meaning
		//  have to give again becouse run out the unique words already...)
		/*
		const fifth = randomWords(pageSize, buffer);
		const fifthFirstPosDiff = fifth.filter(
			(e, i) => i > 0 && e.pos !== first[i - 1].pos
		);

		console.log('fifthFirstPosDiff', fifthFirstPosDiff);

		expect(fifthFirstPosDiff.length > 15).toBe(true);

		const fifthFirstDiff = fifth.filter(
			(e) => first.filter((i) => e.pos === i.pos).length === 0
		);

		console.log('fifthFirstDiff', fifthFirstDiff);

		expect(fifthFirstDiff.length > 10).toBe(true);
		 */
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
