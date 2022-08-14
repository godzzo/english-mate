import { Box, Button, HStack, VStack } from '@chakra-ui/react';
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { QuizList } from '../components/QuizList';
import { sendQuestionState, shuffle, speech, words } from '../utils/common';
import {
	Data,
	GOODS_LENGTH,
	QuestionContext,
	useQuestionStore,
} from '../utils/QuestionStore';
import { useQuizHistory } from '../utils/QuizHistory';

const RelearnView: NextPage = () => {
	const { result } = useQuizHistory();
	// const [data, setData] = useState<null | Data>(null);
	// const { data: session } = useSession();
	const questionHandler = useQuestionStore();
	const {
		state: { timestamp, goods, points, mode, bads },
		load,
	} = questionHandler;

	useEffect(() => {
		if (result.length > 0) {
			const bads = Array.from(
				new Set(result.flatMap((e) => e.result.bads))
			).map((e) => words[e]);

			load({
				left: shuffle([...bads]),
				right: shuffle([...bads]),
			});
		}
	}, [result]);

	useEffect(() => {
		if (goods.length > GOODS_LENGTH - 1) {
		}
	}, [goods, shuffle]);

	return (
		<QuestionContext.Provider value={questionHandler}>
			<VStack justify="center" marginTop={1} gap="1">
				<HStack>
					<Box>Pontok: {points}</Box>
				</HStack>
				{result.length > 0 && <QuizList />}
			</VStack>
		</QuestionContext.Provider>
	);
};

export default RelearnView;
