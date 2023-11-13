import postgres from 'postgres'
import 'dotenv/config'

//Com env
const { PGUSER,  PGPASSWORD , PGHOST, PGPORT, PGDATABASE,} = process.env;
const URL = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}:${PGPORT}/${PGDATABASE}`;

//Sem env
//const URL = `postgres://postgres:123@localhost:5432/teste`;

export const sql = postgres(URL, {         
});
