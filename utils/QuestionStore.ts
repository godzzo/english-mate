import { createContext, useEffect, useReducer } from 'react';
import { quizWords } from './common';

type QuestionState = {
	data: {
		left: any[];
		right: any[];
	};
	left: number;
	right: number;
	goods: number[];
	points: number;
};

export function initialState(): QuestionState {
	return {
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

export function reducer(
	state: QuestionState,
	action: QuestionAction
): QuestionState {
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
		return {
			...state,
			data: quizWords(15),
			goods: [],
			left: -1,
			right: -1,
		};
	} else {
		return state;
	}
}

export function useQuestionStore() {
	const [state, dispatch] = useReducer(reducer, initialState());

	useEffect(() => console.log('Exam State Changed', state), [state]);

	useEffect(() => {
		if (state.left > -1 && state.left === state.right) {
			dispatch({ type: 'ADD_POINT' });
			// TODO: XHR to save good word and point?...
		}
	}, [state.left, state.right]);

	useEffect(() => {
		if (state.left > -1 && state.right > -1 && state.left !== state.right) {
			// TODO: XHR to send wrong word...
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
