const { Client } = require('pg');
import 'dotenv/config'

export let getClient = async () => {
  const client = new Client({
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    ssl: false,
  });

  try
  {
    await client.connect();
    const res = await client.query('SELECT $1::text as connected', ['Connection to postgres successful!']);
    return client;
  }
  catch(e)
  {
    console.log(e)
    return null;
  }

}