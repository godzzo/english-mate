import { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { VStack, Box, HStack } from '@chakra-ui/react';
import { serverUrl } from '../utils/config';
import { words } from '../utils/common';

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

const ResultsView: NextPage = () => {
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

	return (
		<VStack>
			{result.length < 1 && <Box>Nincs adat - Be van jelentkezve?</Box>}

			{result.map((e, i) => (
				<VStack key={i}>
					<Box>
						Dátum:
						{new Date(parseInt(e.timestamp, 10)).toISOString()}
					</Box>
					<HStack>
						<VStack>
							{e.result.bads.map((b, bi) => {
								const word = words[b];

								return <Box key={bi}>{word.en}</Box>;
							})}
						</VStack>
						<VStack>
							{e.result.goods.map((g, gi) => {
								const word = words[g];

								return <Box key={gi}>{word.en}</Box>;
							})}
						</VStack>
					</HStack>
				</VStack>
			))}
		</VStack>
	);
};

export default ResultsView;

async function getResult(data: any) {
	const headers = {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	};

	const resp = await fetch(`${serverUrl}/api/question`, {
		method: 'POST',
		headers,
		body: JSON.stringify(data),
	});

	return resp.json();
}
