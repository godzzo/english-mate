import { createContext, useEffect, useReducer } from 'react';

type UserState = {
	name: string;
};

export function initialState(): UserState {
	return {
		name: 'Fred',
	};
}

type UserAction = { type: 'CHANGE'; name: string };

export function reducer(state: UserState, action: UserAction): UserState {
	if (action.type === 'CHANGE') {
		return { ...state, name: action.name };
	} else {
		return state;
	}
}

export function useUserStore() {
	const [state, dispatch] = useReducer(reducer, initialState());

	useEffect(() => console.log('User State Changed', state), [state]);

	const handler = {
		name: state.name,
		change: (name: string) => {
			dispatch({ type: 'CHANGE', name });
		},
	};

	return handler;
}

export type UserHandler = ReturnType<typeof useUserStore>;

export const UserContext = createContext<UserHandler>(
	// Do not use the default value! `const userHandler = useUserStore(); <UserContext.Provider value={userHandler}>`
	null as any
);
