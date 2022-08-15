import { Box, HStack, VStack } from '@chakra-ui/react';
import { NextPage } from 'next';
import { useState, useEffect, useContext } from 'react';
import { QuizList } from '../components/QuizList';
import { shuffle, WordPos, words } from '../utils/common';
import {
	Data,
	GOODS_LENGTH,
	QuestionContext,
	useQuestionStore,
} from '../utils/QuestionStore';
import { useQuizHistory } from '../utils/QuizHistory';

type RelearnContext = {
	bads: WordPos[];
	position: number;
};

const context: RelearnContext = {
	bads: [],
	position: 0,
};

function setSlice(load: (data: Data) => void) {
	const end = context.position + GOODS_LENGTH;
	const selected = context.bads.slice(context.position, end);
	context.position = context.position + GOODS_LENGTH;

	load({
		left: shuffle([...selected]),
		right: shuffle([...selected]),
	});
}

const RelearnView = () => {
	const { result } = useQuizHistory();
	const {
		state: { timestamp, goods, points, mode, bads },
		load,
	} = useContext(QuestionContext);

	useEffect(() => {
		if (result.length > 0 && context.bads.length < 1) {
			context.bads = Array.from(
				new Set(result.flatMap((e) => e.result.bads))
			).map((e) => words[e]);

			setSlice(load);
		}
	}, [result, load]);

	useEffect(() => {
		if (goods.length > GOODS_LENGTH - 1) {
			setSlice(load);
		}
	}, [goods, load]);

	return (
		<VStack justify="center" marginTop={1} gap="1">
			<HStack>
				<Box>Pontok: {points}</Box>
			</HStack>
			{result.length > 0 && <QuizList />}
		</VStack>
	);
};

const RelearnPage: NextPage = () => {
	const questionHandler = useQuestionStore();

	return (
		<QuestionContext.Provider value={questionHandler}>
			<RelearnView />
		</QuestionContext.Provider>
	);
};

export default RelearnPage;
