// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { promises as fsp, existsSync } from 'fs';

const dataPath = 'data.json';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.query.user && req.query.user === 'Fred') {
		const action = req.query.action;
		const data = await loadData();

		console.log('Question request', req.query);

		if (action === 'GOOD_WORD') {
			const goodWord = req.query.word;

			if (!data.goods.includes(goodWord)) {
				console.log('Question not include', goodWord);

				data.goods.push(goodWord);

				const json = JSON.stringify(data, null, 4);

				await fsp.writeFile(dataPath, json);
				console.log('Question write json', json);
			}
		}

		res.status(200).json({ result: 'OK', data });
		console.log('Question respond', data);
	} else {
		res.status(200).json({ result: 'INVALID' });
	}
}

async function loadData() {
	let data: any = { goods: [] };

	if (existsSync(dataPath)) {
		const json = await fsp.readFile(dataPath);
		data = JSON.parse(json.toString());
	}

	return data;
}
