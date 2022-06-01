const Pool = require("pg").Pool;

const pool = new Pool({
	user: "postgres",
	host: "localhost",
	database: "Sales",
	password: "jansen24",
	port: "5432",
});

module.exports = pool;
