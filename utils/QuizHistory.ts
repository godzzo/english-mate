import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { getResult } from './common';

type History = {
	email: string;
	mode: string;
	timestamp: string;
	data: string;
	result: Result;
};

type Result = {
	points: number;
	goods: number[];
	bads: number[];
};

export function useQuizHistory() {
	const { data: session } = useSession();
	const [result, setResult] = useState<History[]>([]);

	useEffect(() => {
		if (session) {
			getResult({ action: 'GET_QUESTION_HISTORIES' }).then((data) => {
				setResult(
					data.result.map((e: History) => ({
						...e,
						result: JSON.parse(e.data),
					}))
				);
			});
		}
	}, [session]);

	return { result };
}
