import { getPool } from '../utils/db';

if (false) {
	describe('Question History', () => {
		it('Add new one', async () => {
			const pool = getPool();

			try {
				const resp = await pool.query(
					'INSERT INTO question_history (email, timestamp, mode, data) VALUES ($1, $2, $3, $4);',
					[
						'akarmi@gmail.com',
						new Date().getTime(),
						'words',
						'{ok: true}',
					]
				);

				console.log('response', resp);
			} catch (e) {
				console.error('Add new QuestionHistory', e);
			} finally {
				pool.end();
			}
		});
	});
}
