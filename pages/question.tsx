import { Box, Button, HStack, VStack } from '@chakra-ui/react';
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { QuizList } from '../components/QuizList';
import { sendQuestionState, speech } from '../utils/common';
import {
	GOODS_LENGTH,
	QuestionContext,
	useQuestionStore,
} from '../utils/QuestionStore';

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
					{!begin && (
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
							Kezdés
						</Button>
					)}
				</HStack>
				{begin && <QuizList />}
			</VStack>
		</QuestionContext.Provider>
	);
};

export default Question;
