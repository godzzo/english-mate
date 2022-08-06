import { createContext, useEffect, useReducer } from 'react';
import {
	quizWords,
	speech,
	WordPos,
	quizFillWords,
	WordBuffer,
	words,
	cities,
} from './common';

export const PAGE_SIZE = 10;
export const GOODS_LENGTH = 5;

type QuestionMode = 'words' | 'cities';

type QuestionState = {
	mode: QuestionMode;
	data: {
		left: WordPos[];
		right: WordPos[];
	};
	left: number;
	right: number;
	goods: number[];
	points: number;
};

const QuestionModes = {
	cities: {
		buffer: new WordBuffer(200),
		data: cities,
	},
	words: {
		buffer: new WordBuffer(),
		data: words,
	},
};

function initialState(mode: QuestionMode): QuestionState {
	return {
		mode,
		data: {
			left: [],
			right: [],
		},
		left: -1,
		right: -1,
		goods: [],
		points: 0,
	};
}

type QuestionAction =
	| { type: 'LEFT'; left: number }
	| { type: 'RIGHT'; right: number }
	| { type: 'ADD_POINT' }
	| { type: 'SHUFFLE' };

function reducer(state: QuestionState, action: QuestionAction): QuestionState {
	const qMode = QuestionModes[state.mode];

	if (action.type === 'LEFT') {
		return { ...state, left: action.left };
	} else if (action.type === 'RIGHT') {
		return { ...state, right: action.right };
	} else if (action.type === 'ADD_POINT') {
		return {
			...state,
			goods: [...state.goods, state.left],
			points: state.points + 1,
			left: -1,
			right: -1,
		};
	} else if (action.type === 'SHUFFLE') {
		const data =
			state.goods.length == 0
				? quizWords(PAGE_SIZE, qMode.buffer, undefined, qMode.data)
				: quizFillWords(
						state.data,
						state.goods,
						qMode.buffer,
						qMode.data
				  );

		return {
			...state,
			data,
			goods: [],
			left: -1,
			right: -1,
		};
	} else {
		return state;
	}
}

export function useQuestionStore(mode: 'words' | 'cities' = 'words') {
	const [state, dispatch] = useReducer(reducer, initialState(mode));

	useEffect(() => console.log('Exam State Changed', state), [state]);

	useEffect(() => {
		if (state.left > -1 && state.left === state.right) {
			speech('Good work!');

			dispatch({ type: 'ADD_POINT' });
			// TODO: XHR to save good word and point?...
		}
	}, [state.left, state.right]);

	useEffect(() => {
		if (state.left > -1 && state.right > -1 && state.left !== state.right) {
			// TODO: XHR to send wrong word...
			speech('Try again!');
		}
	}, [state.left, state.right]);

	const handler = {
		state,
		left: (left: number) => {
			dispatch({ type: 'LEFT', left });
		},
		right: (right: number) => {
			dispatch({ type: 'RIGHT', right });
		},
		shuffle: () => {
			speech('Words are ready');
			dispatch({ type: 'SHUFFLE' });
		},
	};

	return handler;
}

export type QuestionHandler = ReturnType<typeof useQuestionStore>;

export const QuestionContext = createContext<QuestionHandler>(
	// Do not use the default value! `const fruitHandler = useFruitStore(); <FruitContext.Provider value={fruitHandler}>`
	null as any
);
