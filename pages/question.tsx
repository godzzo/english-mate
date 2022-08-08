import { Box, Button, HStack, VStack } from '@chakra-ui/react';
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useState, useContext, CSSProperties, useEffect } from 'react';
import { QuizButton, WordMode } from '../components/WordCard';
import { AppContext } from '../utils/AppStore';
import { speech } from '../utils/common';
import {
	GOODS_LENGTH,
	QuestionContext,
	useQuestionStore,
} from '../utils/QuestionStore';

const stackStyle: CSSProperties = {
	height: 'calc(100vh - 6rem)',
	overflowY: 'scroll',
};

const Quiz = () => {
	const { state, left: onLeft, right: onRight } = useContext(QuestionContext);

	const getMode = (e: { pos: number }): WordMode =>
		state.goods.includes(e.pos) ? 'GOOD' : 'BASE';

	return (
		<HStack gap={1}>
			<VStack style={stackStyle}>
				{state.data.left
					.filter((_, i) => i < GOODS_LENGTH)
					.map((e) => {
						let mode = getMode(e);

						if (e.pos === state.left) {
							mode = 'CHOOSEN';
						}

						return (
							<QuizButton
								mode={mode}
								onSelect={onLeft}
								word={e}
								key={e.pos}
							></QuizButton>
						);
					})}
			</VStack>
			<VStack style={stackStyle}>
				{state.data.right.map((e) => {
					let mode = getMode(e);

					if (e.pos === state.right) {
						mode = 'CHOOSEN';
					}

					return (
						<QuizButton
							mode={mode}
							onSelect={onRight}
							word={e}
							lang="hu"
							key={e.pos}
						></QuizButton>
					);
				})}
			</VStack>
		</HStack>
	);
};

async function sendQuestionState(data: any) {
	const headers = {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	};

	const resp = await fetch('/api/question', {
		method: 'POST',
		headers,
		body: JSON.stringify(data),
	});

	const content = await resp.json();

	console.log(content);
}

const Question: NextPage = () => {
	const [begin, setBegin] = useState(false);
	const { data: session } = useSession();
	const questionHandler = useQuestionStore();
	const {
		state: { timestamp, goods, points, mode, bads },
		shuffle,
	} = questionHandler;

	useEffect(() => {
		if (goods.length > GOODS_LENGTH - 1) {
			if (session) {
				sendQuestionState({
					action: 'SAVE_QUESTION_HISTORY',
					timestamp,
					mode,
					goods,
					points,
					bads,
				});
			}

			shuffle();
		}
	}, [goods, shuffle]);

	return (
		<QuestionContext.Provider value={questionHandler}>
			<VStack justify="center" marginTop={1} gap="1">
				<HStack>
					<Box>Pontok: {points}</Box>
					<Button
						colorScheme="purple"
						onClick={() => {
							if (!begin) {
								shuffle();
								speech("Common. Let's go!");
							}

							setBegin(!begin);
						}}
					>
						Keverés
					</Button>
				</HStack>
				{begin && <Quiz />}
			</VStack>
		</QuestionContext.Provider>
	);
};

export default Question;
