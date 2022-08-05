import { createContext, useEffect, useReducer } from 'react';

type AppState = {
	name: string;
};

export function initialState(): AppState {
	const json =
		typeof localStorage !== 'undefined'
			? localStorage.getItem('appState')
			: null;
	const loadedState: any = json ? JSON.parse(json) : {};

	return {
		name: 'Fred',
		...loadedState,
	};
}

type AppAction = { type: 'CHANGE'; name: string };

export function reducer(state: AppState, action: AppAction): AppState {
	if (action.type === 'CHANGE') {
		return { ...state, name: action.name };
	} else {
		return state;
	}
}

export function useAppStore() {
	const [state, dispatch] = useReducer(reducer, initialState());

	useEffect(() => {
		console.log('App State Changed', state);

		localStorage.setItem('appState', JSON.stringify(state));
	}, [state]);

	const handler = {
		name: state.name,
		change: (name: string) => {
			dispatch({ type: 'CHANGE', name });
		},
	};

	return handler;
}

export type AppHandler = ReturnType<typeof useAppStore>;

export const AppContext = createContext<AppHandler>(
	// Do not use the default value! `const userHandler = useAppStore(); <AppContext.Provider value={userHandler}>`
	null as any
);
