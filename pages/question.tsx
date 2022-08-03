import { Box, Button, HStack, VStack } from '@chakra-ui/react';
import { NextPage } from 'next';
import { useState, useEffect } from 'react';
import { QuizButton, WordMode } from '../components/WordCard';
import { quizWords } from '../utils/common';

const Quiz = ({ addPoint }: { addPoint: () => void }) => {
	const [data, setData] = useState(quizWords(10));
	const [selected, setSelected] = useState<{
		left: number;
		right: number;
		goods: number[];
	}>({
		left: -1,
		right: -1,
		goods: [],
	});

	const check = () => {
		setSelected((s) => {
			if (s.left > -1 && s.left === s.right) {
				addPoint();

				return {
					goods: [...s.goods, s.left],
					left: -1,
					right: -1,
				};
			} else {
				return s;
			}
		});
	};

	const selectLeft = (pos: number) => {
		setSelected((s) => ({ ...s, left: pos }));
		check();
	};

	const selectRight = (pos: number) => {
		setSelected((s) => ({ ...s, right: pos }));
		check();
	};

	return (
		<HStack gap={1}>
			<VStack
				style={{ height: 'calc(100vh - 6rem)', overflowY: 'scroll' }}
			>
				{data.left.map((e) => {
					let mode: WordMode = selected.goods.includes(e.pos)
						? 'GOOD'
						: 'BASE';

					if (e.pos === selected.left) {
						mode = 'CHOOSEN';
					}

					return (
						<QuizButton
							mode={mode}
							onSelect={selectLeft}
							word={e}
							key={e.pos}
						></QuizButton>
					);
				})}
			</VStack>
			<VStack
				style={{ height: 'calc(100vh - 6rem)', overflowY: 'scroll' }}
			>
				{data.right.map((e) => {
					let mode: WordMode = selected.goods.includes(e.pos)
						? 'GOOD'
						: 'BASE';

					if (e.pos === selected.right) {
						mode = 'CHOOSEN';
					}

					return (
						<QuizButton
							mode={mode}
							onSelect={selectRight}
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
	const [points, setPoints] = useState(0);

	return (
		<VStack justify="center" gap="1">
			<Box>Pontok: {points}</Box>
			<Button onClick={() => setBegin(!begin)}>Keverés</Button>
			{begin && (
				<Quiz
					addPoint={() => {
						setTimeout(() => setPoints(points + 1), 0);
					}}
				/>
			)}
		</VStack>
	);
};

export default Question;
