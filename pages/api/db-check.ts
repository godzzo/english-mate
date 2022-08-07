// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { getPool } from '../../utils/db';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const pool = getPool();
	let data = [];

	try {
		const result = await pool.query('SELECT * FROM appuser');

		data = result.rows;

		console.log('result', result);
	} catch (e) {
		console.error('DB Error', e);
	} finally {
		pool.end();
	}

	res.status(200).json({ data });
}
