// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import {
	getQuestionHistory,
	insertQuestionHistory,
	updateQuestionHistory,
} from '../../utils/db';

type RequestData = {
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

	if (session && session.user && req.method === 'POST') {
		console.log('req.body', req.body);

		const body: RequestData = req.body;

		console.log('Question request', req.query);

		if (body.action === 'SAVE_QUESTION_HISTORY' && session.user.email) {
			const email = session.user.email;

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

		res.send(JSON.stringify(session, null, 2));
	} else {
		res.send({ error: 'ACCESS_DENIED_NO_SESSION' });
	}
}
