import { Box, Button, HStack, VStack } from '@chakra-ui/react';
import { NextPage } from 'next';
import { useState, useContext, CSSProperties, useEffect } from 'react';
import { QuizButton, WordMode } from '../components/WordCard';
import { speech } from '../utils/common';
import { QuestionContext, useQuestionStore } from '../utils/QuestionStore';

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
				{state.data.left.map((e) => {
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

const Question: NextPage = () => {
	const [begin, setBegin] = useState(false);
	const questionHandler = useQuestionStore();
	const {
		state: { goods, points },
		shuffle,
	} = questionHandler;

	useEffect(() => {
		if (goods.length > 3) {
			shuffle();
		}
	}, [goods, shuffle]);

	return (
		<QuestionContext.Provider value={questionHandler}>
			<VStack justify="center" gap="1">
				<HStack>
					<Box>Pontok: {points}</Box>
					<Button
						colorScheme="purple"
						onClick={() => {
							shuffle();

							if (!begin) {
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
