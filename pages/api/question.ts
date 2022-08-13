// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import {
	getQuestionHistories,
	getQuestionHistory,
	insertQuestionHistory,
	updateQuestionHistory,
} from '../../utils/db';

type RequestData =
	| ({ action: 'SAVE_QUESTION_HISTORY' } & SaveRequestData)
	| { action: 'GET_QUESTION_HISTORIES' };

type SaveRequestData = {
	action: 'SAVE_QUESTION_HISTORY';
	timestamp: number;
	mode: string;
	data: any;
	points: number;
	goods: number[];
	bads: number[];
};

export default async function session(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const session = await getSession({ req });

	if (
		session &&
		session.user &&
		session.user.email &&
		req.method === 'POST'
	) {
		console.log('req.body', req.body);

		const body: RequestData = req.body;

		console.log('Question request', req.query);

		const email = session.user.email;

		if (body.action === 'SAVE_QUESTION_HISTORY') {
			await saveQuestionHistory(email, body);

			res.send(JSON.stringify({ saved: true }, null, 2));
		} else if (body.action === 'GET_QUESTION_HISTORIES') {
			const result = await getQuestionHistories(email);

			res.send(JSON.stringify({ result }, null, 2));
		} else {
			res.send(JSON.stringify(session, null, 2));
		}
	} else {
		res.send({ error: 'ACCESS_DENIED_NO_SESSION' });
	}
}

async function saveQuestionHistory(email: string, body: SaveRequestData) {
	const rows = await getQuestionHistory(email, body.timestamp);

	if (rows.length > 0) {
		const oldData = JSON.parse(rows[0].data);

		const data = {
			bads: body.bads,
			points: body.points,
			goods: [...body.goods, ...oldData.goods],
		};

		await updateQuestionHistory(
			email,
			body.timestamp,
			body.mode,
			JSON.stringify(data)
		);
	} else {
		await insertQuestionHistory(
			email,
			body.timestamp,
			body.mode,
			JSON.stringify({
				bads: body.bads,
				points: body.points,
				goods: body.goods,
			})
		);
	}
}
