import { HStack, VStack } from '@chakra-ui/react';
import { useContext, CSSProperties } from 'react';
import { QuizButton, WordMode } from './WordCard';
import { GOODS_LENGTH, QuestionContext } from '../utils/QuestionStore';

const stackStyle: CSSProperties = {
	height: 'calc(100vh - 6rem)',
	overflowY: 'scroll',
};

export const QuizList = () => {
	const {
		state,
		left: onLeft,
		right: onRight,
		help: onHelp,
	} = useContext(QuestionContext);

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
								onHelp={onHelp}
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
							onHelp={onHelp}
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
