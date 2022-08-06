import {
	words,
	randomWords,
	WordBuffer,
	quizWords,
	quizFillWords,
} from '../utils/common';

// .\node_modules\.bin\jest -- random-all-words.test.ts > random-all-words.test.log

describe('Quiz', () => {
	it('Fill words', () => {
		const base = quizWords(6);

		console.log('base', base);

		const goods = [base.left[0].pos, base.left[1].pos, base.left[2].pos];

		console.log('goods', goods);

		const refillOne = quizFillWords(base, goods);

		console.log('refillOne', refillOne);

		const refillLeft = refillOne.left.filter((e) => goods.includes(e.pos));
		const refillRight = refillOne.right.filter((e) =>
			goods.includes(e.pos)
		);

		expect(
			refillLeft.length === 0 && refillRight.length === 0
		).toBeTruthy();
	});
});
