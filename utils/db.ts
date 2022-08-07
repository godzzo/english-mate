import { Pool } from 'pg';

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
