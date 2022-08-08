import { Pool } from 'pg';

export async function insertQuestionHistory(
	email: string,
	timestamp: number,
	mode: string,
	data: string
) {
	const pool = getPool();

	try {
		const resp = await pool.query(
			'INSERT INTO question_history (email, timestamp, mode, data) VALUES ($1, $2, $3, $4);',
			[email, timestamp, mode, data]
		);

		console.log('response', resp);
	} catch (e) {
		// console.error('Add new QuestionHistory', e);

		throw e;
	} finally {
		pool.end();
	}
}

export async function updateQuestionHistory(
	email: string,
	timestamp: number,
	mode: string,
	data: string
) {
	const pool = getPool();

	try {
		const resp = await pool.query(
			'UPDATE question_history SET mode = $1, data = $2 WHERE email = $3 AND timestamp = $4;',
			[mode, data, email, timestamp]
		);

		console.log('response', resp);
	} catch (e) {
		console.error('Update existing QuestionHistory', e);
	} finally {
		pool.end();
	}
}

export async function getQuestionHistory(email: string, timestamp: number) {
	const pool = getPool();

	try {
		const resp = await pool.query(
			'SELECT * FROM question_history WHERE email = $1 AND timestamp = $2;',
			[email, timestamp]
		);

		return resp.rows;
	} catch (e) {
		console.error('Get QuestionHistories', e);

		return [];
	} finally {
		pool.end();
	}
}

export async function getQuestionHistories(email: string) {
	const pool = getPool();

	try {
		const resp = await pool.query(
			'SELECT * FROM question_history WHERE email = $1;',
			[email]
		);

		return resp.rows;
	} catch (e) {
		console.error('Get QuestionHistories', e);

		return [];
	} finally {
		pool.end();
	}
}

export function getPool() {
	return new Pool({
		host: 'ec2-44-195-100-240.compute-1.amazonaws.com',
		database: 'd5groi8al3euid',
		user: 'kdmelucggzhltp',
		password:
			'9144aaa048c69e166779c796e56ae700c879bdf7e1a3587422562d95fc6a61c6',
		port: 5432,
		ssl: {
			rejectUnauthorized: false,
		},
	});
}

type QueryReducerArray = [string, any[], number];

export function queryConvert(parameterizedSql: string, params: any) {
	const [text, values] = Object.entries(params).reduce(
		([sql, array, index], [key, value]) =>
			[
				sql.replace(`:${key}`, `$${index}`),
				[...array, value],
				index + 1,
			] as QueryReducerArray,
		[parameterizedSql, [], 1] as QueryReducerArray
	);

	return { text, values };
}
