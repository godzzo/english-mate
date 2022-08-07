// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { Pool, Client } from 'pg';

function getPool() {
	return new Pool({
		host: 'ec2-44-195-100-240.compute-1.amazonaws.com',
		database: 'd5groi8al3euid',
		user: 'kdmelucggzhltp',
		password:
			'9144aaa048c69e166779c796e56ae700c879bdf7e1a3587422562d95fc6a61c6',
		port: 5432,
		ssl: true,
	});
}

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
